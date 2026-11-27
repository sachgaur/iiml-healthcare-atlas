import type {Stage} from './efficiency-cases';

export type Speaker = 'Asha' | 'Prof Venkat' | 'Paati' | 'Farah' | 'Nurse' | 'Imran' | 'Lab coordinator' | 'Meena' | 'Claims officer';

export type Panel = {
  image: string;
  alt: string;
  caption?: string;
  dialogue: {speaker: Speaker; line: string}[];
};

export type Decision = {
  question: string;
  choices: {label: string; reply: string}[];
  discussion: string;
};

type Chapter = Decision & {
  id: string;
  title: string;
  stage: Stage;
  panels: [Panel, Panel];
  cases: {label: string; href: string}[];
};

export const chapters: Chapter[] = [
  {
    id: 'reach',
    title: 'The referral in her pocket',
    stage: 'Reach care',
    panels: [
      {
        image: 'screening',
        alt: 'At a neighbourhood eye camp, Asha watches her grandmother accept a referral slip from a health worker.',
        caption: 'At the eye camp, Asha’s grandmother gets a referral for a cataract assessment.',
        dialogue: [
          {speaker: 'Asha', line: 'You got a referral so quickly, Paati. Are you going to the hospital tomorrow?'},
          {speaker: 'Paati', line: 'Last time I took two buses and lost a day. I came home without seeing anyone.'},
        ],
      },
      {
        image: 'bus',
        alt: 'Paati points to a departing bus while Asha listens with her notebook open.',
        dialogue: [
          {speaker: 'Asha', line: 'I could make an app that reminds people to go.'},
          {speaker: 'Prof Venkat', line: 'What has to go right between this slip and the day she sees someone? Who could tell us where it breaks?'},
        ],
      },
    ],
    question: 'How should Asha find out why people miss the assessment?',
    choices: [
      {label: 'Interview patients who made it to the hospital about their trips.', reply: 'What might be different for the people who never reached the hospital? Speak with them before assuming the journey works the same way for everyone.'},
      {label: 'Ask the outreach team to trace referrals and speak with patients who missed their visits.', reply: 'That lets you see which handoffs are open and hear why. If several people describe the same transport barrier, what small change could the clinic test?'},
      {label: 'Send a reminder to everyone and count how many people open it.', reply: 'An opened message tells you it reached someone. How would you tell whether they found an appointment, arranged the trip and actually saw a clinician?'},
    ],
    discussion: 'What would tell you whether booking a visit before people leave the camp helped? Who would still struggle to attend?',
    cases: [{label: 'Aravind Eye Care', href: '/?case=aravind#opening-cases'}],
  },
  {
    id: 'decide',
    title: 'Two opinions, one decision',
    stage: 'Assess & refer',
    panels: [
      {
        image: 'records',
        alt: 'Farah holds a folder of records beside her brother as Asha and Prof Venkat listen in a hospital corridor.',
        caption: 'At a hospital, Asha meets Farah and her brother, who has travelled from abroad for treatment.',
        dialogue: [
          {speaker: 'Farah', line: 'My brother is facing a complex eye operation. He wants another specialist to explain the options before he decides.'},
          {speaker: 'Prof Venkat', line: 'What would make that opinion useful to him? What might get in the way of obtaining it in time?'},
        ],
      },
      {
        image: 'opinion',
        alt: 'An independent specialist talks with Farah and her brother over their records while Asha observes.',
        dialogue: [
          {speaker: 'Asha', line: 'With his permission, the reviewer can look at the records he already has. But if the two doctors disagree, who helps him decide?'},
          {speaker: 'Farah', line: 'And when we fly home, who will know what was agreed?'},
        ],
      },
    ],
    question: 'What should Asha ask the hospital to include in a second-opinion service?',
    choices: [
      {label: 'A video appointment and a recording for the family to keep.', reply: 'A video visit may make the review easier to reach. Who helps the patient reconcile the advice, and how would the clinician back home know what was agreed?'},
      {label: 'A standard package that repeats all tests before the specialist reviews them.', reply: 'Sometimes a reviewer needs more information. Which records can be shared with consent first, and who decides if another test is needed or could delay care?'},
      {label: 'A timely independent review, a discussion with the treating team and a written plan the home clinician can use.', reply: 'That covers both the decision and what follows. Ask the treating team which cases can safely wait for a review and how they would handle a disagreement.'},
    ],
    discussion: 'How would you tell if patients understood their options? What would you track to see whether the service delayed time-sensitive care?',
    cases: [{label: 'Second opinion and medical travel', href: '/#service-design'}],
  },
  {
    id: 'investigate',
    title: 'The result nobody owned',
    stage: 'Investigate',
    panels: [
      {
        image: 'diagnostic-referral',
        alt: 'At a Delhi screening camp, a health worker hands Imran a referral slip while Asha listens.',
        caption: 'At a Delhi community screening camp, Imran is referred for a further TB test.',
        dialogue: [
          {speaker: 'Asha', line: 'What did they tell you would happen after the screening?'},
          {speaker: 'Imran', line: 'They gave me this slip. I had to get back to work, so I thought someone would call.'},
        ],
      },
      {
        image: 'lab-handoff',
        alt: 'Asha and Prof Venkat talk with a laboratory coordinator at her reception desk.',
        caption: 'The camp team asks the lab to check where Imran’s referral stands.',
        dialogue: [
          {speaker: 'Lab coordinator', line: 'We’re still waiting for a sample. When we do have a result, we send it to the clinic that ordered the test.'},
          {speaker: 'Prof Venkat', line: 'Who checks that the sample arrives? Once the clinic gets a result, who makes sure Imran hears what it means?'},
        ],
      },
    ],
    question: 'What should Asha ask the camp and clinic to track together?',
    choices: [
      {label: 'The number of referrals issued at each screening camp.', reply: 'That tells you how many referrals were made. How will you spot people whose sample never reached the lab?'},
      {label: 'Each referral from sample collection through result review and patient follow-up, with someone named to check for gaps.', reply: 'Now you can see where each referral stops. What should happen if the clinic receives a result and the patient is hard to reach?'},
      {label: 'How quickly the lab reports results for the samples it receives.', reply: 'Turnaround matters once a sample reaches the lab. Who looks for people missing from the lab’s list?'},
    ],
    discussion: 'Suppose the camp tries same-visit sample collection. How would you tell whether more people completed testing and heard what they needed to do next?',
    cases: [{label: 'Delhi’s community TB screening', href: '/?stage=Investigate#journey'}],
  },
  {
    id: 'scale',
    title: 'The queue moves',
    stage: 'Agree & treat',
    panels: [
      {
        image: 'recovery',
        alt: 'Asha and Prof Venkat notice occupied seats and a busy nurse outside a recovery area.',
        caption: 'Asha visits an eye hospital where the team prepares the next patient while the surgeon is operating.',
        dialogue: [
          {speaker: 'Nurse', line: 'We can treat more patients per session now. Some families are still waiting longer to go home.'},
          {speaker: 'Asha', line: 'The theatre is faster. Has the wait moved into recovery, or is something else holding up discharge?'},
        ],
      },
      {
        image: 'pilot',
        alt: 'Asha lays out her notebook and ideas in front of a nurse and Prof Venkat in the clinic break room.',
        dialogue: [
          {speaker: 'Prof Venkat', line: 'What could you learn from one morning’s list before asking the hospital to change its staffing?'},
          {speaker: 'Asha', line: 'I’ll follow the visits through to discharge and ask the team what they are waiting for at each step.'},
        ],
      },
    ],
    question: 'What should Asha propose for the first improvement test?',
    choices: [
      {label: 'Add more theatre slots and see whether the team can treat more patients per session.', reply: 'That might raise theatre output. What happens to the patients already waiting to leave, and how will you count the time they spend in recovery?'},
      {label: 'Find the main cause of the discharge wait and test one change on a small list while tracking total visit time and safety.', reply: 'Now you can tell whether the change helped patients finish the visit sooner. What would you track for the recovery nurse so you can see if her workload rose?'},
      {label: 'Introduce a digital discharge checklist across all units and track completion.', reply: 'A checklist could help if information is missing. If families are waiting for space, staff or transport, what observation would tell you that first?'},
    ],
    discussion: 'Which result would persuade you to stop the pilot, even if the average visit got shorter?',
    cases: [
      {label: 'Aravind Eye Care', href: '/?case=aravind#opening-cases'},
      {label: 'Narayana Health', href: '/?case=narayana#opening-cases'},
    ],
  },
  {
    id: 'home',
    title: 'The missing reading',
    stage: 'Recover & review',
    panels: [
      {
        image: 'at-home',
        alt: 'At home, Paati speaks with Asha beside a phone and monitoring device, looking toward the courtyard.',
        caption: 'Weeks later, Paati joins a home-monitoring programme for a separate health need.',
        dialogue: [
          {speaker: 'Paati', line: 'I want to keep walking to the market on my own. The nurse says I can send my readings from home.'},
          {speaker: 'Asha', line: 'The phone is charged, but the clinic hasn’t received today’s reading.'},
        ],
      },
      {
        image: 'phone',
        alt: 'Asha holds the phone next to Paati, with a nurse at the clinic pictured in an inset.',
        dialogue: [
          {speaker: 'Nurse', line: 'When the screen shows nothing, I can’t tell whether it’s a connection problem or something else.'},
          {speaker: 'Asha', line: 'Who would have noticed the missing reading if we hadn’t called you?'},
        ],
      },
    ],
    question: 'What should the team agree on before sending the next patient home with a device?',
    choices: [
      {label: 'A named monitoring team, a check-in plan for missing readings and a phone number the household can use.', reply: 'That gives the team a way to check what happened and the household a way to ask for help. How would you test the plan with someone who shares a phone or has patchy connectivity?'},
      {label: 'An automatic reminder every time the connection drops.', reply: 'A reminder may be worth testing. If it never reaches the patient, who notices the missing reading and when should they act?'},
      {label: 'Ask relatives to keep an eye on the dashboard and contact the clinic if anything looks unusual.', reply: 'Which tasks can the household reasonably take on? Ask who checks the dashboard when relatives are working and who has the training to act on what they see.'},
    ],
    discussion: 'What would you measure alongside response time to see whether care at home helps Paati reach the goal she chose?',
    cases: [{label: 'Home visits, monitoring and healthy ageing', href: '/#care-at-home'}],
  },
];

export const reassessmentPanel: Panel = {
  image: 'reassessment',
  alt: 'Paati speaks with a nurse at a clinic while Asha listens and takes notes.',
  caption: 'The nurse follows up about the missed reading. When Paati says her usual walk has become harder, they agree on a clinic visit.',
  dialogue: [
    {speaker: 'Paati', line: 'I haven’t been to the market all week. I wanted to tell you, but I thought you only needed my readings.'},
    {speaker: 'Nurse', line: 'I’ll bring that to the clinician reviewing your plan. Let’s talk about what has changed and what would help you get back to the market.'},
  ],
};

export const claimsStory: Decision & {title: string; panel: Panel; case: Chapter['cases'][number]} = {
  title: 'Ready to go home, still waiting',
  panel: {
    image: 'claims-desk',
    alt: 'Meena and her daughter wait with a packed bag at the hospital claims desk while Asha listens.',
    caption: 'At the discharge desk, Meena is waiting for an answer about her cashless claim. Her clinical team has cleared her to go home.',
    dialogue: [
      {speaker: 'Meena', line: 'The ward said I could go home. What are we waiting for now?'},
      {speaker: 'Claims officer', line: 'The insurer asked for the signed discharge summary. The ward has it, but it hasn’t reached our desk.'},
      {speaker: 'Asha', line: 'Who can get the summary to you and tell Meena when she’ll hear back?'},
    ],
  },
  question: 'Which change would help the team close this handoff?',
  choices: [
    {label: 'Send the signed summary, assign someone to follow the query, and tell Meena when to expect an update.', reply: 'That gives the query an owner. How would the hospital tell whether families actually leave sooner?'},
    {label: 'Ask Meena to call the insurer for an update.', reply: 'The call might tell her the status. Who can get the missing summary from the ward to the insurer?'},
    {label: 'Submit another claim with the same paperwork.', reply: 'Which information did the insurer request? How will staff track the original query if there are two submissions?'},
  ],
  discussion: 'What would the time from clinical clearance to departure tell you that claim approval time alone would miss?',
  case: {label: 'National Health Claims Exchange', href: '/?stage=Assess+%26+refer#journey'},
};
