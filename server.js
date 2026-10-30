'use strict';
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const CASES = require('./cases');

const PORT = process.env.PORT || 3000;
const MIN_PLAYERS = 7;
const MAX_PLAYERS = 16;
const READ_SECS = 75;
const STAND_SECS = 45;
const VERDICT_SECS = 60;
const WHISPERS_PER_ROUND = 3;
const EXHIBITS_PER_LAWYER = 2;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { pingInterval: 10000, pingTimeout: 25000 });
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules', 'qrcode-generator')));
app.get('/healthz', (_q, res) => res.send('ok'));

/* ---------- helpers ---------- */
const rooms = new Map();
const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
const shuffle = a => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
const rid = (n = 8) => {
  const c = 'abcdefghijkmnpqrstuvwxyz23456789';
  let s = '';
  for (let i = 0; i < n; i++) s += c[rnd(c.length)];
  return s;
};
const cleanName = s => String(s || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 16);
const cleanText = (s, n) => String(s || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);

function newCode() {
  const L = 'ABCDEFGHJKMNPQRSTUVWXYZ';
  for (;;) {
    let c = '';
    for (let i = 0; i < 4; i++) c += L[rnd(L.length)];
    if (!rooms.has(c)) return c;
  }
}

function uniqueName(room, name, selfId) {
  const taken = new Set([...room.players.values()].filter(p => p.id !== selfId).map(p => p.name.toLowerCase()));
  if (!taken.has(name.toLowerCase())) return name;
  for (let i = 2; i < 99; i++) {
    const n = `${name.slice(0, 13)} ${i}`;
    if (!taken.has(n.toLowerCase())) return n;
  }
  return name + rid(2);
}

function makeRoom() {
  const code = newCode();
  const room = {
    code,
    hostId: null,
    players: new Map(),
    phase: 'lobby',
    endsAt: null,
    timer: null,
    round: 0,
    settings: { crossMins: 12, verdictMins: 3, rounds: 3 },
    usedCases: [],
    g: null,
    lastActive: Date.now()
  };
  rooms.set(code, room);
  return room;
}

function addPlayer(room, name, sid, bot = false) {
  const p = {
    id: rid(10),
    token: rid(20),
    name: uniqueName(room, name),
    sid: bot ? null : sid,
    connected: !bot,
    score: 0,
    specials: 0,
    bot
  };
  room.players.set(p.id, p);
  return p;
}

const isHere = p => p.connected || p.bot;

/* ---------- case building ---------- */
function startRound(room) {
  const present = [...room.players.values()].filter(isHere);
  if (present.length < MIN_PLAYERS) return `Need at least ${MIN_PLAYERS} players.`;
  room.round++;

  // Special roles go to the people who have had the fewest so far.
  const order = shuffle(present).sort((a, b) => a.specials - b.specials);
  const special = order.slice(0, 3);
  special.forEach(p => p.specials++);
  const [def, pro, dfn] = shuffle(special);
  const others = present.filter(p => !special.includes(p));
  // Witnesses and jurors are always different people. With 7 players or more there are
  // at least 2 witnesses and 2 jurors. The jury count is kept odd where possible.
  let nJ = Math.max(2, Math.round(others.length * 0.45));
  if (nJ % 2 === 0 && others.length - (nJ + 1) >= 2) nJ++;
  const mixed = shuffle(others);
  const jurorPlayers = mixed.slice(0, nJ);
  const witnesses = mixed.slice(nJ);
  const separate = true;

  let pool = CASES.map((_, i) => i).filter(i => !room.usedCases.includes(i));
  if (!pool.length) { room.usedCases = []; pool = CASES.map((_, i) => i); }
  const ci = pick(pool);
  room.usedCases.push(ci);
  const tpl = CASES[ci];
  const guilty = Math.random() < 0.5;
  const sub = s => s.split('{D}').join(def.name);

  // Two circumstantial facts (one, if a case offers only one) point the wrong way on purpose.
  const flipPool = shuffle(tpl.atoms.map((a, i) => (a.flip ? i : -1)).filter(i => i >= 0));
  const herrings = new Set(flipPool.slice(0, Math.min(2, flipPool.length)));
  const atoms = tpl.atoms.map((a, idx) => {
    const pointsGuilty = herrings.has(idx) ? !guilty : guilty;
    return {
      idx,
      label: a.label,
      ex: sub(a.ex),
      truth: sub(pointsGuilty ? a.g : a.i),
      other: sub(pointsGuilty ? a.i : a.g),
      partial: sub(a.p),
      herring: herrings.has(idx)
    };
  });

  const mk = (idx, kind) => {
    const a = atoms[idx];
    const text = kind === 'true' ? a.truth : kind === 'lie' ? a.other : a.partial;
    return { id: rid(6), atom: idx, kind, text };
  };

  const w = witnesses.length;
  const nLiars = Math.max(1, Math.min(3, Math.round(w * 0.3), w - 1));
  const nBiased = Math.max(0, Math.min(2, Math.floor(w / 3), w - nLiars - 1));
  const ids = shuffle(witnesses.map(p => p.id));

  const grudge = [
    'You cannot stand {D}. They took credit for your work once and you never forgot it.',
    '{D} got you in trouble with the boss a while back. You still resent it.',
    'You and {D} fell out badly last year and have barely spoken since.'
  ];
  const favor = [
    '{D} covered for you once, and you owe them.',
    '{D} is close to your family. You promised to help if it came to this.',
    'You would simply hate to see {D} go down.'
  ];
  const framing = [
    'Someone promised you a favor if {D} takes the fall. You are going to make it stick.',
    'You have your own reasons for wanting {D} gone, and you are not about to share them.',
    'The truth would hurt a person you care about. {D} is the easier answer.'
  ];
  const covering = [
    'The real culprit is someone you want to protect, and you will say whatever it takes.',
    '{D} is paying you to say this. Make it believable.',
    'You owe {D} everything. You will lie for them without blinking.'
  ];

  const hands = {};
  ids.forEach((pid, k) => {
    const arche = k < nLiars ? 'liar' : k < nLiars + nBiased ? 'biased' : 'honest';
    const pair = shuffle(atoms.map(a => a.idx)).slice(0, 2);
    const second = Math.random() < 0.6 ? 'true' : 'partial';
    let facts;
    if (arche === 'liar') facts = [mk(pair[0], 'lie'), mk(pair[1], second)];
    else facts = [mk(pair[0], 'true'), mk(pair[1], second)];
    facts = shuffle(facts);

    let want, motive;
    if (arche === 'honest') {
      want = 'truth';
      motive = 'You saw what you saw. Your only goal is that the jury gets it right.';
    } else if (arche === 'biased') {
      want = pick(['convict', 'acquit']);
      motive = sub(pick(want === 'convict' ? grudge : favor));
    } else {
      want = guilty ? 'acquit' : 'convict';
      motive = sub(pick(want === 'convict' ? framing : covering));
    }
    hands[pid] = { role: 'witness', archetype: arche, want, motive, facts };
  });

  hands[def.id] = {
    role: 'defendant',
    guilty,
    facts: shuffle(atoms.map(a => a.idx)).slice(0, 4).map(i => ({ id: rid(6), atom: i, kind: 'true', text: atoms[i].truth }))
  };
  const lead = idx => ({ atom: idx, text: atoms[idx].partial });
  jurorPlayers.forEach(p => { hands[p.id] = { role: 'juror', archetype: 'juror', want: 'truth', facts: [] }; });
  hands[pro.id] = { role: 'prosecutor', lead: lead(rnd(atoms.length)) };
  hands[dfn.id] = { role: 'defense', lead: lead(rnd(atoms.length)) };

  room.g = {
    title: tpl.title,
    cat: tpl.cat,
    charge: sub(tpl.charge),
    blurb: sub(tpl.blurb),
    guilty,
    atoms,
    defId: def.id,
    proId: pro.id,
    dfnId: dfn.id,
    witnesses: witnesses.map(p => p.id),
    jurors: jurorPlayers.map(p => p.id),
    separate,
    done: new Set(),
    hands,
    record: [],
    revealed: [],
    exhibitsLeft: { [pro.id]: EXHIBITS_PER_LAWYER, [dfn.id]: EXHIBITS_PER_LAWYER },
    whisperCount: {},
    inbox: {},
    sent: {},
    ready: new Set(),
    stand: {},
    votes: {},
    prelim: {},
    standPublic: null,
    result: null
  };
  setPhase(room, 'read', READ_SECS);
  return null;
}

/* ---------- phases ---------- */
function setPhase(room, phase, secs) {
  clearTimeout(room.timer);
  room.phase = phase;
  room.endsAt = secs ? Date.now() + secs * 1000 : null;
  if (secs) {
    room.timer = setTimeout(() => { if (room.phase === phase) advance(room); }, secs * 1000);
  }
  botsOnPhase(room);
  broadcast(room);
}

function advance(room) {
  switch (room.phase) {
    case 'read': room.g.done = new Set(); return setPhase(room, 'cross', Math.round(room.settings.crossMins * 60));
    case 'cross': return toStand(room);
    case 'stand': return resolveStand(room);
    case 'verdict': return resolveVerdict(room);
  }
}

const activeRecord = g => g.record.filter(e => e.status !== 'recanted');
const standers = (room, g) => g.witnesses.filter(pid => {
  const p = room.players.get(pid);
  return p && isHere(p) && activeRecord(g).some(e => e.pid === pid);
});

function toStand(room) {
  const g = room.g;
  if (!standers(room, g).length) return resolveStand(room);
  setPhase(room, 'stand', STAND_SECS);
}

function resolveStand(room) {
  const g = room.g;
  const pub = [];
  const withEntries = [...new Set(activeRecord(g).map(e => e.pid))];
  withEntries.forEach(pid => {
    const choice = g.stand[pid] || 'stand';
    pub.push({ pid, name: room.players.get(pid).name, choice });
    if (choice === 'recant') g.record.forEach(e => { if (e.pid === pid) e.status = 'recanted'; });
  });
  g.standPublic = pub;
  setPhase(room, 'verdict', Math.round(room.settings.verdictMins * 60));
}

function resolveVerdict(room) {
  const g = room.g;
  let gv = 0, iv = 0;
  g.jurors.forEach(pid => {
    if (g.votes[pid] === 'guilty') gv++;
    else if (g.votes[pid] === 'innocent') iv++;
  });
  const abstain = g.jurors.length - gv - iv;
  const convicted = gv > g.jurors.length / 2;
  const correct = convicted === g.guilty;

  const deltas = {};
  const add = (pid, n, why) => {
    if (!deltas[pid]) deltas[pid] = { total: 0, why: [] };
    deltas[pid].total += n;
    deltas[pid].why.push(`${n > 0 ? '+' : ''}${n} ${why}`);
  };

  if (!convicted) { add(g.defId, 3, 'acquitted'); add(g.dfnId, 3, 'won the case'); }
  else add(g.proId, 5, 'won the case');

  [...new Set([...g.witnesses, ...g.jurors])].forEach(pid => {
    const hand = g.hands[pid];
    const mine = g.record.filter(e => e.pid === pid);
    const confirmed = mine.filter(e => e.status === 'confirmed').length;
    const caught = mine.filter(e => e.caught).length;
    const recanted = mine.some(e => e.status === 'recanted');
    if (confirmed) add(pid, Math.min(2, confirmed), 'testimony confirmed');
    if (caught) add(pid, -2, 'caught by an exhibit');
    if (recanted) add(pid, -2, 'recanted');
    if (hand.want === 'truth' && correct) add(pid, 2, 'jury got it right');
    if (hand.want === 'convict' && convicted) add(pid, 3, 'got the conviction they wanted');
    if (hand.want === 'acquit' && !convicted) add(pid, 3, 'got the acquittal they wanted');
    if (g.votes[pid] && (g.votes[pid] === 'guilty') === g.guilty) add(pid, 1, 'voted correctly');
  });

  Object.keys(deltas).forEach(pid => { room.players.get(pid).score += deltas[pid].total; });

  const nameOf = pid => (room.players.get(pid) || { name: '?' }).name;
  g.result = {
    convicted,
    guiltyVotes: gv,
    innocentVotes: iv,
    abstain,
    jurySize: g.jurors.length,
    truthGuilty: g.guilty,
    correct,
    timeline: g.atoms.map(a => ({ label: a.label, truth: a.truth, ex: a.ex, herring: a.herring })),
    votes: g.jurors.map(pid => ({ name: nameOf(pid), vote: g.votes[pid] || 'abstain' })),
    witnesses: g.witnesses.map(pid => {
      const h = g.hands[pid];
      return {
        name: nameOf(pid),
        archetype: h.archetype,
        motive: h.motive,
        facts: h.facts.map(f => {
          const e = g.record.find(r => r.id === f.id);
          return { text: f.text, kind: f.kind, status: e ? e.status : 'unused' };
        })
      };
    }),
    deltas: Object.fromEntries(Object.entries(deltas).map(([pid, d]) => [pid, d]))
  };
  setPhase(room, 'reveal', null);
}

function checkEarly(room) {
  const g = room.g;
  if (!g) return;
  const here = pid => { const p = room.players.get(pid); return p && isHere(p); };
  if (room.phase === 'read') {
    const all = Object.keys(g.hands).filter(here);
    if (all.length && all.every(pid => g.ready.has(pid))) advance(room);
  } else if (room.phase === 'cross') {
    const all = Object.keys(g.hands).filter(here);
    const n = all.filter(pid => g.done.has(pid)).length;
    if (all.length && n * 2 > all.length) advance(room);
  } else if (room.phase === 'stand') {
    const need = standers(room, g);
    if (need.every(pid => g.stand[pid])) advance(room);
  } else if (room.phase === 'verdict') {
    const need = g.jurors.filter(here);
    if (need.every(pid => g.votes[pid])) advance(room);
  }
}

/* ---------- actions ---------- */
const roleOf = (g, pid) =>
  !g ? null
    : pid === g.defId ? 'defendant'
      : pid === g.proId ? 'prosecutor'
        : pid === g.dfnId ? 'defense'
          : g.witnesses.includes(pid) ? 'witness'
            : g.jurors.includes(pid) ? 'juror' : 'spectator';

function applyExhibit(g, atomIdx) {
  const a = g.atoms[atomIdx];
  g.revealed.push({ atom: atomIdx });
  g.record.forEach(e => {
    if (e.atom === atomIdx && e.status === 'open') {
      e.status = e.kind === 'lie' ? 'contradicted' : 'confirmed';
      if (e.kind === 'lie') e.caught = true;
    }
  });
  return a;
}

function doTestify(room, pid, factId) {
  const g = room.g;
  if (room.phase !== 'cross') return 'Not the right time.';
  const hand = g.hands[pid];
  if (!hand || hand.role !== 'witness') return 'Only witnesses can go on the record.';
  const f = hand.facts.find(x => x.id === factId);
  if (!f) return 'No such fact.';
  if (g.record.some(e => e.id === f.id)) return 'Already on the record.';
  if (g.revealed.some(r => r.atom === f.atom)) return 'An exhibit already covers that topic.';
  const revealed = false;
  g.record.push({
    id: f.id,
    pid,
    atom: f.atom,
    text: f.text,
    kind: f.kind,
    status: revealed ? (f.kind === 'lie' ? 'contradicted' : 'confirmed') : 'open',
    caught: revealed && f.kind === 'lie'
  });
  broadcast(room);
  return null;
}

function doExhibit(room, pid, atomIdx) {
  const g = room.g;
  if (room.phase !== 'cross') return 'Exhibits can only be requested during cross-examination.';
  if (pid !== g.proId && pid !== g.dfnId) return 'Only the lawyers can request exhibits.';
  if (!(g.exhibitsLeft[pid] > 0)) return 'You are out of requests.';
  if (!g.atoms[atomIdx]) return 'No such exhibit.';
  if (g.revealed.some(r => r.atom === atomIdx)) return 'Already revealed.';
  g.exhibitsLeft[pid]--;
  const a = applyExhibit(g, atomIdx);
  const who = room.players.get(pid).name;
  room.players.forEach(p => { if (p.sid) io.to(p.sid).emit('notice', { text: `${who} requested: ${a.ex}`, kind: 'exhibit' }); });
  broadcast(room);
  return null;
}

function doWhisper(room, pid, to, text) {
  const g = room.g;
  if (room.phase !== 'read' && room.phase !== 'cross') return 'Whispers are closed.';
  const hand = g.hands[pid];
  if (!hand) return 'You are watching this round.';
  const target = room.players.get(to);
  if (!target || to === pid || !g.hands[to]) return 'Pick another player.';
  text = cleanText(text, 140);
  if (!text) return 'Write something first.';
  if ((g.whisperCount[pid] || 0) >= WHISPERS_PER_ROUND) return 'No whispers left.';
  g.whisperCount[pid] = (g.whisperCount[pid] || 0) + 1;
  const from = room.players.get(pid).name;
  (g.inbox[to] = g.inbox[to] || []).push({ from, text, t: Date.now() });
  (g.sent[pid] = g.sent[pid] || []).push({ to: target.name, text, t: Date.now() });
  if (target.sid) io.to(target.sid).emit('notice', { text: `Private note from ${from}`, kind: 'whisper' });
  broadcast(room);
  return null;
}

function doStand(room, pid, choice) {
  const g = room.g;
  if (room.phase !== 'stand') return 'Not the right time.';
  if (!standers(room, g).includes(pid)) return 'You have nothing on the record.';
  if (choice !== 'stand' && choice !== 'recant') return 'Pick stand or recant.';
  g.stand[pid] = choice;
  broadcast(room);
  checkEarly(room);
  return null;
}

function doVote(room, pid, choice) {
  const g = room.g;
  if (room.phase !== 'verdict' && room.phase !== 'stand') return 'Voting is not open.';
  if (!g.jurors.includes(pid)) return 'Only jurors can vote.';
  if (choice !== 'guilty' && choice !== 'innocent') return 'Pick a verdict.';
  if (room.phase === 'stand') g.prelim[pid] = choice; else g.votes[pid] = choice;
  broadcast(room);
  checkEarly(room);
  return null;
}

function doDone(room, pid) {
  const g = room.g;
  if (room.phase !== 'cross' || !g.hands[pid]) return 'Not the right time.';
  if (g.done.has(pid)) g.done.delete(pid); else g.done.add(pid);
  broadcast(room);
  checkEarly(room);
  return null;
}

function doReady(room, pid) {
  const g = room.g;
  if (room.phase !== 'read' || !g.hands[pid]) return 'Not the right time.';
  g.ready.add(pid);
  broadcast(room);
  checkEarly(room);
  return null;
}

/* ---------- bots (so one person can test alone) ---------- */
function botsOnPhase(room) {
  const g = room.g;
  if (!g) return;
  const phase = room.phase;
  const later = (fn, min, max) => setTimeout(() => {
    if (room.phase !== phase || room.g !== g) return;
    try { fn(); } catch (e) { /* ignore */ }
  }, (min + Math.random() * (max - min)) * 1000);

  room.players.forEach(p => {
    if (!p.bot || !g.hands[p.id]) return;
    const hand = g.hands[p.id];
    if (phase === 'read') later(() => doReady(room, p.id), 2, 7);
    if (phase === 'cross' && hand.role === 'witness') {
      hand.facts.forEach(f => {
        if (f.kind === 'lie' && Math.random() < 0.3) return;
        later(() => doTestify(room, p.id, f.id), 8, 40);
      });
    }
    if (phase === 'stand' && hand.role === 'witness') {
      later(() => {
        doStand(room, p.id, Math.random() < 0.12 ? 'recant' : 'stand');
      }, 3, 9);
    }
    if (phase === 'verdict' && g.jurors.includes(p.id)) {
      later(() => {
        let lean = 0;
        g.record.forEach(e => {
          if (e.status === 'contradicted') lean += 0; // a contradicted liar says little either way
        });
        const pGuilty = hand.want === 'convict' ? 0.8 : hand.want === 'acquit' ? 0.2 : 0.5;
        doVote(room, p.id, Math.random() < pGuilty ? 'guilty' : 'innocent');
      }, 4, 12);
    }
  });
}

/* ---------- views ---------- */
function publicRole(g, pid) {
  const r = roleOf(g, pid);
  return r === 'defendant' ? 'Defendant' : r === 'prosecutor' ? 'Prosecutor' : r === 'defense' ? 'Defense' : r === 'witness' ? 'Witness' : r === 'juror' ? 'Juror' : 'Spectator';
}

function privateHand(g, pid) {
  const h = g.hands[pid];
  if (!h) return null;
  if (h.role === 'witness') {
    return {
      role: 'witness',
      want: h.want,
      motive: h.motive,
      facts: h.facts.map(f => ({
        id: f.id,
        text: f.text,
        kind: f.kind,
        shown: g.revealed.some(r => r.atom === f.atom),
        onRecord: g.record.some(e => e.id === f.id && e.status !== 'recanted')
      }))
    };
  }
  if (h.role === 'juror') return { role: 'juror' };
  if (h.role === 'defendant') {
    const known = new Set(h.facts.map(f => f.atom));
    return {
      role: 'defendant', guilty: h.guilty,
      facts: h.facts.map(f => ({ id: f.id, text: f.text, topic: g.atoms[f.atom].label })),
      blind: g.atoms.filter(a => !known.has(a.idx)).map(a => a.label)
    };
  }
  return { role: h.role, lead: h.lead.text };
}

function view(room, pid) {
  const me = room.players.get(pid);
  const g = room.g;
  const host = room.players.get(room.hostId);
  const v = {
    serverNow: Date.now(),
    code: room.code,
    phase: room.phase,
    endsAt: room.endsAt,
    round: room.round,
    rounds: room.settings.rounds,
    settings: room.settings,
    minPlayers: MIN_PLAYERS,
    maxPlayers: MAX_PLAYERS,
    hostId: room.hostId,
    hostOnline: !!(host && isHere(host)),
    me: { id: pid, name: me.name, isHost: pid === room.hostId, score: me.score },
    players: [...room.players.values()].map(p => ({
      id: p.id,
      name: p.name,
      score: p.score,
      online: isHere(p),
      bot: p.bot,
      role: g && room.phase !== 'lobby' ? publicRole(g, p.id) : null
    }))
  };
  if (g && room.phase !== 'lobby' && room.phase !== 'final') {
    const here = id => { const p = room.players.get(id); return p && isHere(p); };
    v.role = roleOf(g, pid);
    v.case = { title: g.title, cat: g.cat, charge: g.charge, blurb: g.blurb };
    v.hand = privateHand(g, pid);
    v.record = g.record.map(e => ({
      id: e.id, pid: e.pid, name: room.players.get(e.pid).name, text: e.text, status: e.status
    }));
    v.exhibits = g.atoms.map(a => {
      const rev = g.revealed.some(r => r.atom === a.idx);
      return { atom: a.idx, name: a.ex, revealed: rev, text: rev ? a.truth : null };
    });
    v.exhibitsLeft = g.exhibitsLeft[pid] === undefined ? null : g.exhibitsLeft[pid];
    v.inbox = g.inbox[pid] || [];
    v.sent = g.sent[pid] || [];
    v.whispersLeft = WHISPERS_PER_ROUND - (g.whisperCount[pid] || 0);
    v.canWhisper = !!g.hands[pid];
    v.whisperTargets = Object.keys(g.hands).filter(id => id !== pid).map(id => ({ id, name: room.players.get(id).name }));
    const readyNeed = Object.keys(g.hands).filter(here);
    v.progress = {
      ready: readyNeed.filter(id => g.ready.has(id)).length,
      readyTotal: readyNeed.length,
      stand: standers(room, g).filter(id => g.stand[id]).length,
      standTotal: standers(room, g).length,
      done: Object.keys(g.hands).filter(here).filter(id => g.done.has(id)).length,
      doneTotal: Object.keys(g.hands).filter(here).length,
      voted: g.jurors.filter(id => here(id) && g.votes[id]).length,
      votedTotal: g.jurors.filter(here).length
    };
    v.ready = g.ready.has(pid);
    v.needStand = standers(room, g).includes(pid);
    v.stand = g.stand[pid] || null;
    v.vote = g.votes[pid] || null;
    v.prelim = g.prelim[pid] || null;
    v.canVote = g.jurors.includes(pid);
    v.done = g.done.has(pid);
    v.standPublic = g.standPublic;
    v.jurySize = g.jurors.length;
    v.result = room.phase === 'reveal' ? g.result : null;
  }
  return v;
}

function broadcast(room) {
  room.lastActive = Date.now();
  room.players.forEach(p => {
    if (p.sid) io.to(p.sid).emit('state', view(room, p.id));
  });
}

/* ---------- sockets ---------- */
io.on('connection', socket => {
  let ctx = { code: null, pid: null };
  const ok = (cb, extra) => typeof cb === 'function' && cb(Object.assign({ ok: true }, extra));
  const fail = (cb, error) => typeof cb === 'function' && cb({ ok: false, error });

  socket.on('create', (msg, cb) => {
    const name = cleanName(msg && msg.name);
    if (!name) return fail(cb, 'Enter a name first.');
    const room = makeRoom();
    const p = addPlayer(room, name, socket.id);
    room.hostId = p.id;
    ctx = { code: room.code, pid: p.id };
    ok(cb, { code: room.code, pid: p.id, token: p.token });
    broadcast(room);
  });

  socket.on('join', (msg, cb) => {
    const code = String((msg && msg.code) || '').toUpperCase().trim();
    const room = rooms.get(code);
    const name = cleanName(msg && msg.name);
    if (!room) return fail(cb, 'No room with that code.');
    if (!name) return fail(cb, 'Enter a name first.');
    if (room.players.size >= MAX_PLAYERS) return fail(cb, 'Room is full.');
    const p = addPlayer(room, name, socket.id);
    ctx = { code, pid: p.id };
    ok(cb, { code, pid: p.id, token: p.token });
    broadcast(room);
  });

  socket.on('rejoin', (msg, cb) => {
    const code = String((msg && msg.code) || '').toUpperCase().trim();
    const room = rooms.get(code);
    const tok = String((msg && msg.token) || '');
    const p = room && tok.length >= 16 ? [...room.players.values()].find(x => x.token === tok) : null;
    if (!room || !p) return fail(cb, 'Session expired.');
    p.sid = socket.id;
    p.connected = true;
    ctx = { code, pid: p.id };
    ok(cb, { code, pid: p.id, token: p.token });
    broadcast(room);
  });

  socket.on('act', (msg, cb) => {
    const room = rooms.get(ctx.code);
    if (!room || !room.players.has(ctx.pid)) return fail(cb, 'Not in a room.');
    room.lastActive = Date.now();
    const pid = ctx.pid;
    const isHost = pid === room.hostId;
    const need = (cond, text) => (cond ? null : text);
    let err = null;
    const t = msg && msg.type;

    switch (t) {
      case 'settings':
        err = need(isHost, 'Host only.') || need(room.phase === 'lobby' || room.phase === 'reveal', 'Not now.');
        if (!err) {
          const c = Number(msg.crossMins), r = Number(msg.rounds), vm = Number(msg.verdictMins);
          if ([3, 5, 8, 12, 15, 20, 30].includes(c)) room.settings.crossMins = c;
          if ([1, 2, 3, 5, 8].includes(vm)) room.settings.verdictMins = vm;
          if (r >= 1 && r <= 8) room.settings.rounds = r;
          broadcast(room);
        }
        break;
      case 'bots':
        err = need(isHost, 'Host only.') || need(room.phase === 'lobby', 'Bots can only join in the lobby.');
        if (!err) {
          const n = Math.max(1, Math.min(10, Number(msg.n) || 1));
          const bn = ['Ahmed', 'Bilal', 'Danish', 'Fatima', 'Hamza', 'Iqra', 'Junaid', 'Kiran', 'Maryam', 'Nabeel'];
          let i = [...room.players.values()].filter(p => p.bot).length;
          for (let k = 0; k < n && room.players.size < MAX_PLAYERS; k++, i++) addPlayer(room, bn[i % bn.length], null, true);
          broadcast(room);
        }
        break;
      case 'rename':
        err = need(room.phase === 'lobby' || room.phase === 'final', 'You can change your name in the lobby.');
        if (!err) {
          const nm = cleanName(msg.name);
          if (!nm) err = 'Enter a name.';
          else { room.players.get(pid).name = uniqueName(room, nm, pid); broadcast(room); }
        }
        break;
      case 'addseat':
        err = need(isHost, 'Host only.') || need(room.phase === 'lobby', 'Seats can only be added in the lobby.') || need(room.players.size < MAX_PLAYERS, 'Room is full.');
        if (!err) {
          const nm = cleanName(msg.name);
          if (!nm) err = 'Enter a name.';
          else { addPlayer(room, nm, null, true); broadcast(room); }
        }
        break;
      case 'clearbots':
        err = need(isHost, 'Host only.') || need(room.phase === 'lobby', 'Lobby only.');
        if (!err) {
          [...room.players.values()].filter(p => p.bot).forEach(p => room.players.delete(p.id));
          broadcast(room);
        }
        break;
      case 'kick':
        err = need(isHost, 'Host only.') || need(room.phase === 'lobby', 'Lobby only.');
        if (!err) {
          const p = room.players.get(msg.pid);
          if (p && p.id !== room.hostId) {
            if (p.sid) io.to(p.sid).emit('kicked');
            room.players.delete(p.id);
            broadcast(room);
          }
        }
        break;
      case 'claimHost': {
        const h = room.players.get(room.hostId);
        err = need(!(h && isHere(h)), 'Host is still here.');
        if (!err) { room.hostId = pid; broadcast(room); }
        break;
      }
      case 'start':
        err = need(isHost, 'Host only.') || need(room.phase === 'lobby', 'Already started.') || startRound(room);
        break;
      case 'skip':
        err = need(isHost, 'Host only.') || need(['read', 'cross', 'stand', 'verdict'].includes(room.phase), 'Nothing to skip.');
        if (!err) advance(room);
        break;
      case 'next':
        err = need(isHost, 'Host only.') || need(room.phase === 'reveal', 'Not now.');
        if (!err) {
          if (room.round >= room.settings.rounds) { setPhase(room, 'final', null); }
          else err = startRound(room);
        }
        break;
      case 'final':
        err = need(isHost, 'Host only.') || need(room.phase === 'reveal', 'Not now.');
        if (!err) setPhase(room, 'final', null);
        break;
      case 'newgame':
        err = need(isHost, 'Host only.') || need(room.phase === 'final' || room.phase === 'reveal', 'Not now.');
        if (!err) {
          clearTimeout(room.timer);
          room.round = 0;
          room.g = null;
          room.usedCases = [];
          room.players.forEach(p => { p.score = 0; p.specials = 0; });
          setPhase(room, 'lobby', null);
        }
        break;
      case 'done': err = room.g ? doDone(room, pid) : 'No round.'; break;
      case 'ready': err = room.g ? doReady(room, pid) : 'No round.'; break;
      case 'testify': err = room.g ? doTestify(room, pid, msg.id) : 'No round.'; break;
      case 'exhibit': err = room.g ? doExhibit(room, pid, Number(msg.atom)) : 'No round.'; break;
      case 'whisper': err = room.g ? doWhisper(room, pid, msg.to, msg.text) : 'No round.'; break;
      case 'stand': err = room.g ? doStand(room, pid, msg.choice) : 'No round.'; break;
      case 'vote': err = room.g ? doVote(room, pid, msg.choice) : 'No round.'; break;
      default: err = 'Unknown action.';
    }
    if (err) return fail(cb, err);
    ok(cb);
  });

  socket.on('disconnect', () => {
    const room = rooms.get(ctx.code);
    const p = room && room.players.get(ctx.pid);
    if (!p || p.sid !== socket.id) return;
    p.connected = false;
    p.sid = null;
    broadcast(room);
    checkEarly(room);
  });
});

// Clean up rooms nobody has touched in 6 hours.
setInterval(() => {
  const now = Date.now();
  rooms.forEach((room, code) => {
    if (now - room.lastActive > 6 * 3600 * 1000) { clearTimeout(room.timer); rooms.delete(code); }
  });
}, 10 * 60 * 1000);

server.listen(PORT, () => console.log(`The Stand is running on port ${PORT}`));
