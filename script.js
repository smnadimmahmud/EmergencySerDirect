
let likeCount = 0;
let coinCount = 100;
let copyCount = 0;

const likeCountEl = document.getElementById('likeCount');
const coinCountEl = document.getElementById('coinCount');
const copyCountEl = document.getElementById('copyCount');
document.getElementById('year').textContent = new Date().getFullYear();

const cardsEl = document.getElementById('cards');
const historyList = document.getElementById('historyList');
const noHistory = document.getElementById('noHistory');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');


const services = [
  { id:'national',       title:'National Emergency Number',   subtitle:'National Emergency', number:'999',         tags:['All'],        icon:'assets/emergency.png' },
  { id:'police',         title:'Police Helpline Number',      subtitle:'Police',             number:'999',         tags:['Police'],     icon:'assets/police.png' },
  { id:'fire',           title:'Fire Service Number',         subtitle:'Fire Service',       number:'999',         tags:['Fire'],       icon:'assets/fire-service.png' },
  { id:'ambulance',      title:'Ambulance Service',           subtitle:'Ambulance',          number:'1994-999999', tags:['Health'],     icon:'assets/ambulance.png' },
  { id:'women',          title:'Women & Child Helpline',      subtitle:'Women & Child Helpline', number:'109',     tags:['Help'],       icon:'assets/emergency.png' },
  { id:'anticorruption', title:'Anti-Corruption Helpline',    subtitle:'Anti-Corruption',    number:'106',         tags:['Govt.'],      icon:'assets/emergency.png' },
  { id:'electricity',    title:'Electricity Helpline',        subtitle:'Electricity Outage', number:'16216',       tags:['Electricity'],icon:'assets/emergency.png' },
  { id:'brac',           title:'Brac Helpline',               subtitle:'Brac',               number:'16445',       tags:['NGO'],        icon:'assets/brac.png' },
  { id:'railway',        title:'Bangladesh Railway Helpline', subtitle:'Bangladesh Railway', number:'163',         tags:['Travel'],     icon:'assets/Bangladesh-Railway.png' },
];

const nowTimeString = () =>
  new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit' });


function renderCard(s) {
  const el = document.createElement('article');
  el.className = 'card bg-white rounded-2xl shadow border border-slate-200 p-4 md:p-5 relative flex flex-col';
  el.dataset.sid = s.id;

  el.innerHTML = `
    <div class="flex items-start gap-3 md:gap-4">
      <div class="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-white ring-1 ring-slate-200 flex items-center justify-center overflow-hidden">
        <img src="${s.icon}" alt="${s.title}" class="h-8 w-8 md:h-10 md:w-10 object-contain" />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-[15px] md:text-base font-semibold leading-tight">${s.title}</h3>
        <p class="text-xs text-slate-500">${s.subtitle}</p>
      </div>
      <button class="heart-btn like-btn" title="Like">♡</button>
    </div>

    <div class="mt-3 md:mt-4">
      <div class="text-xl md:text-2xl font-extrabold tracking-wide">${s.number}</div>
      <div class="mt-2 flex flex-wrap gap-2">
        ${s.tags.map(t => `<span class="badge">${t}</span>`).join('')}
      </div>
    </div>

    <div class="mt-3 md:mt-4 flex items-center gap-2.5">
      
      <button class="copy-btn inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white h-9 md:h-10 px-4 md:px-5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              data-number="${s.number}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy
      </button>

      
      <a href="tel:${s.number}"
         class="call-btn inline-flex items-center gap-2 rounded-full bg-brand-500 hover:bg-brand-700 h-9 md:h-10 px-5 md:px-6 text-sm font-semibold text-white transition"
         data-number="${s.number}" data-title="${s.title}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z"/>
        </svg>
        Call
      </a>
    </div>
  `;
  return el;
}


services.forEach(s => cardsEl.appendChild(renderCard(s)));

cardsEl.addEventListener('click', async (e) => {
  const likeBtn = e.target.closest('.like-btn');
  const copyBtn = e.target.closest('.copy-btn');
  const callBtn = e.target.closest('.call-btn');

  if (likeBtn) {
    likeCount += 1;
    likeCountEl.textContent = likeCount;
    likeBtn.classList.add('!text-brand-500');
    return;
  }

  if (copyBtn) {
    const number = copyBtn.dataset.number || '';
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(number);
      else {
        const tmp = document.createElement('input');
        tmp.value = number; document.body.appendChild(tmp);
        tmp.select(); document.execCommand('copy'); tmp.remove();
      }
      copyCount += 1;
      copyCountEl.textContent = copyCount;
      alert('Copied hotline number: ' + number);
    } catch {
      alert('Failed to copy. Please copy manually: ' + number);
    }
    return;
  }

  if (callBtn) {
    e.preventDefault();
    const number = callBtn.dataset.number;
    const title  = callBtn.dataset.title;

    
    if (coinCount <= 0) { alert('You have 0 coins. You cannot place a call.'); return; }
    if (coinCount < 20) { alert('Not enough coins to place a call. You need at least 20 coins.'); return; }

    coinCount -= 20;
    coinCountEl.textContent = coinCount;
    alert(`Calling ${title} — ${number}`);

    addToHistory({ title, number, time: nowTimeString() });
    setTimeout(() => { window.location.href = `tel:${number}`; }, 200);
  }
});


function addToHistory({ title, number, time }) {
  noHistory.classList.add('hidden');
  const li = document.createElement('li');
  li.className = 'px-4 py-3 flex items-center justify-between';
  li.innerHTML = `
    <div>
      <div class="font-medium">${title}</div>
      <div class="text-xs text-slate-500">${number}</div>
    </div>
    <div class="text-xs text-slate-500 tabular-nums">${time}</div>
  `;
  historyList.prepend(li);
}

clearHistoryBtn.addEventListener('click', () => {
  historyList.innerHTML = '';
  noHistory.classList.remove('hidden');
});
