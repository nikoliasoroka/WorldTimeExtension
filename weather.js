const WMO_EMOJI = {
  0:'☀️', 1:'🌤️', 2:'⛅', 3:'☁️',
  45:'🌫️', 48:'🌫️',
  51:'🌦️', 53:'🌦️', 55:'🌧️', 56:'🌨️', 57:'🌨️',
  61:'🌧️', 63:'🌧️', 65:'🌧️', 66:'🌨️', 67:'🌨️',
  71:'❄️',  73:'❄️',  75:'❄️',  77:'🌨️',
  80:'🌦️', 81:'🌧️', 82:'🌧️', 85:'🌨️', 86:'🌨️',
  95:'⛈️', 96:'⛈️', 99:'⛈️',
};

const WX_TTL = 30 * 60 * 1000;
const wxKey = label => 'wx_' + label;

function wxReadCache(label) {
  try {
    const raw = localStorage.getItem(wxKey(label));
    if (!raw) return null;
    const entry = JSON.parse(raw);
    return (Date.now() - entry.ts > WX_TTL) ? null : entry;
  } catch { return null; }
}

function wxWriteCache(label, temp, code) {
  try {
    localStorage.setItem(wxKey(label), JSON.stringify({ temp, code, ts: Date.now() }));
  } catch {}
}

async function getWeather(tzEntry) {
  const cached = wxReadCache(tzEntry.label);
  if (cached) return cached;
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${tzEntry.lat}&longitude=${tzEntry.lon}&current=temperature_2m,weather_code`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    const temp = json?.current?.temperature_2m;
    const code = json?.current?.weather_code;
    if (temp == null || code == null) return null;
    wxWriteCache(tzEntry.label, temp, code);
    return { temp, code };
  } catch { return null; }
}
