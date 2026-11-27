import {ArrowUpRight,ChevronDown,Map as MapIcon} from 'lucide-react';
import {topicSections} from '../lib/service-topics';

export default function ServiceTopics({onMap}:{onMap:(id:string)=>void}){
 return <div className="wrap service-topics">
  <nav className="topic-nav" aria-label="Emerging topics">
   {topicSections.map(section=><a key={section.id} href={'#'+section.id}>{section.title}</a>)}
  </nav>
  {topicSections.map(section=><section className="topic-section" id={section.id} key={section.id} aria-labelledby={section.id+'-title'}>
   <h2 id={section.id+'-title'}>{section.title}<span>.</span></h2>
   <p className="topic-intro">{section.intro}</p>
   <div className="topic-grid">{section.topics.map(topic=><article key={topic.id} className="topic-card">
    <div className="topic-summary"><p className="meta">{topic.stage}</p><h3>{topic.title}</h3><p>{topic.need}</p></div>
    <details><summary>Explore the design <ChevronDown size={16} aria-hidden/></summary>
     <div className="topic-detail"><h4>How the service works</h4><p>{topic.design}</p><h4>What to measure</h4><p>{topic.measure}</p>
      <ul>{topic.source.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} <ArrowUpRight size={13} aria-hidden/></a></li>)}</ul>
     </div>
    </details>
    <button type="button" className="topic-map-link" onClick={()=>onMap(topic.id)}><MapIcon size={16}/>Show on the care map</button>
   </article>)}</div>
   <p className="topic-question"><strong>Discuss in class.</strong> {section.question}</p>
  </section>)}
 </div>;
}
