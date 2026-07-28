const playerData = Object.fromEntries(Array.from({length:5},(_,i)=>[`player${i+1}`,{
  name:`Prisoner ${['One','Two','Three','Four','Five'][i]}`,
  className:'Identity pending • Level 10', race:'Unknown', level:10, background:'Record sealed', hp:70, ac:15,
  abilities:{STR:10,DEX:10,CON:10,INT:10,WIS:10,CHA:10}, attacks:['Unarmed Strike • +4 to hit • 1 bludgeoning']
}]));
let currentPlayer = null;
const $ = id => document.getElementById(id);
const THEME_KEY = 'blood-smog-dossier-theme';
const DEFAULT_THEME = 'oxblood';

document.addEventListener('DOMContentLoaded',()=>{
  applyTheme(localStorage.getItem(THEME_KEY) || DEFAULT_THEME);
  document.querySelectorAll('.theme-btn').forEach(btn=>btn.addEventListener('click',()=>{
    localStorage.setItem(THEME_KEY,btn.dataset.theme);
    applyTheme(btn.dataset.theme);
  }));
  $('loginForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    const value=$('playerSelect').value;
    if(!value){$('errorMessage').hidden=false;$('errorMessage').textContent='Select a prisoner file.';return;}
    currentPlayer=value; sessionStorage.setItem('bloodSmogPlayer',value); showDashboard();
  });
  $('logoutBtn')?.addEventListener('click',()=>{
    sessionStorage.removeItem('bloodSmogPlayer'); currentPlayer=null;
    $('playerDashboard').classList.remove('active'); $('loginSection').style.display='block';
  });
  document.querySelectorAll('.dice-btn').forEach(btn=>btn.addEventListener('click',()=>rollDie(Number(btn.dataset.dice))));
  const saved=sessionStorage.getItem('bloodSmogPlayer'); if(saved&&playerData[saved]){currentPlayer=saved;showDashboard();}
});
function applyTheme(theme){
  document.body.dataset.dossierTheme=theme;
  document.querySelectorAll('.theme-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.theme===theme));
}
function showDashboard(){
  const p=playerData[currentPlayer]; $('loginSection').style.display='none'; $('playerDashboard').classList.add('active');
  $('playerName').textContent=p.name; $('playerClass').textContent=p.className; $('charName').textContent=p.name;
  $('charRace').textContent=p.race; $('charClass').textContent=p.className; $('charLevel').textContent=p.level;
  $('charBackground').textContent=p.background; $('currentHP').textContent=p.hp; $('maxHP').textContent=p.hp; $('armorClass').textContent=p.ac;
  $('abilitiesGrid').innerHTML=Object.entries(p.abilities).map(([k,v])=>`<div class="stat-card ability-card"><span class="record-label">${k}</span><div class="result-value">${v}</div></div>`).join('');
  $('attacksList').innerHTML=p.attacks.map(a=>`<p>${a}</p>`).join(''); setupNotes(); populateParty();
}
function rollDie(sides){
  const mod=Number($('diceModifier').value||0), roll=Math.floor(Math.random()*sides)+1, total=roll+mod;
  $('resultValue').textContent=total; $('resultBreakdown').textContent=`d${sides}: ${roll}${mod?`${mod>0?' + ':' - '}${Math.abs(mod)}`:''}`;
  const row=document.createElement('div'); row.className='saved-note-item'; row.textContent=`d${sides} → ${total}`; $('historyList').prepend(row);
  while($('historyList').children.length>8)$('historyList').lastChild.remove();
}
function setupNotes(){
  ['sessionNotes','inventoryNotes','relationshipNotes','theoriesNotes'].forEach(id=>{
    const section=$(`${id}Section`); if(!section||section.querySelector('textarea'))return;
    const area=document.createElement('textarea'); area.rows=7; area.placeholder='Write in the margin…';
    const key=`blood-smog-${currentPlayer}-${id}`; area.value=localStorage.getItem(key)||'';
    area.addEventListener('input',()=>localStorage.setItem(key,area.value)); section.appendChild(area);
  });
}
function populateParty(){
  const box=$('partyList'); box.innerHTML='';
  Object.entries(playerData).filter(([id])=>id!==currentPlayer).forEach(([,p])=>{
    const div=document.createElement('div'); div.className='saved-note-item'; div.textContent=p.name; box.appendChild(div);
  });
}
