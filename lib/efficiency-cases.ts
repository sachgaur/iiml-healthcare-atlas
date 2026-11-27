import {stages} from './board';

export type Stage = (typeof stages)[number];
type CaseStep = {stage: Stage; label: string; change: string};
type EfficiencyCase = {
  id: string;
  title: string;
  pathway: string;
  gap: string;
  steps: CaseStep[];
  measures: string;
  evidence: string;
  digital: string;
  question: string;
  sources: {label: string; url: string}[];
};

export const efficiencyCases: EfficiencyCase[] = [
  {
    id: 'aravind',
    title: 'Aravind Eye Care',
    pathway: 'Cataract surgery',
    gap: 'Patients could be identified in the community yet still struggle to reach surgery. At the hospital, scarce ophthalmologist time was also being spent on work that trained staff could do.',
    steps: [
      {stage:'Reach care', label:'Screen close to home', change:'Outreach camps bring screening to communities. The programme arranges transport for eligible patients referred for surgery from camps.'},
      {stage:'Assess & refer', label:'Prepare the patient for the next step', change:'Trained ophthalmic personnel handle routine tests. Counsellors explain the plan and help patients understand why surgery or follow-up is needed.'},
      {stage:'Agree & treat', label:'Prepare the next patient in parallel', change:'Trained staff prepare patients and instruments while the surgeon operates. With two tables and dedicated support, the surgeon can move to a patient who is ready. Checklists and protocols define the work.'},
      {stage:'Recover & review', label:'Bring follow-up back to the community', change:'Outreach patients can have their six-week postoperative examination at the camp site. Counselling and reminders support this step.'},
    ],
    evidence:'Aravind’s published case reports that redistributing routine work more than quadrupled an ophthalmologist’s productivity in its setting.',
    measures:'Track completed operations per surgeon session alongside visual outcomes, complications, and the share of referred patients who complete surgery and follow-up.',
    digital:'Use referral tracking to find people who never reach surgery. Use timestamps to distinguish waiting for a surgeon from waiting for a patient, instruments or a room.',
    question:'If you have one more hire, should it be another surgeon or someone who can keep patients and instruments ready? What would you observe before deciding?',
    sources:[
      {label:'Community Eye Health Journal · Aravind case',url:'https://www.cehjournal.org/wp-content/uploads/efficient-high-volume-cataract-services-the-aravind-model.pdf'},
      {label:'International Centre for Eye Health · Theatre workflow',url:'https://www.iceh.org.uk/files/v2020resource/files/clinical_strat.pdf'},
    ],
  },
  {
    id: 'narayana',
    title: 'Narayana Health',
    pathway: 'Cardiac surgery',
    gap: 'Many patients needing complex heart surgery faced high costs and limited access. Within surgery, the question was which steps truly required the most experienced surgeon.',
    steps: [
      {stage:'Assess & refer', label:'Extend access to specialist assessment', change:'Telemedicine and outreach connect patients outside major cities to assessment and specialist advice.'},
      {stage:'Agree & treat', label:'Match surgical tasks to expertise', change:'In the published bypass case, trained junior surgeons perform defined steps such as preparing graft vessels. Senior surgeons focus on the most complex steps. High volumes also support central purchasing and use of specialised facilities.'},
      {stage:'Recover & review', label:'Track recovery as part of the episode', change:'Review length of stay and outcomes alongside procedure cost. Faster operating-room flow can simply move the queue to recovery if beds or staff are scarce.'},
    ],
    evidence:'The Commonwealth Fund’s 2017 case reported an average cost under US$2,000 for open-heart surgery, based on Narayana’s figures at the time.',
    measures:'Track cost per completed episode and senior surgeon time alongside risk-adjusted complications, readmissions and waiting time for treatment.',
    digital:'Narayana used connected systems to monitor performance and barcodes to track stock. For a local experiment, tie theatre, ICU and discharge data together to see where the constraint moves.',
    question:'If a redesign frees up theatre time but the ICU is full, what changes for the next patient waiting for surgery?',
    sources:[
      {label:'Commonwealth Fund · Narayana Health model',url:'https://www.commonwealthfund.org/sites/default/files/documents/___media_files_publications_case_study_2017_nov_taylor_expanding_lowcost_highquality_model_narayana_cs.pdf'},
      {label:'Harvard FXB Center · Task shifting in Indian healthcare',url:'https://fxb.harvard.edu/wp-content/uploads/2020/01/Task-Shifting-in-Indian-Healthcare-Jan-2017-2.pdf'},
    ],
  },
];
