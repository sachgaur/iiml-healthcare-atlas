import type {Stage} from './efficiency-cases';

type Topic={id:string;title:string;stage:Stage;need:string;design:string;measure:string;source:{label:string;url:string}[]};
type TopicSection={id:string;title:string;intro:string;topics:Topic[];question:string};

export const topicSections:TopicSection[]=[
 {
  id:'service-design',title:'Innovation in service design',
  intro:'A patient may need a ride, another specialist’s judgement or help coordinating care across borders. Each is a service with a handoff someone has to own.',
  question:'If a service promises speed or convenience, what would show that the patient reached the right next step?',
  topics:[
   {
    id:'ambulance',title:'On-demand ambulance',stage:'Reach care',
    need:'In an emergency, a family may not know whom to call, what kind of ambulance is needed or when help will arrive.',
    design:'Blinkit offers app-based ambulance requests in its service area. A dispatch service also needs to match the patient to the right level of care, coordinate the destination and hand over to the receiving facility.',
    measure:'Track call-to-arrival and time to the appropriate hospital. Check dispatch failures, fit of crew and equipment to need, coverage and the fallback for people without the app.',
    source:[{label:'Blinkit · Ambulance service',url:'https://blinkit.com/ambulance'}],
   },
   {
    id:'second-opinion',title:'Second opinion for a high-stakes decision',stage:'Assess & refer',
    need:'Before a complex or high-risk procedure, a patient may want an independent review of the diagnosis, options and whether the proposed plan fits their goals.',
    design:'Apollo offers second-opinion appointments. A structured service can collect records and imaging with consent, match the case to a suitably independent specialist and deliver a written opinion the patient can discuss with the treating team. Agree how to handle urgent cases or disagreements.',
    measure:'Track time from complete records to a usable opinion, repeat tests, patient understanding of options and any delay to time-sensitive care.',
    source:[{label:'Apollo Hospitals · Second opinions',url:'https://www.apollohospitals.com/book-second-opinion'}],
   },
   {
    id:'medical-travel',title:'Medical travel across borders',stage:'Agree & treat',
    need:'A patient deciding whether to travel for care needs a plan and an estimate before committing. Once home, they need someone to take over follow-up.',
    design:'Apollo’s international service describes pre-travel video assessment and post-treatment follow-up. Map the rest around the patient: a second opinion where helpful, an itemised estimate, language support and a discharge summary and follow-up plan shared with the home clinician.',
    measure:'Track completion of a plan before travel, differences between estimated and final cost, and the share of patients who complete the first follow-up after returning home.',
    source:[{label:'Apollo Hospitals · International patient services',url:'https://www.apollohospitals.com/international-patient-services'},{label:'Apollo Hospitals · Plan your visit',url:'https://www.apollohospitals.com/international-patient-services/plan-your-visit'}],
   },
  ],
 },
 {
  id:'care-at-home',title:'Care and prevention at home',
  intro:'Start with what the person wants to keep doing in daily life. Some goals call for routine self-care, some for a home visit and others for an accountable clinical team.',
  question:'If you move a task from the hospital to the home, who takes it on, and what happens when they need help?',
  topics:[
   {
    id:'home-services',title:'Home visits and recovery support',stage:'Recover & review',
    need:'Repeated trips for wound care or rehabilitation can be difficult after discharge. Caregivers may also be unsure what they are expected to do.',
    design:'Apollo HomeCare lists nursing visits, wound care and physiotherapy. Design the handoff around a plan agreed before discharge: who visits and when, what the household can manage and how the home team contacts the treating service.',
    measure:'Track time to first visit, missed visits, goals reached, transfers back to hospital and the workload that falls to the caregiver.',
    source:[{label:'Apollo HomeCare · Home visits and services',url:'https://www.apollohomecare.com/apollo_main_booklet.pdf'}],
   },
   {
    id:'remote-monitoring',title:'Remote monitoring and hospital at home',stage:'Recover & review',
    need:'Some patients can stay home while a team follows their condition. A reading has value only if someone can review it and respond.',
    design:'NHS virtual wards illustrate an acute home-care model for selected patients. Assign a named team, review schedule, escalation route and plan for missing data or lost connectivity. Hospital-level care at home also requires appropriate clinical staffing and treatment capability.',
    measure:'Track time from alert to assessment, missed alerts, unplanned transfers and outcomes for people with limited digital access.',
    source:[{label:'NHS England · Technology-enabled virtual wards',url:'https://www.england.nhs.uk/long-read/a-guide-to-setting-up-technology-enabled-virtual-wards/'}],
   },
   {
    id:'wearables',title:'Wearables for self-care',stage:'Reach care',
    need:'People want feedback between appointments. A device can show a trend or flag a signal, but the person needs to know what to do next.',
    design:'Use simple trends, such as activity, to support a goal the person chooses. For a possible clinical signal, define a confirmation route. In the Apple Heart Study, an irregular-pulse notification prompted a telemedicine visit and an ECG patch.',
    measure:'Track whether users can explain their next step, how many flagged users complete follow-up and the burden of unnecessary checks.',
    source:[{label:'Apple Heart Study · NEJM',url:'https://pubmed.ncbi.nlm.nih.gov/31722151/'}],
   },
   {
    id:'healthy-ageing',title:'Prevention and healthy ageing',stage:'Reach care',
    need:'People who want to live well for longer often value mobility, independence and participation in daily life.',
    design:'Build a service around a goal the person values, such as continuing a daily walk. Connect activity and routine preventive care to primary care when support is needed. Offer options that work without a wearable.',
    measure:'Follow the patient’s own goal and a relevant measure of function. Check participation across cost, mobility and digital access.',
    source:[{label:'WHO · Healthy ageing and functional ability',url:'https://www.who.int/news-room/questions-and-answers/item/healthy-ageing-and-functional-ability'}],
   },
  ],
 },
];

export const serviceTopics=topicSections.flatMap(section=>section.topics);
