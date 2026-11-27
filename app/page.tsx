'use client';
import {useEffect,useRef,useState} from 'react';
import {Map as MapIcon,BookOpen,BookOpenCheck,MessagesSquare,Download,Stethoscope,ClipboardList,Microscope,HeartPulse,House,Maximize2,ChevronDown,CalendarDays,UserRound,X,Plus,Landmark,FileText,UsersRound,Hospital,ScanLine,Pill,Package,MonitorSmartphone,ShieldCheck,Database,Lightbulb} from 'lucide-react';
import EfficiencyCases from './efficiency-cases';
import ServiceTopics from './service-topics';
import Comic from './comic';
import HealthData from './health-data';
import Innovation from './innovation';
import {serviceTopics} from '../lib/service-topics';
import {efficiencyCases,type Stage} from '../lib/efficiency-cases';
import cases from '../lib/cases.json';import {biodesignCases,portfolioUrl,type CaseStudy} from '../lib/biodesign';import {stages} from '../lib/board';import Board from './board';import Quiz from './quiz';
const atlasCases: CaseStudy[] = cases;
const icons=[Stethoscope,ClipboardList,Microscope,HeartPulse,House];const roles=[Stethoscope,UsersRound,ScanLine,Hospital,House,MonitorSmartphone,ShieldCheck,Package,Pill,HeartPulse];
const stageDesc=['How people find the right first contact.','Who decides the next step and arranges it?','How a test becomes a result someone acts on.','How teams deliver the agreed care plan.','What happens on the ward and at home.'];
type ViewName='explore'|'comic'|'data'|'innovation'|'quizzes'|'board'|'cases';
function readView():ViewName{const value=new URLSearchParams(location.search).get('view');return value==='comic'||value==='data'||value==='innovation'||value==='quizzes'||value==='board'||value==='cases'?value:'explore'}
export default function Page(){
 const [view,setView]=useState<ViewName>('explore'),[collection,setCollection]=useState<'all'|'biodesign'>('all'),[stage,setStage]=useState(0),[open,setOpen]=useState<string|null>(null),[full,setFull]=useState(false),[zoom,setZoom]=useState(false),[highlight,setHighlight]=useState<string|null>(null),[topic,setTopic]=useState<string|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 const mapNote=useRef<HTMLDivElement>(null);
 const mapStages=useRef<(HTMLButtonElement|null)[]>([]);
 const activeTopic=serviceTopics.find(item=>item.id===topic);
 const activeCase=efficiencyCases.find(item=>item.id===highlight);
 const activeStep=activeCase?.steps.find(step=>step.stage===stages[stage]);
 useEffect(()=>{
  const handle=()=>{
   const params=new URLSearchParams(location.search);
   setView(readView());
   setCollection(params.get('collection')==='biodesign'?'biodesign':'all');
   setOpen(null);
   setTopic(serviceTopics.find(item=>item.id===params.get('topic'))?.id??null);
   setHighlight(efficiencyCases.find(item=>item.id===params.get('case'))?.id??null);
   const urlStage=stages.indexOf(params.get('stage') as Stage);
   if(urlStage!==-1)setStage(urlStage);
  };
  handle();
  window.addEventListener('popstate',handle);
  return()=>window.removeEventListener('popstate',handle);
 },[]);
 useEffect(()=>{if(full){dialog.current?.showModal()}else{dialog.current?.close();setZoom(false)}},[full]);
 function nav(v:ViewName){
  if(v!==view){
   const params=new URLSearchParams(location.search);
   if(v==='explore')params.delete('view');else params.set('view',v);
   params.set('stage',stages[stage]);
   history.pushState(null,'','/?'+params.toString());
   setView(v);
  }
  window.scrollTo({top:0,behavior:'instant'});
 }
 function chooseCollection(value:'all'|'biodesign'){
  if(value===collection)return;
  setCollection(value);setOpen(null);
  const url=new URL(location.href);
  if(value==='all')url.searchParams.delete('collection');
  else url.searchParams.set('collection',value);
  history.replaceState(null,'',url);
 }
 function selectStage(index:number){
  setStage(index);setOpen(null);
  const url=new URL(location.href);
  url.searchParams.set('stage',stages[index]);
  history.replaceState(null,'',url);
 }
 function selectCase(id:string|null){
  setHighlight(id);setTopic(null);
  const url=new URL(location.href);
  url.searchParams.delete('topic');
  if(id)url.searchParams.set('case',id);else url.searchParams.delete('case');
  history.replaceState(null,'',url);
  if(id)selectStage(stages.indexOf('Agree & treat'));
 }
 function showStageOnMap(item:Stage){
  const index=stages.indexOf(item);
  selectStage(index);
  mapStages.current[index]?.scrollIntoView({block:'nearest',inline:'center'});
  mapNote.current?.scrollIntoView({block:'center'});
  mapNote.current?.focus({preventScroll:true});
 }
 function showTopicOnMap(id:string){
  const item=serviceTopics.find(entry=>entry.id===id);
  if(!item)return;
  const url=new URL(location.href);
  url.searchParams.delete('case');
  url.searchParams.set('topic',id);
  url.hash='care-map';
  history.replaceState(null,'',url);
  setHighlight(null);setTopic(id);showStageOnMap(item.stage);
 }
 const topicAtStage=activeTopic?.stage===stages[stage]?activeTopic:null;
 const selectedCases=collection==='biodesign'?biodesignCases:atlasCases;
 return <><a href="#main" className="skip">Skip to content</a><header className="top"><div className="wrap navrow"><a className="brand" href="/" onClick={e=>{e.preventDefault();nav('explore')}}><img src="/favicon.svg" width="34" height="34" alt=""/>Care Atlas</a><nav aria-label="Learning resource">{([['explore','Care map',MapIcon],['comic','Comic',BookOpen],['data','Data & AI',Database],['innovation','Innovation',Lightbulb],['quizzes','Quizzes',BookOpenCheck],['board','Needs board',MessagesSquare]] as const).map(([v,t,I])=><a key={v} className={view===v?'active':''} aria-current={view===v?'page':undefined} href={v==='explore'?'/':'/?view='+v} onClick={e=>{if(e.ctrlKey||e.metaKey||e.shiftKey)return;e.preventDefault();nav(v)}}><I size={17}/>{t}</a>)}</nav><a className="guide" href="/resources/lecture-guide.pdf" download><Download size={16}/>Lecture guide</a></div></header>
 {view==='board'||view==='cases'?<Board key={view} initialStage={stages[stage]} kind={view==='cases'?'case':'need'}/>:view==='quizzes'?<Quiz/>:view==='comic'?<Comic/>:view==='data'?<HealthData/>:view==='innovation'?<Innovation/>:<main id="main">
 <section className="map-hero" aria-labelledby="atlas-title"><div className="wrap">
  <div className="course"><span className="rule"/>IIM LUCKNOW · DIGITAL TRANSFORMATION AND INNOVATION IN HEALTHCARE</div>
  <div className="map-heading">
   <div><h1 id="atlas-title">The care journey <em>atlas.</em></h1><p>Follow the patient across the map. Where does care slow down, and who can change that step?</p></div>
   <div className="herometa"><span><UserRound size={15}/>Sachin Gaur</span><span><CalendarDays size={15}/>29 November 2026</span></div>
  </div>
  <div className="start-here">
   <a href="#how-to-use">New here? Start here</a>
   <p>Begin with one patient journey and one case. Then pick a topic that connects to a problem you see at work.</p>
  </div>
  <div id="care-map" className="interactive-map">
   <div className="map-scroll" tabIndex={0} aria-label="Care system diagram. Scroll horizontally on a narrow screen.">
    <div className="map-canvas">
     <img src="/resources/care-system-map.svg" width="1600" height="900" alt="Care moves through five stages, from reach care to recover and review, with a feedback loop to assessment. Stakeholders exchange information at each step."/>
     {stages.map((item,index)=>{
      const linked=activeTopic?.stage===item||!!activeCase?.steps.some(step=>step.stage===item);
      return <button key={item} ref={node=>{mapStages.current[index]=node}}
        type="button" className={'map-node'+(linked?' linked':'')} style={{left:(48+index*304)/16+'%'}}
        aria-label={'Care map · '+item} aria-pressed={stage===index} onClick={()=>selectStage(index)}/>;
     })}
    </div>
   </div>
   <div className="map-caption">
    <div ref={mapNote} tabIndex={-1} className="map-note" aria-live="polite"><strong>{topicAtStage?topicAtStage.title+' · ':activeCase?activeCase.title+' · ':''}{stages[stage]}</strong><p>{topicAtStage?topicAtStage.need:activeStep?activeStep.label+'. '+activeStep.change:activeCase?'Choose a highlighted stage to see where this case changed the process.':stageDesc[stage]}</p></div>
    <div className="map-actions"><a className="outlinebtn" href="#opening-cases">Opening cases</a><a className="outlinebtn" href="#service-design">Emerging topics</a><a className="outlinebtn" href="/?view=comic" onClick={e=>{if(e.ctrlKey||e.metaKey||e.shiftKey)return;e.preventDefault();nav('comic')}}><BookOpen size={16}/>Read the comic</a><a className="outlinebtn" href="/?view=data" onClick={e=>{if(e.ctrlKey||e.metaKey||e.shiftKey)return;e.preventDefault();nav('data')}}><Database size={16}/>Explore Data &amp; AI</a><button className="outlinebtn" onClick={()=>setFull(true)}><Maximize2 size={16}/>Enlarge map</button></div>
   </div>
  </div>
 </div></section>
 <div className="wrap opening-wrap"><EfficiencyCases highlight={highlight} stage={stages[stage]} onCase={selectCase} onStage={showStageOnMap} onSuggest={()=>nav('cases')}/></div>
 <section id="journey" className="wrap journey"><div className="sectionline"><div><p className="kicker"><span className="rule"/>The system map</p><h2>Explore more cases<span>.</span></h2></div><a className="outlinebtn" href="#care-map"><MapIcon size={16}/>Back to the map</a></div><p className="summary">Select a stage to explore its stakeholders, Indian cases and opportunities for change.</p><div className="stagegrid" aria-label="Care stages">{stages.map((s,i)=>{const I=icons[i];return <button key={s} className={'stage '+(stage===i?'selected':'')} aria-pressed={stage===i} onClick={()=>selectStage(i)}><div className="stagetop"><I size={24}/><span>{String(i+1).padStart(2,'0')}</span></div><strong>{s}</strong></button>})}</div>
 <div className="casehead"><div><div className="meta">Stage {stage+1} of 5</div><h3>{stages[stage]}</h3><p>{stageDesc[stage]}</p></div><div className="collectionSwitch" role="group" aria-label="Case collections"><button type="button" aria-pressed={collection==='all'} onClick={()=>chooseCollection('all')}>Care system cases</button><button type="button" aria-pressed={collection==='biodesign'} onClick={()=>chooseCollection('biodesign')}>Biodesign devices</button></div></div>
 {collection==='biodesign'&&<div className="portfolio"><p>Ten devices from the School of International Biodesign. Select a care stage to see the unmet need, how the device addresses it and what a team could measure.</p><a href={portfolioUrl} target="_blank" rel="noreferrer">View the School’s portfolio</a></div>}
 <div className="casegrid">{selectedCases.map((c,i)=>{if(c.stage!==stages[stage])return null;const I=collection==='biodesign'?icons[stage]:roles[i];return <article className="case" key={c.title}><div className="casebody"><div className="caseico"><I size={22}/></div><div className="meta">{c.role}</div><h4>{c.title}</h4><p>{c.prompt}</p></div><button className="reveal" aria-expanded={open===c.title} onClick={()=>setOpen(open===c.title?null:c.title)}>{open===c.title?'Close case':'Explore case'}<ChevronDown size={16} className={open===c.title?'flip':''}/></button>{open===c.title&&<div className="detail">{[[collection==='biodesign'?'How the device addresses it':'How it works',c.workflow],['A change to test',c.test],['Measure and check',c.measure+' '+c.balance],['Discuss',c.discuss]].map(([h,b])=><div key={h}><h5>{h}</h5><p>{b}</p></div>)}{c.url?<a href={c.url} target="_blank" rel="noreferrer">{c.source}</a>:<small>{c.source}</small>}{c.evidence&&<a href={c.evidence.url} target="_blank" rel="noreferrer">{c.evidence.label}</a>}{c.title==='ABDM record sharing'&&<a href="/?view=data#data-protection">Cybersecurity &amp; patient data protection</a>}<button className="outlinebtn" onClick={()=>nav('board')}><Plus size={16}/>Share a related need</button></div>}</article>})}</div>
 </section><ServiceTopics onMap={showTopicOnMap}/>
 <section id="how-to-use" className="wrap study-guide" tabIndex={-1} aria-labelledby="study-guide-title">
  <h2 id="study-guide-title">How to use this portal</h2>
  <ol>
   <li>
    <h3>Follow one patient</h3>
    <p>Pick a stage on the <a href="#care-map">Care map</a> and ask where the patient might get stuck. Prefer a story? Start with <a href="/?view=comic">Asha’s comic</a>, then find the same stage on the map.</p>
   </li>
   <li>
    <h3>See how care was redesigned</h3>
    <p>Open <a href="/?case=aravind#opening-cases">Aravind Eye Care</a> or <a href="/?case=narayana#opening-cases">Narayana Health</a>. Ask what changed in the workflow and how you would measure whether it helped.</p>
   </li>
   <li>
    <h3>Explore a topic relevant to your work</h3>
    <p>Choose <a href="#service-design">service design</a>, <a href="#care-at-home">care at home</a>, or <a href="/?view=data">Data &amp; AI</a>. The Data &amp; AI section also covers <a href="/?view=data#data-protection">cybersecurity and patient data protection</a>.</p>
   </li>
   <li>
    <h3>Apply it to your workplace</h3>
    <p>Try a <a href="/?view=quizzes">quiz</a>, or use <a href="/?view=innovation">Innovation</a> to frame a problem from your organisation. Share it on the <a href="/?view=board">Needs board</a>.</p>
   </li>
  </ol>
 </section>
 <dialog ref={dialog} onCancel={()=>setFull(false)} onClose={()=>setFull(false)} aria-labelledby="map-title"><div className="dialogbar"><h2 id="map-title">Healthcare system map</h2><button className="iconbtn" aria-label="Close system map" onClick={()=>setFull(false)}><X/></button></div><div className="maptools"><button className="textbtn" onClick={()=>setZoom(!zoom)}>{zoom?'Fit to window':'Zoom in'}</button><a href="/resources/care-system-map.svg" download>Download SVG</a></div><div className="mapviewport"><img style={{width:zoom?'max(1600px, 150%)':'100%'}} src="/resources/care-system-map.svg" alt="Five stages of care and ten stakeholder groups exchanging information, with a path from recovery back to reassessment."/></div></dialog>
 </main>}
 <footer><div className="wrap foot"><span><Landmark size={18}/>IIM Lucknow · Healthcare management</span><div className="foot-links"><a href={view==='explore'?'#how-to-use':'/#how-to-use'}>New here? Start here</a><a href="/resources/lecture-guide.pdf" download><FileText size={16}/>Download lecture guide</a></div></div></footer></>
}
