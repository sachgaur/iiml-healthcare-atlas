'use client';
import {useState,useEffect,useRef} from 'react';
import {stages,type Need,type ContributionKind} from '../lib/board';
import {ThumbsUp,MessageSquare,RefreshCw} from 'lucide-react';

export default function Board({initialStage,kind='need'}:{initialStage:string;kind?:ContributionKind}){
 const isCase=kind==='case';
 const [needs,setNeeds]=useState<Need[]>([]),[signed,setSigned]=useState<boolean|null>(null),[error,setError]=useState(''),[refreshError,setRefreshError]=useState(''),[notice,setNotice]=useState(''),[busy,setBusy]=useState(false),[loaded,setLoaded]=useState(false),[sort,setSort]=useState('votes'),[stage,setStage]=useState(initialStage),[title,setTitle]=useState(''),[description,setDescription]=useState(''),[source,setSource]=useState(''),[confirm,setConfirm]=useState('');
 const id=useRef(''),sequence=useRef(0);
 const signIn='/signin-with-chatgpt?return_to='+encodeURIComponent(isCase?'/?view=cases':'/?view=board');
 async function refresh(){
  const n=++sequence.current;
  try{
   const res=await fetch('/api/board?kind='+kind,{cache:'no-store'});
   if(!res.ok)throw Error('Could not load the board.');
   const data=await res.json() as {needs:Need[];signedIn:boolean};
   if(n===sequence.current){setNeeds(data.needs);setSigned(data.signedIn);setLoaded(true);setRefreshError('')}
  }catch{if(n===sequence.current)setRefreshError('The board could not be refreshed. Please try again.')}
 }
 useEffect(()=>{refresh();const timer=setInterval(()=>{if(!document.hidden)refresh()},15000);return()=>{clearInterval(timer);++sequence.current}},[kind]);
 async function mutate(data:Record<string,unknown>,message:string){
  if(busy)return;setBusy(true);setError('');setNotice('');
  try{
   const res=await fetch('/api/board',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
   const result=await res.json() as {error?:string};
   if(!res.ok)throw Error(result.error||'Please try again.');
   if(data.action==='submit'){setTitle('');setDescription('');setSource('');id.current=''}
   setConfirm('');setNotice(message);await refresh();
  }catch(e){setError(e instanceof Error?e.message:'Please try again.')}finally{setBusy(false)}
 }
 const sorted=[...needs].sort((a,b)=>sort==='votes'?b.count-a.count||b.created-a.created:b.created-a.created);
 return <main id="main" className="wrap interior">
  <p className="kicker">Participant exchange</p>
  <h1>{isCase?'Case suggestions':'Unmet needs board'}<span>.</span></h1>
  <p className="lead">{isCase?'Share a documented example of a team that improved a step in care. Vote for the cases you’d like to discuss.':'Describe a gap you’ve seen in care. Vote on the needs you think the class should investigate.'}</p>
  <div className="boardlayout">
   <section className="posts">
    <div className="sectionline"><h2>{isCase?'Suggested cases':'Class contributions'} <small>{loaded?needs.length:'…'}</small></h2><button className="iconbtn" onClick={refresh} aria-label="Refresh board"><RefreshCw size={19}/></button></div>
    <label className="sort">Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="votes">Most votes</option><option value="recent">Newest first</option></select></label>
    {(error||refreshError)&&<p role="alert" className="error">{error||refreshError}</p>}
    <p className="status" role="status">{notice}</p>
    {!loaded&&!refreshError&&<p>Loading the class board…</p>}
    {loaded&&!needs.length&&<div className="empty"><MessageSquare size={32}/><h3>{isCase?'Which case should we discuss next?':'What handoff would you change?'}</h3><p>{isCase?'Suggest a published case. Tell the class what was holding up care and how the team changed the process.':'Be the first to share an unmet need. Think of a referral that went unbooked, a result that went unread or a plan that was hard to follow at home.'}</p></div>}
    {sorted.map(n=><article className="post" key={n.id}>
     <div className="meta">{n.stage} {n.mine===1&&' · Your contribution'}</div>
     <h3>{n.title}</h3><p className="usertext">{n.description}</p>
     {n.source&&<a className="post-source" href={n.source} target="_blank" rel="noreferrer ugc">Read the submitted source</a>}
     <div className="postActions">
      {n.mine===1?<><span className="votetag"><ThumbsUp size={15}/>{n.count} {n.count===1?'vote':'votes'}</span>{confirm===n.id?<><button className="textbtn" disabled={busy} onClick={()=>mutate({action:'remove',id:n.id},'Your contribution was removed.')}>Confirm removal</button><button className="textbtn" onClick={()=>setConfirm('')}>Cancel</button></>:<button className="textbtn" onClick={()=>setConfirm(n.id)}>Remove my post</button>}</>:signed?<button className={'vote '+(n.voted?'on':'')} aria-pressed={!!n.voted} disabled={busy} onClick={()=>mutate({action:'vote',id:n.id,on:!n.voted},n.voted?'Vote removed.':'Vote counted.')}><ThumbsUp size={16}/>{n.voted?'Voted':'Vote'} · {n.count}</button>:<a className="vote" href={signIn} target="_top"><ThumbsUp size={16}/>Sign in to vote · {n.count}</a>}
     </div>
    </article>)}
   </section>
   <aside className="formbox">
    <h2>{isCase?'Suggest a case':'Share an unmet need'}</h2>
    <p>The board is visible to anyone with the link. Leave out patient identifiers and confidential details.</p>
    {signed?<form onSubmit={e=>{
     e.preventDefault();if(!id.current)id.current=crypto.randomUUID();
     mutate({action:'submit',kind,id:id.current,title,description,stage,source},isCase?'Your case suggestion is on the board.':'Your unmet need is on the board.');
    }}>
     <label>Care stage<select value={stage} onChange={e=>setStage(e.target.value)}>{stages.map(s=><option key={s}>{s}</option>)}</select></label>
     <label>{isCase?'Case title':'Unmet need'}<input required minLength={5} maxLength={120} value={title} onChange={e=>setTitle(e.target.value)} placeholder={isCase?'Name the service or organisation':'e.g. Referrals leave without a booking'}/></label>
     <label>{isCase?'What was the gap and what changed?':'Who is affected, and what happens?'}<textarea required minLength={10} maxLength={700} rows={5} value={description} onChange={e=>setDescription(e.target.value)} placeholder={isCase?'Describe the bottleneck, the redesign and what the source reports.':'Describe the handoff, the workaround and its cost.'}/></label>
     {isCase&&<label>Public source URL<input type="url" required maxLength={1000} placeholder="https://" value={source} onChange={e=>setSource(e.target.value)}/></label>}
     <button className="btn primary" disabled={busy}>{busy?'Saving…':isCase?'Post case suggestion':'Post unmet need'}</button>
    </form>:signed===false?<><p>Sign in with ChatGPT to post and cast one vote per contribution. Your name stays off the board.</p><a className="btn primary" href={signIn} target="_top">Sign in to contribute</a></>:<p>{refreshError?'Refresh the board to check sign-in.':'Checking sign-in…'}</p>}
   </aside>
  </div>
 </main>;
}
