'use strict';
/*
  20 offline cases set in Pakistan. No AI, no API, no cost.

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
    title: `The Missing Salaries`,
    cat: `Embezzlement`,
    charge: `{D} is accused of embezzling Rs 48 lakh from the salary account of Rehman Textiles in Korangi, Karachi.`,
    blurb: `Three transfers drained the salary account in one night. Rehman Textiles had to borrow money to pay its workers before Eid. {D} works in the accounts department.`,
    atoms: [
      A(`The transfers`, `IT access log`,
        `The transfers were made from {D}'s own login, at 11:52 pm, from inside the factory office.`,
        `The transfers came from the shared accounts computer. {D}'s gate pass shows {D} leaving the factory at 6 pm.`,
        `The transfers were made late at night from inside the factory.`),
      A(`The money trail`, `Bank trace report`,
        `Part of the money landed in an account opened in the name of {D}'s sister.`,
        `The money went to a fake supplier registered by someone else in the accounts department.`,
        `The money went to an account that was not one of the company's usual suppliers.`),
      A(`Spending`, `Purchase records`,
        `{D} bought a new car the following week and paid most of it in cash.`,
        `{D} had been paying into a committee (BC) for a year, and the Rs 3 lakh purchase came from the payout.`,
        `{D} made a sizeable purchase recently.`),
      A(`Alibi`, `Chowkidar register and receipts`,
        `{D} was seen in the accounts office after 11 pm by the night chowkidar.`,
        `{D} was at a restaurant on Burns Road until midnight. The bill is timestamped 11:48 pm.`,
        `Someone was in the accounts office late, but nobody can say who.`),
      A(`Access`, `PIN audit`,
        `Only {D} and the finance director knew the bank override PIN, and the director was abroad that week.`,
        `The override PIN was written on a sticky note near the monitor. At least five people knew it.`,
        `A handful of people had access to the override PIN.`),
      A(`Motive`, `HR file`,
        `{D} had just been passed over for a promotion and told a colleague, "They owe me."`,
        `{D} had just received an increment and was upbeat about the year ahead.`,
        `{D} had strong feelings about the recent promotion round.`)
    ]
  },

  /* 2 */
  {
    title: `The Canal Road Incident`,
    cat: `Hit and run`,
    charge: `{D} is accused of hitting a motorcyclist on Canal Road, Lahore, at about 10:15 pm and driving away without stopping.`,
    blurb: `The motorcyclist, Usman Ghani, is in Services Hospital with a broken pelvis. A white sedan left the scene. {D} owns a white sedan.`,
    atoms: [
      A(`The car`, `Forensic paint report`,
        `Paint transfer on Usman's motorbike matches {D}'s car, and the front bumper has a fresh dent.`,
        `The paint on the bike is a common factory white. {D}'s car has no fresh damage, and the old dent came from a rickshaw two months ago.`,
        `A white sedan was involved, and a lot of white sedans are registered in Lahore.`),
      A(`The camera`, `Safe City camera log`,
        `A Safe City camera shows {D}'s number plate on Canal Road at 10:11 pm.`,
        `A Safe City camera shows {D}'s number plate on the Ring Road, miles from Canal Road, at 10:09 pm.`,
        `A camera picked up several white sedans in the area that evening.`),
      A(`The dinner`, `Restaurant bill and staff statement`,
        `{D} left a restaurant at 9:50 pm in a rush, with the bill half paid, according to the waiter.`,
        `{D} was at the same restaurant but left calmly at 9:30 pm with a friend.`,
        `{D} was at a restaurant that evening.`),
      A(`The morning after`, `Workshop and car wash records`,
        `A car wash attendant says {D} came in at 7 am the next day and asked for a rush job on the front end.`,
        `{D}'s car was at a workshop the next morning for an oil change booked weeks earlier.`,
        `{D}'s car was at a service business the next morning.`),
      A(`The phone`, `Phone records`,
        `{D} phoned their brother at 10:22 pm. The call lasted four minutes, and the brother says {D} sounded shaken.`,
        `{D}'s phone shows a WhatsApp video call with a coworker from 10:20 to 10:50 pm, taken from home.`,
        `{D} was on the phone around the time of the incident.`),
      A(`The statement`, `First police statement and records`,
        `When police first called, {D} said they had not driven that night. Petrol pump receipts show otherwise.`,
        `When police first called, {D} said they had been home by 10:30 pm and stayed in. The society's guard register backs that up.`,
        `{D}'s first statement to police is being disputed.`)
    ]
  },

  /* 3 */
  {
    title: `Project Roshni`,
    cat: `Corporate espionage`,
    charge: `{D} is accused of leaking the designs of the unreleased Roshni solar inverter to the rival company Zarkon Power.`,
    blurb: `Zarkon launched a near-identical inverter six weeks before Tabish Energy's own launch in Lahore. Tabish estimates it lost Rs 20 crore. {D} is a senior engineer there.`,
    atoms: [
      A(`The files`, `IT access log`,
        `The design files were copied to a USB drive from {D}'s workstation at 7:15 pm.`,
        `The design files were copied off the main server by an admin account. {D}'s workstation shows no copying.`,
        `The design files were copied from inside the company network.`),
      A(`The emails`, `Email archive`,
        `{D} emailed a personal Gmail account three times with attachments named "roshni_v3".`,
        `The only emails {D} sent to a personal account were family wedding guest lists.`,
        `{D} sent some emails to a personal address.`),
      A(`The meeting`, `Cafe photo and receipts`,
        `{D} met Zarkon's head of product at a cafe in DHA, shown in a photo timestamped March 3.`,
        `{D} was at that cafe on March 3 meeting a career coach, not anyone from Zarkon.`,
        `{D} was seen with someone at a cafe.`),
      A(`The deposit`, `Bank statements`,
        `{D} received a Rs 15 lakh deposit from a consulting company that exists only on paper, two weeks later.`,
        `A Rs 15 lakh deposit in {D}'s account was the sale of {D}'s share in a family plot, with registry papers.`,
        `{D}'s bank account showed a large deposit around that time.`),
      A(`The prototype lab`, `Facilities and swipe-card logs`,
        `The prototype lab needs two cards. {D} and the lead engineer both swiped, and the engineer says {D} asked to borrow theirs.`,
        `The prototype lab's card reader was broken that week and the door was propped open for the electrician.`,
        `Several people could physically get to the prototype lab.`),
      A(`The grudge`, `Staff meeting minutes`,
        `{D} told two coworkers the founder "doesn't deserve this product."`,
        `{D} publicly defended the founder in a staff meeting a week earlier.`,
        `{D} had opinions about the founder's leadership.`)
    ]
  },

  /* 4 */
  {
    title: `The Haveli Deed`,
    cat: `Forgery`,
    charge: `{D} is accused of forging the gift deed of Haji Rasheed Ahmed's old haveli in Multan to take the house for themselves.`,
    blurb: `Haji Rasheed passed away in March. A gift deed, dated two weeks before his death, leaves the haveli to {D} instead of the family. The rest of the family says it is fake.`,
    atoms: [
      A(`The signature`, `Handwriting analysis`,
        `A handwriting expert says the signature on the deed was traced, with pen pressure that does not match Haji Rasheed's tremor.`,
        `A handwriting expert says the signature fits Haji Rasheed's late-life handwriting, tremor included.`,
        `Experts disagree about how clean the signature looks.`),
      A(`The signing`, `Witness statements`,
        `Both witnesses named on the deed say they never saw Haji Rasheed sign anything.`,
        `One named witness remembers watching Haji Rasheed sign at his hospital bed and can describe the pen.`,
        `The named witnesses' memories of that day are patchy.`),
      A(`The visits`, `Hospital visitor register`,
        `The hospital register shows {D} visited alone four times in Haji Rasheed's last two weeks, always outside visiting hours.`,
        `The hospital register shows {D} visited twice in Haji Rasheed's last two weeks, both times with another relative present.`,
        `{D} visited Haji Rasheed in hospital in the final weeks.`),
      A(`The stamp paper`, `Document forensics`,
        `The deed was typed on a printer found in {D}'s office, and the stamp paper was bought by {D} from a vendor outside the Multan courts.`,
        `The stamp paper was bought by the advocate's clerk, and {D}'s printer uses a different font.`,
        `The deed's stamp paper and font are common and easy to buy.`),
      A(`The advocate`, `Advocate's file notes`,
        `Haji Rasheed's advocate says he never asked for any change and never met {D}.`,
        `Haji Rasheed's advocate says he called a week before his death to change the deed and mentioned {D} by name.`,
        `The advocate's records for that month are incomplete.`),
      A(`The debts`, `Credit and loan records`,
        `{D} owed Rs 25 lakh, with a final notice from a lender dated that month.`,
        `{D} had no serious debts and had refused money from Haji Rasheed before.`,
        `{D}'s finances were a mix of good and bad.`)
    ]
  },

  /* 5 */
  {
    title: `Fire at Dera Biryani House`,
    cat: `Arson`,
    charge: `{D}, owner of Dera Biryani House in Karachi, is accused of setting fire to the restaurant to collect the insurance money.`,
    blurb: `The restaurant burned down at 2 am on a Tuesday. Investigators found the kitchen's back shutter wedged open. {D} received an advance on the insurance claim.`,
    atoms: [
      A(`The fire`, `Fire brigade investigator report`,
        `The fire brigade found traces of petrol near the back storeroom, which has no cooking equipment.`,
        `The fire brigade traced the fire to faulty wiring behind the UPS and found no petrol.`,
        `The fire brigade's report is technical and hard to read.`),
      A(`The phone`, `Phone tower records`,
        `{D}'s phone connected to a tower a kilometre from the restaurant at 1:40 am.`,
        `{D}'s phone stayed on a tower across the city all night, near a relative's house.`,
        `{D}'s phone was somewhere in the city around that time.`),
      A(`The policy`, `Insurance file`,
        `The fire coverage was doubled by {D} three weeks earlier, and {D} asked the insurer how fast a claim pays.`,
        `The policy renewed on its normal schedule, and the insurance agent suggested the increase.`,
        `{D}'s insurance changed this year.`),
      A(`The books`, `Accounts and loan documents`,
        `Dera Biryani House was three months behind on rent and had a bank loan in default.`,
        `Dera Biryani House had recently turned a profit and was about to open a second branch.`,
        `Dera Biryani House's finances were under review.`),
      A(`The camera`, `DVR and security logs`,
        `The CCTV recorder (DVR) was switched off at 12:55 am. Only {D} and the manager had the key to its cabinet.`,
        `The CCTV recorder had been failing for weeks, with a repair complaint filed before the fire.`,
        `The CCTV system did not record the fire.`),
      A(`The staff`, `Staff interviews`,
        `A cook says {D} told everyone to take their belongings home that evening.`,
        `A cook says {D} was last seen leaving at 11 pm to visit a sick relative.`,
        `Staff remember {D} acting differently that last evening.`)
    ]
  },

  /* 6 */
  {
    title: `The Noor Jahan Emerald`,
    cat: `Jewel theft`,
    charge: `{D}, head of security at the Sahara Foundation charity dinner in Lahore, is accused of stealing the Noor Jahan emerald necklace.`,
    blurb: `The necklace sat in a glass case for the charity auction. At 9:40 pm the power went out for ninety seconds while the generator took over. When the lights came back the case was empty. The guests were searched. The necklace was not on any of them.`,
    atoms: [
      A(`The blackout`, `Electrical logs`,
        `The power was cut from the main panel in the service corridor, and the panel latch carries {D}'s fingerprints.`,
        `The blackout came from the generator changeover failing under the load. Nobody touched the service panel.`,
        `The power went out for about ninety seconds.`),
      A(`The case`, `Display case report`,
        `The case was opened with a master key, and only {D} and the venue manager held one.`,
        `The case lock was picked with a tool. Both master keys were locked in the manager's office all night.`,
        `The case was opened without any glass being broken.`),
      A(`The service gate`, `CCTV footage`,
        `{D} appears on camera at the service gate at 9:44 pm carrying a small black bag that was not there earlier.`,
        `The camera shows {D} in the banquet hall doorway at 9:44 pm, calling for someone to fix the power.`,
        `The service gate camera captured people moving about during the blackout.`),
      A(`The walkie-talkie`, `Walkie-talkie log`,
        `{D} sent the other guards to the east entrance at 9:36 pm, four minutes before the blackout.`,
        `{D} called every guard back to the hall the moment the power failed.`,
        `The guards' positions changed around the time of the theft.`),
      A(`The call`, `Phone records`,
        `{D} spent twenty minutes on the phone with a dealer known for buying stolen jewellery two days earlier.`,
        `{D} spoke to a Sarafa Bazaar jeweller two days earlier about CCTV quotes for the jeweller's own shop.`,
        `{D} phoned a jewellery dealer in the days before the dinner.`),
      A(`The locker`, `Locker search`,
        `A hollowed-out book in {D}'s locker held a velvet pouch from the same maker as the necklace's case.`,
        `{D}'s locker held only a spare uniform. A velvet pouch found on the hall floor was traced to a guest.`,
        `Investigators searched the lockers and the hall floor.`)
    ]
  },

  /* 7 */
  {
    title: `The Nut-Free Wedding Cake`,
    cat: `Sabotage`,
    charge: `{D}, the groom's closest friend, is accused of deliberately putting peanut oil in the walima cake, sending four allergic guests to hospital.`,
    blurb: `The cake was ordered nut-free from a Saddar bakery. Four guests with allergies were rushed to hospital during the dinner. All recovered. The groom believes someone wanted to wreck the day. {D} gave the toast.`,
    atoms: [
      A(`The cake table`, `Venue photos`,
        `Photos show {D} alone at the cake table at 6:15 pm while the caterers were on a tea break.`,
        `Photos show the cake table unattended from 6 to 6:30 pm with a dozen guests passing through. {D} is not in any of them.`,
        `The cake sat unattended for a short time before the dinner.`),
      A(`The oil`, `Lab analysis`,
        `The oil is cold-pressed peanut oil, sold in only one shop in the area, where {D} is a regular customer.`,
        `The oil is refined peanut oil from the caterer's own cooking supplies, stored in the same tent.`,
        `The lab found the oil in the sponge, not in the icing.`),
      A(`The group chat`, `WhatsApp group export`,
        `In the friends' WhatsApp group, {D} wrote "this is a mistake" about the wedding and was told off by the groom.`,
        `In the friends' WhatsApp group, {D} was organising a surprise toast and swapping jokes with the groom the night before.`,
        `The friends' WhatsApp group was busy in the days before the wedding.`),
      A(`The slice`, `Video of the dinner`,
        `On video, {D} refuses a slice when handed one and says "I'm full."`,
        `On video, {D} eats a slice and is among those who feel ill soon afterwards.`,
        `The video shows the cake being cut and handed out at 8 pm.`),
      A(`The kitchen tent`, `Caterer statement`,
        `The caterer says {D} walked into the kitchen tent and asked where the cake was kept.`,
        `The caterer says the only uninvited visitor to the kitchen tent was a guest's teenager looking for a washroom.`,
        `The caterer says someone entered the kitchen tent that afternoon.`),
      A(`The rishta`, `Messages`,
        `Messages show {D} opposed the match from the start and drafted a message begging the groom to call off the rishta.`,
        `Messages show {D} helped arrange the rishta and was the loudest supporter of the match.`,
        `{D} has a long history with the bride and groom.`)
    ]
  },

  /* 8 */
  {
    title: `The Quarter-Final`,
    cat: `Match fixing`,
    charge: `{D}, opening bowler for the Gulshan Lions, is accused of deliberately giving away runs in an inter-city T20 quarter-final for a betting syndicate.`,
    blurb: `The Lions lost by 38 runs to a side they were expected to beat. Odd bets on a single over were flagged an hour before the toss. {D} bowled the 14th over, which went for 22 runs.`,
    atoms: [
      A(`The over`, `Match analysis`,
        `Analysts say the 14th over was full of wides and half-volleys, and {D} ignored the captain's field setting.`,
        `Analysts say the 22 runs came from two edges that flew for four, a no-ball and one mishit six. {D} bowled the rest of the spell tightly.`,
        `Analysts disagree about how much of the 14th over was avoidable.`),
      A(`The bets`, `Betting records`,
        `The flagged bets came from a bookie's account linked to {D}'s cousin.`,
        `The flagged bets came from a syndicate abroad, linked to no one at the club.`,
        `One group placed large bets on that single over.`),
      A(`The phone call`, `Phone records`,
        `An unregistered number called {D}'s phone twice the night before the match.`,
        `{D}'s phone had no unusual calls. The flagged calls were to the assistant coach.`,
        `Calls were made to someone at the club the night before.`),
      A(`The warm-up`, `Coaching staff report`,
        `The bowling coach says {D} skipped the warm-up and seemed oddly calm, reading messages in the dressing room.`,
        `The bowling coach says {D} warmed up fully and was nervous, because the first-choice bowler was injured.`,
        `The bowling coach described how {D} acted before the match.`),
      A(`The car`, `Vehicle records`,
        `{D} paid cash for a new car three days after the match.`,
        `{D} has been driving the same car on a bank lease for two years.`,
        `{D}'s car came up in the investigation.`),
      A(`The innings break`, `Teammate interviews`,
        `Two teammates say {D} told them at the innings break, "Don't worry about this one."`,
        `Two teammates say {D} was shouting at the fielders at the innings break and was furious about how many runs were leaking.`,
        `Teammates remember what {D} said at the innings break.`)
    ]
  },

  /* 9 */
  {
    title: `Trial 7B`,
    cat: `Research fraud`,
    charge: `{D}, lead researcher at the Indus Institute of Medical Research in Karachi, is accused of faking results in a drug trial so the sponsor would renew its funding.`,
    blurb: `A whistleblower says the results for the drug Reliva were too good to be true. Patients were put on the drug because of those numbers. {D} led the study.`,
    atoms: [
      A(`The raw data`, `Data audit`,
        `The original spreadsheets were edited after the final lock, with 41 values changed from {D}'s account.`,
        `The edits after the lock came from an automated cleaning script run by the data team. Nothing was changed by hand.`,
        `The data files were modified after the study ended.`),
      A(`The patients`, `Clinic records`,
        `Three trial patients say they never attended the follow-up visits recorded in their names.`,
        `Every patient interviewed confirms their follow-up visits. One misremembered a date.`,
        `Patients were interviewed about their follow-up visits.`),
      A(`The contract`, `Funding contract`,
        `The contract included a bonus for {D}'s lab if the drug passed 60 percent efficacy.`,
        `The contract paid {D}'s lab the same fee whatever the result.`,
        `The funding contract set out how the lab would be paid.`),
      A(`The warning`, `Email archive`,
        `A junior researcher emailed {D} about odd numbers. {D} replied "leave it with me" and deleted the thread.`,
        `A junior researcher emailed {D} about odd numbers. {D} ordered a re-run the same day and thanked them.`,
        `A junior researcher flagged a concern about the numbers.`),
      A(`The notebooks`, `Lab notebooks`,
        `Notebook pages for weeks 9 to 11 are missing, torn out near {D}'s bench.`,
        `The notebooks for weeks 9 to 11 are intact. They were scanned and filed in the archive room.`,
        `The investigators examined the lab notebooks.`),
      A(`The resignation`, `HR records`,
        `{D} drafted a resignation letter the week before the whistleblower came forward.`,
        `{D} had just been promoted and signed a five-year renewal with the Institute.`,
        `{D}'s position at the Institute was changing.`)
    ]
  },

  /* 10 */
  {
    title: `Camp Four`,
    cat: `Negligence`,
    charge: `{D}, an expedition guide from Skardu, is accused of abandoning client Arslan Mir at 7,900 metres on Broad Peak, leaving him to die on the mountain.`,
    blurb: `Arslan Mir died on the descent from Broad Peak. Three other climbers made it home. {D} led the team for Karakoram Trails and radioed that Arslan had "gone ahead alone." His family wants answers.`,
    atoms: [
      A(`The radio call`, `Radio log`,
        `At 2:10 pm Arslan radioed that he could not walk. {D} answered, "Keep moving, we'll wait at camp."`,
        `At 2:10 pm Arslan radioed that he felt fine and was pressing on to the summit alone, against {D}'s order.`,
        `Arslan made a radio call from the upper slope that afternoon.`),
      A(`The oxygen`, `Supply inventory`,
        `Two full oxygen bottles were still in the camp depot when {D} descended. They were meant for Arslan.`,
        `Both spare bottles were empty. A leak in the depot tent drained them overnight.`,
        `Oxygen was stored in the high camp depot.`),
      A(`The weather`, `Met Department data`,
        `The forecast warned of a storm from 3 pm, and {D} pushed on to the summit anyway to satisfy the clients.`,
        `The forecast showed a clear window until 6 pm. The storm arrived three hours early.`,
        `A storm hit the mountain on summit day.`),
      A(`The rope`, `Climber statements`,
        `Two climbers say {D} untied from Arslan's rope to catch up with the faster group.`,
        `Two climbers say Arslan unclipped from the rope himself after arguing with {D} about the turnaround time.`,
        `Arslan and {D} had been roped together earlier in the climb.`),
      A(`The sat phone`, `Satellite phone logs`,
        `The sat phone shows {D} called the Karakoram Trails office in Skardu at 4 pm and reported "no problems."`,
        `The sat phone shows {D} called the rescue coordination office in Islamabad at 4 pm and asked for a helicopter.`,
        `The sat phone was used to make a call that afternoon.`),
      A(`The company`, `Expedition company papers`,
        `{D}'s bonus depended on every client summiting, and the company had cut {D}'s pay twice that year.`,
        `{D}'s pay was a flat fee. The company's rules required a 1 pm turnaround, and {D} had a clean safety record.`,
        `{D}'s pay arrangement with the company was reviewed.`)
    ]
  },

  /* 11 */
  {
    title: `The Gandhara Head`,
    cat: `Heritage theft`,
    charge: `{D}, curator at the Lahore Heritage Museum, is accused of swapping the 1,800-year-old Gandhara stone head for a replica and selling the original to a private collector.`,
    blurb: `The Gandhara Head, the museum's star piece, turned out to be a modern copy during a routine inspection. The real one is missing. {D} has looked after it for nine years.`,
    atoms: [
      A(`The stone`, `Lab analysis`,
        `The copy carries a tool mark from a workshop {D} visited as a consultant last year.`,
        `The copy has no workshop mark. Its fake age was made with chemicals sold by any craft supplier.`,
        `The replica is a high-quality copy.`),
      A(`The loan`, `Exhibit loan records`,
        `The Head left the building for six days in March "for conservation," signed out by {D} alone.`,
        `The Head left for three days in March for conservation, signed out by {D} and witnessed by the registrar.`,
        `The Head left the museum for conservation work at some point this year.`),
      A(`The alarm`, `Alarm records`,
        `The alarm on the Head's case was disarmed at 7 am on a Sunday using {D}'s code.`,
        `The alarm on the Head's case was disarmed on a Sunday using the code of a retired guard whose account was never closed.`,
        `The alarm on the display case was switched off outside opening hours.`),
      A(`The collector`, `Letters and emails`,
        `A private collector, Haroon Tiwana, wrote to {D} twice offering "a number that would change your life."`,
        `A private collector, Haroon Tiwana, wrote to the museum director twice. {D} was copied only to give advice on the piece.`,
        `A private collector wrote to the museum about the Head.`),
      A(`The plot`, `Financial records`,
        `{D} paid in full for a plot in DHA two months after the Head left for conservation.`,
        `{D} received an inheritance from an aunt, confirmed by the lawyer, shortly after the Head left for conservation.`,
        `{D}'s finances changed in the spring.`),
      A(`The inspection`, `Inspection notes`,
        `The inspector noted that {D} called in sick on the day the Head was due to be examined.`,
        `The inspector noted that {D} had asked for the inspection and was waiting at the door when it began.`,
        `The inspector recorded who attended on the day.`)
    ]
  },

  /* 12 */
  {
    title: `Ballot Box 12`,
    cat: `Election fraud`,
    charge: `{D}, returning officer for the Gulberg Heights Residents' Society elections in Islamabad, is accused of stuffing the ballot box so a friend would win the presidency.`,
    blurb: `The vote for president was won by 31 votes. Afterwards, 58 more ballots were counted than members had signed in. {D} ran the count.`,
    atoms: [
      A(`The sign-in sheet`, `Sign-in register`,
        `Pages of the sign-in register were rewritten in a second pen, in handwriting resembling {D}'s.`,
        `The sign-in register is in a single hand. The 58 extra ballots came from a second table that was never logged.`,
        `The sign-in register did not match the number of ballots.`),
      A(`The seal`, `Box inspection`,
        `The ballot box seal was cut and replaced with one from a stationery shop in the market where {D} is a regular.`,
        `The seal was intact. The box has a false bottom left over from a previous year that nobody noticed.`,
        `The ballot box was inspected afterwards.`),
      A(`The winner`, `Messages and social media`,
        `The winner, Naseem Akhtar, is {D}'s oldest friend and texted the day before: "You won't regret this."`,
        `The winner, Naseem Akhtar, barely knows {D} and argued with {D} about parking last year.`,
        `The winner and {D} know each other.`),
      A(`The count`, `Observer statements`,
        `Two observers say {D} counted alone in the back room for forty minutes with the door closed.`,
        `Two observers say they watched the whole count through the glass door and {D} never touched a ballot without a witness.`,
        `The count took place in a room off the main hall.`),
      A(`The folder`, `Hall camera`,
        `The hall camera shows {D} carrying a folder of loose papers in from the car park before polling opened.`,
        `The hall camera shows {D} arriving with only a cup of chai and a clipboard.`,
        `The hall camera recorded {D}'s arrival.`),
      A(`The neutrality`, `Society minutes`,
        `{D} said in a meeting that the old president "needs to go" and was warned for breaking neutrality rules.`,
        `{D} insisted on strict neutrality and reported two members for campaigning.`,
        `{D} spoke in meetings about the election.`)
    ]
  },

  /* 13 */
  {
    title: `Ward Nine`,
    cat: `Drug diversion`,
    charge: `{D}, a hospital pharmacist in Rawalpindi, is accused of stealing 600 tablets of a controlled painkiller from Ward Nine to sell.`,
    blurb: `An audit found 600 tablets missing over four months. A night nurse was suspended first, then cleared. The hospital wants to know who really had access. {D} did.`,
    atoms: [
      A(`The count`, `Audit report`,
        `The shortages happen only on shifts when {D} did the stock count alone.`,
        `The shortages happened on all shifts and began after the cabinet software was updated.`,
        `The audit found the shortages in the cabinet count.`),
      A(`The cabinet`, `Cabinet access log`,
        `The cabinet was opened with {D}'s fingerprint at 3:12 am on four nights when {D} was not rostered.`,
        `The log shows {D}'s fingerprint only on rostered shifts. Off-shift opens used a shared override code.`,
        `The cabinet was opened at times when nobody was scheduled.`),
      A(`The waste`, `Disposal records`,
        `Disposal records show {D} signed for tablet destruction without the second witness the policy requires.`,
        `Every destruction was signed by {D} and a second witness, always the same nurse.`,
        `Disposal records for controlled drugs were reviewed.`),
      A(`The car park`, `Security footage`,
        `Footage shows a stranger meeting {D} in the car park twice and handing over an envelope.`,
        `Footage shows {D} meeting a courier in the car park to collect a box of textbooks.`,
        `Security footage shows {D} meeting someone in the car park.`),
      A(`The locker`, `Locker search`,
        `A tiffin carrier with a false bottom in {D}'s locker held blister packs from the ward.`,
        `{D}'s locker held only personal items. The blister packs were in a locker belonging to a technician who has since left.`,
        `A locker search turned up something of interest.`),
      A(`The deposits`, `Bank records`,
        `{D} made cash deposits of Rs 4 lakh, four times in four months.`,
        `{D}'s bank statements show only the hospital salary.`,
        `{D}'s bank statements were examined.`)
    ]
  },

  /* 14 */
  {
    title: `The Warraich Letters`,
    cat: `Blackmail`,
    charge: `{D}, personal assistant to businessman Imtiaz Warraich, is accused of sending blackmail letters demanding Rs 50 lakh to keep his private life secret.`,
    blurb: `Three typed letters, posted in three different parts of Lahore, threatened to leak his secrets. He paid once and then went to the police. Only a few people knew the secrets, and {D} was one of them.`,
    atoms: [
      A(`The letters`, `Print forensics`,
        `The letters were printed on the model of printer used in Mr Warraich's office, and one carries a smudge from {D}'s desk stamp.`,
        `The letters were printed on a common office printer sold in thousands of shops. There is no smudge or mark.`,
        `The letters were typed and printed, not handwritten.`),
      A(`The postmarks`, `Post office records`,
        `Each postmark matches an area {D} visited that day on office errands.`,
        `Each postmark is in an area where the office gate records place {D} at a desk.`,
        `The letters were posted from three different parts of the city.`),
      A(`The secret`, `Statement of Mr Warraich`,
        `Only {D} and Mr Warraich's driver knew the detail about the Johar Town flat.`,
        `At least eight people, including two journalists, knew the detail about the Johar Town flat.`,
        `The letters referred to a private detail about Mr Warraich.`),
      A(`The drop`, `Petrol pump camera`,
        `A camera at the petrol pump where the envelope was left shows a figure in {D}'s distinctive green jacket collecting it.`,
        `A camera at the petrol pump shows a figure in a hooded black jacket. {D} owns no such jacket and was on a work call.`,
        `A camera caught a person collecting the envelope.`),
      A(`The pay`, `Staff records`,
        `{D} had been denied a raise three times and was overheard saying Mr Warraich "can afford it."`,
        `{D} was given an increment last spring and is described by colleagues as loyal.`,
        `{D} had a running conversation with Mr Warraich about pay.`),
      A(`The SIM`, `SIM and telecom records`,
        `The unregistered SIM used to give the payment instructions was activated at a shop near {D}'s home.`,
        `The unregistered SIM used to give the payment instructions was activated at a shop in an area {D} has never visited.`,
        `Investigators traced the SIM used to give the payment instructions.`)
    ]
  },

  /* 15 */
  {
    title: `The Karachi Open`,
    cat: `Chess cheating`,
    charge: `{D} is accused of using a hidden chess engine to win the Karachi Open and its Rs 10 lakh prize.`,
    blurb: `An unrated {D} beat three grandmasters in four days. Rivals say the moves looked like a computer. After the final, an organiser found a small electronic device in the venue washroom.`,
    atoms: [
      A(`The moves`, `Engine comparison`,
        `Over 80 percent of {D}'s moves match the engine's top choice, even in positions where a human would hesitate.`,
        `{D} played sharp openings prepared with a coach, which match engine lines. In the middlegame {D} made several very human mistakes.`,
        `Analysts compared {D}'s moves with a chess engine.`),
      A(`The breaks`, `Venue footage`,
        `{D} left the board and went to the washroom within a minute of every hard position, 11 times in 4 days.`,
        `{D} took four ordinary washroom breaks, always early in the game, and paced the corridor to calm down.`,
        `{D} left the playing hall during games.`),
      A(`The device`, `Device forensics`,
        `The device found in the washroom carries {D}'s fingerprint and pairs with an earpiece found in {D}'s bag.`,
        `The device found in the washroom has no fingerprints, and no earpiece was found in {D}'s bag.`,
        `A small electronic device was found in the venue.`),
      A(`The scan`, `Arbiter report`,
        `Before round 5 an arbiter asked to scan {D}, who refused and called it insulting.`,
        `Before round 5 {D} volunteered for a scan and was cleared by the arbiter.`,
        `An arbiter raised the question of scanning players before round 5.`),
      A(`The cousin`, `Messages`,
        `Messages show {D}'s cousin, a software developer, sent "link is live" the night before round 1.`,
        `Messages show {D}'s cousin, a software developer, sent only good-luck wishes.`,
        `{D} was in touch with a relative about the tournament.`),
      A(`The rating`, `Rating history`,
        `{D}'s online rating rose 400 points in three months, with games played only at 2 am.`,
        `{D}'s online rating rose steadily over two years, across all hours, and the local club confirms the training.`,
        `{D}'s rating rose before the tournament.`)
    ]
  },

  /* 16 */
  {
    title: `Drop Table`,
    cat: `Data sabotage`,
    charge: `{D}, systems administrator at Safar Express Logistics in Karachi, is accused of wiping the company's customer database on the night of resigning.`,
    blurb: `Safar Express lost its order database and two days of backups. Deliveries stopped for a week. {D} had handed in notice the day before.`,
    atoms: [
      A(`The command`, `Server logs`,
        `The delete command was run from {D}'s admin account at 11:03 pm over the remote VPN.`,
        `The delete command was run from a shared service account that anyone with the password could use, from an outside address.`,
        `The deletion was run with administrator rights.`),
      A(`The login`, `VPN records`,
        `The VPN login at 11:00 pm came from {D}'s home internet connection.`,
        `The VPN login came from a foreign address. {D} was on a flight to Dubai.`,
        `The VPN login came from outside the office.`),
      A(`The backups`, `Backup system logs`,
        `The backups were deleted first, one day earlier, using {D}'s credentials.`,
        `The backup system had been misconfigured months before by a contractor, so the backups never ran properly.`,
        `The backups were unavailable when needed.`),
      A(`The notice`, `HR file`,
        `{D} resigned angrily after being passed over and told a colleague, "They'll regret it."`,
        `{D} resigned to take a better job on good terms and left a detailed handover document.`,
        `{D} resigned the day before the incident.`),
      A(`The new job`, `Email archive`,
        `The new employer is a direct rival, and {D} emailed them a "customer list sample" last month.`,
        `The new employer is a bank, not a competitor. {D} sent them only an updated CV.`,
        `{D} was about to join another company.`),
      A(`The laptop`, `Device forensics`,
        `{D}'s returned laptop was factory-reset that same night, wiping any evidence.`,
        `{D}'s returned laptop was intact and shows no connection after 5 pm.`,
        `{D}'s company laptop was returned and examined.`)
    ]
  },

  /* 17 */
  {
    title: `Barish Wali Shaam`,
    cat: `Stolen song`,
    charge: `{D}, a record producer in Karachi, is accused of stealing the melody of the hit song "Barish Wali Shaam" from songwriter Mehwish Raza and taking sole credit.`,
    blurb: `"Barish Wali Shaam" has 40 crore views online. Mehwish Raza says she wrote the melody in a studio session and was cut out. {D} is credited as sole writer and producer.`,
    atoms: [
      A(`The demo`, `File metadata`,
        `A demo file dated eight months before the studio session holds the full melody and came from Mehwish's laptop.`,
        `The earliest file with the melody is {D}'s project from the session. Mehwish's demo has only chords.`,
        `Early recordings of the song exist from before its release.`),
      A(`The booking`, `Studio logbook`,
        `The studio logbook shows Mehwish booked three days with {D}, and her name was crossed out afterwards.`,
        `The studio logbook shows Mehwish booked one afternoon, mostly for another artist's track.`,
        `The studio logbook lists Mehwish at the studio.`),
      A(`The texts`, `WhatsApp history`,
        `{D} messaged Mehwish, "I'll sort the credits out later," before release and never replied again.`,
        `{D} messaged Mehwish an offer of shared credit and a fee. Mehwish turned it down in writing.`,
        `{D} and Mehwish exchanged messages around the release.`),
      A(`The engineer`, `Engineer statement`,
        `The sound engineer says Mehwish sang the melody and {D} only added the drums.`,
        `The sound engineer says {D} sang the melody first and Mehwish added a harmony.`,
        `The sound engineer was present at the sessions.`),
      A(`The old song`, `Musicology report`,
        `A musicologist finds the melody nearly identical to an unreleased song Mehwish shared privately two years ago.`,
        `A musicologist finds the melody close to {D}'s earlier work and a Punjabi folk tune in the public domain.`,
        `A musicologist compared the melody with earlier works.`),
      A(`The money`, `Royalty statements`,
        `All royalties go to {D}'s company, and {D} has refused an audit twice.`,
        `Royalties are split among four collaborators, and {D} has invited an audit.`,
        `Royalty statements exist for the song.`)
    ]
  },

  /* 18 */
  {
    title: `The Leaked Paper`,
    cat: `Paper leak`,
    charge: `{D}, superintendent of an exam centre in Rawalpindi, is accused of leaking the provincial medical college entry test paper before the exam.`,
    blurb: `Photos of the sealed paper went around WhatsApp groups an hour before the test began. Dozens of students from one academy scored suspiciously high. {D} ran the centre and held the key to the strongroom.`,
    atoms: [
      A(`The seal`, `Packet inspection`,
        `The paper packet's seal was cut and re-glued, and the glue matches a tube found in {D}'s office drawer.`,
        `The packet's seal was intact when opened. The photos were taken at the printing press, before the packets were sealed.`,
        `The paper packet was inspected after the exam.`),
      A(`The photos`, `Phone forensics`,
        `The leaked photos were taken inside the centre's strongroom, which only {D} and one clerk entered that morning.`,
        `The leaked photos show a different print batch and were taken at the printing press, not at the centre.`,
        `The leaked photos were traced to a phone.`),
      A(`The CCTV`, `CCTV footage`,
        `CCTV shows {D} alone in the strongroom at 6:10 am with a phone in hand, before the invigilators arrived.`,
        `CCTV shows {D} in the strongroom at 6:10 am with two invigilators, who watched the packets being opened.`,
        `CCTV recorded movement near the strongroom that morning.`),
      A(`The scores`, `Result analysis`,
        `Fifty students from one academy gave the same wrong answers on 23 questions.`,
        `The academy's students scored high because they had practised a past paper with similar questions. Their wrong answers differ.`,
        `Analysts studied the results of students from one academy.`),
      A(`The academy`, `Academy records`,
        `The academy's owner is {D}'s brother-in-law, and {D} once taught there.`,
        `The academy's owner has no link to {D} and has complained about {D}'s strict rules before.`,
        `{D} knows of the academy.`),
      A(`The deposit`, `Bank records`,
        `{D} received Rs 12 lakh in cash deposits in the two weeks before the exam.`,
        `{D}'s account shows only a salary and a small wedding gift from a relative.`,
        `{D}'s bank account was looked at.`)
    ]
  },

  /* 19 */
  {
    title: `Kilometre 31`,
    cat: `Race cheating`,
    charge: `{D} is accused of cutting the course in the Margalla Marathon in Islamabad to win by four minutes and break the course record.`,
    blurb: `{D} won in 2:18, a new course record, from nowhere. Rivals say {D} was not seen at the 31 km checkpoint. Prize money and a sponsor deal followed.`,
    atoms: [
      A(`The timing mats`, `Timing data`,
        `The chip data show no reading at the 31 km mat and a 27-minute gap between 28 km and 35 km, impossible at that pace.`,
        `The chip data show a missing reading at 31 km because the mat was faulty. Every other split is steady.`,
        `The timing data have a gap near 31 km.`),
      A(`The photos`, `Race photographers`,
        `A photo at 33 km shows {D} fresh and dry, in different clothes than at 30 km.`,
        `Photos at 30, 33 and 36 km show {D} in the same kit, getting more tired.`,
        `Photographers captured {D} at several points on the route.`),
      A(`The side path`, `Marshal statements`,
        `A marshal says someone matching {D} came out of a side path near the old water tank and joined the route.`,
        `A marshal says a runner in a different colour joined from the side path near the old water tank. {D} was seen in the main pack.`,
        `A marshal saw someone join from a side path.`),
      A(`The watch`, `GPS watch file`,
        `{D}'s GPS watch file shows a straight line across the valley road, eight kilometres at cycling speed.`,
        `{D}'s GPS watch file shows the full 42.2 km at steady running pace.`,
        `{D}'s GPS watch file was submitted.`),
      A(`The pacer`, `Pacer statement`,
        `The official pacer says {D} was nowhere in sight after 30 km and then appeared at 35 km looking fresh.`,
        `The official pacer says {D} ran with the group until 36 km and pulled ahead on the hill.`,
        `The pacer reported on the second half of the race.`),
      A(`The sponsor`, `Contract and emails`,
        `{D} signed a Rs 25 lakh sponsor deal tied to a course record, with a clause worded to the exact winning time.`,
        `{D} had no sponsor before the race. The offer came afterwards, unprompted.`,
        `A sponsor deal followed the race.`)
    ]
  },

  /* 20 */
  {
    title: `Container 4471`,
    cat: `Smuggling`,
    charge: `{D}, a customs officer at Karachi Port, is accused of waving through a container of smuggled goods in return for payment.`,
    blurb: `Container 4471 cleared the port without inspection and later turned out to hold Rs 30 crore of counterfeit electronics. The paperwork carries {D}'s stamp. {D} says it was routine.`,
    atoms: [
      A(`The stamp`, `Customs paperwork`,
        `The clearance stamp was applied at 6:50 am, just before {D}'s shift ended, with the inspection box left blank.`,
        `The clearance stamp was applied at 6:50 am using a stamp kept in a shared drawer used by three officers.`,
        `The container was cleared with a customs stamp.`),
      A(`The flag`, `Cargo system logs`,
        `The cargo system flagged the container as high risk. The flag was overridden under {D}'s login.`,
        `The cargo system never flagged the container as high risk.`,
        `The cargo system held a risk score for the container.`),
      A(`The importer`, `Company registry`,
        `The importer is a shell company registered by {D}'s brother-in-law.`,
        `The importer is a long-standing company owned by a businessman unconnected to anyone at the port.`,
        `The importer is a registered company.`),
      A(`The cash`, `Bank records`,
        `Four cash deposits of Rs 8 lakh appeared in {D}'s account after the container arrived.`,
        `{D}'s account shows no unusual deposits, only salary and a tax refund.`,
        `{D}'s bank account was examined by investigators.`),
      A(`The inspector`, `Duty roster`,
        `The officer who was supposed to inspect the container was sent home sick on an excuse arranged by {D}.`,
        `The officer who was supposed to inspect the container went home sick on their own, and the shift was short-staffed.`,
        `The officer scheduled for the inspection was not at work that morning.`),
      A(`The tip-off`, `Phone records`,
        `{D} took a call from an unregistered number two hours before the container was cleared.`,
        `{D} took only calls from the port office and a family member that morning.`,
        `{D}'s phone records for that morning were reviewed.`)
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
  'The Missing Salaries': ['Spending', 'Motive'],
  'The Canal Road Incident': ['The dinner', 'The morning after'],
  'Project Roshni': ['The grudge', 'The meeting', 'The deposit'],
  'The Haveli Deed': ['The debts', 'The visits'],
  'Fire at Dera Biryani House': ['The books', 'The staff', 'The policy'],
  'The Noor Jahan Emerald': ['The call', 'The walkie-talkie'],
  'The Nut-Free Wedding Cake': ['The group chat', 'The rishta'],
  'The Quarter-Final': ['The car', 'The innings break', 'The warm-up'],
  'Trial 7B': ['The contract', 'The resignation'],
  'Camp Four': ['The company'],
  'The Gandhara Head': ['The plot', 'The inspection', 'The collector'],
  'Ballot Box 12': ['The neutrality', 'The winner'],
  'Ward Nine': ['The deposits', 'The car park'],
  'The Warraich Letters': ['The pay', 'The secret'],
  'The Karachi Open': ['The cousin', 'The rating'],
  'Drop Table': ['The notice', 'The new job'],
  'Barish Wali Shaam': ['The money', 'The texts'],
  'The Leaked Paper': ['The academy', 'The deposit'],
  'Kilometre 31': ['The sponsor'],
  'Container 4471': ['The cash', 'The importer', 'The tip-off']
};
module.exports.forEach(c => c.atoms.forEach(a => { a.flip = (FLIP[c.title] || []).indexOf(a.label) >= 0; }));
