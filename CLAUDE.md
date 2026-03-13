# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A macOS desktop Chinese-English dictionary app modeled after Eudic (欧路词典). Dark theme, 1512×982 default window. Users install local `.mdx`/`.mdd` dictionary files; the app queries them on word search and renders the raw HTML from the dictionary files.

**Stack:** Electron 31 + React 18 + TypeScript + Tailwind CSS + electron-vite + js-mdict

---

## Commands

```bash
npm run dev          # Start in development mode (hot reload)
npm run build        # Build all three targets (main, preload, renderer)
npm run typecheck    # Type-check without building
```

No test suite exists yet.

---

## Critical Constraints

**Never add `"type": "module"` to `package.json`.** Electron requires the preload to be CJS. With `"type": "module"`, electron-vite emits `index.mjs` but `src/main/index.ts` references `index.js`, so the preload silently never loads and `window.dictAPI` is undefined in the renderer.

**`postcss.config.js` must use `module.exports =`** (CJS syntax), not `export default`, for the same reason.

**Do not add `css: { postcss: { plugins: [] } }` to `electron.vite.config.ts`** — this overrides PostCSS and breaks Tailwind entirely.

---

## Architecture

### Process Boundary

All dictionary file I/O lives in the **main process**. The renderer never touches Node.js APIs directly. Communication is via `contextBridge` + `ipcRenderer.invoke`:

```
Renderer (React)  →  window.dictAPI.*  →  preload/index.ts (contextBridge)  →  ipcMain.handle  →  Main process
```

`window.dictAPI` is typed in `src/renderer/src/types/global.d.ts`. Every method maps to an IPC channel.

### Main Process (`src/main/`)

- **`index.ts`** — Creates BrowserWindow (`titleBarStyle: 'hiddenInset'`, `trafficLightPosition: {x:16, y:13}`), registers IPC handlers before `createWindow()`.
- **`ipc/dictHandlers.ts`** — Handles all `dict:*` channels. Caches `MDX` instances by path in a module-level `Map` (expensive to parse). Channels: `dict:getAll`, `dict:install`, `dict:updateMdd`, `dict:toggle`, `dict:remove`, `dict:reorder`, `dict:suggest`, `dict:lookup`.
- **`ipc/mddHandlers.ts`** — Handles `mdd:getImage` (returns `data:mime;base64,...`) and `mdd:getText` (returns UTF-8 string). Used for CSS, JS, and image resources embedded in `.mdd` files.
- **`lib/dictStore.ts`** — Persists installed dict list to `~/Library/Application Support/dict-app/installed-dicts.json`.
- **`lib/mddReader.ts`** — Wraps `MDD` from js-mdict. **Key detail:** `MDD` uses `.locate(key)` (not `.lookup()`), which returns `{ definition: base64string }`. Keys are stored with a leading backslash (e.g., `\oalecd8e.css`), so four variants are tried on every lookup.
- **`lib/mdxParser.ts`** — Reads the MDX binary header (4-byte BE uint32 length + UTF-16LE XML) to extract `Title`, `Description`, `Encoding`. HTML entities in attribute values are decoded.

### Renderer (`src/renderer/src/`)

**State machine** in `hooks/useAppState.ts`:
```
'home' → (focus search) → 'search-active' → (submit) → 'search-result'
'search-result' → (clear) → 'home'
any → (switchTab non-dict) → 'placeholder-tab'
'placeholder-tab' + activeTab==='manage' → shows ManageTab
```

**Data flow for word lookup:**
1. `useAppState` sets `currentWord` on submit
2. `useDictLookup(word)` in `App.tsx` calls `window.dictAPI.lookupWord(word)` → returns `DictResult[]` (one per enabled dict that has an entry)
3. `useDictSuggest(word)` calls `window.dictAPI.suggestWords(word)` → returns `string[]` of prefix matches for the sidebar
4. Both are passed as props down to `MainContent` → `DictScrollArea` and `Sidebar` → `SidebarTree`

**MDX HTML rendering** (`components/content/MddImage.tsx`):
- Renders raw dict HTML via `dangerouslySetInnerHTML`
- On mount, finds `<link rel="stylesheet">` → fetches CSS from MDD via `mdd:getText` → injects `<style>` into `document.head` (deduplicated by ID)
- Finds `<script src>` → same pattern, injected sequentially to preserve dependency order (e.g. jQuery before plugins)
- Finds `<img src>` → fetches binary via `mdd:getImage` → replaces with `data:` URI
- Dict HTML uses light-theme CSS, so it renders inside `.dict-html-content` which has a light card background (`#f8f8f8`)

### Layout Structure

```
App
├── TitleBar (38px, drag region, macOS traffic lights)
├── Toolbar (full-width, 6 tabs + nav arrows)
└── Body (flex row, flex-1)
    ├── Sidebar slot (resizable, default 280px)
    │   ├── Normal: Sidebar (search + SidebarTree)
    │   └── Manage: ManageSidebar (category list)
    ├── Drag handle (1px, col-resize cursor)
    └── Content panel (flex-1)
        ├── dict tab: MainContent (WordHeader + DictScrollArea + FeedbackFAB)
        ├── manage tab: ManageTab (action bar + InstalledDictRow list)
        └── other tabs: PlaceholderTab
```

The sidebar width is held in `App.tsx` state (180–520px range). Both `Sidebar` and `ManageSidebar` use `w-full` and fill their container.

### Design Tokens

All colors and font sizes are Tailwind custom tokens defined in `tailwind.config.ts`. **Never use raw hex values in components.** Key tokens: `bg-bg-app`, `bg-bg-sidebar`, `bg-bg-sidebar-hover`, `bg-bg-sidebar-selected`, `text-text-primary`, `text-text-secondary`, `text-text-heading`, `text-text-link-blue`, `accent-blue`, `icon-default`, `divider`. Font sizes: `text-headword`, `text-def-body`, `text-sidebar`, `text-sidebar-sm`, `text-dict-hdr`, etc.

### js-mdict API

```typescript
const { MDX, MDD } = require('js-mdict')  // must use require(), not import

// MDX — dictionary entries
const mdx = new MDX(path)
mdx.lookup(word)   // → { keyText, definition: htmlString } | null  (sync)
mdx.prefix(word)   // → { keyText, ... }[]  (sync, prefix search)

// MDD — binary resources (images, CSS, JS)
const mdd = new MDD(path)
mdd.locate(key)    // → { keyText, definition: base64string | null }  (sync)
// Keys use backslash prefix: '\oalecd8e.css', '\images\foo.png'
```

Both `MDX` and `MDD` instances are expensive to construct — cache them in module-level `Map`s keyed by file path.
