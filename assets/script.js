const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('open'));

// Demo-only tab interaction: no backend needed. Replace arrays with real API data later.
const tabs = document.querySelectorAll('.rank .tabs span');
const rows = document.querySelector('.rank ol');
const data = {
  '等級':['宋家大佬','基努李維','辣手','Joe','暴力美學','團長','張學良','阿蔓'],
  'PK':['辣手','暴力美學','Joe','宋家大佬','團長','阿蔓','張學良','基努李維'],
  '財富':['基努李維','宋家大佬','阿蔓','Joe','團長','辣手','張學良','暴力美學'],
  '血盟':['阿民聯盟','戰神殿','龍魂','冰火盟','王者','天命','兄弟會','修羅'],
  'BOSS':['Joe','宋家大佬','團長','辣手','阿蔓','暴力美學','張學良','基努李維']
};
tabs.forEach(tab=>tab.addEventListener('click',()=>{
  tabs.forEach(t=>t.style.background='');
  tab.style.background='linear-gradient(#60410c,#1f1303)';
  const names = data[tab.textContent.trim()] || data['等級'];
  rows.innerHTML = names.map((n,i)=>`<li><i>${i===0?'🏆':i===1?'🥈':i===2?'🥉':i+1}</i><b>${n}</b><em>Lv. ${Math.max(86,89-i)}</em></li>`).join('');
}));
