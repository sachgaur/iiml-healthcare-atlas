export type Item = {q: string; options: string[]; correct: number; why: string};

export const quizzes: {name: string; intro: string; items: Item[]}[] = [
  {
    name: 'Follow the handoff',
    intro: 'Trace where care continues or stops.',
    items: [
      {
        q: 'In Delhi, 18,377 people had presumed TB and 16,866 completed molecular testing. Which measure tells you whether the next handoff worked?',
        options: ['Chest X-rays per screening camp', '16,866 divided by 18,377', 'Confirmed cases divided by all residents'],
        correct: 1,
        why: 'The denominator is everyone who needed the next test. Completion was 91.7%, leaving 1,511 people whose next step warrants investigation.',
      },
      {
        q: 'A district doubles the number of virtual specialist consultations. Which follow-up would best test whether patients gained access?',
        options: ['Count the devices installed', 'Count referrals issued', 'Check whether patients needing an in-person visit completed it, including those living furthest away'],
        correct: 2,
        why: 'A consultation starts the pathway. Completion and travel burden show whether people could use the next service.',
      },
      {
        q: 'A lab corrects a result after the first report was read. What would close the loop?',
        options: ['The responsible clinician acknowledges the correction and reviews the plan', 'The lab uploads the new file', 'The number of reports on the dashboard rises'],
        correct: 0,
        why: 'The revised result has to reach a named decision-maker who can act and communicate any change.',
      },
      {
        q: 'An ambulance arrives quickly, but the receiving facility cannot provide the care the patient needs. Which dispatch change addresses this failure most directly?',
        options: ['Add more vehicles in zones with the longest pickup times', 'Match the patient’s needs to a capable facility and confirm that it can receive them', 'Show crews the shortest driving route to the nearest emergency department'],
        correct: 1,
        why: 'A successful dispatch gets the patient to a facility equipped to take over. Routing should account for the level of care and the facility’s ability to receive the patient.',
      },
      {
        q: 'An overseas patient is ready to fly home after a procedure. What would best demonstrate that follow-up has been handed over?',
        options: ['The patient downloads a copy of the discharge summary', 'The hospital schedules a routine check-in with its travel coordinator', 'The home clinician receives the care plan and confirms who will manage the first review'],
        correct: 2,
        why: 'A named clinician who acknowledges the plan can take responsibility for the next step. The patient should also know whom to contact if a problem comes up.',
      },
      {
        q: 'A second-opinion specialist reviews a proposed high-risk procedure and recommends a different approach. What should the service help happen next?',
        options: ['Arrange a timely discussion with the patient and treating team using the written opinion', 'Transfer responsibility for the case to the reviewer as soon as the report is issued', 'Book another round of tests before sharing the opinion with the treating team'],
        correct: 0,
        why: 'The value of the second opinion is a better-informed decision. A timely discussion lets the patient and treating team weigh both recommendations and agree on the next step.',
      },
      {
        q: 'A patient’s home-monitoring readings stop arriving. Which workflow best handles the gap?',
        options: ['Carry forward the latest reading so the dashboard stays complete', 'Have the assigned team check in by a backup channel and follow the agreed escalation plan', 'Send an app reminder and wait for the next scheduled upload'],
        correct: 1,
        why: 'Missing readings can reflect connectivity, device problems or difficulty using the system. A named team and a backup channel let someone establish what happened and act.',
      },
      {
        q: 'With the patient’s consent, a clinic can view a hospital discharge summary. Which step turns that access into a useful handoff?',
        options: ['Send the patient a notification that the summary is available', 'Record the transfer as complete once the clinic opens the file', 'Ask the clinician responsible for follow-up to review medication changes and confirm the plan with the patient'],
        correct: 2,
        why: 'Record sharing makes information available. Reviewing the changes and agreeing on a plan turns that information into a next step the patient can follow.',
      },
      {
        q: 'A home nursing provider accepts a discharge referral, but the first available visit is two days after the agreed date. What should happen before discharge?',
        options: ['Agree on who covers the gap with the home provider and tell the patient whom to call', 'Send the referral again with the original date marked as preferred', 'Give the family the provider’s number and ask them to check for cancellations'],
        correct: 0,
        why: 'Accepting the referral leaves a gap if the first visit is late. An explicit interim plan gives the patient a point of contact and assigns responsibility for that period.',
      },
      {
        q: 'A screening camp gives patients paper referrals to a distant clinic. Which change would help the camp identify who was lost between screening and follow-up?',
        options: ['Count referrals issued at each camp', 'Ask the clinic for its total appointment count each month', 'Reconcile the camp’s referral list with appointments attended and contact people whose follow-up is still open'],
        correct: 2,
        why: 'Comparing individual referrals with completed visits reveals which handoffs are still open. A check-in can uncover barriers such as transport, scheduling or unclear instructions.',
      },
    ],
  },
  {
    name: 'Find the unmet need',
    intro: 'Start with the experience of a patient or worker.',
    items: [
      {
        q: 'A caregiver confuses two eye-drop bottles after surgery. What should the design team do first?',
        options: ['Add more reminders', 'Observe how the caregiver identifies and uses each bottle', 'Ask the ward to print the same instructions twice'],
        correct: 1,
        why: 'Observation can reveal whether the difficulty is recognition, timing, language or a change to the prescription. Each calls for a different response.',
      },
      {
        q: 'A ward monitor creates many overnight alerts. Which pair of measures should the team examine together?',
        options: ['Sensor count and purchase price', 'Device uptime and beds purchased', 'Time to bedside assessment and alerts requiring no action'],
        correct: 2,
        why: 'One measure captures action on a real need. The other reveals the burden competing for the same nurse’s attention.',
      },
      {
        q: 'Which statement gives a team the best starting point for redesign?',
        options: ['A patient takes a second day off work because no one books the referral before departure', 'We need an AI platform', 'We should digitise everything'],
        correct: 0,
        why: 'A specific person, task and consequence can be observed and tested. The choice of technology comes later.',
      },
      {
        q: 'An older adult says the main reason for joining a healthy-ageing programme is to keep walking to the market. Which pilot outcome best reflects that goal?',
        options: ['Whether the person can still make the usual market trip with the level of support they want', 'How often the person opens the programme’s app', 'Whether the person reaches the same daily step target as the rest of the group'],
        correct: 0,
        why: 'The market trip is a meaningful measure of everyday function for this person. App use and step counts can help explain progress toward that goal.',
      },
      {
        q: 'A wearable shows an unfamiliar heart-rhythm notification. In user interviews, people say they understand the display but are unsure what to do next. What should the team test first?',
        options: ['A more detailed trend chart with the previous month of readings', 'A short explanation with a clear route to professional review and a check that users understand it', 'More frequent reminders to wear the device throughout the day'],
        correct: 1,
        why: 'The reported barrier is uncertainty about the next step. Testing the guidance and the route to review shows whether users can act on the signal.',
      },
      {
        q: 'Clinicians say an AI scribe saves typing time, but they spend much of the visit correcting speaker mix-ups. What should the design team study next?',
        options: ['Total time from consultation to signed note and where consequential corrections occur', 'Time to generate a first draft and how many drafts the tool can produce', 'Which note templates clinicians select most frequently'],
        correct: 0,
        why: 'The work ends when the clinician signs a usable note. Observing that full workflow reveals the time spent reviewing and fixing errors as well as the time saved typing.',
      },
      {
        q: 'A home-rehabilitation pilot has frequent missed sessions. Which first step would help the team choose between flexible scheduling, transport support and remote sessions?',
        options: ['Ask the clinicians which of the three changes would be easiest to deliver', 'Survey families who attended every session about their preferred appointment time', 'Speak with patients who missed sessions and trace what happened before each missed visit'],
        correct: 2,
        why: 'A missed session can reflect different barriers, including caregiver availability, travel or connectivity. Hearing from the people who missed care helps distinguish those causes.',
      },
      {
        q: 'A medicine stock dashboard shows enough supply for the month, yet patients repeatedly make a second trip. What should a team observe first?',
        options: ['How many stock reports are sent to district management', 'What happens at the dispensing counter for the exact medicine and strength each patient was prescribed', 'How often staff sign in to view the district dashboard'],
        correct: 1,
        why: 'Aggregate stock can hide shortages of a specific strength or gaps at a particular facility. Tracing the attempted fill shows where the patient’s trip fails.',
      },
      {
        q: 'Families call a hospital several times before a relative travels for treatment. What would best establish whether they need better information on price, timing or follow-up?',
        options: ['Compare the hospital’s initial message with the questions families ask before committing to travel', 'Rank competitors by the number of pages on their international-patient websites', 'Ask the billing team to choose the most common source of confusion'],
        correct: 0,
        why: 'Comparing what families receive with what they still need to ask reveals where they lack information to make a decision.',
      },
      {
        q: 'A discharge team asks families to take on several recovery tasks at home. How can the team find out whether the plan is realistic?',
        options: ['Record whether each family signed the discharge checklist', 'Ask staff how long they spent explaining the tasks', 'Ask caregivers to walk through a typical day and show how they would fit the tasks into it'],
        correct: 2,
        why: 'A walkthrough reveals conflicts with work, equipment needs and tasks the household may need help with. Those findings can guide changes to the care plan.',
      },
    ],
  },
  {
    name: 'Decide what to scale',
    intro: 'Weigh economics, safety and access.',
    items: [
      {
        q: 'A referral desk adds 15 completed visits. Net receipts are ₹600 per visit, variable cost is ₹200 per visit, and the desk costs ₹4,000. What is the added monthly contribution?',
        options: ['₹9,000', '₹6,000', '₹2,000'],
        correct: 2,
        why: '15 × (₹600 − ₹200) − ₹4,000 = ₹2,000. Check capacity, quality and who benefited before expanding.',
      },
      {
        q: 'Digital claims move faster. What should the hospital check alongside turnaround time?',
        options: ['Denials, out-of-pocket costs and time patients wait to leave', 'Only the number of submitted claims', 'Only the vendor’s uptime'],
        correct: 0,
        why: 'A faster administrative decision can still shift cost or waiting time onto patients.',
      },
      {
        q: 'A referral pilot improves average completion. Which check is most likely to expose an access gap?',
        options: ['Count how many staff liked the tool', 'Compare completion by travel distance and phone access', 'Count total logins'],
        correct: 1,
        why: 'Averages can conceal groups who still cannot attend. Follow the subgroup comparison with interviews about missed visits.',
      },
      {
        q: 'A cataract programme prepares the next patient in parallel with surgery. Cases per theatre hour rise, while recovery staff report a growing queue. What should managers check before expanding?',
        options: ['How closely theatre staff followed the new preparation schedule', 'How many extra cases each theatre could schedule at the new rate', 'Time to complete the whole episode, recovery capacity and patient outcomes'],
        correct: 2,
        why: 'Increasing theatre throughput can move the bottleneck to recovery. End-to-end measures show whether the episode improved and where more capacity is needed.',
      },
      {
        q: 'A hospital-at-home pilot reduces inpatient bed-days. Which comparison best supports a decision to expand it?',
        options: ['Compare eligible patients’ outcomes and total episode costs, including home visits and transfers back to hospital', 'Compare the price of each monitoring kit with the hospital’s room charge', 'Compare total home enrollments with how many inpatient beds were freed'],
        correct: 0,
        why: 'An episode-level comparison captures care delivered in both settings. Comparable patients help the team judge whether savings and outcomes are likely to hold when the service expands.',
      },
      {
        q: 'A hospital wants to expand its independent second-opinion service for high-risk procedures. Which combination of measures would best show its value and a possible unintended effect?',
        options: ['Number of referrals received and cost per reviewer', 'Patient understanding of the options and delays for cases that require timely care', 'Share of opinions that disagree with the original plan and number of reports downloaded'],
        correct: 1,
        why: 'Patient understanding captures a benefit for decision-making. Measuring delays alongside it shows whether the service is holding up time-sensitive care.',
      },
      {
        q: 'An app-dispatched ambulance pilot reports faster pickups. What additional result would best support expanding it across a city?',
        options: ['Higher repeat use and better ratings in the pilot area', 'Lower idle time for vehicles during peak demand', 'Faster arrival at an appropriate facility across neighbourhoods, including for callers without the app'],
        correct: 2,
        why: 'The patient’s journey continues after pickup. Measuring arrival at an appropriate facility and including callers without the app tests both clinical fit and reach.',
      },
      {
        q: 'A newborn hearing-screening device is easy for nurses to operate in a pilot. What should a purchaser examine before a district-wide rollout?',
        options: ['How many devices can be delivered and how long they take to install', 'Screening accuracy in local conditions and whether referred infants complete diagnostic follow-up', 'How many staff finish device training and rate it positively'],
        correct: 1,
        why: 'Ease of use supports adoption. The value of screening also depends on reliable results and a working pathway to confirm them.',
      },
      {
        q: 'A prevention pilot improves average mobility, but most participants who completed it own smartphones. What is the best next test before expanding?',
        options: ['Pilot a phone or in-person option and compare participation and mobility outcomes across access groups', 'Add more app reminders and measure whether smartphone users complete more sessions', 'Expand to districts with similar smartphone access and track the overall average'],
        correct: 0,
        why: 'A second delivery route tests whether people with limited digital access can take part and benefit. Comparing both participation and outcomes shows where barriers remain.',
      },
      {
        q: 'A faster preoperative assessment is followed by fewer cancellations at one hospital. Another hospital wants to copy it. What should that hospital do before investing in a full rollout?',
        options: ['Adopt the same staffing model and wait for enough cases to compare annual totals', 'Benchmark the other hospital’s cost per assessment against its own staffing costs', 'Identify its own reasons for cancellations, test the workflow on a small scale, and track cancellations alongside workload'],
        correct: 2,
        why: 'Hospitals can have different causes of cancellation. A small test shows whether the workflow addresses the local bottleneck and how much work it adds or saves.',
      },
    ],
  },
];
