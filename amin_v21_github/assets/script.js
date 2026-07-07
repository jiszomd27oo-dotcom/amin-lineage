const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    nav?.classList.remove('open');
  });
});

async function loadNews(){
  const list = document.querySelector('#newsList');
  if(!list) return;
  try{
    const res = await fetch('data/news.json', {cache:'no-store'});
    const news = await res.json();
    list.innerHTML = news.map(item => `
      <li><time>${item.date}</time><span class="tag ${item.tag === 'red' ? 'redtag' : 'greentag'}">${item.type}</span><a href="#">${item.title}</a></li>
    `).join('');
  }catch(e){ console.warn('news json load failed', e); }
}

async function loadRanking(){
  const tabs = document.querySelector('#rankTabs');
  const list = document.querySelector('#rankList');
  if(!tabs || !list) return;
  let data = null;
  try{
    const res = await fetch('data/ranking.json', {cache:'no-store'});
    data = await res.json();
  }catch(e){ console.warn('ranking json load failed', e); return; }
  const render = key => {
    const rows = data[key] || data.level;
    list.innerHTML = rows.map((row, index) => `
      <li><i>${index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}</i><b>${row[0]}</b><em>${row[1]}</em></li>
    `).join('');
  };
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('button[data-rank]');
    if(!btn) return;
    tabs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.rank);
  });
  render('level');
}

function revealOnScroll(){
  const items = document.querySelectorAll('.system-card,.earring-box div,.feature-strip article,.panel');
  items.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('show');
    });
  }, {threshold:.12});
  items.forEach(el => io.observe(el));
}

loadNews();
loadRanking();
revealOnScroll();


// V10 掉寶查詢搜尋
const dropSearch = document.querySelector('#dropSearch');
const dropTable = document.querySelector('#dropTable');
if (dropSearch && dropTable) {
  dropSearch.addEventListener('input', () => {
    const keyword = dropSearch.value.trim().toLowerCase();
    dropTable.querySelectorAll('tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(keyword) ? '' : 'none';
    });
  });
}

// V20 伺服器資訊 JSON 載入
async function loadServerStatus(){
  const map = {
    name: '#serverName',
    status: '#serverStatus',
    exp: '#serverExp',
    drop: '#serverDrop',
    adena: '#serverAdena',
    weapon: '#serverWeapon',
    autoTime: '#serverAuto',
    clan: '#serverClan',
    online: '#serverOnline'
  };
  try{
    const res = await fetch('data/server.json', {cache:'no-store'});
    const data = await res.json();
    Object.entries(map).forEach(([key, selector]) => {
      const el = document.querySelector(selector);
      if(el && data[key]) el.textContent = data[key];
    });
  }catch(e){ console.warn('server json load failed', e); }
}
loadServerStatus();
