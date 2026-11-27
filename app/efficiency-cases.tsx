'use client';
import {useEffect,useRef,useState} from 'react';
import {BookOpen,ChevronDown,HeartPulse,Eye,Plus} from 'lucide-react';
import {efficiencyCases,type Stage} from '../lib/efficiency-cases';

type Props = {
  highlight: string | null;
  stage: Stage;
  onCase: (id: string | null) => void;
  onStage: (stage: Stage) => void;
  onSuggest: () => void;
};

export default function EfficiencyCases({highlight,stage,onCase,onStage,onSuggest}:Props){
  const panel = useRef<HTMLElement>(null);
  const [focusCase,setFocusCase] = useState(false);
  const current = efficiencyCases.find(item=>item.id===highlight);
  useEffect(()=>{
    if(focusCase && current){
      panel.current?.scrollIntoView({block:'nearest'});
      panel.current?.focus({preventScroll:true});
      setFocusCase(false);
    }
  },[focusCase,current]);

  return <section className="highlights" aria-labelledby="opening-cases">
    <div className="sectionline">
      <div><p className="kicker">Opening cases</p><h3 id="opening-cases">How two hospitals made care more efficient</h3></div>
      <button className="outlinebtn" onClick={onSuggest}><Plus size={16}/>Suggest a case</button>
    </div>
    <div className="featuregrid">
      {efficiencyCases.map((item,index)=>{
        const Icon=index===0?Eye:HeartPulse;
        return <button type="button" className="featurecase" key={item.id} aria-expanded={highlight===item.id} aria-controls={highlight===item.id?'case-panel':undefined} onClick={()=>{
          if(highlight===item.id){onCase(null);return}
          onCase(item.id);setFocusCase(true);
        }}>
          <Icon size={25}/><span><small>{item.pathway}</small><strong>{item.title}</strong></span><ChevronDown size={20} className={highlight===item.id?'flip':''}/>
        </button>;
      })}
    </div>
    {current&&<article id="case-panel" className="featurebody" ref={panel} tabIndex={-1} aria-labelledby="case-title">
      <div className="featureintro"><div><p className="kicker">The gap</p><h4 id="case-title">{current.title}</h4><p>{current.gap}</p></div><div className="historical"><BookOpen size={20}/><p>{current.evidence}</p></div></div>
      <h5>Follow the redesign on the map</h5>
      <div className="case-steps">
        {current.steps.map(step=><button type="button" key={step.stage} className="case-step" aria-pressed={step.stage===stage} onClick={()=>onStage(step.stage)}>
          <small>{step.stage}</small><strong>{step.label}</strong><span>{step.change}</span>
        </button>)}
      </div>
      <div className="featuretakeaways">
        <div><h5>What to measure</h5><p>{current.measures}</p></div>
        <div><h5>Where digital helps</h5><p>{current.digital}</p></div>
      </div>
      <p className="discussion"><strong>Discuss in class.</strong> {current.question}</p>
      <ul className="case-sources">{current.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul>
    </article>}
  </section>;
}
