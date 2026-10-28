// Account storage + password hashing (browser-only demo)
var user=null,mode='register',mem={},USR='fanta_users',SES='fanta_session';
function load(k,d){try{var v=localStorage.getItem(k);if(v!==null)return JSON.parse(v)}catch(e){}return mem[k]!==undefined?JSON.parse(mem[k]):d}
function save(k,v){mem[k]=JSON.stringify(v);try{localStorage.setItem(k,mem[k])}catch(e){}return true}
function findUser(q){if(!q)return null;q=q.toLowerCase();var us=load(USR,{});for(var k in us){if(us[k].nick.toLowerCase()===q||(us[k].email||'').toLowerCase()===q)return us[k]}return null}
async function sha(t){try{var b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('fanta:'+t));return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('')}catch(e){return 'p:'+t}}
async function seed(){if(!findUser('Low')){var us=load(USR,{});us['Low']={nick:'Low',email:'low@fanta.club',hash:await sha('1234')};save(USR,us)}}
