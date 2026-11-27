import {stages} from './board';

export type CaseStudy = {
  role: string;
  title: string;
  stage: (typeof stages)[number] | string;
  prompt: string;
  workflow: string;
  test: string;
  measure: string;
  balance: string;
  discuss: string;
  source: string;
  url: string | null;
  evidence?: {label: string; url: string};
};

export const portfolioUrl = 'https://schoolofbiodesign.in/index.php/projects/';
const productUrl = 'https://schoolofbiodesign.in/index.php/product/';

const devices = [
  {
    stage: 0,
    role: 'Emergency transport',
    title: 'HiCARE LIMO',
    slug: 'limo',
    prompt: 'An injured leg needs support during transport, before a hospital can provide definitive care.',
    workflow: 'A foldable cardboard splint wraps the lower limb. Creases accommodate different leg sizes, and straps hold the limb steady during transfer.',
    test: 'Observe ambulance crews during simulated transfers. Check how quickly they can fit the splint and whether it stays in place through handover.',
    measure: 'Track fit time and how often the receiving team has to reapply or adjust the splint.',
    balance: 'Check performance across limb sizes and transport conditions. The School lists the technology as licensed.',
    discuss: 'What would make this easier to stock and use in an ambulance than the current splint?',
  },
  {
    stage: 1,
    role: 'Maternity teams & audiology',
    title: 'Sohum',
    slug: 'sohum',
    prompt: 'A newborn with hearing loss can look well at discharge. A maternity team may have limited access to hearing-screening facilities.',
    workflow: 'A portable device measures the newborn’s auditory brainstem response and returns a pass or refer result. Its software helps reject interference, and the system can send results for remote review.',
    test: 'Pair bedside screening with a named person who explains a refer result, books diagnostic audiology and follows up when families miss the appointment.',
    measure: 'Track screening coverage among eligible newborns and diagnostic follow-up among babies referred.',
    balance: 'Pay attention to repeat screens, travel and cost for the family. An Odisha study evaluated operational feasibility and test performance.',
    discuss: 'Who owns the result once the baby has left the birth facility?',
    evidence: {label: 'Odisha mixed-method study', url: 'https://pubmed.ncbi.nlm.nih.gov/36598633/'},
  },
  {
    stage: 1,
    role: 'Primary care & ENT',
    title: 'NoXeno',
    slug: 'noxeno',
    prompt: 'A child arrives at a local clinic with an object in the front of the nose, and an ENT specialist may be hard to reach.',
    workflow: 'The hand-held extractor integrates an LED to help the clinician see the object and a spring-loaded grip designed for one-handed use. It aims to let the clinician resolve suitable cases at first contact.',
    test: 'Define which cases the clinic can handle and when staff should refer. Test whether teams can keep the reusable components and disposable sheaths ready.',
    measure: 'Compare first-attempt removal in suitable cases, referrals and time to definitive care.',
    balance: 'Track adverse events and avoid delaying referral in unsuitable cases. The School lists the technology as licensed.',
    discuss: 'What training and referral rules would make this useful in a primary-care clinic?',
  },
  {
    stage: 2,
    role: 'Point-of-care diagnostics',
    title: 'MorphX',
    slug: 'neuranics-lab',
    prompt: 'When blood analysis depends on sample transport or scarce laboratory staff, the result may arrive after the patient has gone home.',
    workflow: 'Neuranics combines microfluidics, automated imaging and AI to analyse blood-cell counts and morphology from a small finger-prick sample near the point of care.',
    test: 'Compare the same samples with the laboratory reference workflow. Route flagged, uncertain or discrepant results to a laboratory reviewer.',
    measure: 'Measure agreement with the reference workflow and the share of results available before the clinician’s next decision.',
    balance: 'Track repeat samples, discordant results and staff workload. The portfolio describes the design and intended use.',
    discuss: 'Which patients benefit from a same-visit result, and which results still need laboratory review?',
  },
  {
    stage: 3,
    role: 'Labour room & newborn care',
    title: 'NeoBreathe',
    slug: 'windmill',
    prompt: 'A lone birth attendant may need to hold a mask securely and provide ventilation at the same time.',
    workflow: 'Windmill Health’s foot-operated resuscitator moves the pumping action to a pedal, leaving both hands free to hold the mask.',
    test: 'Use manikin simulation to compare performance with the existing equipment under realistic staffing conditions. Include equipment checks and the handoff to newborn care.',
    measure: 'Measure time to effective ventilation and mask leak in simulation.',
    balance: 'Check setup time, skills retention, readiness across shifts and how teams call for help. The School lists it as commercialised.',
    discuss: 'Which staffing bottleneck does the pedal address, and which tasks still need another person?',
  },
  {
    stage: 3,
    role: 'Emergency treatment',
    title: 'Ozyn-D',
    slug: 'sib-projects_13',
    prompt: 'Emergency treatment can stall when staff cannot establish peripheral intravenous access promptly.',
    workflow: 'A sterile single-use intraosseous device gives a trained team an alternative route to circulation through the bone marrow for emergency fluids or medicines.',
    test: 'Use emergency simulation to test whether teams recognise when to switch, find the kit and hand over to the next clinician.',
    measure: 'Measure time to usable access and the share of attempts that work under protocol.',
    balance: 'Track training, stock readiness and complications. The School’s page describes bedside deployment as in progress.',
    discuss: 'If the kit is ready but the team hesitates to switch routes, what has to change in the workflow?',
  },
  {
    stage: 4,
    role: 'Orthopaedics & recovery',
    title: 'FlexiOH',
    slug: 'flexioh',
    prompt: 'A fracture needs support, but weeks of wearing a cast can make ordinary washing and skin care difficult.',
    workflow: 'A light-cured polymer mesh provides rigid support after moulding. Its open structure allows air to reach the skin and is designed to make hygiene easier.',
    test: 'Compare the whole casting episode for clinically suitable patients, including fitting, daily comfort, follow-up and replacements.',
    measure: 'Track patient-reported comfort and hygiene, unplanned cast changes and total episode cost.',
    balance: 'Check skin complications and maintenance of alignment. A published open-label follow-up studied the short-arm device in distal radius fractures.',
    discuss: 'Would fewer unscheduled returns and better daily comfort justify a higher cost per cast?',
    evidence: {label: 'Published short-arm follow-up', url: 'https://jmsh.ac.in/articles/a-prospective-multicentric-open-label-and-post-marketing-clinical-follow-up-study-to-monitor-the-safety-and-performance-of-light-cured-limb-orthosis-flexioh-short-arm-immobilizer-in-fractures-distal-radius'},
  },
  {
    stage: 4,
    role: 'Ward nursing & continence',
    title: 'Qora',
    slug: 'sib-projects_14',
    prompt: 'For bedbound patients with faecal incontinence, repeated soiling can expose skin to stool and interrupt nursing care.',
    workflow: 'Consure’s kit uses a flexible, self-expanding collector to divert stool into a collection bag, reducing direct contact with skin when the system works as intended.',
    test: 'Compare bedside use with the ward’s current containment method in eligible patients, including patient comfort and nursing time.',
    measure: 'Track leakage, skin injury and nursing minutes per patient-day.',
    balance: 'Count dislodgements and device-related complications. A small published study assessed diversion and short-term safety.',
    discuss: 'How would the ward find out whether the device reduces nursing workload and improves patient comfort?',
    evidence: {label: 'Published 20-patient study', url: 'https://schoolofbiodesign.in/wp-content/uploads/2023/09/Fecal-Incontinence-Device-Publication.pdf'},
  },
  {
    stage: 4,
    role: 'Ostomy care at home',
    title: 'SphinX',
    slug: 'sphinx',
    prompt: 'After a colostomy, some people worry about leakage and find that an external pouch affects daily activities.',
    workflow: 'The School describes a soft appliance intended to contain output and give eligible users more control over when to empty. The listed cap is intended for people with a left-sided colostomy.',
    test: 'Work with a stoma nurse and eligible users to study fitting, confidence during ordinary activities and access to replacement supplies.',
    measure: 'Track leaks, skin irritation and patient-reported ability to do activities they value.',
    balance: 'Measure comfort, ease of use and device-related complications. The School lists SphinX in its pipeline.',
    discuss: 'Which daily activity would users themselves choose as the most meaningful test?',
  },
  {
    stage: 4,
    role: 'Wound care & follow-up',
    title: 'InoHeal',
    slug: 'inochi-care',
    prompt: 'Complex wounds can need sustained management over many visits, adding travel and work for patients and caregivers.',
    workflow: 'Inochi Care pairs a portable electronic unit with a specialised dressing. The system applies therapy at the wound site and is designed to manage the wound environment and remove excess fluid.',
    test: 'Compare the device and reference care in a defined wound type, including dressing changes, follow-up and what happens when the device raises an alert.',
    measure: 'Measure wound healing over a fixed interval and the number of visits or dressing changes required.',
    balance: 'Track discomfort, complications and cost per episode. The School lists the technology in its pipeline and links to published work.',
    discuss: 'Who manages the dressing and responds to an alarm between visits?',
    evidence: {label: 'Published clinical practice report', url: 'https://schoolofbiodesign.in/wp-content/uploads/2023/09/Inochi-Care-bates-jensen.pdf'},
  },
];

export const biodesignCases: CaseStudy[] = devices.map(({stage, slug, ...item}) => ({
  ...item,
  stage: stages[stage],
  source: 'School of International Biodesign · Device profile',
  url: productUrl + slug + '/',
}));
