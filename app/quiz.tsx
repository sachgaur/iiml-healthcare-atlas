'use client';

import {useEffect, useState} from 'react';
import {BookOpenCheck, Check, RotateCcw} from 'lucide-react';
import {quizzes} from '../lib/quizzes';

const scoreStorageKey = 'care-atlas-quiz-scores';
const scoreKey = ({name, items}: (typeof quizzes)[number]) => `${name}:${items.length}`;
type Scores = Record<string, number>;

function readScores(key: string): Scores {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '{}') ?? {};
  } catch {
    return {};
  }
}

export default function Quiz() {
  const [set, select] = useState(0);
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [answers, save] = useState<number[]>([]);
  const [checked, check] = useState(false);
  const [best, setBest] = useState<Scores>({});
  const [previousBest, setPreviousBest] = useState<Scores>({});

  useEffect(() => {
    setBest(readScores(scoreStorageKey));
    setPreviousBest(readScores('care-atlas-best'));
  }, []);

  const quiz = quizzes[set];
  const item = quiz.items[idx];
  const questionCount = quiz.items.length;
  const done = idx >= questionCount;

  function start(i: number) {
    select(i);
    setIdx(0);
    setPick(null);
    save([]);
    check(false);
  }

  function nextQuestion() {
    setIdx(idx + 1);
    setPick(null);
    check(false);
  }

  function countCorrect(picks: number[]) {
    return picks.filter((answer, i) => answer === quiz.items[i].correct).length;
  }

  function submit() {
    if (pick === null || checked) return;
    const next = [...answers, pick];
    save(next);
    check(true);
    if (next.length === questionCount) {
      const key = scoreKey(quiz);
      const scores = {...best, [key]: Math.max(best[key] ?? 0, countCorrect(next))};
      setBest(scores);
      try {
        localStorage.setItem(scoreStorageKey, JSON.stringify(scores));
      } catch {}
    }
  }

  return (
    <main id="main" className="wrap interior">
      <p className="kicker">Practice with the cases</p>
      <h1>Decision quizzes<span>.</span></h1>
      <p className="lead">Choose a case set, make a decision and see how it affects the care journey.</p>
      <div className="quizlayout">
        <aside className="quizmenu">
          <h2>Quiz sets</h2>
          {quizzes.map((q, i) => {
            const score = best[scoreKey(q)];
            return (
              <button key={q.name} className={i === set ? 'chosen' : ''} aria-pressed={i === set} onClick={() => { if (i !== set) start(i); }}>
                <BookOpenCheck size={21}/>
                <span>
                  <b>{q.name}</b>
                  <small>{score === undefined ? `${q.items.length} questions` : `Best score ${score}/${q.items.length}`}</small>
                  {score === undefined && previousBest[i] !== undefined && (
                    <small>Previous quiz score {previousBest[i]}/3</small>
                  )}
                </span>
              </button>
            );
          })}
        </aside>
        <section className="question">
          <div className="meta">{quiz.name} · {done ? 'Results' : `Question ${idx + 1} of ${questionCount}`}</div>
          <div className="progressrail" aria-hidden="true">
            {quiz.items.map((question, i) => <i key={question.q} className={i <= idx ? 'filled' : ''}/>)}
          </div>
          {done ? (
            <>
              <h2>You scored {countCorrect(answers)} out of {questionCount}.</h2>
              <p>Review the reasoning below or try another case set.</p>
              {quiz.items.map((question, i) => (
                <details key={question.q}>
                  <summary>{answers[i] === question.correct ? 'Correct' : 'Review'} · {question.q}</summary>
                  <p><b>Best answer</b> · {question.options[question.correct]}</p>
                  <p>{question.why}</p>
                </details>
              ))}
              <button className="btn primary" onClick={() => start(set)}><RotateCcw size={16}/>Try again</button>
            </>
          ) : (
            <>
              <h2>{item.q}</h2>
              <fieldset>
                <legend className="sr">Choose one answer</legend>
                {item.options.map((option, i) => (
                  <label key={option} className={'option ' + (checked && i === item.correct ? 'right' : checked && i === pick ? 'wrong' : pick === i ? 'picked' : '')}>
                    <input type="radio" name="answer" checked={pick === i} disabled={checked} onChange={() => setPick(i)}/>
                    <span>{option}</span>
                  </label>
                ))}
              </fieldset>
              {checked && (
                <div className="feedback" role="status">
                  <b>{pick === item.correct ? 'Correct.' : `Best answer · ${item.options[item.correct]}`}</b> {item.why}
                </div>
              )}
              {checked ? (
                <button className="btn primary" onClick={nextQuestion}>{idx + 1 === questionCount ? 'See results' : 'Next question'}</button>
              ) : (
                <button className="btn primary" onClick={submit} disabled={pick === null}><Check size={18}/>Check answer</button>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
