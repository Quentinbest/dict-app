# Figma Design Plan: Desktop Chinese-English Dictionary Prototype

## 1. Project Overview
**Objective:** Create a high-fidelity, interactive Figma prototype for a desktop Chinese-English dictionary application, replicating the core search, navigation, and definition-display experience of Eudic (欧路词典) Desktop in Dark Mode.
**Reference:** Eudic Desktop UI (Dark Mode) — see attached screenshot.
**Figma Methodology:** This plan leverages Interactive Components, Smart Animate, Overlays, Overflow Behaviors, Variables, and Conditionals as described in `research.md`.

---

## 2. Color System & Typography

### Color Palette (Dark Theme)
| Token                | Value       | Usage                                           |
|----------------------|-------------|-------------------------------------------------|
| `bg-app`             | `#2B2B2B`   | Main window background                          |
| `bg-sidebar`         | `#313131`   | Left sidebar background                         |
| `bg-sidebar-hover`   | `#3C3C3C`   | Sidebar list item hover                         |
| `bg-sidebar-selected`| `#0E639C`   | Selected word highlight in sidebar              |
| `bg-toolbar`         | `#2B2B2B`   | Top toolbar background                          |
| `bg-input`           | `#3C3C3C`   | Search input field background                   |
| `bg-tag-orange`      | `#D4762C`   | Part-of-speech tags (DETERMINER, PRONOUN)       |
| `bg-tag-level`       | `#3C3C3C`   | CET-4 / CET-6 level tags (bordered)            |
| `text-primary`       | `#D4D4D4`   | Default body text                               |
| `text-secondary`     | `#9E9E9E`   | Dimmed / secondary text                         |
| `text-heading`       | `#E8E8E8`   | Word headings, section titles                   |
| `text-link-blue`     | `#569CD6`   | Phonetic transcription text                     |
| `text-orange`        | `#D4762C`   | Orange headword in dictionary entry             |
| `text-example-en`    | `#CE9178`   | English example sentence text (warm brown)      |
| `text-example-zh`    | `#9E9E9E`   | Chinese translation text                        |
| `accent-star`        | `#E8A838`   | Star / favorite icon (filled)                   |
| `accent-blue`        | `#0E639C`   | Active / selected accent                        |
| `icon-default`       | `#9E9E9E`   | Default toolbar and UI icons                    |
| `icon-active`        | `#569CD6`   | Active toolbar icon                             |
| `divider`            | `#3C3C3C`   | Subtle horizontal/vertical dividers             |

### Typography
| Element                | Font       | Weight    | Size  |
|------------------------|------------|-----------|-------|
| Window title bar text  | System     | Regular   | 13px  |
| Search input           | System     | Regular   | 14px  |
| Sidebar section header | System     | Semibold  | 13px  |
| Sidebar list item      | System     | Regular   | 13px  |
| Sidebar dict source    | System     | Regular   | 12px  |
| Main headword          | System     | Bold      | 28px  |
| Phonetic transcription | System     | Regular   | 16px  |
| POS tags               | System     | Semibold  | 11px  |
| Definition number      | System     | Bold      | 16px  |
| Definition text        | System     | Regular   | 15px  |
| Example sentence (EN)  | System     | Regular   | 14px  |
| Example sentence (ZH)  | System     | Regular   | 13px  |
| Toolbar icon label     | System     | Regular   | 10px  |

---

## 3. Layout & Frame Structure

**Canvas:** MacBook Pro 14" frame (1512 × 982). Dark theme.

### Anatomy (top to bottom, left to right)

```
┌──────────────────────────────────────────────────────────────────┐
│  TITLE BAR (native macOS)                                        │
│  ● ● ●  [◀ search input ▶ ✕]       "this"        登录学习账号    │
├────────────────────┬─────────────────────────────────────────────┤
│  LEFT SIDEBAR      │  TOP TOOLBAR                                │
│  (~280px)          │  [词典] [百科] [翻译写作] [生词笔记]          │
│                    │  [背单词] [管 理]     ◀ ▶  历史记录  标签     │
│  ┌──────────────┐  ├─────────────────────────────────────────────┤
│  │ Search Bar   │  │  WORD HEADER (Sticky on scroll)             │
│  │ [this   ✕]   │  │  "this"                                     │
│  │ [搜索]       │  │  🔊 英 /ðɪs/  🔊 美 /ðɪs/  全球             │
│  ├──────────────┤  │  ☆☆☆☆☆  ≡  四级  六级                       │
│  │ 单词搜索      │  ├─────────────────────────────────────────────┤
│  │  this ◄──────│  │  DICTIONARY CONTENT (Scrollable)            │
│  │   ├ 牛津高阶  │  │  ┌─────────────────────────────────────┐    │
│  │   ├ LDOCE5++ │  │  │ 📖 牛津高阶英汉双解词典(第8版)        │    │
│  │   ├ 有道...   │  │  │                                     │    │
│  │   ├ Oxford.. │  │  │ this ★  /ðɪs ; ðɪs/                │    │
│  │   ├ Collins. │  │  │ det., pron., adv.                    │    │
│  │   ├ 简明英汉  │  │  │ [DETERMINER] [PRONOUN] ★             │    │
│  │   ├ 麦克米伦  │  │  │ pl. these  /ðiːz ; ðiz/             │    │
│  │   ├ M-W Adv. │  │  │                                     │    │
│  │   └ 我的笔记  │  │  │ 1. ★ used to refer to...            │    │
│  │              │  │  │    ○ How long have you...             │    │
│  │  'this       │  │  │      你在这个国家...                   │    │
│  │  thistle     │  │  │    ○ Well, make up your mind...       │    │
│  │  thistledown │  │  │ 2. ★ used to refer to sth/sb...      │    │
│  │  thistly     │  │  │    ○ There was a court case...        │    │
│  │  thisness    │  │  │ 3. ★ used for introducing...          │    │
│  │  Thisbe      │  │  │    ○ Hello, this is Maria Diaz...     │    │
│  │  this night  │  │  └─────────────────────────────────────┘    │
│  │  this evening│  │                                             │
│  │  this aftern.│  │                                    [😊]     │
│  │  absinthism  │  │                                             │
│  └──────────────┘  │                                             │
├────────────────────┴─────────────────────────────────────────────┤
```

### Panel Breakdown

| Region              | Width / Height       | Scroll Behavior               | Sticky Elements             |
|----------------------|----------------------|-------------------------------|-----------------------------|
| Title Bar            | Full width × 38px   | None                          | —                           |
| Left Sidebar         | 280px × remaining    | Vertical (word + dict list)   | Search bar stays at top     |
| Top Toolbar          | Remaining × 64px    | None                          | —                           |
| Word Header          | Remaining × ~120px  | Sticky on scroll              | Headword, phonetics, tags   |
| Dictionary Content   | Remaining × rest    | Vertical                      | —                           |

---

## 4. UI Components & Interactive Variants

### 4.1 Search Bar
**Variants:**
| State    | Visual                                                              |
|----------|---------------------------------------------------------------------|
| Default  | Placeholder "搜索" in `text-secondary`, magnifying glass icon left  |
| Hover    | Border highlight `accent-blue`                                     |
| Focused  | Blinking cursor, typed text displayed, clear ✕ icon on right       |
| Filled   | Text shown, ✕ clear icon visible                                   |

**Interactions:**
- `While Hovering` → Change to Hover
- `On Click` → Change to Focused
- `On Click (✕ icon)` → Clear text, Change to Default

### 4.2 Sidebar Word List Item
**Variants:**
| State    | Visual                                                    |
|----------|-----------------------------------------------------------|
| Default  | Transparent background, `text-primary`                   |
| Hover    | `bg-sidebar-hover` background                            |
| Selected | `bg-sidebar-selected` background, white text             |

**Interactions:**
- `While Hovering` → Change to Hover
- `On Click` → Change to Selected + trigger word change (see §6 Variables)

### 4.3 Sidebar Dictionary Source Item
Nested under each word. Shows a small icon (colored circle/badge) + dictionary name. Truncated with ellipsis if too long.

**Variants:** Default, Hover (underline or slight highlight)
**Interaction:** `On Click` → `Scroll To` matching dictionary section in main content.

### 4.4 Sidebar Section — Tree Structure
The sidebar uses a **tree/outline** layout:
- **Level 0:** Section header "单词搜索" with disclosure triangle (▶ / ▼)
- **Level 1:** Word name (e.g., "this") — clickable, selectable
  - **Level 2:** Dictionary sources (indented ~20px) — each with a colored icon prefix
- Below the tree: flat list of related words (thistle, thistledown, etc.) with folder icons

### 4.5 Top Toolbar Icons
Six icon-label buttons arranged horizontally in the center-top area:

| Icon        | Label    | Notes                             |
|-------------|----------|-----------------------------------|
| 📖 Book     | 词典     | Active state (blue highlight)     |
| W Wikipedia | 百科     |                                   |
| AI badge    | 翻译写作 | AI-powered translate/write        |
| 📝 Note     | 生词笔记 | Vocabulary notes                  |
| 📚 Cards    | 背单词   | Flashcard / memorize              |
| 🗂 Manage   | 管 理    | Dictionary management             |

**Variants:** Default (`icon-default`), Hover (slight scale + color shift), Active (`icon-active` + underline).
**Interaction:** `While Hovering` → Change to Hover. `On Click` → Change to Active (simulated tab switching).

### 4.6 Navigation Controls (Top Right)
- **◀ ▶** Back / Forward arrows — navigate history
- **历史记录** (History) button
- **标签** (Tags/Labels) button

**Variants:** Default, Hover, Disabled (greyed out when no history).

### 4.7 Pronunciation Button
Small speaker icon next to UK/US phonetic text.

**Variants:**
| State   | Visual                                        |
|---------|-----------------------------------------------|
| Default | Speaker icon, static                          |
| Playing | Speaker icon + animated sound-wave arcs       |

**Interaction:** `On Click` → Change to Playing → `After Delay (1500ms)` → Change back to Default.

### 4.8 Star / Favorite Toggle
Appears next to the headword and next to each definition number.

**Variants:** Unfilled (outline), Filled (`accent-star`).
**Interaction:** `On Click` → Toggle via Boolean variable `IsStarred`.

### 4.9 Part-of-Speech Tags
Small rounded-rectangle badges: `DETERMINER` (orange-brown bg), `PRONOUN` (orange-brown bg).
Static component, no interaction.

### 4.10 Level Tags
Small bordered badges: `四级`, `六级` — indicating CET exam levels.
Static component, no interaction.

### 4.11 Definition Entry Block
Reusable component for each numbered definition:

```
[Number] [★ star] [English definition text]  （Chinese translation）
   ○ [English example sentence]
     [Chinese example translation]
   ○ [English example sentence]
     [Chinese example translation]
```

- Number: bold, blue/dark
- ★: `accent-star` filled star indicating importance
- ○: small circle bullet for examples
- English examples: `text-example-en` (warm brown/salmon)
- Chinese translations: `text-example-zh` (grey, indented below)

### 4.12 Dictionary Section Header
Appears at the start of each dictionary's content block:

```
[Icon] [Dictionary Name (版本)]
```

- Icon: Small badge matching the sidebar dictionary icon (e.g., 📖 for Oxford)
- Background: subtle darker band or divider line above

### 4.13 Feedback Button
Floating circle button (😊 smiley face) in the bottom-right corner of the main content area.
**Interaction:** `On Click` → `Open Overlay` (feedback form overlay, centered, with background dim).

---

## 5. Prototyping Logic & Interactions

### A. Search Flow

**Step 1 — Focus the search bar:**
- **Trigger:** `On Click` on Search Bar component
- **Action:** Change to Focused variant (cursor blink, ready for input)
- **Animation:** `Instant`

**Step 2 — Show autocomplete / results (simulated):**
- **Trigger:** `Key/Gamepad` → Enter key OR `On Click` on the pre-filled search text
- **Action:** `Navigate To` → "Search Result State" frame
- **Animation:** `Smart Animate` (300ms, ease-out) — sidebar populates, main content slides in

**Step 3 — Clear search:**
- **Trigger:** `On Click` on ✕ clear icon
- **Action:** `Navigate To` → "Home / Empty State" frame
- **Animation:** `Smart Animate` (200ms)

### B. Sidebar Word Navigation

**Scrolling:**
- The word list + dictionary tree is inside a frame with **Vertical Scrolling** overflow.
- The Search Bar frame sits above the scrollable area (does NOT scroll away).

**Selecting a related word (e.g., "thistle"):**
- **Trigger:** `On Click` on sidebar word item
- **Action 1:** `Set Variable` → `CurrentSearchWord = "thistle"`
- **Action 2:** Change sidebar item to Selected variant
- **Action 3:** Main content updates via variable binding (headword, dictionary content)
- **Animation:** `Smart Animate` (250ms)

### C. Dictionary Source Anchor Links

Clicking a dictionary name in the sidebar scrolls the main content to that dictionary's section.

- **Trigger:** `On Click` on "Oxford English Living Dictionary" in sidebar
- **Action:** `Scroll To` → Oxford section frame in main content
- **Animation:** `Animate` (smooth, 400ms ease-in-out)

### D. Main Content Scrolling

- **Content area:** Overflow set to `Vertical Scrolling`
- **Word Header (headword + phonetics + tags):** Set to **Sticky Scrolling** — remains pinned at top when scrolling through long definition lists
- **Dictionary sections:** Stacked vertically within the scrollable frame, each clearly separated by the Dictionary Section Header component

### E. Top Toolbar Tab Switching (Simulated)

- **Trigger:** `On Click` on a toolbar icon (e.g., 百科)
- **Action:** `Navigate To` → corresponding view frame (or show placeholder)
- **Animation:** `Dissolve` (200ms)
- Only 词典 (Dictionary) view is fully built out; others show a placeholder screen.

### F. Overlay: Feedback Form

- **Trigger:** `On Click` on the 😊 floating button
- **Action:** `Open Overlay` — feedback form panel
- **Position:** Anchored to bottom-right, offset from trigger
- **Background:** Dimmed background (`#000000` at 40% opacity)
- **Close:** `On Click outside` → `Close Overlay`

---

## 6. Variables

### String Variables
| Variable             | Default   | Bound To                                     |
|----------------------|-----------|----------------------------------------------|
| `CurrentSearchWord`  | `"this"`  | Search input text, Main headword text         |

### Boolean Variables
| Variable       | Default | Bound To                              |
|----------------|---------|---------------------------------------|
| `IsStarred`    | `false` | Star icon next to headword            |

### Usage
- Clicking a related word in the sidebar: `Set Variable → CurrentSearchWord = "<word>"`
- Clicking the star icon: `Set Variable → IsStarred = not IsStarred`
- Conditional: If `IsStarred == true`, show filled star; else show outline star.

---

## 7. Core Frames

### Frame 1: Home / Empty State
- Title bar with window controls
- Left sidebar with empty search bar (Default state), no word list
- Right panel: centered placeholder text "输入单词开始查询" (Type a word to begin) or a subtle illustration
- Top toolbar visible but no active tab highlighted strongly

### Frame 2: Search Active State
- Search bar in Focused state with "this" typed
- Sidebar shows autocomplete dropdown (overlay or inline list) with suggestions:
  - this, thistle, this morning, this evening...
- Right panel: unchanged (empty or previous result dimmed)

### Frame 3: Search Result State (Primary — "this")
- Search bar in Filled state showing "this"
- Sidebar fully populated:
  - Tree: "this" selected → nested dictionary sources listed
  - Related words below the tree
- Right panel fully populated:
  - Word header (sticky): "this", phonetics (UK/US with speaker icons), star rating, CET tags
  - Dictionary content: 牛津高阶英汉双解词典(第8版) section with:
    - Headword entry: `this` ★ `/ðɪs ; ðɪs/` `det., pron., adv.`
    - POS tags: `[DETERMINER]` `[PRONOUN]` ★
    - Plural: `pl. these /ðiːz ; ðiz/`
    - Definitions 1–3+ with examples and Chinese translations
  - Additional dictionary sections below (LDOCE5++, Collins, etc.) — can be abbreviated/placeholder

---

## 8. Step-by-Step Implementation Plan

### Phase 1: Setup
1. Create a new Figma file. Apply the color tokens from §2 as **Color Styles**.
2. Set up **Text Styles** per the typography table.
3. Gather icons using Iconify or Material Symbols: search, speaker, star, chevron, folder, back/forward arrows, close ✕, plus toolbar-specific icons.

### Phase 2: Build Components
4. Build all components from §4 with their interactive variants inside **Component Sets**.
5. Wire internal interactions (hover states, toggle states) on each component set.
6. Create the **Definition Entry Block** as a reusable component with text overrides for number, definition text, example sentences, and translations.

### Phase 3: Layout — Search Result State (Frame 3)
7. Build Frame 3 first (most complex):
   - Assemble the title bar, sidebar, toolbar, word header, and dictionary content.
   - Match typography hierarchy precisely: large headword → phonetics → POS tags → numbered definitions → indented examples.
   - Use Auto Layout for vertical stacking of definition entries.
8. Set **Overflow Behavior**:
   - Sidebar word list frame → Vertical Scrolling
   - Main content area frame → Vertical Scrolling
   - Word header frame → Sticky Scrolling (Fixed when scrolling)

### Phase 4: Layout — Other Frames
9. Duplicate Frame 3 → strip content to create Frame 1 (Home / Empty State).
10. Duplicate Frame 3 → modify search bar and add autocomplete dropdown for Frame 2 (Search Active State).

### Phase 5: Wire Prototype Connections
11. Switch to **Prototype mode**.
12. Connect Search Bar click (Frame 1) → Frame 2 (`Smart Animate`, 200ms).
13. Connect Enter key / suggestion click (Frame 2) → Frame 3 (`Smart Animate`, 300ms).
14. Connect sidebar dictionary sources → `Scroll To` corresponding sections in main content.
15. Connect toolbar icons → placeholder frames or same frame with variant swap.
16. Connect 😊 feedback button → Open Overlay.
17. Set up **Flow Starting Points**: "Main Flow" starting at Frame 1.

### Phase 6: Variables & Polish
18. Create `CurrentSearchWord` and `IsStarred` variables.
19. Bind variables to text layers and star icon conditions.
20. Wire sidebar word clicks to `Set Variable` actions.
21. Final review: run prototype in **Presentation mode**, test all scrolling, hover states, anchor links, and transitions. Adjust Smart Animate timings as needed.

---

## 9. Scope & Constraints

- **In scope:** Search flow, word definition display, sidebar navigation, dictionary anchor links, scrolling behavior, basic toolbar states, pronunciation button animation, star toggle.
- **Out of scope (for V1):** Actual text input (Figma cannot capture real keystrokes — we simulate with pre-filled frames), full multi-dictionary content (only Oxford section fully detailed, others abbreviated), user login flow, settings/preferences, vocabulary book management.
- **Frame count estimate:** 3 primary frames + 1 overlay (feedback) + component sets with ~20 total variants.
