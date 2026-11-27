import {stages} from './board';

function reply(body: unknown, status = 200) {
  return Response.json(body,{status,headers:{'Cache-Control':'private, no-store','Vary':'Cookie'}});
}
export async function boardRequest(req: Request, db: D1Database, user: string | null) {
  if(req.method === 'GET'){
    const kind = new URL(req.url).searchParams.get('kind') === 'case' ? 'case' : 'need';
    const {results} = await db.prepare(`SELECT n.id,n.stage,n.title,n.description,n.created,n.source,
      COUNT(v.voter) AS count,COALESCE(MAX(v.voter = ?),0) AS voted,
      COALESCE(n.author = ?,0) AS mine FROM needs n LEFT JOIN votes v ON v.need=n.id
      WHERE n.kind=? GROUP BY n.id ORDER BY n.created DESC, n.id`).bind(user,user,kind).all();
    return reply({signedIn:!!user,needs:results});
  }
  if(!user) return reply({error:'Sign in to contribute.'},401);
  const origin=req.headers.get('origin');
  if(origin && origin !== new URL(req.url).origin) return reply({error:'Please use this site to contribute.'},403);
  if(!req.headers.get('content-type')?.includes('application/json'))return reply({error:'A JSON request is required.'},415);
  let b;
  try{b=await req.json() as Record<string,unknown>;}catch{return reply({error:'Invalid submission.'},400);}
  if(!b || typeof b !== 'object' || typeof b.id !== 'string' || !/^[a-f0-9-]{36}$/i.test(b.id))return reply({error:'Invalid contribution identifier.'},400);
  if(b.action==='submit'){
    const title=typeof b.title==='string'?b.title.trim():'', desc=typeof b.description==='string'?b.description.trim():'';
    if(!stages.some(s=>s===b.stage) || title.length<5 || title.length>120 || desc.length<10 || desc.length>700)return reply({error:'Choose a stage, enter a title of 5–120 characters and a description of 10–700 characters.'},400);
    const kind = b.kind === 'case' ? 'case' : 'need';
    let source = null;
    if (kind === 'case') {
      try {
        if (typeof b.source !== 'string' || b.source.length > 1000) throw Error();
        const url = new URL(b.source.trim());
        if (url.protocol !== 'https:' || url.username || url.password) throw Error();
        source = url.href;
      } catch {
        return reply({error:'Add a public source link starting with https://.'},400);
      }
    }
    await db.prepare('INSERT INTO needs (id,author,stage,title,description,created,kind,source) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING').bind(b.id,user,b.stage,title,desc,Date.now(),kind,source).run();
    const owner=await db.prepare('SELECT author FROM needs WHERE id=?').bind(b.id).first<{author:string}>();
    return owner?.author===user?reply({ok:true}):reply({error:'Please refresh and try again.'},409);
  }
  const need=await db.prepare('SELECT author FROM needs WHERE id=?').bind(b.id).first<{author:string}>();
  if(!need)return reply({error:'This contribution has been removed.'},404);
  if(b.action==='remove' && need.author===user){
    await db.batch([db.prepare('DELETE FROM votes WHERE need=?').bind(b.id),db.prepare('DELETE FROM needs WHERE id=? AND author=?').bind(b.id,user)]);
    return reply({ok:true});
  }
  if(b.action==='vote' && typeof b.on==='boolean'){
    if(need.author===user)return reply({error:'Vote on another participant’s contribution.'},403);
    if(b.on) await db.prepare('INSERT OR IGNORE INTO votes (need,voter) SELECT id,? FROM needs WHERE id=? AND author<>?').bind(user,b.id,user).run();
    else await db.prepare('DELETE FROM votes WHERE need=? AND voter=?').bind(b.id,user).run();
    return reply({ok:true});
  }
  return reply({error:'This action is unavailable.'},403);
}
