'use strict';
/*
  20 offline cases. No AI, no API, no cost.

  Every fact (atom) is written three ways:
    g = true if the defendant did it
    i = true if the defendant is innocent
    p = a vague version that is true in both worlds
  The server flips a coin for guilty/innocent, so the truth text is one version and a
  lie is the other. That keeps every case consistent. {D} becomes the defendant's name.
  Rule when editing: inside one version (all g, or all i) nothing may contradict anything else.
*/

const A = (label, ex, g, i, p) => ({ label, ex, g, i, p });

module.exports = [
  /* 1 */
  {
    title: 'The Vanishing Payroll',
    cat: 'Embezzlement',
    charge: '{D} is accused of embezzling $48,000 from the payroll account at Halvorsen & Pike.',
    blurb: 'Three transfers drained the payroll account in one night. Halvorsen & Pike had to borrow money to pay its staff. {D} works in the finance department.',
    atoms: [
      A('The transfers', 'IT access log',
        "The transfers were made from {D}'s own login, at 11:52 pm, from inside the office.",
        "The transfers came from the shared finance terminal. {D}'s badge shows them leaving the building at 6 pm.",
        'The transfers were made late at night from inside the building.'),
      A('The money trail', 'Bank trace report',
        "Part of the money landed in an account opened in the name of {D}'s sister.",
        'The money went to a shell vendor that was registered by someone else in accounting.',
        "The money went to an account that wasn't one of the company's usual vendors."),
      A('Spending', "{D}'s purchase records",
        '{D} bought a used boat the following week and paid cash.',
        '{D} had been saving for a car for a year, and a $3,000 purchase came from those savings.',
        '{D} made a sizeable purchase recently.'),
      A('Alibi', 'Cleaner log and receipts',
        '{D} was seen in the finance office after 11 pm by the night cleaner.',
        '{D} was at a restaurant across town until midnight. The receipt is timestamped 11:48 pm.',
        'Someone was in the finance office late, but nobody can say who.'),
      A('Access', 'Passcode audit',
        'Only {D} and the CFO knew the override passcode, and the CFO was abroad that week.',
        'The override passcode was written on a sticky note. At least five people knew it.',
        'A handful of people had access to the override passcode.'),
      A('Motive', 'HR file',
        '{D} had just been passed over for a promotion and told a colleague, "They owe me."',
        '{D} had just accepted a raise and was upbeat about the year ahead.',
        '{D} had strong feelings about the recent promotion round.')
    ]
  },

  /* 2 */
  {
    title: 'The Harbour Road Incident',
    cat: 'Hit and run',
    charge: '{D} is accused of hitting a cyclist on Harbour Road at about 10:15 pm and driving away without stopping.',
    blurb: 'The cyclist, Marcus Webb, is in hospital with a broken pelvis. A dark sedan left the scene. {D} owns a dark sedan.',
    atoms: [
      A('The car', 'Forensic paint report',
        "Paint transfer on Marcus's bike matches {D}'s car, and the front bumper has a fresh dent.",
        "The paint on the bike is a common factory colour. {D}'s car has no fresh damage, and the old dent came from a supermarket trolley two months ago.",
        'A dark sedan was involved, and a lot of dark sedans are registered in this area.'),
      A('The camera', 'Traffic camera log',
        "A traffic camera shows {D}'s plate on Harbour Road at 10:11 pm.",
        "A traffic camera shows {D}'s plate on the ring road, miles from Harbour Road, at 10:09 pm.",
        'A camera picked up several dark sedans in the area that evening.'),
      A('The bar', 'Bar tab and receipts',
        '{D} left a bar at 9:50 pm after four drinks, according to the bartender.',
        '{D} was at the same bar but drank sparkling water and left at 9:30 pm with a friend.',
        '{D} was at a bar that evening.'),
      A('The morning after', 'Service and car wash records',
        'A car wash attendant says {D} came in at 7 am the next day and asked for a rush on the front end.',
        "{D}'s car was at a garage the next morning for an oil change booked weeks earlier.",
        "{D}'s car was at a service business the next morning."),
      A('The phone', 'Phone records',
        '{D} phoned their brother at 10:22 pm. The call lasted four minutes, and the brother says {D} sounded shaken.',
        "{D}'s phone shows a video call with a coworker from 10:20 to 10:50 pm, taken from home.",
        '{D} was on the phone around the time of the incident.'),
      A('The statement', 'First police statement and records',
        "When police first called, {D} said they hadn't driven that night. Fuel receipts show otherwise.",
        "When police first called, {D} said they had been home by 10:30 pm and stayed in. The home security log backs that up.",
        "{D}'s first statement to police is being disputed.")
    ]
  },

  /* 3 */
  {
    title: 'Project Lantern',
    cat: 'Corporate espionage',
    charge: '{D} is accused of leaking designs of the unreleased Lantern speaker to the rival company Orbis Audio.',
    blurb: "Orbis launched a near-identical product six weeks before Brightwave's own launch. Brightwave estimates it lost $2 million. {D} is a senior engineer there.",
    atoms: [
      A('The files', 'IT access log',
        "The design files were copied to a USB drive from {D}'s workstation at 7:15 pm.",
        "The design files were copied off the build server by an admin account. {D}'s workstation shows no copying.",
        'The design files were copied from inside the company network.'),
      A('The emails', 'Email archive',
        '{D} emailed a personal account three times with attachments named "lantern_v3".',
        'The only emails {D} sent to a personal account were meal-plan spreadsheets.',
        '{D} sent some emails to a personal address.'),
      A('The meeting', 'Cafe photo and receipts',
        "{D} met Orbis's head of product at a cafe, shown in a photo timestamped March 3.",
        '{D} was at that cafe on March 3 meeting a career coach, not anyone from Orbis.',
        '{D} was seen with someone at a cafe.'),
      A('The deposit', 'Bank statements',
        '{D} received a $15,000 deposit from a consulting shell company two weeks later.',
        "A $15,000 deposit in {D}'s account was the sale of a vintage motorcycle, with a bill of sale.",
        "{D}'s bank account showed a large deposit around that time."),
      A('The prototype room', 'Facilities and keycard logs',
        'The prototype room needs two keycards. {D} and the lead engineer both swiped, and the engineer says {D} asked to borrow theirs.',
        "The prototype room's card reader was broken that week and the door was propped open for maintenance.",
        'Several people could physically get to the prototype room.'),
      A('The grudge', 'Staff meeting minutes',
        '{D} told two coworkers the founder "doesn\'t deserve this product."',
        '{D} publicly defended the founder in a staff meeting a week earlier.',
        "{D} had opinions about the founder's leadership.")
    ]
  },

  /* 4 */
  {
    title: 'The Aldous Estate',
    cat: 'Forgery',
    charge: "{D} is accused of forging Eleanor Aldous's final will to inherit her house.",
    blurb: "Eleanor died in March. A new will, dated two weeks before her death, leaves the house to {D} instead of the family trust. The rest of the family says it's fake.",
    atoms: [
      A('The signature', 'Handwriting analysis',
        "A handwriting expert says the signature on the new will was traced, with pen pressure that doesn't match Eleanor's tremor.",
        "A handwriting expert says the signature fits Eleanor's late-life handwriting, tremor included.",
        'Experts disagree about how clean the signature looks.'),
      A('The signing', 'Witness affidavits',
        'Both witnesses named on the will say they never saw Eleanor sign anything.',
        'One named witness remembers watching Eleanor sign at her kitchen table and can describe the pen.',
        "The named witnesses' memories of that day are patchy."),
      A('The visits', 'Care home visitor logs',
        'Care home logs show {D} visited alone four times in her last two weeks, always after hours.',
        'Care home logs show {D} visited twice in her last two weeks, both times with another relative present.',
        '{D} visited Eleanor at the care home in her final weeks.'),
      A('The paper', 'Document forensics',
        "The will was printed on a printer found in {D}'s apartment, on the same paper as a draft in {D}'s drawer.",
        "The paper matches the supplies at the lawyer's office, and {D}'s printer uses a different font.",
        "The will's paper and font are common and easy to buy."),
      A('The lawyer', "Lawyer's file notes",
        "Eleanor's lawyer says she never asked for changes and never met {D}.",
        "Eleanor's lawyer says she called a week before her death to change her will and mentioned {D} by name.",
        "The lawyer's records for that month are incomplete."),
      A('The money', 'Credit report',
        '{D} owed $22,000, with a final demand letter dated that month.',
        '{D} had no serious debts and had turned down money from Eleanor before.',
        "{D}'s finances were a mix of good and bad.")
    ]
  },

  /* 5 */
  {
    title: 'Fire at Marigold Bistro',
    cat: 'Arson',
    charge: '{D}, owner of Marigold Bistro, is accused of setting fire to the restaurant to collect the insurance money.',
    blurb: 'The restaurant burned down at 2 am on a Tuesday. Investigators found the kitchen fire door wedged open. {D} received an advance on the insurance claim.',
    atoms: [
      A('The fire', 'Fire investigator report',
        'The fire investigator found traces of accelerant near the back storeroom, which has no cooking equipment.',
        'The fire investigator traced the fire to faulty wiring in a fryer and found no accelerant.',
        "The fire investigator's report is technical and hard to read."),
      A('The phone', 'Phone tower records',
        "{D}'s phone connected to a tower a mile from the restaurant at 1:40 am.",
        "{D}'s phone stayed on a tower across the city all night, near a relative's apartment.",
        "{D}'s phone was somewhere in the area around that time."),
      A('The policy', 'Insurance file',
        'The fire coverage was doubled by {D} three weeks earlier, and {D} asked the insurer how fast a claim pays.',
        'The policy renewed on its normal schedule, and the insurer suggested the increase.',
        "{D}'s insurance changed this year."),
      A('The books', 'Accounts and loan documents',
        'Marigold Bistro was three months behind on rent and had a bank loan in default.',
        'Marigold Bistro had recently turned a profit and was about to open a second location.',
        "Marigold Bistro's finances were under review."),
      A('The camera', 'Security system logs',
        'The security camera was unplugged at 12:55 am. Only {D} and the manager had the key to the panel.',
        'The security camera had been failing for weeks, with a repair ticket filed before the fire.',
        'The security system did not record the fire.'),
      A('The staff', 'Staff interviews',
        'A line cook says {D} told everyone to take their valuables home that evening.',
        'A line cook says {D} was last seen leaving at 11 pm to visit a sick relative.',
        'Staff remember {D} acting differently that last evening.')
    ]
  },

  /* 6 */
  {
    title: 'The Meridian Star',
    cat: 'Jewel theft',
    charge: '{D}, head of security at the Ashcroft Foundation gala, is accused of stealing the 40-carat Meridian Star diamond necklace.',
    blurb: 'The necklace sat in a glass case for the charity auction. At 9:40 pm the lights went out for ninety seconds. When they came back the case was empty. The guests were searched. The necklace was not on any of them.',
    atoms: [
      A('The blackout', 'Electrical logs',
        "The lights were cut from the panel in the service corridor, and the panel latch carries {D}'s fingerprints.",
        'The blackout came from an overloaded stage lighting rig. Nobody touched the service panel.',
        'The lights went out for about ninety seconds.'),
      A('The case', 'Display case report',
        'The case was opened with a master key, and only {D} and the venue manager held one.',
        "The case lock was picked with a tool. Both master keys were locked in the manager's office all night.",
        'The case was opened without any glass being broken.'),
      A('The loading dock', 'CCTV footage',
        '{D} appears on camera at the loading dock at 9:44 pm carrying a small black bag that was not there earlier.',
        'The camera shows {D} in the ballroom doorway at 9:44 pm, radioing for someone to fix the lights.',
        'The loading dock camera captured people moving about during the blackout.'),
      A('The radio', 'Radio log',
        "{D} sent the other guards to the east entrance at 9:36 pm, four minutes before the blackout.",
        '{D} called every guard back to the ballroom the moment the lights failed.',
        "The guards' positions changed around the time of the theft."),
      A('The call', 'Phone records',
        '{D} spent twenty minutes on the phone with a known jewel fence two days earlier.',
        '{D} spoke to a jeweller two days earlier about alarm quotes for the jeweller\'s own shop.',
        '{D} phoned a jewellery dealer in the days before the gala.'),
      A('The locker', 'Locker search',
        "A hollowed-out book in {D}'s locker held a velvet pouch from the same maker as the necklace's case.",
        "{D}'s locker held only a spare uniform. A velvet pouch found on the ballroom floor was traced to a guest.",
        'Investigators searched the lockers and the ballroom floor.')
    ]
  },

  /* 7 */
  {
    title: 'The Nut-Free Cake',
    cat: 'Sabotage',
    charge: '{D}, the best man, is accused of deliberately putting peanut oil in the wedding cake, sending four allergic guests to hospital.',
    blurb: 'The cake was ordered nut-free. Four guests with allergies were rushed to hospital during the reception. All recovered. The groom believes someone wanted to wreck the day. {D} gave the toast.',
    atoms: [
      A('The cake table', 'Venue photos',
        'Photos show {D} alone at the cake table at 6:15 pm while the caterers were on break.',
        'Photos show the cake table unattended from 6 to 6:30 pm with a dozen guests passing through. {D} is not in any of them.',
        'The cake sat unattended for a short time before the reception.'),
      A('The oil', 'Lab analysis',
        "The oil is cold-pressed peanut oil, sold in only one shop in town, where {D} has a loyalty card.",
        "The oil is refined peanut oil from the caterer's own fryer supplies, stored in the same tent.",
        'The lab found the oil in the sponge, not in the icing.'),
      A('The group chat', 'Group chat export',
        'In the groomsmen chat, {D} wrote "this wedding is a mistake" and was told off by the groom.',
        'In the groomsmen chat, {D} was organising a surprise toast and swapping jokes with the groom the night before.',
        'The groomsmen chat was busy in the days before the wedding.'),
      A('The slice', 'Video of the reception',
        'On video, {D} refuses a slice when handed one and says "I\'m full."',
        'On video, {D} eats a slice and is among those who feel ill soon afterwards.',
        'The video shows the cake being cut and handed out at 8 pm.'),
      A('The kitchen tent', 'Caterer statement',
        'The caterer says {D} walked into the kitchen tent and asked where the cake was kept.',
        "The caterer says the only uninvited visitor to the kitchen tent was a guest's teenager looking for the bathroom.",
        'The caterer says someone entered the kitchen tent that afternoon.'),
      A('The bride', 'Messages and letters',
        'Messages show {D} was secretly in love with the bride and had drafted a letter admitting it.',
        'Messages show {D} introduced the couple and was the loudest supporter of the match.',
        '{D} has a long history with the bride and groom.')
    ]
  },

  /* 8 */
  {
    title: 'Full Time',
    cat: 'Match fixing',
    charge: '{D}, goalkeeper for Redbridge FC, is accused of deliberately letting in goals in a cup quarter-final for a betting syndicate.',
    blurb: 'Redbridge lost 4-0 to a side they were expected to beat. Odd bets on the exact score were flagged an hour before kickoff. {D} played in goal.',
    atoms: [
      A('The goals', 'Match analysis',
        'Analysts say three of the four goals were saves {D} should have made, with {D} diving the wrong way before the shot.',
        'Analysts say the goals came from two deflections, a penalty and a defensive error. {D} made seven good saves.',
        'Analysts disagree about how many goals could have been saved.'),
      A('The bets', 'Betting records',
        "The flagged bets came from an account linked to {D}'s cousin.",
        'The flagged bets came from a syndicate account abroad, linked to no one at the club.',
        'One group placed large bets on the exact score.'),
      A('The phone call', 'Phone records',
        "An unregistered phone called {D}'s number twice the night before the match.",
        "{D}'s phone had no unusual calls. The flagged calls were to the assistant coach.",
        'Calls were made to someone at the club the night before.'),
      A('The warm-up', 'Training staff report',
        'The goalkeeping coach says {D} skipped the warm-up and seemed oddly calm, reading messages in the tunnel.',
        'The goalkeeping coach says {D} warmed up fully and was nervous, because the first-choice keeper was injured.',
        'The goalkeeping coach described how {D} acted before kickoff.'),
      A('The car', 'Vehicle records',
        '{D} paid cash for a new car three days after the match.',
        '{D} has leased the same car for two years.',
        "{D}'s car came up in the investigation."),
      A('Half-time', 'Teammate interviews',
        'Two teammates say {D} told them at half-time, "Don\'t worry about this one."',
        'Two teammates say {D} was shouting at the defence at half-time and furious about the first two goals.',
        'Teammates remember what {D} said at half-time.')
    ]
  },

  /* 9 */
  {
    title: 'Trial 7B',
    cat: 'Research fraud',
    charge: '{D}, lead researcher at the Calloway Institute, is accused of faking results in a drug trial so the sponsor would renew its funding.',
    blurb: 'A whistleblower says the results for the drug Vireol were too good to be true. Patients were put on the drug because of those numbers. {D} led the study.',
    atoms: [
      A('The raw data', 'Data audit',
        "The original spreadsheets were edited after the final lock, with 41 values changed from {D}'s account.",
        'The edits after the lock came from an automated cleaning script run by the data team. Nothing was changed by hand.',
        'The data files were modified after the study ended.'),
      A('The patients', 'Clinic records',
        'Three trial patients say they never attended the follow-up visits recorded in their names.',
        'Every patient interviewed confirms their follow-up visits. One misremembered a date.',
        'Patients were interviewed about their follow-up visits.'),
      A('The contract', 'Funding contract',
        "The contract included a bonus for {D}'s lab if the drug passed 60 percent efficacy.",
        "The contract paid {D}'s lab the same fee whatever the result.",
        'The funding contract set out how the lab would be paid.'),
      A('The warning', 'Email archive',
        'A junior researcher emailed {D} about odd numbers. {D} replied "leave it with me" and deleted the thread.',
        'A junior researcher emailed {D} about odd numbers. {D} ordered a re-run the same day and thanked them.',
        'A junior researcher flagged a concern about the numbers.'),
      A('The notebooks', 'Lab notebooks',
        "Notebook pages for weeks 9 to 11 are missing, torn out near {D}'s bench.",
        'The notebooks for weeks 9 to 11 are intact. They were scanned and filed in the archive room.',
        'The investigators examined the lab notebooks.'),
      A('The resignation', 'HR records',
        "{D} drafted a resignation letter the week before the whistleblower came forward.",
        '{D} had just been promoted and signed a five-year renewal with the Institute.',
        "{D}'s position at the Institute was changing.")
    ]
  },

  /* 10 */
  {
    title: 'Camp Four',
    cat: 'Negligence',
    charge: '{D}, an expedition guide, is accused of abandoning client Rafael Duarte at 7,900 metres, leaving him to die on the mountain.',
    blurb: 'Rafael Duarte died on the descent from Cho Ramo. Three other climbers made it home. {D} led the team and radioed that Rafael had "gone ahead alone." His family wants answers.',
    atoms: [
      A('The radio call', 'Radio log',
        'At 2:10 pm Rafael radioed that he could not walk. {D} answered, "Keep moving, we\'ll wait at camp."',
        "At 2:10 pm Rafael radioed that he felt fine and was pressing on to the summit alone, against {D}'s order.",
        'Rafael made a radio call from the upper slope that afternoon.'),
      A('The oxygen', 'Supply inventory',
        'Two full oxygen bottles were still in the camp depot when {D} descended. They were meant for Rafael.',
        'Both spare bottles were empty. A leak in the depot tent drained them overnight.',
        'Oxygen was stored in the high camp depot.'),
      A('The weather', 'Weather service data',
        'The forecast warned of a storm from 3 pm, and {D} pushed on to the summit anyway to satisfy the clients.',
        'The forecast showed a clear window until 6 pm. The storm arrived three hours early.',
        'A storm hit the mountain on summit day.'),
      A('The rope', 'Climber statements',
        "Two climbers say {D} untied from Rafael's rope to catch up with the faster group.",
        'Two climbers say Rafael unclipped from the rope himself after arguing with {D} about the turnaround time.',
        'Rafael and {D} had been roped together earlier in the climb.'),
      A('The sat phone', 'Satellite phone logs',
        'The sat phone shows {D} called the expedition company at 4 pm and reported "no problems."',
        'The sat phone shows {D} called the rescue service at 4 pm and asked for a helicopter.',
        'The sat phone was used to make a call that afternoon.'),
      A('The company', 'Expedition company papers',
        "{D}'s bonus depended on every client summiting, and the company had cut {D}'s pay twice that year.",
        "{D}'s pay was a flat fee. The company's rules required a 1 pm turnaround, and {D} had a clean safety record.",
        "{D}'s pay arrangement with the company was reviewed.")
    ]
  },

  /* 11 */
  {
    title: 'The Bronze Fox',
    cat: 'Museum theft',
    charge: '{D}, curator at the Harcourt Museum, is accused of swapping the 2,000-year-old Bronze Fox for a replica and selling the original to a private collector.',
    blurb: "The Bronze Fox, the museum's star piece, turned out to be a modern copy during a routine inspection. The real one is missing. {D} has looked after it for nine years.",
    atoms: [
      A('The metal', 'Lab analysis',
        "The copy carries a foundry mark from a workshop {D} visited as a consultant last year.",
        'The copy has no foundry mark. Its fake age was made with chemicals sold by any craft supplier.',
        'The replica is a high-quality copy.'),
      A('The loan', 'Exhibit loan records',
        'The Fox left the building for six days in March "for conservation," signed out by {D} alone.',
        'The Fox left for three days in March for conservation, signed out by {D} and witnessed by the registrar.',
        'The Fox left the museum for conservation work at some point this year.'),
      A('The alarm', 'Alarm records',
        "The alarm on the Fox's case was disarmed at 7 am on a Sunday using {D}'s code.",
        "The alarm on the Fox's case was disarmed on a Sunday using the code of a retired guard whose account was never closed.",
        'The alarm on the display case was switched off outside opening hours.'),
      A('The collector', 'Letters and emails',
        'A private collector, Lucian Verhoeven, wrote to {D} twice offering "a number that would change your life."',
        'A private collector, Lucian Verhoeven, wrote to the museum director twice. {D} was copied only to give advice on the piece.',
        'A private collector wrote to the museum about the Fox.'),
      A('The mortgage', 'Financial records',
        '{D} paid off a mortgage in full two months after the Fox left for conservation.',
        '{D} received an inheritance from an aunt, confirmed by the lawyer, shortly after the Fox left for conservation.',
        "{D}'s finances changed in the spring."),
      A('The inspection', 'Inspection notes',
        'The inspector noted that {D} called in sick on the day the Fox was due to be examined.',
        'The inspector noted that {D} had asked for the inspection and was waiting at the door when it began.',
        'The inspector recorded who attended on the day.')
    ]
  },

  /* 12 */
  {
    title: 'Ballot Box 12',
    cat: 'Election fraud',
    charge: "{D}, returning officer for the Elmbrook Residents' Association, is accused of stuffing the ballot box so a friend would win the chair.",
    blurb: 'The vote for chair was won by 31 votes. Afterwards, 58 more ballots were counted than members had signed in. {D} ran the count.',
    atoms: [
      A('The sign-in sheet', 'Sign-in sheet',
        "Pages of the sign-in sheet were rewritten in a second pen, in handwriting resembling {D}'s.",
        'The sign-in sheet is in a single hand. The 58 extra ballots came from a second table that was never logged.',
        'The sign-in sheet did not match the number of ballots.'),
      A('The seal', 'Box inspection',
        'The ballot box seal was cut and replaced with one from a stationery shop where {D} is a regular.',
        'The seal was intact. The box has a false bottom left over from a previous year that nobody noticed.',
        'The ballot box was inspected afterwards.'),
      A('The winner', 'Messages and social media',
        "The winner, Dolores Pike, is {D}'s oldest friend and texted the day before: \"You won't regret this.\"",
        'The winner, Dolores Pike, barely knows {D} and argued with {D} about parking rules last year.',
        'The winner and {D} know each other.'),
      A('The count', 'Observer statements',
        'Two observers say {D} counted alone in the back room for forty minutes with the door closed.',
        'Two observers say they watched the whole count through the glass door and {D} never touched a ballot without a witness.',
        'The count took place in a room off the main hall.'),
      A('The folder', 'Hall camera',
        'The hall camera shows {D} carrying a folder of loose papers in from the car park before polls opened.',
        'The hall camera shows {D} arriving with only a coffee and a clipboard.',
        "The hall camera recorded {D}'s arrival."),
      A('The neutrality', 'Association minutes',
        '{D} said in a meeting that the old chair "needs to go" and was warned for breaking neutrality rules.',
        '{D} insisted on strict neutrality and reported two members for campaigning.',
        '{D} spoke in meetings about the election.')
    ]
  },

  /* 13 */
  {
    title: 'Ward Nine',
    cat: 'Drug diversion',
    charge: '{D}, a hospital pharmacist, is accused of stealing 600 tablets of a controlled painkiller from Ward Nine to sell.',
    blurb: 'An audit found 600 tablets missing over four months. A night nurse was suspended first, then cleared. The hospital wants to know who really had access. {D} did.',
    atoms: [
      A('The count', 'Audit report',
        'The shortages happen only on shifts when {D} did the stock count alone.',
        'The shortages happened on all shifts and began after the cabinet software was updated.',
        'The audit found the shortages in the cabinet count.'),
      A('The cabinet', 'Cabinet access log',
        "The cabinet was opened with {D}'s fingerprint at 3:12 am on four nights when {D} was not rostered.",
        "The log shows {D}'s fingerprint only on rostered shifts. Off-shift opens used a shared override code.",
        'The cabinet was opened at times when nobody was scheduled.'),
      A('The waste', 'Disposal records',
        'Waste records show {D} signed for tablet destruction without the second witness the policy requires.',
        'Every destruction was signed by {D} and a second witness, always the same nurse.',
        'Waste records for controlled drugs were reviewed.'),
      A('The car park', 'Security footage',
        'Footage shows a stranger meeting {D} in the car park twice and handing over an envelope.',
        'Footage shows {D} meeting a courier in the car park to collect a box of textbooks.',
        'Security footage shows {D} meeting someone in the car park.'),
      A('The locker', 'Locker search',
        "A lunch box with a false bottom in {D}'s locker held blister packs from the ward.",
        "{D}'s locker held only personal items. The blister packs were in a locker belonging to a technician who has since left.",
        'A locker search turned up something of interest.'),
      A('The deposits', 'Bank records',
        '{D} made cash deposits just under $10,000, four times in four months.',
        "{D}'s bank statements show only the hospital salary.",
        "{D}'s bank statements were examined.")
    ]
  },

  /* 14 */
  {
    title: 'The Vasko Letters',
    cat: 'Blackmail',
    charge: '{D}, assistant to City Councillor Imre Vasko, is accused of sending blackmail letters demanding $30,000 to keep the councillor\'s private life secret.',
    blurb: "Three typed letters, posted in three different districts, threatened to leak the councillor's secrets. He paid once and then went to the police. Only a few people knew the secrets, and {D} was one of them.",
    atoms: [
      A('The letters', 'Print forensics',
        "The letters were printed on the model of printer used in the councillor's office, and one carries a smudge from {D}'s desk stamp.",
        'The letters were printed on a common office printer sold in thousands of shops. There is no smudge or mark.',
        'The letters were typed and printed, not handwritten.'),
      A('The postmarks', 'Post office records',
        'Each postmark matches a district {D} visited that day for council business.',
        'Each postmark is in a district where the office access logs place {D} at a desk.',
        'The letters were posted from three different districts.'),
      A('The secret', "Councillor's statement",
        "Only {D} and the councillor's driver knew the detail about the Linden Street apartment.",
        'At least eight people, including two journalists, knew the detail about the Linden Street apartment.',
        'The letters referred to a private detail about the councillor.'),
      A('The drop', 'Drop-off camera',
        "A camera at the drop-off bin shows a figure in {D}'s distinctive green coat collecting the envelope.",
        'A camera at the drop-off bin shows a figure in a hooded black coat. {D} owns no such coat and was on a work call.',
        'A camera caught a person collecting the envelope.'),
      A('The pay', 'Staff records',
        '{D} had been denied a pay rise three times and was overheard saying the councillor "can afford it."',
        '{D} was given a raise last spring and is described by colleagues as loyal.',
        '{D} had a running conversation with the councillor about pay.'),
      A('The prepaid card', 'Bank enquiry',
        "The prepaid card used for the payment was topped up in a shop near {D}'s home.",
        "The prepaid card was topped up in a shop in a district {D} has never visited.",
        'Investigators traced the prepaid card used after the payment.')
    ]
  },

  /* 15 */
  {
    title: 'The Karlovac Open',
    cat: 'Chess cheating',
    charge: '{D} is accused of using a hidden chess engine to win the Karlovac Open and its $20,000 prize.',
    blurb: 'An unrated {D} beat three grandmasters in four days. Rivals say the moves looked like a computer. After the final, an organiser found a small electronic device in the venue bathroom.',
    atoms: [
      A('The moves', 'Engine comparison',
        "Over 80 percent of {D}'s moves match the engine's top choice, even in positions where a human would hesitate.",
        '{D} played sharp openings prepared with a coach, which match engine lines. In the middlegame {D} made several very human mistakes.',
        "Analysts compared {D}'s moves with a chess engine."),
      A('The breaks', 'Venue footage',
        '{D} left the board and went to the bathroom within a minute of every hard position, 11 times in 4 days.',
        '{D} took four ordinary bathroom breaks, always early in the game, and paced the corridor to calm down.',
        '{D} left the playing hall during games.'),
      A('The device', 'Device forensics',
        "The device found in the bathroom carries {D}'s fingerprint and pairs with an earpiece found in {D}'s bag.",
        "The device found in the bathroom has no fingerprints, and no earpiece was found in {D}'s bag.",
        'A small electronic device was found in the venue.'),
      A('The scan', 'Arbiter report',
        'Before round 5 an arbiter asked to scan {D}, who refused and called it insulting.',
        'Before round 5 {D} volunteered for a scan and was cleared by the arbiter.',
        'An arbiter raised the question of scanning players before round 5.'),
      A('The cousin', 'Messages',
        "Messages show {D}'s cousin, a software developer, sent \"link is live\" the night before round 1.",
        "Messages show {D}'s cousin, a software developer, sent only good-luck wishes.",
        '{D} was in touch with a relative about the tournament.'),
      A('The rating', 'Rating history',
        "{D}'s online rating rose 400 points in three months, with games played only at 2 am.",
        "{D}'s online rating rose steadily over two years, across all hours, and the local club confirms the training.",
        "{D}'s rating rose before the tournament.")
    ]
  },

  /* 16 */
  {
    title: 'Drop Table',
    cat: 'Data sabotage',
    charge: "{D}, systems administrator at Tern Logistics, is accused of wiping the company's customer database on the night of resigning.",
    blurb: 'Tern Logistics lost its order database and two days of backups. Deliveries stopped for a week. {D} had handed in notice the day before.',
    atoms: [
      A('The command', 'Server logs',
        "The delete command was run from {D}'s admin account at 11:03 pm over the remote VPN.",
        'The delete command was run from a shared service account that anyone with the password could use, from an outside address.',
        'The deletion was run with administrator rights.'),
      A('The login', 'VPN records',
        "The VPN login at 11:00 pm came from {D}'s home address.",
        'The VPN login came from a foreign address. {D} was on a flight over the Atlantic.',
        'The VPN login came from outside the office.'),
      A('The backups', 'Backup system logs',
        "The backups were deleted first, one day earlier, using {D}'s credentials.",
        'The backup system had been misconfigured months before by a contractor, so the backups never ran properly.',
        'The backups were unavailable when needed.'),
      A('The notice', 'HR file',
        '{D} resigned angrily after being passed over and told a colleague, "They\'ll regret it."',
        '{D} resigned to take a better job on good terms and left a detailed handover document.',
        '{D} resigned the day before the incident.'),
      A('The new job', 'Email archive',
        'The new employer is a direct rival, and {D} emailed them a "customer list sample" last month.',
        'The new employer is a bank, not a competitor. {D} sent them only an updated CV.',
        '{D} was about to join another company.'),
      A('The laptop', 'Device forensics',
        "{D}'s returned laptop was factory-reset that same night, wiping any evidence.",
        "{D}'s returned laptop was intact and shows no connection after 5 pm.",
        "{D}'s company laptop was returned and examined.")
    ]
  },

  /* 17 */
  {
    title: 'Salt Water',
    cat: 'Stolen song',
    charge: '{D}, a record producer, is accused of stealing the melody of the hit "Salt Water" from songwriter Anika Rowe and taking sole credit.',
    blurb: '"Salt Water" has 400 million streams. Anika Rowe says she wrote the melody in a studio session and was cut out. {D} is credited as sole writer and producer.',
    atoms: [
      A('The demo', 'File metadata',
        "A demo file dated eight months before the studio session holds the full melody and came from Anika's laptop.",
        "The earliest file with the melody is {D}'s project from the session. Anika's demo has only chords.",
        'Early recordings of the song exist from before its release.'),
      A('The booking', 'Studio logbook',
        'The studio logbook shows Anika booked three days with {D}, and her name was crossed out afterwards.',
        "The studio logbook shows Anika booked one afternoon, mostly for another artist's track.",
        'The studio logbook lists Anika at the studio.'),
      A('The texts', 'Message history',
        '{D} texted Anika, "I\'ll sort the credits out later," before release and never replied again.',
        '{D} texted Anika an offer of shared credit and a fee. Anika turned it down in writing.',
        '{D} and Anika exchanged messages around the release.'),
      A('The engineer', 'Engineer statement',
        'The sound engineer says Anika sang the melody and {D} only added the drums.',
        'The sound engineer says {D} sang the melody first and Anika added a harmony.',
        'The sound engineer was present at the sessions.'),
      A('The old song', 'Musicology report',
        'A musicologist finds the melody nearly identical to an unreleased song Anika posted privately two years ago.',
        "A musicologist finds the melody close to {D}'s earlier work and a folk tune in the public domain.",
        'A musicologist compared the melody with earlier works.'),
      A('The money', 'Royalty statements',
        "All royalties go to {D}'s company, and {D} has refused an audit twice.",
        'Royalties are split among four collaborators, and {D} has invited an audit.',
        'Royalty statements exist for the song.')
    ]
  },

  /* 18 */
  {
    title: 'The Golden Meridian',
    cat: 'Casino scam',
    charge: '{D}, a blackjack dealer at the Golden Meridian casino, is accused of helping a team of players win $410,000 over six weeks.',
    blurb: "A group of players kept winning at {D}'s table. Surveillance flagged the pattern after a manager noticed the dealing looked a bit too friendly. {D} says the players were lucky.",
    atoms: [
      A('The signals', 'Surveillance video',
        'Video shows {D} tilting the top card a fraction before players doubled down.',
        'Video shows ordinary dealing. The odd flicks were the card shoe being nudged by a loose cutting card.',
        "Surveillance reviewed {D}'s dealing on the nights in question."),
      A('The players', 'Player records',
        "Three of the winners rented rooms in the same apartment block as {D}.",
        'The winners are professional card counters who play many casinos and have no link to {D}.',
        'The winning players are known to the casino.'),
      A('The shuffle', 'Shoe inspection',
        "The shuffle machine at {D}'s table was bypassed on 11 shifts, against the rules.",
        'The shuffle machine was used every shift, but a software fault left the last cards in order.',
        'The shuffle machine at the table was inspected.'),
      A('The tips', 'Tip logs',
        'The winners tipped {D} an unusual $1,200 a night, paid in chips.',
        "{D}'s tips were ordinary and matched other dealers.",
        'Tip records were compared across dealers.'),
      A('The rotation', 'Manager statement',
        'The floor manager says {D} ignored two direct orders to rotate tables.',
        'The floor manager says {D} asked twice to be rotated and was told to stay.',
        "The floor manager commented on {D}'s table assignments."),
      A('The savings', 'Interview transcript',
        'In the interview {D} could not explain a $9,000 deposit in a savings account.',
        'In the interview {D} showed the sale of a van that explained a $9,000 deposit.',
        '{D} was interviewed about personal finances.')
    ]
  },

  /* 19 */
  {
    title: 'Kilometre 31',
    cat: 'Race cheating',
    charge: '{D} is accused of cutting the course in the Lakeshore Marathon to win by four minutes and break the course record.',
    blurb: "{D} won in 2:18, a new course record, from nowhere. Rivals say {D} wasn't seen at the 31 km checkpoint. Prize money and a sponsor deal followed.",
    atoms: [
      A('The timing mats', 'Timing data',
        'The chip data show no reading at the 31 km mat and a 27-minute gap between 28 km and 35 km, impossible at that pace.',
        'The chip data show a missing reading at 31 km because the mat was faulty. Every other split is steady.',
        'The timing data have a gap near 31 km.'),
      A('The photos', 'Race photographers',
        'A photo at 33 km shows {D} fresh and dry, in different clothes than at 30 km.',
        'Photos at 30, 33 and 36 km show {D} in the same kit, getting more tired.',
        'Photographers captured {D} at several points on the route.'),
      A('The side path', 'Marshal statements',
        'A marshal says a cyclist matching {D} joined the route from a side path near the old boathouse.',
        'A marshal says a runner in a different colour joined from the side path. {D} was seen in the main pack.',
        'A marshal saw someone join from a side path.'),
      A('The watch', 'GPS watch file',
        "{D}'s GPS watch file shows a straight line across the lake road, eight kilometres at cycling speed.",
        "{D}'s GPS watch file shows the full 42.2 km at steady running pace.",
        "{D}'s GPS watch file was submitted."),
      A('The pacer', 'Pacer statement',
        'The official pacer says {D} was nowhere in sight after 30 km and then appeared at 35 km looking fresh.',
        'The official pacer says {D} ran with the group until 36 km and pulled ahead on the hill.',
        'The pacer reported on the second half of the race.'),
      A('The sponsor', 'Contract and emails',
        '{D} signed a $60,000 sponsor deal tied to a course record, with a clause worded to the exact winning time.',
        '{D} had no sponsor before the race. The offer came afterwards, unprompted.',
        'A sponsor deal followed the race.')
    ]
  },

  /* 20 */
  {
    title: 'Container 4471',
    cat: 'Smuggling',
    charge: '{D}, a port customs officer, is accused of waving through a shipping container of smuggled goods in return for payment.',
    blurb: "Container 4471 cleared the port without inspection and later turned out to hold $3 million of counterfeit electronics. The paperwork carries {D}'s stamp. {D} says it was routine.",
    atoms: [
      A('The stamp', 'Customs paperwork',
        'The clearance stamp was applied at 6:50 am, just before {D}\'s shift ended, with the inspection box left blank.',
        'The clearance stamp was applied at 6:50 am using a stamp kept in a shared drawer used by three officers.',
        'The container was cleared with a customs stamp.'),
      A('The flag', 'Cargo system logs',
        "The cargo system flagged the container as high risk. The flag was overridden under {D}'s login.",
        'The cargo system never flagged the container as high risk.',
        'The cargo system held a risk score for the container.'),
      A('The importer', 'Company registry',
        "The importer is a shell company registered by {D}'s brother-in-law.",
        'The importer is a long-standing company owned by a businessman unconnected to anyone at the port.',
        'The importer is a registered company.'),
      A('The cash', 'Bank records',
        "Four cash deposits of $8,000 appeared in {D}'s account after the container arrived.",
        "{D}'s account shows no unusual deposits, only salary and a tax refund.",
        "{D}'s bank account was examined by investigators."),
      A('The inspector', 'Duty rota',
        'The officer who was supposed to inspect the container was sent home sick on an excuse arranged by {D}.',
        'The officer who was supposed to inspect the container went home sick on their own, and the shift was short-staffed.',
        'The officer scheduled for the inspection was not at work that morning.'),
      A('The tip-off', 'Phone records',
        '{D} took a call from an unregistered number two hours before the container was cleared.',
        '{D} took only calls from the port office and a family member that morning.',
        "{D}'s phone records for that morning were reviewed.")
    ]
  }
];

/*
  Red herrings. In every game two of these facts (one if a case lists only one) are
  swapped to the opposite version, so some real evidence points the wrong way. That is
  what stops a single exhibit from deciding the whole verdict.
  Only circumstantial facts are listed (motive, money, behaviour). Never list a fact that
  could contradict the rest of the case when flipped.
*/
const FLIP = {
  'The Vanishing Payroll': ['Spending', 'Motive'],
  'The Harbour Road Incident': ['The bar', 'The morning after'],
  'Project Lantern': ['The grudge', 'The meeting', 'The deposit'],
  'The Aldous Estate': ['The money', 'The visits'],
  'Fire at Marigold Bistro': ['The books', 'The staff', 'The policy'],
  'The Meridian Star': ['The call', 'The radio'],
  'The Nut-Free Cake': ['The group chat', 'The bride'],
  'Full Time': ['The car', 'Half-time', 'The warm-up'],
  'Trial 7B': ['The contract', 'The resignation'],
  'Camp Four': ['The company'],
  'The Bronze Fox': ['The mortgage', 'The inspection', 'The collector'],
  'Ballot Box 12': ['The neutrality', 'The winner'],
  'Ward Nine': ['The deposits', 'The car park'],
  'The Vasko Letters': ['The pay', 'The secret'],
  'The Karlovac Open': ['The cousin', 'The rating'],
  'Drop Table': ['The notice', 'The new job'],
  'Salt Water': ['The money', 'The texts'],
  'The Golden Meridian': ['The tips', 'The savings', 'The rotation'],
  'Kilometre 31': ['The sponsor'],
  'Container 4471': ['The cash', 'The importer', 'The tip-off']
};
module.exports.forEach(c => c.atoms.forEach(a => { a.flip = (FLIP[c.title] || []).indexOf(a.label) >= 0; }));
