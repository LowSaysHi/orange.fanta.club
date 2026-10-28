// Views, modal and event wiring
var $=function(s){return document.querySelector(s)};
function toast(t){var e=$('#toast');e.textContent=t;e.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(function(){e.style.display='none'},2200)}
function nav(on){document.querySelectorAll('nav button').forEach(function(b,i){b.classList.toggle('on',on&&i===0)})}
function home(){
  nav(true);history.replaceState(null,'',location.pathname);
  $('#view').innerHTML='<section class="hero"><div class="pill">Version 2.0 is here <b>Read More →</b></div><h2>Sipping</h2><h1>Fanta.club</h1><p>Welcome to our website! Log in with your credentials to access exclusive content. Have fun and play smart!</p><button class="btn" data-go="soon" style="padding:14px 20px">Our products</button><div class="orange" aria-hidden="true">🍊</div><div class="glow"></div></section>';
}
function profile(){
  if(!user){openModal('login');return}
  nav(false);location.hash='me';
  $('#view').innerHTML='<section class="me"><img class="big" src="assets/img/avatar.jpg" alt="Profile picture"><h2>'+esc(user.nick)+'</h2><div class="mail">✉ '+esc(user.email)+' ✎</div><strong>User</strong><div style="margin-top:24px"><button class="btn" data-go="soon">⬇ Download Loader</button></div><div class="row"><button data-go="soon">🔒 Change Password</button><button data-go="soon">🛡 Enable 2FA</button></div><button class="ghost" data-go="soon">✎ Tell us about you</button><div class="banner"><span>Featured offer</span><span>Starting soon</span><small>Banner placeholder</small></div></section>';
}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function openModal(m){mode=m;var reg=m==='register';
  $('#mt').textContent=reg?'Create an Account':'Welcome back';
  $('#em').style.display=reg?'':'none';$('#tl').style.display=reg?'':'none';
  $('#submit').textContent=reg?'Create an Account':'Log in';
  $('#swap').textContent=reg?'Already have an account? Join':'New here? Create an account';
  $('#err').textContent='';$('#back').classList.add('open');(reg?$('#em'):$('#nn')).focus()}
function closeModal(){$('#back').classList.remove('open')}
function signedIn(){$('#login').style.display='none';$('#uw').style.display='';$('#uname').textContent=user.nick}
$('#login').onclick=function(){openModal('register')};
$('#close').onclick=closeModal;
$('#back').onclick=function(e){if(e.target.id==='back')closeModal()};
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal()});
$('#swap').onclick=function(){openModal(mode==='register'?'login':'register')};
$('#submit').onclick=async function(){
  if(mode==='login'){var ln=$('#nn').value.trim(),lp=$('#pw').value,le=$('#err');await seed();var u=findUser(ln);if(!u||u.hash!==await sha(lp)){le.textContent='Wrong nickname or password.';return}user={nick:u.nick,email:u.email};save(SES,u.nick);signedIn();closeModal();profile();toast('Welcome back, '+u.nick+'!');return}
  var em=$('#em').value.trim(),nn=$('#nn').value.trim(),pw=$('#pw').value,err=$('#err');
  if(mode==='register'&&!/^\S+@\S+\.\S+$/.test(em)){err.textContent='Enter a valid e-mail address.';return}
  if(nn.length<3){err.textContent='Nickname needs at least 3 characters.';return}
  if(pw.length<8){err.textContent='Password needs at least 8 characters.';return}
  if(mode==='register'&&!$('#tos').checked){err.textContent='Accept the Terms of Service to continue.';return}
  if(findUser(nn)||findUser(em)){err.textContent='That nickname or e-mail is already taken.';return}
  var us=load(USR,{});us[nn]={nick:nn,email:em,hash:await sha(pw)};save(USR,us);
  user={nick:nn,email:em};save(SES,nn);signedIn();closeModal();profile();toast('Account created. Welcome, '+nn+'!');
};
$('#usr').onclick=function(e){e.stopPropagation();$('#menu').classList.toggle('open')};
$('#pf').onclick=function(){$('#menu').classList.remove('open');profile()};
$('#out').onclick=function(){$('#menu').classList.remove('open');user=null;save(SES,null);$('#uw').style.display='none';$('#login').style.display='';home();toast('Logged out')};
document.addEventListener('click',function(){$('#menu').classList.remove('open')});
$('#home').onclick=home;
document.addEventListener('click',function(e){var b=e.target.closest('[data-go]');if(!b)return;
  if(b.dataset.go==='home')home();else toast('Coming soon')});
seed().then(function(){var s=load(SES,null),u=s&&findUser(s);if(u){user={nick:u.nick,email:u.email};signedIn();if(location.hash==='#me')profile();else home()}else home()});
