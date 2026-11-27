import {stages} from './board';

type Link = {label: string; href: string};
type CompanyCase = {
  id: string;
  name: string;
  role: string;
  data: string;
  use: string;
  evidence: string;
  check: string;
  sources: Link[];
};

export const dozeeCase: Link = {label: 'Dozee’s ward-monitoring case', href: '/?stage=Recover+%26+review#journey'};

export const dataSources = [
  {
    stage: stages[0], label: 'Symptoms, access & dispatch',
    record: 'Patients, health workers and dispatchers record symptoms, preferred language, first contact and arrival times.',
    quality: 'Keep the time and source of each entry. Record failed contacts and who never made it to a visit, where feasible.',
    links: [{label: 'On-demand ambulance and access', href: '/?topic=ambulance#service-design'}],
  },
  {
    stage: stages[1], label: 'Notes, referrals & claims',
    record: 'Clinicians and payers create visit notes, referral orders, coverage decisions and claims.',
    quality: 'Keep signed notes and corrections distinguishable. A billing code reflects an administrative event and may differ from a confirmed diagnosis.',
    links: [{label: 'Narayana’s documentation case', href: '/?stage=Assess+%26+refer#journey'}],
  },
  {
    stage: stages[2], label: 'Images, labs & test results',
    record: 'Devices and labs generate images, sample IDs, measured values, reports and results that can confirm or rule out a suspected condition.',
    quality: 'Keep units, device and acquisition details. Link each result to the right order and preserve the distinction between a screening score and a reference result.',
    links: [{label: 'Delhi’s community TB screening', href: '/?stage=Investigate#journey'}],
  },
  {
    stage: stages[3], label: 'Plans, medicines & procedures',
    record: 'Patients, clinicians and pharmacies generate care decisions, procedure records, medication orders and dispensing events.',
    quality: 'Separate what was proposed, prescribed, dispensed and actually taken. Add patient preferences and the reasons a plan changed.',
    links: [{label: 'Second opinions and medical travel', href: '/?topic=second-opinion#service-design'}],
  },
  {
    stage: stages[4], label: 'Home readings & outcomes',
    record: 'Patients, caregivers, nurses and devices record symptoms, vital signs, adverse events and recovery goals.',
    quality: 'Distinguish a normal reading from a missed or failed transmission. Define the follow-up window, and record who was lost to follow-up.',
    links: [
      {label: 'Discharge follow-up exercise', href: '#data-follow-up'},
      {label: 'Remote monitoring and care at home', href: '/?topic=remote-monitoring#care-at-home'},
    ],
  },
];

export const transformationSteps: {label: string; short: string; change: string; check: string; links?: Link[]}[] = [
  {
    label: 'Digitise', short: 'Capture at the point of care',
    change: 'Turn a paper form, dictation or device signal into a digital record. Use structured fields for information that teams need to compare, with room for clinical context in the notes.',
    check: 'Could another clinician tell who recorded it, when, with what device or method, and whether it was later corrected?',
  },
  {
    label: 'Connect', short: 'Link records across handoffs',
    change: 'Link the right patient, encounter, sample and result. Redesign the workflow so a named team receives, acknowledges and acts on the information. In India, ABDM provides a framework for consent-based exchange and FHIR profiles for interoperable records.',
    check: 'Can the receiving team act on the record in time? Define the permitted purpose, keep a record of access, and assess AI training or research as a separate use with its own lawful basis and safeguards.',
    links: [
      {label: 'National Health Authority on ABDM exchange', href: 'https://sansad.in/getFile/annex/268/AU1856_OgbYe6.pdf?source=pqars'},
      {label: 'ABDM FHIR implementation guide', href: 'https://nrces.in/ndhm/fhir/r4/2.0.1/'},
    ],
  },
  {
    label: 'Curate', short: 'Build a dataset for a defined decision',
    change: 'Define the target, reference standard and time window. Check missingness, duplicates, inconsistent units, who is represented, and which fields were available at the moment of decision.',
    check: 'Can you trace each label to its source? Split data so the same patient cannot appear in both training and testing, then test across sites, time periods or devices that reflect the intended use.',
    links: [{label: 'WHO considerations for AI in health', href: 'https://www.who.int/publications/i/item/9789240078871'}],
  },
  {
    label: 'Validate & deploy', short: 'Put a tested tool into the workflow',
    change: 'Compare the tool with current practice on independent local data, then evaluate how it performs in the workflow. Specify who reviews the output, how someone can override it and what happens during downtime.',
    check: 'Monitor performance by site and subgroup, clinician corrections, workload and patient outcomes. Investigate drift and revalidate a material change before relying on it.',
    links: [
      {label: 'CARPL.ai as a deployment example', href: '#data-carpl'},
      {label: 'WHO considerations for AI in health', href: 'https://www.who.int/publications/i/item/9789240078871'},
    ],
  },
];

export const applications: {label: string; question: string; data: string; example: string; measure: string; links?: Link[]}[] = [
  {
    label: 'Medtech', question: 'Can a device measurement guide a timely check?',
    data: 'Time-stamped sensor signals, signal quality, device version and independent bedside measurements.',
    example: 'Dozee’s contactless ward monitor connects a digital signal to a potential bedside review. CARPL.ai illustrates the infrastructure needed to test and integrate imaging software in a clinical workflow.',
    measure: 'Agreement with a reference measurement, false alerts per bed-day and time from alert to a bedside check.',
    links: [dozeeCase, {label: 'Doto Health’s maternal monitoring case', href: '#data-doto-health'}],
  },
  {
    label: 'Screening & diagnosis', question: 'Which result needs a closer look?',
    data: 'Digital images with acquisition details and clinical context, plus an appropriate reference such as a molecular result for TB.',
    example: 'Qure.ai’s qXR analyses chest X-rays for screening and triage. A flagged TB screen leads to evaluation and, where indicated, confirmatory testing.',
    measure: 'Sensitivity, false referrals and completion of confirmatory testing, including across sites and equipment.',
    links: [
      {label: 'Qure.ai’s TB screening case', href: '#data-qure'},
      {label: 'Remidio’s retinal screening case', href: '#data-remidio'},
      {label: 'Periwinkle’s cervical screening case', href: '#data-periwinkle'},
    ],
  },
  {
    label: 'Communication', question: 'Can the next person understand and act?',
    data: 'A signed care plan, verified medication instructions, language preferences or the patient’s own conversational input, depending on the use.',
    example: 'Wysa offers conversational self-help. In the atlas, Narayana’s Medha Scribe illustrates a different communication task, where a clinician checks a draft before another team relies on it.',
    measure: 'Patient understanding, material errors and, where relevant, how reliably a person reaches human support.',
    links: [
      {label: 'Review an AI draft', href: '#data-review-draft'},
      {label: 'Wysa’s case', href: '#data-wysa'},
      {label: 'HealthPlix’s documentation case', href: '#data-healthplix'},
      {label: 'Narayana’s documentation case', href: '/?stage=Assess+%26+refer#journey'},
    ],
  },
  {
    label: 'Prognosis', question: 'Who is likely to need closer follow-up?',
    data: 'Observations over time, prior conditions and a reliably recorded outcome measured over a fixed period.',
    example: 'OncoStem’s CanAssist Breast estimates recurrence risk for eligible patients with early-stage breast cancer. The oncology team interprets the score alongside other clinical findings.',
    measure: 'Whether predicted risk matches observed risk in different groups, and whether follow-up helps without overwhelming the team.',
    links: [{label: 'OncoStem’s recurrence-risk case', href: '#data-oncostem'}],
  },
  {
    label: 'Treatment planning', question: 'Which options should the care team discuss?',
    data: 'Confirmed findings, medicines, allergies, comorbidities, patient preferences and current clinical guidance.',
    example: 'Teaching example. A second-opinion team could test a tool that assembles guideline-based options and flags possible contraindications for clinician review and a shared decision.',
    measure: 'Material omissions, inappropriate suggestions, review time and patient understanding of the options.',
    links: [
      {label: 'BrainSightAI’s surgical planning case', href: '#data-brainsightai'},
      {label: 'Second opinions in the Care Atlas', href: '/?topic=second-opinion#service-design'},
    ],
  },
  {
    label: 'New medical knowledge', question: 'What might routine care data help us discover?',
    data: 'Linked records with reliable outcomes, denominators, exposure dates and enough follow-up.',
    example: 'India’s Adverse Drug Monitoring System illustrates how to capture suspected reactions. A research team could use suitable linked data to investigate a signal using a prespecified study and confirm findings elsewhere.',
    measure: 'Completeness of outcome capture, sensitivity to missing data and confounding, and replication. A signal starts an investigation.',
    links: [{label: 'FDA on real-world evidence', href: 'https://www.fda.gov/science-research/science-and-research-special-topics/real-world-evidence'}],
  },
];

export const followUpEvidence: Link[] = [
  {label: 'Ayers et al. on written replies', href: 'https://pubmed.ncbi.nlm.nih.gov/37115527/'},
  {label: 'Harrison et al. on automated calls', href: 'https://pubmed.ncbi.nlm.nih.gov/35767470/'},
  {label: 'Randomised trial of automated texting', href: 'https://pubmed.ncbi.nlm.nih.gov/38564221/'},
];

export const companies: CompanyCase[] = [
  {
    id: 'carpl', name: 'CARPL.ai', role: 'Radiology AI infrastructure',
    data: 'Hospital imaging, local validation datasets and AI outputs.',
    use: 'The platform lets radiology teams test, deploy and monitor tools from multiple vendors through one integration.',
    evidence: 'I-MED Radiology in Australia confirms integration. University Hospitals in Cleveland signed a multiyear agreement for AI validation and deployment.',
    check: 'Can it show how a specific model performs on local images and whether it still performs after a scanner or model update?',
    sources: [
      {label: 'I-MED network presentation, p. 12', href: 'https://www.jardines.com/content/dam/jardines/corporate/documents/investors/reports---presentations/2026/IMED%20-%20JM%20INVESTOR%20DAY%20PDF.pdf.downloadasset.pdf#page=12'},
      {label: 'University Hospitals agreement', href: 'https://carpl.ai/news/university-hospitals-uses-carplai-as-the-ai-validation-and-deployment-partner'},
    ],
  },
  {
    id: 'qure', name: 'Qure.ai', role: 'Chest X-ray screening and triage',
    data: 'Digital chest X-rays. For a TB evaluation, link the screening score to a reference result and follow-up.',
    use: 'qXR uses image analysis to flag findings. In a TB pathway, an abnormal screen can prompt evaluation and confirmatory testing.',
    evidence: 'PATH documented qXR in a Nagpur TB case-finding programme. Qure.ai reports use at more than 3,500 TB screening sites globally.',
    check: 'After a flag, what proportion completes testing? Who is missing from that measure, and how does it vary by site?',
    sources: [
      {label: 'PATH implementation study', href: 'https://pubmed.ncbi.nlm.nih.gov/38060461/'},
      {label: 'Qure.ai deployment figures', href: 'https://www.qure.ai/global-health'},
      {label: 'WHO policy on AI-assisted TB screening', href: 'https://www.who.int/publications/i/item/9789240110373'},
    ],
  },
  {
    id: 'niramai', name: 'NIRAMAI', role: 'Thermal sensing and image analysis',
    data: 'Breast temperature maps. The company describes using corresponding mammography, ultrasound and available histopathology reports in training.',
    use: 'Thermalytix applies AI to temperature patterns. Indian breast imaging, radiology and surgery societies discourage breast thermography with or without AI for routine screening or adjunctive diagnosis.',
    evidence: 'A NITI Aayog case study reports over 100,000 women screened. A multicentre study evaluated the tool in symptomatic women.',
    check: 'What would an independent comparison in the intended population need to show before the pathway changed?',
    sources: [
      {label: 'NITI Aayog case study', href: 'https://frontiertech.niti.gov.in/story/niramais-ai-is-redefining-breast-cancer-screening/'},
      {label: 'Multicentre study', href: 'https://pubmed.ncbi.nlm.nih.gov/34667011/'},
      {label: 'Indian clinical societies’ position', href: 'https://www.bisi.co.in/wp-content/uploads/2023/01/POSITION-STATEMENT-ON-THERMOGRAPHY.pdf'},
    ],
  },
  {
    id: 'wysa', name: 'Wysa', role: 'Conversational mental-health support',
    data: 'User-entered conversations, questionnaire responses and information people share when asking for support.',
    use: 'Wysa offers guided self-help. Its Gateway product collects information for mental health referrals and can flag concerns for the service team to review.',
    evidence: 'Lancashire and South Cumbria NHS Foundation Trust offers Wysa as a referral route. Wysa reports that over 185,000 patients have used Gateway in NHS Talking Therapies.',
    check: 'Who reviews a flag, how quickly do people reach a clinician, and can patients use a phone route if digital intake is hard for them?',
    sources: [
      {label: 'NHS referral service', href: 'https://www.lscft.nhs.uk/services/talking-therapies-LSC/accessing-support'},
      {label: 'Wysa Gateway usage figures', href: 'https://www.wysa.com/gateway'},
    ],
  },
  {
    id: 'tricog', name: 'Tricog Health', role: 'Emergency cardiology and ECG interpretation',
    data: '12-lead ECGs, time stamps, clinical interpretation and referral and treatment events.',
    use: 'InstaECG combines automated ECG interpretation with remote clinical review. Local teams use the report to triage suspected heart attacks and coordinate transfer when needed.',
    evidence: 'Tricog reports more than 1.4 million ECGs across Karnataka’s state heart attack programme from March 2023 to May 2026.',
    check: 'When a remote facility gets a critical reading, who arranges transfer, and how long does it take the patient to reach treatment?',
    sources: [
      {label: 'Karnataka programme launch', href: 'https://tricog.com/news/government-of-karnataka-launches-stemi-program-in-partnership-with-tricog-health/'},
      {label: 'Tricog’s state programme figures', href: 'https://tricog.com/stemi-programmes-68508-heart-attacks-caught-in-minutes/'},
    ],
  },
  {
    id: 'remidio', name: 'Remidio', role: 'Diabetic retinopathy screening',
    data: 'Retinal photographs, image quality, specialist grading and referral outcomes.',
    use: 'The Medios AI system reads images from a portable smartphone-based retinal camera. It can work offline in community settings.',
    evidence: 'A Punjab primary-care study evaluated offline Medios AI in community screening. A NITI Aayog case study reports Remidio’s wider imaging deployment at 450 Indian health centres.',
    check: 'Who follows up when an image is hard to grade or a patient cannot reach the eye clinic?',
    sources: [
      {label: 'Punjab implementation study', href: 'https://www.nature.com/articles/s41598-025-25402-9'},
      {label: 'NITI Aayog case study', href: 'https://frontiertech.niti.gov.in/story/the-future-of-health-through-the-eye-a-novel-ai-tool-advances-early-diagnosis-for-patients-globally/'},
    ],
  },
  {
    id: 'periwinkle', name: 'Periwinkle Technologies', role: 'Cervical screening and referral',
    data: 'Cervical images, expert assessment, and colposcopy and biopsy results where available.',
    use: 'Smart Scope CX captures images for AI-assisted triage and remote specialist review in primary care.',
    evidence: 'A multicentre Indian feasibility study screened 871 women. The company’s Bharat Innovates profile reports more than 450,000 screenings across the wider device programme.',
    check: 'How many women with a flagged or inconclusive screen complete assessment, and how will the team track missed referrals?',
    sources: [
      {label: 'Multicentre feasibility study', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12999539/'},
      {label: 'Bharat Innovates deployment profile', href: 'https://www.ugc.gov.in/pdfnews/9774173_Bharat-Innovates-2026.pdf'},
    ],
  },
  {
    id: 'sigtuple', name: 'SigTuple', role: 'Digital microscopy and haematology',
    data: 'Digitised peripheral blood-smear images and cell classifications reviewed by lab staff.',
    use: 'AI100 with Shonit automates slide imaging and assists lab teams with blood-cell classification and morphology review.',
    evidence: 'SigTuple reports 350+ deployments and a rollout at Dr Lal PathLabs. The US FDA lists 510(k) clearance for AI100 with Shonit.',
    check: 'Which findings require manual review, and what happens to turnaround time during a busy lab shift?',
    sources: [
      {label: 'SigTuple rollout and deployments', href: 'https://sigtuple.com/about/'},
      {label: 'US FDA device listing', href: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPMN/pmn.cfm?ID=K221309'},
    ],
  },
  {
    id: 'deeptek', name: 'DeepTek', role: 'TB screening and radiology workflow',
    data: 'Chest radiographs, imaging quality, radiologist review and follow-up test results.',
    use: 'Genki Edge flags possible TB on chest X-rays. Augmento integrates imaging AI into the radiology workflow.',
    evidence: 'DeepTek reports a TB rollout in Chennai and Augmento implementation in five Singapore public hospitals. Genki Edge met WHO performance considerations for TB screening.',
    check: 'When equipment or patient populations differ across sites, what threshold keeps the confirmatory testing workload manageable?',
    sources: [
      {label: 'Chennai rollout', href: 'https://www.deeptek.ai/aboutus'},
      {label: 'Singapore implementation', href: 'https://www.deeptek.ai/impact-details?id=39'},
      {label: 'TB software performance evaluation', href: 'https://doi.org/10.1183/23120541.00215-2026'},
    ],
  },
  {
    id: 'oncostem', name: 'OncoStem Diagnostics', role: 'Breast cancer recurrence risk',
    data: 'Tumour protein biomarkers, tumour size, grade, lymph-node status and follow-up outcomes.',
    use: 'CanAssist Breast estimates the risk of distant recurrence in eligible patients with early-stage breast cancer. Oncologists use the result as one input when discussing treatment.',
    evidence: 'NITI Aayog reports use by more than 1,500 doctors in five countries. Business Standard reported over 12,000 patients tested and about 3,000 tests a year in September 2026.',
    check: 'For which patients would a score change the discussion, and how would the team explain the result and its uncertainty?',
    sources: [
      {label: 'NITI Aayog case study', href: 'https://frontiertech.niti.gov.in/story/canassist-breast-cab-how-ai-could-transform-breast-cancer-treatment-at-scale/'},
      {label: 'Testing volume and clinical scope', href: 'https://www.business-standard.com/amp/industry/news/oncostem-eyes-wider-access-to-breast-cancer-risk-test-with-hospital-use-kit-126090400602_1.html'},
    ],
  },
  {
    id: 'brainsightai', name: 'BrainSightAI', role: 'Brain mapping and neurosurgical planning',
    data: 'Structural and functional MRI, imaging quality and specialist interpretation.',
    use: 'VoxelBox processes MRI data to map brain connectivity and help specialists plan surgery.',
    evidence: 'PATH documented deployments in 20 hospitals, with further clinical studies and commercial discussions underway at the time of its report.',
    check: 'Does the map change a surgical plan, and who checks whether local scanner protocols produce images the software can use?',
    sources: [
      {label: 'PATH deployment report', href: 'https://media.path.org/documents/PhixAi_Final_Report_Jan_2_2026_compressed.pdf'},
    ],
  },
  {
    id: 'doto-health', name: 'Doto Health', role: 'Maternal and fetal monitoring',
    data: 'Maternal and fetal signals, signal quality, time stamps and follow-up assessments.',
    use: 'FetoMax and Nurtura capture signals and flag potential complications for frontline workers or labour-room teams.',
    evidence: 'A NITI Aayog case study reports around 1 million pregnancies monitored across the device programme, with installations in 33 Indian states and union territories.',
    check: 'When a frontline worker receives a risk flag, who confirms the reading and gets the patient to the right facility?',
    sources: [
      {label: 'NITI Aayog monitoring and deployment case', href: 'https://frontiertech.niti.gov.in/story/using-tech-to-support-labor-and-birthing-rooms-the-ai-powered-devices-that-screened-1-million-pregnancies-across-india/'},
    ],
  },
  {
    id: 'cloudphysician', name: 'Cloudphysician', role: 'Critical care and virtual nursing',
    data: 'Bedside vital signs, clinical records, audio and video, and response logs.',
    use: 'RADAR connects hospital teams to remote intensive-care specialists. AI tools support documentation and other tasks within the tele-ICU service.',
    evidence: 'A Google Cloud case study reports that Cloudphysician’s virtual nursing service supports more than 200 hospitals. That figure covers the full service.',
    check: 'When the remote team spots a concern, who acts at the bedside and what is the fallback during a connectivity outage?',
    sources: [
      {label: 'NITI Aayog tele-ICU case', href: 'https://frontiertech.niti.gov.in/story/cloudphysicians-radar-system-delivers-24-7-critical-care-anywhere-in-india/'},
      {label: 'Google Cloud case study', href: 'https://cloud.google.com/customers/cloudphysician'},
    ],
  },
  {
    id: 'healthplix', name: 'HealthPlix', role: 'Multilingual outpatient documentation',
    data: 'Consultation audio and transcripts, with clinician-approved records as a check on accuracy.',
    use: 'HALO transcribes the consultation and structures the resulting draft for the clinician to review in the electronic medical record.',
    evidence: 'Sarvam describes its live integration with HALO and reports that the wider HealthPlix record system serves more than 14,000 doctors.',
    check: 'How often does the draft get a medicine, dose or negation wrong when the doctor and patient switch languages?',
    sources: [
      {label: 'Sarvam implementation case study', href: 'https://azure-staging.sarvam.ai/stories/healthplix'},
      {label: 'NABH software profile', href: 'https://nabh.co/software/healthplix/'},
    ],
  },
  {
    id: 'fitterfly', name: 'Fitterfly', role: 'Type 2 diabetes self-management',
    data: 'Meal photos and food entries. The wider programme also uses glucose readings and coaching notes.',
    use: 'Klik suggests meal entries from photos that a person can review, making routine food logging easier.',
    evidence: 'Google Cloud documents the live AI feature. A published study evaluated the broader programme, which combined glucose monitoring and coaching.',
    check: 'Does photo logging work for regional and mixed dishes, and do people keep logging after the first few weeks?',
    sources: [
      {label: 'AI meal-logging implementation', href: 'https://cloud.google.com/customers/fitterfly'},
      {label: 'Published diabetes programme evaluation', href: 'https://diabetes.jmir.org/2023/1/e43292'},
    ],
  },
];
