# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Chrome extension (Manifest V3) — vanilla JS, no build step, no bundler, no transpiler. Load directly in Chrome via `chrome://extensions` with Developer Mode enabled.

## Development

**Load extension:** `chrome://extensions` → Enable Developer Mode → Load unpacked → select repo root

**Reload after changes:** Click refresh icon on extension card in `chrome://extensions`, or use [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader) for one-click reload.

No build, lint, or test commands exist. Testing is manual in the Chrome popup.

## Architecture

Four JS files loaded in order via `popup.html`:

1. **`timezones.js`** — static DB of 63 cities; each entry has IANA zone, lat/lon for weather, localized names for 10 languages, and `search[]` array for CJK/Cyrillic matching
2. **`i18n.js`** — `TRANSLATIONS` object (11 langs × 16 keys) + `LANG_META` array; consumed by `t()` in popup.js
3. **`weather.js`** — fetches Open-Meteo API (no key required), caches in `localStorage` with 30-min TTL, WMO code → emoji map
4. **`popup.js`** — all app state and UI logic; uses `chrome.storage.sync` with `localStorage` fallback

**Storage abstraction:** `useChrome()` in `popup.js` detects Chrome API availability; all reads/writes go through this so the code also works in a plain browser tab for easier debugging.

**Rendering:** `renderClocks()` does incremental DOM updates when clock count is unchanged; `buildClockList()` does full rebuild. Weather badges are fetched async and injected after initial render.

**i18n:** `t(key)` looks up current `lang` in `TRANSLATIONS`, falls back to English. Localized city names come from `tzEntry.names[lang]`, not from `TRANSLATIONS`.

**No API keys** — Open-Meteo is free and public.
