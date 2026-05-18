// ── State ──────────────────────────────────────────────
const DEFAULT_ZONES = [
  { label:'New York', zone:'America/New_York' },
  { label:'London',   zone:'Europe/London'    },
  { label:'Tokyo',    zone:'Asia/Tokyo'        },
];

let savedZones     = [];
let addPanelOpen   = false;
let langPickerOpen = false;
let is24Hour       = false;
let isDark         = true;
let lang           = 'en';

// ── DOM ────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const clockList    = $('clockList');
const addPanel     = $('addPanel');
const btnToggleAdd = $('btnToggleAdd');
const searchInput  = $('searchInput');
const tzDropdown   = $('tzDropdown');
const localLabel   = $('localLabel');
const localTimeEl  = $('localTime');
const utcOffsetEl  = $('utcOffset');
const formatToggle = $('formatToggle');
const toggleLabel  = $('toggleLabel');
const btnTheme     = $('btnTheme');
const btnLang      = $('btnLang');
const langPicker   = $('langPicker');
const langGrid     = $('langGrid');
const langFlag     = $('langFlag');
const htmlEl       = document.documentElement;

// ── Storage ────────────────────────────────────────────
const useChrome = () => typeof chrome !== 'undefined' && chrome.storage;

function loadAll(cb) {
  if (useChrome()) {
    chrome.storage.sync.get(['worldTimeZones','is24Hour','isDark','lang'], res => {
      savedZones = res.worldTimeZones || DEFAULT_ZONES;
      is24Hour   = res.is24Hour ?? false;
      isDark     = res.isDark   ?? true;
      lang       = res.lang     || 'en';
      cb();
    });
  } else {
    const s = localStorage.getItem('worldTimeZones');
    savedZones = s ? JSON.parse(s) : DEFAULT_ZONES;
    is24Hour   = localStorage.getItem('is24Hour') === 'true';
    isDark     = localStorage.getItem('isDark') !== 'false';
    lang       = localStorage.getItem('lang') || 'en';
    cb();
  }
}

function persist(obj) {
  if (useChrome()) {
    chrome.storage.sync.set(obj);
  } else {
    Object.entries(obj).forEach(([k,v]) =>
      localStorage.setItem(k, typeof v === 'object' ? JSON.stringify(v) : String(v)));
  }
}

// ── i18n ───────────────────────────────────────────────
function t(key) { return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key; }

function cityName(tz) {
  return (tz.names && tz.names[lang]) || tz.label;
}

function applyTranslations() {
  const meta = LANG_META.find(m => m.code === lang) || LANG_META[0];
  langFlag.textContent       = meta.flag;
  btnToggleAdd.textContent   = addPanelOpen ? t('btnClose') : t('btnAddZone');
  searchInput.placeholder    = t('searchPlaceholder');
  localLabel.textContent     = t('localLabel');
  toggleLabel.textContent    = is24Hour ? t('hours24') : t('ampm');
  buildClockList();
  updateLocalTime();
  if (addPanelOpen) renderDropdown(searchInput.value);
}

// ── Language picker ────────────────────────────────────
function buildLangGrid() {
  langGrid.innerHTML = LANG_META.map(m =>
    `<div class="lang-flag-btn ${m.code === lang ? 'active' : ''}" data-code="${m.code}">${m.flag}</div>`
  ).join('');
  langGrid.querySelectorAll('.lang-flag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      lang = btn.dataset.code;
      persist({ lang });
      closeLangPicker();
      applyTranslations();
    });
  });
}

function openLangPicker()  { buildLangGrid(); langPicker.classList.add('open'); langPickerOpen = true; }
function closeLangPicker() { langPicker.classList.remove('open'); langPickerOpen = false; }

btnLang.addEventListener('click', e => {
  e.stopPropagation();
  langPickerOpen ? closeLangPicker() : openLangPicker();
});
document.addEventListener('click', e => {
  if (langPickerOpen && !langPicker.contains(e.target) && e.target !== btnLang) closeLangPicker();
});

// ── Theme ──────────────────────────────────────────────
function applyTheme() { htmlEl.setAttribute('data-theme', isDark ? 'dark' : 'light'); }

btnTheme.addEventListener('click', () => { isDark = !isDark; applyTheme(); persist({ isDark }); });

// ── Time helpers ───────────────────────────────────────
function getTimeInZone(zone) {
  const now     = new Date();
  const locale  = is24Hour ? 'en-GB' : 'en-US';
  const timeStr = now.toLocaleTimeString(locale, {
    timeZone:zone, hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:!is24Hour,
  });
  const dateStr = now.toLocaleDateString(t('dateLocale'), {
    timeZone:zone, weekday:'short', month:'short', day:'numeric',
  });
  const hour = parseInt(now.toLocaleString('en-US', { timeZone:zone, hour:'numeric', hour12:false }));
  return { timeStr, dateStr, hour };
}

function getDayPhase(h) {
  if (h >= 6 && h < 18) return 'daytime';
  if (h >= 18 && h < 21) return 'evening';
  return 'nighttime';
}

function fmtTime(str) {
  if (is24Hour) return `<span>${str}</span>`;
  const m = str.match(/^(\d+:\d+:\d+)\s*(AM|PM)$/i);
  return m ? `<span>${m[1]}</span><span class="ampm">${m[2]}</span>` : str;
}

function getUTCOffset() {
  const off = -new Date().getTimezoneOffset();
  const s   = off >= 0 ? '+' : '-';
  const a   = Math.abs(off);
  return `UTC${s}${String(Math.floor(a/60)).padStart(2,'0')}:${String(a%60).padStart(2,'0')}`;
}

// ── Clock rendering ────────────────────────────────────
function renderClocks() {
  if (!savedZones.length) { buildClockList(); return; }
  const items = clockList.querySelectorAll('.clock-item');
  if (items.length !== savedZones.length) { buildClockList(); return; }
  savedZones.forEach((z, i) => {
    const { timeStr, dateStr, hour } = getTimeInZone(z.zone);
    const item = items[i]; if (!item) return;
    item.querySelector('.clock-time').innerHTML    = fmtTime(timeStr);
    item.querySelector('.clock-date').textContent  = dateStr;
    item.className = 'clock-item ' + getDayPhase(hour);
  });
}

function buildClockList() {
  if (!savedZones.length) {
    clockList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🌐</div>
        <div class="empty-title">${t('emptyTitle')}</div>
        <div class="empty-text">${t('emptyHint')}</div>
      </div>`;
    return;
  }
  clockList.innerHTML = '';
  savedZones.forEach((z, i) => {
    const tzEntry     = TIMEZONES.find(tz => tz.zone === z.zone && tz.label === z.label);
    const displayName = tzEntry ? cityName(tzEntry) : z.label;
    const { timeStr, dateStr, hour } = getTimeInZone(z.zone);
    const div = document.createElement('div');
    div.className = 'clock-item ' + getDayPhase(hour);
    div.innerHTML = `
      <div class="day-dot"></div>
      <div class="clock-info">
        <div class="clock-city">${displayName}</div>
        <div class="clock-date">${dateStr}</div>
      </div>
      <div class="clock-time">${fmtTime(timeStr)}</div>
      <button class="btn-remove" title="${t('removeTitle')}" data-i="${i}">✕</button>`;
    clockList.appendChild(div);
  });
  clockList.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', e => {
      savedZones.splice(parseInt(e.currentTarget.dataset.i), 1);
      persist({ worldTimeZones: savedZones });
      buildClockList();
      if (addPanelOpen) renderDropdown(searchInput.value);
    });
  });
}

// ── Footer ─────────────────────────────────────────────
function updateLocalTime() {
  localTimeEl.textContent = new Date().toLocaleTimeString(
    is24Hour ? 'en-GB' : 'en-US', { hour12: !is24Hour });
  utcOffsetEl.textContent = getUTCOffset();
}

// ── Format toggle ──────────────────────────────────────
formatToggle.addEventListener('change', () => {
  is24Hour = formatToggle.checked;
  toggleLabel.textContent = is24Hour ? t('hours24') : t('ampm');
  persist({ is24Hour });
  buildClockList();
  updateLocalTime();
});

// ── Search & dropdown ──────────────────────────────────
function matchesQuery(tz, q) {
  return (
    tz.label.toLowerCase().includes(q) ||
    tz.zone.toLowerCase().includes(q)  ||
    tz.city.toLowerCase().includes(q)  ||
    (tz.names && Object.values(tz.names).some(n => n.toLowerCase().includes(q))) ||
    (tz.search || []).some(s => s.toLowerCase().includes(q))
  );
}

function renderDropdown(query) {
  const q = query.trim().toLowerCase();
  const filtered = q ? TIMEZONES.filter(tz => matchesQuery(tz, q)) : TIMEZONES;

  if (!filtered.length) {
    tzDropdown.innerHTML = `<div class="tz-option"><span class="tz-option-zone">${t('noResults')}</span></div>`;
    tzDropdown.classList.add('open');
    return;
  }
  tzDropdown.innerHTML = filtered.slice(0,40).map(tz => {
    const isAdded = savedZones.some(z => z.zone === tz.zone && z.label === tz.label);
    const name    = cityName(tz);
    return `
      <div class="tz-option ${isAdded ? 'already-added':''}" data-zone="${tz.zone}" data-label="${tz.label}">
        <div>
          <div class="tz-option-name">${name}</div>
          <div class="tz-option-zone">${tz.zone}</div>
        </div>
        ${isAdded ? `<span class="added-badge">${t('alreadyAdded')}</span>` : ''}
      </div>`;
  }).join('');
  tzDropdown.classList.add('open');
  tzDropdown.querySelectorAll('.tz-option:not(.already-added)').forEach(opt => {
    opt.addEventListener('click', () => {
      savedZones.push({ label: opt.dataset.label, zone: opt.dataset.zone });
      persist({ worldTimeZones: savedZones });
      buildClockList();
      renderDropdown(searchInput.value);
    });
  });
}

// ── Add panel ──────────────────────────────────────────
btnToggleAdd.addEventListener('click', () => {
  addPanelOpen = !addPanelOpen;
  addPanel.classList.toggle('open', addPanelOpen);
  btnToggleAdd.textContent = addPanelOpen ? t('btnClose') : t('btnAddZone');
  if (addPanelOpen) { searchInput.focus(); renderDropdown(''); }
  else { tzDropdown.classList.remove('open'); searchInput.value = ''; }
});
searchInput.addEventListener('input', () => renderDropdown(searchInput.value));

// ── Animate clock hand ─────────────────────────────────
function animateHand() {
  const hand = document.querySelector('.clock-hand-min');
  if (!hand) return;
  const now = new Date();
  const deg = ((now.getSeconds() + now.getMinutes() * 60) / 3600) * 360;
  hand.style.transform = `translateY(-50%) rotate(${deg}deg)`;
}

// ── Init ───────────────────────────────────────────────
loadAll(() => {
  applyTheme();
  formatToggle.checked = is24Hour;
  applyTranslations();
  updateLocalTime();
  animateHand();
  setInterval(() => { renderClocks(); updateLocalTime(); animateHand(); }, 1000);
});
