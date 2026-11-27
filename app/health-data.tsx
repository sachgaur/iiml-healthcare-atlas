'use client';

import {useEffect, useRef, useState} from 'react';
import {
  Activity, BookOpen, ClipboardList, Database, FlaskConical, HeartPulse, House,
  Link2, MessagesSquare, Microscope, MonitorSmartphone, RotateCcw, ScanLine, ShieldCheck,
} from 'lucide-react';
import {ComicDecision, ComicPanel} from './comic';
import PatientDataProtection from './patient-data-protection';
import {applications, companies, dataSources, dozeeCase, followUpEvidence, transformationSteps} from '../lib/health-data';
import type {Decision, Panel} from '../lib/comic';

const sourceIcons = [HeartPulse, ClipboardList, Microscope, Activity, House];
const stepIcons = [MonitorSmartphone, Link2, Database, ShieldCheck];
const applicationIcons = [Activity, ScanLine, MessagesSquare, HeartPulse, ClipboardList, FlaskConical];

type Selection = {group: 'source' | 'step' | 'application'; index: number};

const campPanel: Panel = {
  image: 'lab-handoff',
  alt: 'Asha and Prof Venkat visit a laboratory coordinator at her desk.',
  caption: 'Back at the lab in Asha’s fictional Delhi screening story.',
  dialogue: [
    {speaker: 'Asha', line: 'The camp has Imran’s X-ray and the screening score. Can we use the score to teach another model who had TB?'},
    {speaker: 'Prof Venkat', line: 'What would tell you whether he actually had TB? What would you record if his sample never arrived?'},
  ],
};

const campDecision: Decision = {
  question: 'How should Asha record a missing molecular test?',
  choices: [
    {
      label: 'Mark it negative. The lab has no positive result.',
      reply: 'A missing result tells us the status is unknown. How would marking it negative affect the model’s evaluation if people with worse access are more likely to miss testing?',
    },
    {
      label: 'Use the AI screening score as the reference label.',
      reply: 'That makes the screening model the judge of its own result. What independent evidence would let you find its mistakes?',
    },
    {
      label: 'Record the result as unknown and trace where follow-up stopped.',
      reply: 'Now the team can find missing samples and study who reaches testing. For model evaluation, define an independent reference and check how incomplete testing could bias the results.',
    },
  ],
  discussion: 'Who owns the follow-up list? Which patients might never appear in the dataset, and how would you find out?',
};

function SourceLinks({items}: {items: {label: string; href: string}[]}) {
  return (
    <ul className="data-links">
      {items.map(({label, href}) => (
        <li key={href}>
          <a href={href} target={href.startsWith('https:') ? '_blank' : undefined} rel={href.startsWith('https:') ? 'noreferrer' : undefined}>{label}</a>
        </li>
      ))}
    </ul>
  );
}

const followUpOptions = [
  {label: 'Nurse calls', feedback: 'A nurse can clarify an answer on the call. As volume grows, check how many patients the team can reach and how much time it has to close each case.'},
  {label: 'Scripted automated calls', feedback: 'A fixed script can capture standard answers consistently. Give people an easy route to a nurse when the script cannot handle their answer.'},
  {label: 'AI-assisted calls with nurse review', feedback: 'A voice model could handle free-form answers and draft a summary. The nurse owns review and escalation. Test across the languages used by patients and compare summaries with the original responses.'},
];

function FollowUpCase() {
  const [workflow, setWorkflow] = useState<number | null>(null);

  return (
    <section id="data-follow-up" className="data-section" aria-labelledby="data-follow-up-title">
      <div className="data-section-heading">
        <p className="data-kicker"><ClipboardList size={18} aria-hidden="true"/> Recover &amp; review · Fictional case</p>
        <h2 id="data-follow-up-title">Who owns the follow-up call?</h2>
        <p>Meera goes home after knee replacement. The hospital has a signed discharge plan, her preferred language, and a follow-up list. It wants to reach more patients in the first three days.</p>
      </div>
      <div className="data-case-card">
        <fieldset>
          <legend>Which workflow would you pilot?</legend>
          <div className="data-case-options">
            {followUpOptions.map(({label}, index) => (
              <button key={label} type="button" aria-pressed={workflow === index} aria-controls="data-follow-up-feedback data-follow-up-exceptions"
                onClick={() => setWorkflow(index)}>{label}</button>
            ))}
          </div>
        </fieldset>
        <div id="data-follow-up-feedback" role="status">
          {workflow !== null && <p className="data-case-feedback">{followUpOptions[workflow].feedback}</p>}
        </div>
        <div id="data-follow-up-exceptions" hidden={workflow === null}>
          <h3>Who handles each exception?</h3>
          <dl className="data-case-exceptions">
            <div><dt>A relative answers the shared phone.</dt><dd>Verify identity and permission before sharing details. The discharge team owns a callback through the agreed channel.</dd></div>
            <div><dt>The answer is ambiguous.</dt><dd>Keep the original response available to the reviewing nurse under the hospital’s access rules. The nurse clarifies and uses the existing escalation pathway.</dd></div>
            <div><dt>No one answers.</dt><dd>Record the attempt as unresolved. The discharge team owns the retry or alternative contact and records the outcome.</dd></div>
          </dl>
        </div>
      </div>

      <div id="data-review-draft" className="data-case-card">
        <h3>Review the AI draft</h3>
        <dl className="data-case-exceptions data-draft-comparison">
          <div><dt>Signed discharge plan</dt><dd>“The follow-up visit has moved from Friday to Monday at 10 am. The team will arrange a transport callback.”</dd></div>
          <div><dt>Draft message to Meera</dt><dd>“We hope you’re settling in well. We’ll call you about transport for your follow-up appointment.”</dd></div>
        </dl>
        <details>
          <summary>What did the draft miss, and who should sign off?</summary>
          <p>It omits the new day and time. The designated nurse checks it against the signed plan, corrects and approves the message, then records what was sent and whether Meera received it.</p>
        </details>
      </div>

      <div id="data-follow-up-pilot" className="data-case-card">
        <h3>Would you fund the pilot?</h3>
        <p>Compare the proposal with the hospital’s current nurse calls. These numbers are illustrative. Agree the review window before starting.</p>
        <table className="data-case-table">
          <thead><tr><th scope="col">Measure</th><th scope="col">Current</th><th scope="col">Pilot</th></tr></thead>
          <tbody>
            <tr><th scope="row">Follow-up completed by day 3, out of all eligible patients</th><td>65/100</td><td>78/100</td></tr>
            <tr><th scope="row">Flagged cases reviewed within the agreed window</th><td>18/20</td><td>17/20</td></tr>
            <tr><th scope="row">Staff minutes per resolved case, including review and retries</th><td>8</td><td>6</td></tr>
          </tbody>
        </table>
        <p>Compare completion by language and phone access. The nurse lead owns the review queue and the team audits whether it missed cases that should have been flagged. What result would make you pause?</p>
        <p><a href="#data-protection">Check the data protection and downtime decisions before approving the pilot</a></p>
      </div>

      <p className="data-study-note"><strong>What the research measured.</strong> Reviewers rated written chatbot replies in the JAMA Internal Medicine study. An automated-call study tracked reach and reported concerns. In a separate randomised trial, automated texting did not significantly reduce 30-day emergency visits or readmissions.</p>
      <SourceLinks items={[...followUpEvidence, {label: 'Follow-up teaching slides', href: '/resources/lecture-guide.pdf#page=29'}]}/>
    </section>
  );
}

function MapDetail({selection}: {selection: Selection}) {
  if (selection.group === 'source') {
    const source = dataSources[selection.index];
    return <>
      <h3>{source.stage}</h3>
      <dl><div><dt>What care generates</dt><dd>{source.record}</dd></div><div><dt>What makes it usable</dt><dd>{source.quality}</dd></div></dl>
      <SourceLinks items={source.links}/>
    </>;
  }
  if (selection.group === 'step') {
    const step = transformationSteps[selection.index];
    return <>
      <h3>{step.label}</h3>
      <dl><div><dt>What the team changes</dt><dd>{step.change}</dd></div><div><dt>What the team checks</dt><dd>{step.check}</dd></div></dl>
      {step.links && <SourceLinks items={step.links}/>}
    </>;
  }
  const application = applications[selection.index];
  return <>
    <h3>{application.question}</h3>
    <dl>
      <div><dt>Data needed</dt><dd>{application.data}</dd></div>
      <div><dt>Example</dt><dd>{application.example}</dd></div>
      <div><dt>What to measure</dt><dd>{application.measure}</dd></div>
    </dl>
    {application.links && <SourceLinks items={application.links}/>}
  </>;
}

export default function HealthData() {
  const [selection, setSelection] = useState<Selection>({group: 'step', index: 1});
  const details = useRef<HTMLDivElement>(null);
  const selectedControl = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const target = location.hash.slice(1);
    if (target.startsWith('data-')) document.getElementById(target)?.scrollIntoView();
  }, []);

  function select(group: Selection['group'], index: number, control: HTMLButtonElement) {
    setSelection({group, index});
    selectedControl.current = control;
    requestAnimationFrame(() => {
      const detail = details.current;
      if (!detail) return;
      if (window.matchMedia('(max-width: 820px)').matches) {
        detail.focus({preventScroll: true});
        detail.scrollIntoView({block: 'start'});
      } else if (detail.getBoundingClientRect().top > window.innerHeight - 100) {
        detail.scrollIntoView({block: 'nearest'});
      }
    });
  }

  function pressed(group: Selection['group'], index: number) {
    return selection.group === group && selection.index === index;
  }

  return (
    <main id="main" className="atlas-comic data-atlas" aria-labelledby="data-title">
      <header className="data-hero">
        <div className="wrap data-hero-inner">
          <div>
            <p className="data-kicker"><Database size={18} aria-hidden="true"/> Digital transformation in healthcare</p>
            <h1 id="data-title">Health data and <em>the AI gold rush</em></h1>
          </div>
          <div className="data-hero-note">
            <p>At every step of care, someone records a symptom, a result, a decision or an outcome. Digital transformation connects those records and changes who can act on them. That is what makes them valuable for care today and for building and testing AI.</p>
            <nav aria-label="Data and AI sections">
              <a href="#data-companies">Indian companies</a>
              <a href="#data-comic">Asha’s case</a>
              <a href="#data-follow-up">Discharge follow-up</a>
              <a href="#data-protection">Cybersecurity &amp; data protection</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="wrap data-content">
        <section id="data-map" aria-labelledby="data-map-title">
          <div className="data-section-heading">
            <h2 id="data-map-title">From care to data to AI</h2>
            <p>Select a care stage, a transformation step or an AI application to see what it takes to make the connection.</p>
          </div>
          <div className="data-map">
            <div className="data-map-columns">
              <div className="data-map-column data-map-care">
                <h3>Care generates data</h3>
                <ul>
                  {dataSources.map((source, index) => {
                    const Icon = sourceIcons[index];
                    return <li key={source.stage}><button type="button" aria-pressed={pressed('source', index)} aria-controls="data-map-detail" onClick={event => select('source', index, event.currentTarget)}>
                      <Icon size={20} aria-hidden="true"/><span><strong>{source.stage}</strong><small>{source.label}</small></span>
                    </button></li>;
                  })}
                </ul>
              </div>

              <div className="data-map-column data-map-transform">
                <h3>Digital transformation</h3>
                <ol>
                  {transformationSteps.map((step, index) => {
                    const Icon = stepIcons[index];
                    return <li key={step.label}><button type="button" aria-pressed={pressed('step', index)} aria-controls="data-map-detail" onClick={event => select('step', index, event.currentTarget)}>
                      <Icon size={20} aria-hidden="true"/><span><strong>{step.label}</strong><small>{step.short}</small></span>
                    </button></li>;
                  })}
                </ol>
              </div>

              <div className="data-map-column data-map-ai">
                <h3>What AI can help with</h3>
                <ul>
                  {applications.map((application, index) => {
                    const Icon = applicationIcons[index];
                    return <li key={application.label}><button type="button" aria-pressed={pressed('application', index)} aria-controls="data-map-detail" onClick={event => select('application', index, event.currentTarget)}>
                      <Icon size={20} aria-hidden="true"/><span><strong>{application.label}</strong></span>
                    </button></li>;
                  })}
                </ul>
              </div>
            </div>

            <div className="data-feedback">
              <RotateCcw size={23} aria-hidden="true"/>
              <p><strong>Back to care.</strong> Track what clinicians did, what changed for patients and who was missed. Use the findings to improve the workflow and decide whether the model needs revalidation.</p>
            </div>
          </div>
          <div id="data-map-detail" ref={details} tabIndex={-1} className="data-map-detail" aria-label="Selected map item">
            <div aria-live="polite" aria-atomic="true"><MapDetail selection={selection}/></div>
            <a className="data-return" href="#data-map" onClick={event => {
              if (!selectedControl.current) return;
              event.preventDefault();
              selectedControl.current.focus();
            }}>Back to map choices</a>
          </div>
        </section>

        <section id="data-companies" className="data-section" aria-labelledby="data-companies-title">
          <div className="data-section-heading">
            <h2 id="data-companies-title">Indian healthcare AI in practice</h2>
            <p>See what each product uses, where it has been deployed and what your team would need to check before adopting it.</p>
            <nav aria-label="Jump to a company">
              <SourceLinks items={[...companies.map(({id, name}) => ({label: name, href: `#data-${id}`})), dozeeCase]}/>
            </nav>
            <p><a href="/resources/lecture-guide.pdf#page=36">Open the teaching slides for these cases</a></p>
          </div>
          <div className="data-companies">
            {companies.map(company => (
              <article className="data-company" id={`data-${company.id}`} key={company.id}>
                <p className="data-company-role">{company.role}</p>
                <h3>{company.name}</h3>
                <dl>
                  <div><dt>Data</dt><dd>{company.data}</dd></div>
                  <div><dt>What the product does</dt><dd>{company.use}</dd></div>
                  <div><dt>Deployment and evidence</dt><dd>{company.evidence}</dd></div>
                  <div><dt>Ask before adopting</dt><dd>{company.check}</dd></div>
                </dl>
                <SourceLinks items={company.sources}/>
              </article>
            ))}
          </div>
        </section>

        <section id="data-comic" className="data-section" aria-labelledby="data-comic-title">
          <div className="data-section-heading">
            <p className="data-kicker"><BookOpen size={18} aria-hidden="true"/> Asha and Prof Venkat</p>
            <h2 id="data-comic-title">The case of the missing label</h2>
          </div>
          <div className="data-comic-layout">
            <ComicPanel panel={campPanel}/>
            <ComicDecision decision={campDecision}/>
          </div>
          <p className="data-study-note"><strong>From the Delhi programme.</strong> Of 18,377 people with presumed TB, 16,866 completed molecular testing. The remaining 1,511 show why a screening record and a recorded test outcome tell you different things.</p>
          <SourceLinks items={[
            {label: 'Read the original comic chapter', href: '/?view=comic#comic-investigate'},
            {label: 'Explore the Delhi study', href: 'https://pubmed.ncbi.nlm.nih.gov/42790968/'},
          ]}/>
        </section>

        <FollowUpCase/>
        <PatientDataProtection/>

        <section className="data-fieldwork" aria-labelledby="data-fieldwork-title">
          <div>
            <h2 id="data-fieldwork-title">What would you change first?</h2>
            <p>Choose a handoff from your organisation. Sketch where a record is made, where it goes and who acts. Use an example without identifiable patient information.</p>
            <a className="comic-action" href="/?view=board"><MessagesSquare size={18} aria-hidden="true"/> Open the Needs board</a>
          </div>
          <ol>
            <li>Name the care decision you want to improve and the person responsible for it.</li>
            <li>Pick the least data needed. Say who might be missing and how you would check.</li>
            <li>Propose one workflow change and a measure of whether patients benefit. Decide what evidence would justify testing AI next.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
