'use client';

import type {FormEvent} from 'react';
import {Activity, ArrowRight, ArrowUpRight, ChevronDown, Compass, Download, Globe, Landmark, Sun, UsersRound, Workflow} from 'lucide-react';

const forces = [
  {
    icon: Workflow, name: 'Technology and infrastructure',
    signal: 'Prototypes get cheaper as AI, APIs and shared standards lower the effort of building a first version.',
    response: 'Use synthetic records to mock up a referral form that carries the necessary fields across two systems.',
    check: 'Look for reliable integration and maintenance costs. Ask who will own the service after the demo.',
    source: ['National Health Authority · Ayushman Bharat Digital Mission', 'https://abdm.gov.in/'],
  },
  {
    icon: UsersRound, name: 'Demographics and caregiving',
    signal: 'Population ageing and changing household arrangements shift who needs support and who can provide it.',
    response: 'Observe who helps patients prepare for a visit. Try a simpler pre-visit checklist that works over the phone.',
    check: 'Compare completion for people with and without caregiver support.',
    source: ['WHO · Ageing and health', 'https://www.who.int/news-room/fact-sheets/ageing-and-health'],
  },
  {
    icon: Activity, name: 'Workforce and cost',
    signal: 'Staffing gaps and rising costs put pressure on the time available for direct care.',
    response: 'Observe one shift handover. Try a standard format that makes pending actions and their owners visible.',
    check: 'Compare handover time and missed actions. Check whether another team picks up extra work.',
    source: ['WHO · Health workforce', 'https://www.who.int/health-topics/health-workforce'],
  },
  {
    icon: Landmark, name: 'Policy and supply chains',
    signal: 'New purchasing rules, reimbursement terms and supplier disruptions can change what a service can afford or deliver.',
    response: 'Rehearse what a procurement team would do if a critical consumable went on back order.',
    check: 'Review supplier lead times, the purchasing terms and the approval process for substitutes.',
  },
  {
    icon: Sun, name: 'Climate and physical risk',
    signal: 'Heat and extreme weather affect travel, staff capacity and supply deliveries.',
    response: 'Run a tabletop exercise with ward and transport teams using a local heat alert. Rehearse who contacts patients whose visits may be affected.',
    check: 'Track how quickly the team identifies affected patients and check who might be missed.',
    source: ['India Meteorological Department · District heatwave warnings', 'https://mausam.imd.gov.in/responsive/districtWiseHeatwaveWarnings.php'],
  },
  {
    icon: Globe, name: 'Expectations and trust',
    signal: 'People bring habits from banking and delivery apps into healthcare. They expect visibility and control over what happens next.',
    response: 'Mock up a referral status update with a clear next action and a phone option.',
    check: 'Ask patients to explain what they would do next. Include people using shared phones or a different language.',
  },
];

const method = [
  ['Notice', 'Find a repeated workaround, delay or point of confusion.'],
  ['Verify', 'Check what changed and how widely it works.'],
  ['Translate', 'Link it to a job your team struggles to do.'],
  ['Test', 'Try one change and decide what to do with the result.'],
];

const fields = [
  {name: 'problem', label: 'Who has the problem, and what did you observe?', placeholder: 'Name one role or group, one task and a repeated point of friction.'},
  {name: 'signal', label: 'Which outside signal makes a change possible?', placeholder: 'Record what changed and where you verified it.'},
  {name: 'test', label: 'What could you test, where and with whom?', placeholder: 'Name the owner, the smallest useful change and the time window.'},
  {name: 'measures', label: 'What result and guardrail will you track?', placeholder: 'Include the current baseline, a target and an outcome you need to protect.'},
  {name: 'decision', label: 'When will you decide whether to stop, adapt or expand?', placeholder: 'Name the review date and what would change your decision.'},
];

function PilotPlan() {
  function downloadPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const answers = new FormData(form);
    for (const {name} of fields) {
      const field = form.elements.namedItem(name);
      if (field instanceof HTMLTextAreaElement && !field.value.trim()) {
        field.value = '';
        field.reportValidity();
        return;
      }
    }
    const lines = fields.flatMap(({name, label}) => [label, String(answers.get(name)).trim(), '']);
    const blob = new Blob([['Workplace innovation pilot', '', ...lines].join('\n')], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workplace-innovation-pilot.txt';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <form className="innovation-form" onSubmit={downloadPlan} aria-describedby="innovation-form-note">
      <h3>Your pilot plan</h3>
      <p id="innovation-form-note">Use role names and aggregate observations. This form downloads your plan to your device.</p>
      {fields.map(({name, label, placeholder}) => (
        <label key={name}>
          {label}
          <textarea name={name} rows={2} maxLength={700} placeholder={placeholder} required/>
        </label>
      ))}
      <button className="btn primary" type="submit"><Download size={17} aria-hidden="true"/>Download my plan</button>
    </form>
  );
}

export default function Innovation() {
  return (
    <main id="main" className="innovation">
      <section className="innovation-hero" aria-labelledby="innovation-title">
        <div className="wrap innovation-hero-grid">
          <div>
            <p className="course"><span className="rule"/>IIM Lucknow · Care Journey Atlas</p>
            <h1 id="innovation-title">Innovation at <em>work.</em></h1>
            <p>What is changing outside your organisation, and which problem inside it could you solve differently?</p>
            <div className="heroactions">
              <a className="btn lime" href="#innovation-forces">Explore the forces <ArrowRight size={17} aria-hidden="true"/></a>
              <a className="btn ghost" href="#innovation-pilot">Plan a pilot</a>
            </div>
          </div>
          <ol className="innovation-method" aria-label="From signal to workplace experiment">
            {method.map(([label, detail]) => <li key={label}><strong>{label}</strong><span>{detail}</span></li>)}
          </ol>
        </div>
      </section>

      <div className="wrap innovation-content">
        <section id="innovation-forces" aria-labelledby="innovation-forces-title">
          <h2 id="innovation-forces-title">Six forces shaping work</h2>
          <p>Pick two forces that could change your team’s work over the next year. Look for a specific event, a local indicator or a change in behaviour you can verify.</p>
          <div className="innovation-grid">
            {forces.map(({icon: Icon, name, signal, response, check, source}) => (
              <article className="innovation-force topic-card" key={name}>
                <div className="topic-summary">
                  <Icon size={23} aria-hidden="true"/>
                  <h3>{name}</h3>
                  <p>{signal}</p>
                </div>
                <details>
                  <summary>Apply it at work <ChevronDown size={16} aria-hidden="true"/></summary>
                  <div className="topic-detail">
                    <h4>A small test</h4><p>{response}</p>
                    <h4>What to check</h4><p>{check}</p>
                    {source && <ul><li><a href={source[1]} target="_blank" rel="noreferrer">{source[0]} <ArrowUpRight size={13} aria-hidden="true"/></a></li></ul>}
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="innovation-scan-title">
          <h2 id="innovation-scan-title">A weekly scan you can keep up</h2>
          <p>Set aside 30 minutes for a question your team already cares about, such as why referrals take so long to close.</p>
          <div className="innovation-scan">
            <article>
              <h3>10 min · Read an original source</h3>
              <p>Check a regulator’s notice, a research paper, an official dataset or a peer’s implementation report. Record the date, what changed and who has used it.</p>
            </article>
            <article>
              <h3>10 min · Talk to someone close to the work</h3>
              <p>Ask a colleague, patient or partner what they had to work around this week. Ask a peer what their team does today that few others do, and what convinced them it works. Check what you hear against local data.</p>
            </article>
            <article>
              <h3>10 min · Decide what to do</h3>
              <p>Write down which task could change, what would have to be true locally, and who will follow up. Choose whether to watch, investigate or run a small test.</p>
            </article>
          </div>
          <div className="innovation-callout">
            <Compass size={22} aria-hidden="true"/>
            <p><strong>How far has it travelled?</strong> Ask whether you are seeing a demo, a pilot in a comparable setting or routine use. Look for evidence of adoption, costs and failures at each stage. If you use AI to scan sources, open the original and verify the conclusion before acting.</p>
          </div>
        </section>

        <section aria-labelledby="innovation-stories-title">
          <h2 id="innovation-stories-title">Two ways to find an opening</h2>
          <p>An experiment becomes a workplace innovation when people adopt a better way of working. Both stories start by borrowing an idea and adapting it through trial and error.</p>
          <div className="innovation-stories">
            <article>
              <p className="meta">From Innovation: What and How? · 2021</p>
              <h3>What became easier with web video?</h3>
              <p>Sachin’s Adobe story follows streaming tools as they became available to people building for the web. The opportunity was to work out what people would do once video became easier to publish and share.</p>
              <p><strong>Ask your team</strong> Which capability recently became accessible enough for us to use, and whose work could it change?</p>
            </article>
            <article>
              <p className="meta">From Vibe Coding · 2026</p>
              <h3>Where did the medication instructions get lost?</h3>
              <p>The DawaiSathi field challenge starts with family members passing instructions along and trying to remember what has already been given. It asks teams to observe the handoff, write the requirements and then prototype. AI helps build a mock-up. Caregivers and clinical staff help judge whether it fits the work.</p>
              <p><strong>Ask your team</strong> Which workaround would we need to see in person before we could design a better handoff?</p>
            </article>
          </div>
        </section>

        <section id="innovation-pilot" aria-labelledby="innovation-pilot-title">
          <h2 id="innovation-pilot-title">From one signal to a workplace test</h2>
          <p>In pairs, take eight minutes. Spend two on a real problem, four sketching a test and two checking what would persuade your team to adopt it.</p>
          <div className="innovation-workshop">
            <article className="innovation-example">
              <p className="meta">Worked example · Illustrative</p>
              <h3>Referral status at an outpatient clinic</h3>
              <dl>
                <div><dt>Problem and signal</dt><dd>Patients call to ask whether their referral has reached the specialist. Status updates are familiar from delivery services, and the clinic can try the idea using its existing callback process.</dd></div>
                <div><dt>Test</dt><dd>The referral coordinator tries a callback checklist with one clinic for two weeks. The coordinator confirms where the referral stands, who should act next and when.</dd></div>
                <div><dt>Measure and guardrail</dt><dd>Compare repeat status calls per 100 referrals with the previous two weeks. Aim for a 20% reduction. Check that the share booked or redirected within seven days holds steady. Track staff minutes and reach for patients who need language or phone support.</dd></div>
                <div><dt>Decision</dt><dd>One week after the pilot closes, the clinic lead reviews the results. Consider a second clinic if the target is met and timely booking, staff time and reach hold steady or improve. Otherwise, revise the checklist or stop the test.</dd></div>
              </dl>
              <a href="https://www.ihi.org/library/model-for-improvement" target="_blank" rel="noreferrer">IHI · Model for Improvement <ArrowUpRight size={14} aria-hidden="true"/></a>
            </article>
            <PilotPlan/>
          </div>
          <p className="innovation-share">Found a need your colleagues might recognise? <a href="/?view=board">Share the need on the board</a>.</p>
        </section>
      </div>
    </main>
  );
}
