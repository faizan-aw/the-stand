# The Stand

A courtroom game for 6 to 16 people (best with 8 or more), played from phones in the same room. Nothing to install, no accounts, no running costs. Everyone joins from a link or QR code.

## Option A: put it online for free (Render)

You do this once. After that the same link works every game night.

1. Unzip this folder on a laptop or PC.
2. Make a free account on github.com. Click the + at the top right, then New repository. Name it `the-stand`, leave it Public, click Create repository.
3. On the new empty repo page click "uploading an existing file". Drag in everything from inside the unzipped folder (the `public` folder, `server.js`, `cases.js`, `package.json`, `package-lock.json`, `render.yaml`, `README.md`, `.gitignore`). Do not upload a `node_modules` folder. Click Commit changes.
4. Make a free account on render.com (use "Sign in with GitHub"). Click New, then Web Service, and pick the `the-stand` repo.
5. Settings: Runtime Node, Build Command `npm install`, Start Command `npm start`, Instance Type **Free**. Click Create Web Service.
6. Wait 3 to 5 minutes until it says Live. Your link is at the top left, like `https://the-stand-xxxx.onrender.com`.

Open that link on your phone, enter your name, tap Create a room. The room screen shows a code, a QR code and a Share button. Friends scan the QR with their camera (or open the link and type the code), enter a name and they are in.

Notes about the free plan:
- The server sleeps after 15 minutes with nobody connected. The first load after that can take up to a minute. Open the link a few minutes before everyone arrives. While people are playing it stays awake.
- If Render restarts the server in the middle of a game (it can do this at any time on the free plan), the game resets and everyone lands back on the first screen. Start a new room.
- It gets 750 free hours a month, which is plenty.

## Option B: no hosting, same wifi

If everyone is in the same room on the same wifi, you can run it on your own computer.

1. Install Node.js from nodejs.org (the LTS version).
2. In this folder run `npm install`, then `npm start`.
3. Find your computer's wifi address (Windows: `ipconfig`, look for IPv4 Address. Mac: System Settings, Wi-Fi, Details).
4. On every phone open `http://THAT-ADDRESS:3000`, for example `http://192.168.1.23:3000`. The room QR code will then also point there.

## Putting it on the home screen

There is nothing to download. To get an icon like an app:
- iPhone: open the link in Safari, tap Share, then Add to Home Screen.
- Android: open the link in Chrome, tap the three dots, then Add to Home screen (or Install app).

## Testing alone

In the lobby the host can add test bots, or add a seat under any name. Those seats read, testify, stand or recant, and vote on their own.

## How a case works

- One player is the defendant, one the prosecutor, one the defense. Everyone else is either a witness (holds private facts) or a juror (no file, listens and votes). From 7 players the jury is separate; with fewer, or if the host turns it off, the witnesses are the jury too. Roles rotate every case.
- Time settings (host, in the lobby): cross-examination 3 to 30 minutes, jury talk and vote 1 to 8 minutes. Everyone can tap the Done button, and if more than half do, the game moves on without waiting for the timer.
- Every case has a hidden truth: guilty or innocent, picked at random. Most of the real evidence points the right way, but two facts per case are red herrings that point the wrong way, so one exhibit never settles a case.
- Witnesses get private facts. Some are honest, some have a secret reason to lean one way, some are liars with a cover story.
- Cross-examination is out loud. Witnesses put facts on the record, lawyers have 2 exhibit requests each, and anyone can send 3 private whispers.
- Then witnesses stand by or recant, and the jury votes. Conviction needs more than half the jury, so a tie is not guilty. After the verdict the truth, the liars and everyone's secret motives are revealed.
- The full rules, including scoring, are inside the game under the Rules button.

## The cases

20 hand-written cases set in Pakistan (Karachi, Lahore, Islamabad, Rawalpindi, Multan) are built into `cases.js`. No AI, no internet service, no cost. A game never repeats a case until all 20 have been used.

## Adding or editing cases

Each case in `cases.js` has a category, a charge, a short blurb and six facts. Each fact has a version that is true if the defendant did it (g), one that is true if they are innocent (i), and a vague one that is true either way (p). Facts listed in the `FLIP` table near the bottom can be used as red herrings, so only list facts that cannot contradict the rest of the case in either version. Run a quick check after editing: `node -e "require('./cases')"`.
