import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../../chatgpt-auth';
import {boardRequest} from '../../../lib/board-service';
export const dynamic='force-dynamic';
async function handle(req:Request){
  if(!env.DB)return Response.json({error:'The board is temporarily unavailable.'},{status:503});
  try{return await boardRequest(req,env.DB,(await getChatGPTUser())?.userId??null);}
  catch{return Response.json({error:'The board could not be reached. Please try again.'},{status:503,headers:{'Cache-Control':'no-store'}});}
}
export const GET=handle;
export const POST=handle;
