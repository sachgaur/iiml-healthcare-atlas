'use client';

import {useEffect, useState} from 'react';
import {BookOpen, ChevronDown, MessagesSquare, NotebookPen} from 'lucide-react';
import {chapters, claimsStory, reassessmentPanel, type Decision, type Panel, type Speaker} from '../lib/comic';

const speakerClass: Partial<Record<Speaker, string>> = {
  Asha: 'asha',
  'Prof Venkat': 'venkat',
  Paati: 'paati',
  Farah: 'farah',
  Nurse: 'nurse',
};

export function ComicPanel({panel, eager = false}: {panel: Panel; eager?: boolean}) {
  return (
    <figure className="comic-panel">
      <img src={`/comic/${panel.image}.webp`} width="768" height="512" loading={eager ? 'eager' : 'lazy'} decoding="async" alt={panel.alt}/>
      <figcaption>
        {panel.caption && <p className="comic-caption">{panel.caption}</p>}
        <div className="comic-dialogue">
          {panel.dialogue.map(({speaker, line}) => {
            const style = speakerClass[speaker];
            return <p className={style ? `comic-bubble comic-${style}` : 'comic-bubble'} key={speaker}><strong>{speaker}</strong>{line}</p>;
          })}
        </div>
      </figcaption>
    </figure>
  );
}

export function ComicDecision({decision}: {decision: Decision}) {
  const [choice, setChoice] = useState<number | null>(null);

  return (
    <div className="comic-decision">
      <fieldset>
        <legend><span>Prof Venkat asks</span>{decision.question}</legend>
        <div className="comic-choices">
          {decision.choices.map((option, index) => (
            <button key={option.label} type="button" aria-pressed={choice === index} onClick={() => setChoice(index)}>
              <span className="comic-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <div className="comic-reply" role="status">
        {choice !== null && <p><strong>Prof Venkat</strong>{decision.choices[choice].reply}</p>}
      </div>
      <p className="comic-discussion"><strong>Discuss with a partner</strong>{decision.discussion}</p>
    </div>
  );
}

export default function Comic() {
  useEffect(() => {
    const target = location.hash.slice(1);
    if (target.startsWith('comic-')) document.getElementById(target)?.scrollIntoView();
  }, []);

  return (
    <main className="atlas-comic" id="main" aria-labelledby="comic-title">
      <header className="comic-cover">
        <div className="wrap comic-cover-grid">
          <div className="comic-cover-copy">
            <p className="comic-kicker"><BookOpen size={19} aria-hidden="true"/> An interactive Care Atlas comic</p>
            <h1 id="comic-title">Asha follows <em>the patient.</em></h1>
            <p>Asha is 16 and wants to change healthcare in India. Prof Venkat takes her into clinics, wards and homes, where a good question can change what happens next.</p>
            <a className="comic-action" href="#comic-reach">Start reading</a>
          </div>
          <figure className="comic-cover-art">
            <img src="/comic/cover.webp" width="1200" height="800" fetchPriority="high" alt="Asha carries an open notebook as she and Prof Venkat walk past a neighbourhood health centre."/>
          </figure>
        </div>
      </header>

      <div className="wrap comic-reader">
        <div className="comic-reader-intro">
          <p>Read each scene, choose what Asha could do next, and see how Prof Venkat responds. The story is fictional and draws on the cases in the Care Atlas.</p>
          <nav aria-label="Comic chapters" className="comic-chapter-links">
            {chapters.map((chapter, index) => (
              <a key={chapter.id} href={`#comic-${chapter.id}`}><span aria-hidden="true">{index + 1}</span>{chapter.title}</a>
            ))}
          </nav>
        </div>

        {chapters.map((chapter, index) => (
          <section key={chapter.id} id={`comic-${chapter.id}`} className="comic-chapter" aria-labelledby={`comic-${chapter.id}-title`}>
            <header className="comic-chapter-heading">
              <p className="comic-stage">Chapter {index + 1} · {chapter.stage}</p>
              <h2 id={`comic-${chapter.id}-title`}>{chapter.title}</h2>
            </header>

            <div className="comic-strip">
              {chapter.panels.map((panel, panelIndex) => (
                <ComicPanel key={panel.image} panel={panel} eager={index === 0 && panelIndex === 0}/>
              ))}
            </div>

            <ComicDecision decision={chapter}/>
            <aside className="comic-related" aria-label={`Related cases for ${chapter.title}`}>
              <span><BookOpen size={17} aria-hidden="true"/> Read the cases</span>
              <ul>{chapter.cases.map(({label, href}) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
            </aside>
          </section>
        ))}

        <section id="comic-reassessment" className="comic-chapter" aria-labelledby="comic-reassessment-title">
          <header className="comic-chapter-heading">
            <p className="comic-stage">Epilogue · Back to assessment</p>
            <h2 id="comic-reassessment-title">Back at the clinic</h2>
          </header>
          <div className="comic-strip comic-extra-grid">
            <ComicPanel panel={reassessmentPanel}/>
            <aside className="comic-end-note" aria-label="Asha’s field note">
              <h3><NotebookPen size={19} aria-hidden="true"/> Asha’s field note</h3>
              <p>The call got Paati back to the clinic. Who will tell her what the team recommends, and how will they check if it helps her get back to the market?</p>
              <a href="/?stage=Assess+%26+refer#care-map">See Assess &amp; refer on the care map</a>
            </aside>
          </div>
        </section>

        <details id="comic-claims" className="comic-side-story">
          <summary>
            <span><span className="comic-stage">Optional side story · Insurance and claims</span><strong>{claimsStory.title}</strong></span>
            <ChevronDown size={22} aria-hidden="true"/>
          </summary>
          <div className="comic-side-body">
            <div className="comic-strip comic-extra-grid">
              <ComicPanel panel={claimsStory.panel}/>
              <ComicDecision decision={claimsStory}/>
            </div>
            <p className="comic-related"><span><BookOpen size={17} aria-hidden="true"/> Read the case</span><a href={claimsStory.case.href}>{claimsStory.case.label}</a></p>
          </div>
        </details>

        <section className="comic-fieldwork" aria-labelledby="comic-fieldwork-title">
          <div>
            <p className="comic-kicker"><NotebookPen size={19} aria-hidden="true"/> Your turn</p>
            <h2 id="comic-fieldwork-title">Write a field note</h2>
            <p>In pairs, choose one moment from the story or a care journey you know. Compare notes and take one idea to the class Needs board.</p>
            <a className="comic-action" href="/?view=board"><MessagesSquare size={18} aria-hidden="true"/> Open the Needs board</a>
            <a className="comic-action comic-data-link" href="/?view=data#data-comic"><BookOpen size={18} aria-hidden="true"/> Continue with Asha’s data case</a>
          </div>
          <ol>
            <li><strong>Observe.</strong> Who is trying to do what, and where do they get stuck?</li>
            <li><strong>Trace.</strong> Who owns the next step? How would you know someone followed through?</li>
            <li><strong>Test.</strong> What small change could a team try with the people affected?</li>
            <li><strong>Measure.</strong> What would count as improvement, and what would make you stop or revise the test?</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
