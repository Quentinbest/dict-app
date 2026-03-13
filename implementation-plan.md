# Comprehensive Figma Implementation Plan
## Desktop Chinese-English Dictionary (Eudic-style Dark Mode)

> This document is the step-by-step execution guide for `design-plan.md`.
> Every section maps to a concrete Figma action. Follow phases in order.

---

## Phase 1 — File Setup & Design Tokens

### 1.1 Create the File
1. Open Figma → **New design file**.
2. Rename the file: `Dict App — Eudic Dark Prototype`.
3. Rename the default page: `Prototype Frames`.
4. Add a second page: `🧩 Components`.
5. Add a third page: `🎨 Tokens & Styles`.

### 1.2 Register Color Styles (on "Tokens & Styles" page)
Create a reference frame named `Color Tokens`. Draw 19 rectangles (any size), fill each with the token value, then right-click → **Create style** with the exact token name:

| Style Name             | Hex       |
|------------------------|-----------|
| `bg/app`               | `#2B2B2B` |
| `bg/sidebar`           | `#313131` |
| `bg/sidebar-hover`     | `#3C3C3C` |
| `bg/sidebar-selected`  | `#0E639C` |
| `bg/toolbar`           | `#2B2B2B` |
| `bg/input`             | `#3C3C3C` |
| `bg/tag-orange`        | `#D4762C` |
| `bg/tag-level`         | `#3C3C3C` |
| `text/primary`         | `#D4D4D4` |
| `text/secondary`       | `#9E9E9E` |
| `text/heading`         | `#E8E8E8` |
| `text/link-blue`       | `#569CD6` |
| `text/orange`          | `#D4762C` |
| `text/example-en`      | `#CE9178` |
| `text/example-zh`      | `#9E9E9E` |
| `accent/star`          | `#E8A838` |
| `accent/blue`          | `#0E639C` |
| `icon/default`         | `#9E9E9E` |
| `icon/active`          | `#569CD6` |
| `divider`              | `#3C3C3C` |

### 1.3 Register Text Styles (on "Tokens & Styles" page)
Place sample text, style it, then right-click → **Create style**:

| Style Name              | Family         | Weight   | Size | Line Height |
|-------------------------|----------------|----------|------|-------------|
| `type/titlebar`         | SF Pro Display | Regular  | 13   | 20          |
| `type/search-input`     | SF Pro Text    | Regular  | 14   | 20          |
| `type/sidebar-section`  | SF Pro Text    | Semibold | 13   | 18          |
| `type/sidebar-item`     | SF Pro Text    | Regular  | 13   | 18          |
| `type/sidebar-dict`     | SF Pro Text    | Regular  | 12   | 16          |
| `type/headword`         | SF Pro Display | Bold     | 28   | 36          |
| `type/phonetic`         | SF Pro Text    | Regular  | 16   | 24          |
| `type/pos-tag`          | SF Pro Text    | Semibold | 11   | 14          |
| `type/def-number`       | SF Pro Text    | Bold     | 16   | 22          |
| `type/def-body`         | SF Pro Text    | Regular  | 15   | 22          |
| `type/example-en`       | SF Pro Text    | Regular  | 14   | 20          |
| `type/example-zh`       | SF Pro Text    | Regular  | 13   | 19          |
| `type/toolbar-label`    | SF Pro Text    | Regular  | 10   | 14          |
| `type/dict-header`      | SF Pro Text    | Semibold | 14   | 20          |

> **Note:** If SF Pro is unavailable, substitute with **Inter** (closest match on Figma's default fonts). Use plugin **Font Replacer** if needed.

### 1.4 Install Plugins
- **Iconify** — for all icons (search, speaker, chevron, star, etc.)
- **Lorem Ipsum** — if placeholder text is needed

---

## Phase 2 — Build Interactive Components

> All components are built on the `🧩 Components` page.
> Every component must be a **Component Set** (multiple variants in one frame).
> Use **Auto Layout** on every component for reliable spacing.

---

### 2.1 Search Bar Component

**Layer name:** `SearchBar`
**Size:** W: 248px, H: 32px

**Variant Property:** `State` = Default | Hover | Focused | Filled

#### Default variant
- Frame: `bg/input` fill, corner radius 6, H: 32
- Auto Layout: horizontal, padding H: 8px, gap: 6px
- Left: magnifying-glass icon (16×16, `icon/default`)
- Text: "搜索" — `type/search-input`, `text/secondary`, fill remaining width
- Right: nothing visible

#### Hover variant
- Identical to Default + 1px stroke `accent/blue` (outside)

#### Focused variant
- Same as Hover
- Text field: "this" in `text/primary` (simulate typing)
- Right: ✕ icon (12×12, `icon/default`), visible

#### Filled variant
- Same as Focused but no stroke border
- ✕ icon still visible

**Internal interactions (on component set in Prototype mode):**
- Default → `While Hovering` → `Change To` Hover, `Instant`
- Default → `On Click` → `Change To` Focused, `Instant`
- Hover → `On Click` → `Change To` Focused, `Instant`
- Focused → `On Click` (✕ icon) → `Change To` Default, `Instant`

---

### 2.2 Sidebar Word List Item

**Layer name:** `SidebarWordItem`
**Size:** W: 248px, H: 28px

**Variant Property:** `State` = Default | Hover | Selected

#### Default
- Frame: transparent, corner radius 4
- Auto Layout: horizontal, padding H: 12px, V: 5px
- Left: file/page icon (14×14, `icon/default`)
- Text: word label (`type/sidebar-item`, `text/primary`)

#### Hover
- Fill: `bg/sidebar-hover`

#### Selected
- Fill: `bg/sidebar-selected`
- Text: white `#FFFFFF`
- Icon: white

**Internal interactions:**
- Default → `While Hovering` → `Change To` Hover, `Instant`
- Hover → `Mouse Leave` → `Change To` Default, `Instant`
- Default → `On Click` → `Change To` Selected, `Instant`
- Hover → `On Click` → `Change To` Selected, `Instant`

---

### 2.3 Sidebar Dictionary Source Item

**Layer name:** `SidebarDictItem`
**Size:** W: 228px, H: 24px
**Left indent:** 20px (achieved via left padding in parent Auto Layout)

**Variant Property:** `State` = Default | Hover

#### Default
- Frame: transparent
- Auto Layout: horizontal, padding H: 8px V: 4px, gap: 6px
- Left: colored circle badge (10×10) — each dictionary has its own fill color:
  - 牛津: `#E06C00` (orange)
  - LDOCE5++: `#C678DD` (purple)
  - 有道: `#E06C75` (red)
  - Oxford Living: `#61AFEF` (blue)
  - Collins COBUILD: `#CE9178` (brown)
  - 简明英汉: `#56B6C2` (teal)
  - 麦克米伦: `#E5C07B` (yellow)
  - M-W Advanced: `#98C379` (green)
  - 我的笔记: `#9E9E9E` (grey)
- Text: dict name, `type/sidebar-dict`, `text/secondary`, truncate with ellipsis

#### Hover
- Text: `text/primary` (slightly brighter)
- Underline added

**Internal interactions:**
- Default → `While Hovering` → `Change To` Hover, `Instant`
- Hover → `Mouse Leave` → `Change To` Default, `Instant`

---

### 2.4 Toolbar Icon Button

**Layer name:** `ToolbarButton`
**Size:** W: 72px, H: 56px

**Variant Properties:**
- `State` = Default | Hover | Active
- `Label` = 词典 | 百科 | 翻译写作 | 生词笔记 | 背单词 | 管理

#### Default
- Frame: transparent, corner radius 6
- Auto Layout: vertical, center-aligned, padding 8px, gap: 4px
- Icon: 24×24, `icon/default`
- Label text: `type/toolbar-label`, `text/secondary`

#### Hover
- Fill: `bg/sidebar-hover` (very subtle)
- Icon: `icon/active`
- Label: `text/primary`

#### Active
- Fill: transparent
- Icon: `icon/active`
- Label: `text/primary`
- Bottom border: 2px line in `accent/blue` (use a 2px tall rectangle pinned to bottom)

**Internal interactions:**
- Default → `While Hovering` → `Change To` Hover, `Instant`
- Hover → `Mouse Leave` → `Change To` Default, `Instant`
- Default/Hover → `On Click` → `Change To` Active, `Instant`

---

### 2.5 Nav Arrow Button

**Layer name:** `NavArrow`
**Size:** W: 28px, H: 28px
**Variant Properties:** `State` = Default | Hover | Disabled, `Direction` = Back | Forward

#### Default
- Frame: transparent, corner radius 4
- Icon: chevron-left or chevron-right (18×18, `icon/default`)

#### Hover
- Fill: `bg/sidebar-hover`
- Icon: `text/primary`

#### Disabled
- Icon: `#4A4A4A` (very dim)

**Interactions:** Default → `While Hovering` → Hover. Hover → `Mouse Leave` → Default.

---

### 2.6 Pronunciation Button

**Layer name:** `PronunciationButton`
**Size:** W: 20px, H: 20px
**Variant Property:** `State` = Default | Playing

#### Default
- Icon: speaker-wave (volume icon), 18×18, `icon/default`

#### Playing
- Icon: speaker with animated arcs — simulate with 3 concentric arc lines visible (speaker + 2 wave arcs), colored `icon/active`
- Background: very subtle circular fill `bg/sidebar-hover`

**Interactions:**
- Default → `On Click` → `Change To` Playing, `Instant`
- Playing → `After Delay 1500ms` → `Change To` Default, `Instant`

---

### 2.7 Star Toggle

**Layer name:** `StarToggle`
**Size:** W: 18px, H: 18px
**Variant Property:** `State` = Empty | Filled

#### Empty
- Icon: star-outline, 16×16, `icon/default`

#### Filled
- Icon: star-filled, 16×16, `accent/star`

**Note:** Interaction is driven by Variable in prototype mode (see Phase 6), not internal variant switching. Wire the `On Click` externally to `Set Variable → IsStarred = not IsStarred`.

---

### 2.8 POS Tag (Part-of-Speech Badge)

**Layer name:** `POSTag`
**Variant Property:** `Label` = DETERMINER | PRONOUN | NOUN | VERB | ADJECTIVE | ADVERB

#### Structure
- Frame: `bg/tag-orange`, corner radius 3, padding H: 6px V: 2px
- Text: label text, `type/pos-tag`, white `#FFFFFF`
- No interaction

---

### 2.9 Level Tag (CET Badge)

**Layer name:** `LevelTag`
**Variant Property:** `Level` = 四级 | 六级 | 雅思 | 托福

#### Structure
- Frame: transparent, corner radius 3, 1px stroke `#5A5A5A`, padding H: 5px V: 2px
- Text: level name, `type/pos-tag`, `text/secondary`
- No interaction

---

### 2.10 Definition Entry Block

**Layer name:** `DefinitionEntry`
**Width:** Fill container (dynamic)

**Structure (Auto Layout vertical, gap: 6px):**
```
DefinitionEntry [Auto Layout vertical]
├── Row-Header [Auto Layout horizontal, gap: 6px]
│   ├── DefNumber  (type/def-number, text/link-blue)
│   ├── StarToggle component
│   ├── DefText    (type/def-body, text/primary, fill)
│   └── ZHTranslation (type/def-body, text/secondary) [optional inline]
└── ExampleList [Auto Layout vertical, padding-left: 20px, gap: 4px]
    ├── ExampleItem [Auto Layout vertical, gap: 2px]
    │   ├── EN-Row [Auto Layout horizontal, gap: 6px]
    │   │   ├── Bullet "○" (type/def-body, text/secondary)
    │   │   └── ENText (type/example-en)
    │   └── ZHText (type/example-zh, padding-left: 16px)
    └── ExampleItem (repeat)
```

Create 3 instances pre-filled with content for the word "this" (definitions 1, 2, 3 from the Oxford dictionary as seen in the screenshot).

---

### 2.11 Dictionary Section Header

**Layer name:** `DictSectionHeader`
**Size:** W: fill, H: 36px

**Structure (Auto Layout horizontal, padding H: 16px V: 8px, gap: 8px):**
- Colored circle badge (same as sidebar dict item)
- Dict name text: `type/dict-header`, `text/heading`

Top border: 1px line in `divider`.

---

### 2.12 Feedback FAB (Floating Action Button)

**Layer name:** `FeedbackFAB`
**Size:** W: 44px, H: 44px

- Circle frame, fill `bg/sidebar-hover`, stroke `divider` 1px
- Icon: message-circle or smile face, 22×22, `icon/default`

**Interaction (wired in prototype mode, not internally):** `On Click` → `Open Overlay` feedback panel.

---

### 2.13 Autocomplete Dropdown

**Layer name:** `AutocompleteDropdown`
**Size:** W: 248px, H: auto (≈160px for 6 items)

- Frame: fill `#252526`, stroke `divider` 1px, corner radius 6, drop shadow `#000` 20% 4px
- Contains 6 `SidebarWordItem` components (Default state), pre-filled:
  - this, thistle, this morning, this evening, this afternoon, 'this

---

### 2.14 Feedback Overlay Panel

**Layer name:** `FeedbackOverlay`
**Size:** W: 320px, H: 200px

- Frame: `bg/sidebar`, corner radius 8, shadow
- Title: "Send Feedback" (`type/sidebar-section`, `text/heading`)
- Textarea placeholder: `text/secondary` (static, not interactive)
- Close button (✕) in top-right corner

---

## Phase 3 — Build Frame 3: Search Result State (Primary)

> This is the most complex and important frame. Build it first.
> Frame size: **1512 × 982** (MacBook Pro 14")

### 3.1 Create and Name the Frame
1. Press **F** → drag a 1512 × 982 frame on the `Prototype Frames` page.
2. Name it: `Frame-3_SearchResult`.
3. Fill: `bg/app` (`#2B2B2B`).

### 3.2 Title Bar (H: 38px)
Layer name: `TitleBar`

1. Create a frame inside: W: 1512, H: 38, Y: 0. Fill: `#1E1E1E` (slightly darker).
2. **Left — Window controls:**
   - Three circles (12px diameter) at X: 16, Y: 13: Red `#FF5F57`, Yellow `#FEBC2E`, Green `#28C840`.
   - Group as `WindowControls`.
3. **Center — Search Input Area:**
   - Place `SearchBar` component (Filled state, text "this"), W: 220, centered horizontally in the title bar.
   - Surround with a subtle frame (pill/rounded, `bg/input`, H: 26) if the component doesn't match natively.
4. **Center text — Window title:**
   - Text "this", `type/titlebar`, `text/secondary`, absolute center of title bar.
5. **Right — Login text:**
   - Text "登录学习账号", `type/titlebar`, `text/secondary`, right-aligned, padding-right: 16px.

### 3.3 Left Sidebar (W: 280px)
Layer name: `Sidebar`

1. Create frame: W: 280, H: 944 (982 - 38 title bar), X: 0, Y: 38. Fill: `bg/sidebar`.
2. Right border: 1px stroke `divider` on right side only (use a 1px W rectangle as divider line).

**3.3.1 Sidebar Search Bar Section (H: 72px)**
Layer name: `Sidebar/SearchSection`

- Frame: W: 280, H: 72. Fill: same as sidebar. Auto Layout vertical, padding: 12px 16px, gap: 8px.
- Row 1: `SearchBar` component (Filled state "this"), W: 248.
- Row 2: Button "搜索" — W: 248, H: 24, fill `accent/blue`, text "搜索" white, corner radius 4, centered.

**3.3.2 Sidebar Scrollable Content**
Layer name: `Sidebar/ScrollContent`

- Frame: W: 280, H: 872 (944 - 72). Y: 72.
- Set **Overflow**: Vertical Scrolling (Clip content ON).
- Inner content frame (the actual tall content): W: 280, H: ~1400 (taller than visible area).
- Layer name: `Sidebar/ScrollContent/Inner`.

**Inside ScrollContent/Inner — Tree Section:**

Layer name: `Sidebar/Tree`
Auto Layout vertical, W: 280.

- **Section header row** (H: 28):
  - Auto Layout horizontal, padding H: 12px V: 5px
  - Chevron-down icon (12×12, `icon/default`)
  - Text "单词搜索" (`type/sidebar-section`, `text/secondary`)

- **Word item "this"** — place `SidebarWordItem` (Selected state, label "this"), W: 248, left margin: 16px.

- **Dictionary source items** (indented, left margin: 36px each):
  - Place 9 × `SidebarDictItem` components with respective labels:
    1. 牛津高阶英汉双解词典 (第8版)
    2. LDOCE5++ En-Cn V1.35
    3. 有道在线词典
    4. Oxford English Living Dictiona...
    5. Collins COBUILD overhaul V2
    6. 简明英汉必应版
    7. 麦克米伦高阶英汉双解词典
    8. Merriam-Webster's Advanced
    9. 我的笔记

- **Divider line**: 1px rect `divider`, W: 248, margin H: 16px.

- **Related words list** (flat list, no indent):
  Place 13 × `SidebarWordItem` (Default state) with labels:
  - 'this, thistle, thistledown, thistly, thisness, Thisbe, this night, this evening, this afternoon, absinthism, acathisia, aegithognathism, akathisia

### 3.4 Top Toolbar (W: 1232px, H: 64px)
Layer name: `Toolbar`

1. Frame: X: 280, Y: 38. W: 1232, H: 64. Fill: `bg/toolbar`.
2. Bottom border: 1px `divider`.
3. Auto Layout horizontal, center-aligned vertically.

**Left group — empty spacer** W: 80px.

**Center group — 6 toolbar buttons:**
- Auto Layout horizontal, gap: 0, centered.
- Place 6 × `ToolbarButton` component:
  1. 词典 → Active state
  2. 百科 → Default state
  3. 翻译写作 → Default state
  4. 生词笔记 → Default state
  5. 背单词 → Default state
  6. 管理 → Default state

**Right group** (push to right using spacer):
- Auto Layout horizontal, gap: 8px, padding-right: 16px.
- `NavArrow` Back (Disabled — no history)
- `NavArrow` Forward (Disabled)
- Separator: 1px H: 20px `divider`
- Text button "历史记录" (`type/sidebar-item`, `text/secondary`)
- Text button "标签" (`type/sidebar-item`, `text/secondary`)

### 3.5 Main Content Area (W: 1232px)
Layer name: `MainContent`

Frame: X: 280, Y: 102 (38 + 64). W: 1232, H: 880. Fill: `bg/app`.

**3.5.1 Word Header — Sticky (H: 116px)**
Layer name: `MainContent/WordHeader`

Frame: W: 1232, H: 116. Fill: `bg/app`. Set **position: Fixed** (Sticky behavior in Figma: in the scrollable parent, set "Fix position when scrolling").

Auto Layout vertical, padding: 16px 24px, gap: 8px.

- **Row 1 — Headword:**
  - Text "this" — `type/headword`, `text/heading`

- **Row 2 — Phonetics:**
  - Auto Layout horizontal, gap: 16px, align center.
  - `PronunciationButton` Default + Text "英" (`type/phonetic`, `text/secondary`) + Text "/ðɪs/" (`type/phonetic`, `text/link-blue`)
  - `PronunciationButton` Default + Text "美" + Text "/ðɪs/"
  - Globe icon (16×16) + Text "全球" (`type/phonetic`, `text/secondary`)
  - Separator |
  - Menu-list icon (16×16, `icon/default`)
  - 5 × `StarToggle` (Empty state) — star rating display

- **Row 3 — Level tags:**
  - Auto Layout horizontal, gap: 6px.
  - `LevelTag` 四级
  - `LevelTag` 六级

Bottom border: 1px `divider`.

**3.5.2 Dictionary Content (Scrollable)**
Layer name: `MainContent/DictScroll`

Frame: X: 0, Y: 116. W: 1232, H: 764. Set **Overflow: Vertical Scrolling**. Fill: `bg/app`.

Inner tall content frame: Layer name `MainContent/DictScroll/Inner`, W: 1232, H: ~2400.
Auto Layout vertical.

**Dictionary Block 1 — 牛津高阶英汉双解词典(第8版):**

- Place `DictSectionHeader` (Oxford, orange badge).

- **Entry sub-header** (the entry line inside the dict):
  - Auto Layout horizontal, padding H: 24px V: 12px, gap: 8px, wrap.
  - Text "this" — `type/def-number` size 18, `text/orange` (bold, larger than body)
  - `StarToggle` Filled (this is an important word)
  - Text "/ðɪs ;" `type/phonetic` `text/link-blue`
  - `PronunciationButton`
  - Text "ðɪs/" `type/phonetic` `text/link-blue`
  - Text "det., pron., adv." — italic, `type/def-body`, `text/secondary`

- **POS tag row:**
  - Auto Layout horizontal, gap: 6px, padding H: 24px V: 4px.
  - `POSTag` DETERMINER
  - `POSTag` PRONOUN
  - `StarToggle` Filled

- **Plural line:**
  - Padding H: 24px, text "pl. these" bold + "/ðiːz ;" phonetic + `PronunciationButton` + "ðiz/" phonetic

- **Horizontal rule** (1px `divider` W: 1180px margin H: 24px)

- **3 × `DefinitionEntry` components**, pre-filled:
  - Each with padding-left: 24px, padding-right: 24px.
  - Definition 1: "used to refer to a particular person, thing or event that is close to you..." + 3 examples
  - Definition 2: "used to refer to sth/sb that has already been mentioned..." + 3 examples
  - Definition 3: "used for introducing sb or showing sth to sb..." + 1 example

**Dictionary Block 2 — LDOCE5++ En-Cn V1.35:** (abbreviated placeholder)
- `DictSectionHeader` (LDOCE, purple badge)
- Single frame with `text/secondary` italic text "(Content available — click to expand)"

**Dictionary Block 3 — Collins COBUILD:** (abbreviated placeholder)
- `DictSectionHeader` (Collins, brown badge)
- Same placeholder text

*(Blocks 4–9 follow the same abbreviated pattern)*

**3.5.3 Feedback FAB:**
Layer name: `MainContent/FeedbackFAB`

- Place `FeedbackFAB` component.
- Position: absolute bottom-right, X: 1180, Y: 820 (relative to MainContent).
- **Do NOT** put inside the scrollable inner frame — place it in `MainContent` directly so it stays fixed.

---

## Phase 4 — Build Frame 1: Home / Empty State

1. Duplicate `Frame-3_SearchResult`. Rename to `Frame-1_HomeEmpty`.
2. Modifications:
   - **Title bar search bar** → swap to `SearchBar` Default state (placeholder "搜索").
   - **Window title text** → "欧路词典" (app name) or blank.
   - **Sidebar/Tree** → remove all content inside. Show only the section header "单词搜索".
   - **MainContent/WordHeader** → hide (set opacity 0 or delete and use a placeholder).
   - **MainContent/DictScroll/Inner** → Replace with a centered empty-state frame:
     - Icon: book-open (64×64, `icon/default`, opacity 40%)
     - Text "输入单词开始查询" (`type/def-body`, `text/secondary`, center aligned)
   - **Toolbar** → all 6 `ToolbarButton` in Default state.

---

## Phase 5 — Build Frame 2: Search Active State

1. Duplicate `Frame-1_HomeEmpty`. Rename to `Frame-2_SearchActive`.
2. Modifications:
   - **Title bar search bar** → swap to `SearchBar` Focused state (text "this", cursor shown).
   - **Sidebar/SearchSection search bar** → also change to Focused state showing "this".
   - **Autocomplete Dropdown** → place `AutocompleteDropdown` component directly below the title bar search bar as an **absolute layer** (not in flow), positioned to align with the input. Z-order: above all other content.

---

## Phase 6 — Build the Feedback Overlay Frame

1. Create a new frame on the canvas (not inside any other frame): `Overlay_Feedback`.
2. Size: 320 × 200. Place `FeedbackOverlay` component inside.
3. This frame will be used as an overlay target.

---

## Phase 7 — Wire Prototype Connections

> Switch to **Prototype** tab in the right sidebar. All connections are made here.

### 7.1 Search Flow

| Source | Trigger | Action | Destination | Animation |
|--------|---------|--------|-------------|-----------|
| `Frame-1` → SearchBar (Default/Hover) | `On Click` | Navigate To | `Frame-2_SearchActive` | Smart Animate 200ms ease-out |
| `Frame-2` → SearchBar | `Key/Gamepad` Enter | Navigate To | `Frame-3_SearchResult` | Smart Animate 300ms ease-out |
| `Frame-2` → AutocompleteDropdown item "this" | `On Click` | Navigate To | `Frame-3_SearchResult` | Smart Animate 300ms ease-out |
| `Frame-3` → SearchBar ✕ icon | `On Click` | Navigate To | `Frame-1_HomeEmpty` | Smart Animate 200ms ease-in |

### 7.2 Dictionary Anchor Links

For each `SidebarDictItem` in `Frame-3`, connect to its corresponding section in `MainContent/DictScroll/Inner`:

| Source (sidebar item) | Target frame/group in DictScroll/Inner | Animation |
|-----------------------|----------------------------------------|-----------|
| 牛津高阶英汉双解词典 | Dict Block 1 frame | Scroll To, 400ms |
| LDOCE5++ | Dict Block 2 frame | Scroll To, 400ms |
| Collins COBUILD | Dict Block 3 frame | Scroll To, 400ms |
| (others) | Corresponding block | Scroll To, 400ms |

> **How to do this:** Select the sidebar item → in Prototype panel, drag connection noodle → hold pointer over the scrollable frame until inner elements become selectable → target the dictionary block header.

### 7.3 Toolbar Tab Switching

| Source | Trigger | Action | Destination | Animation |
|--------|---------|--------|-------------|-----------|
| ToolbarButton 百科 (in Frame-3) | `On Click` | Navigate To | `Frame-Placeholder_Baike` | Dissolve 200ms |
| ToolbarButton 词典 (in placeholder) | `On Click` | Navigate To | `Frame-3_SearchResult` | Dissolve 200ms |
| Other toolbar buttons | `On Click` | Navigate To | Same placeholder | Dissolve 200ms |

Create one generic placeholder frame `Frame-Placeholder_OtherTabs` (1512×982, dark bg, centered text "此功能暂未展示").

### 7.4 Feedback Overlay

| Source | Trigger | Action | Destination | Position | Background |
|--------|---------|--------|-------------|----------|------------|
| `FeedbackFAB` in Frame-3 | `On Click` | Open Overlay | `Overlay_Feedback` | Manual (bottom-right, offset -336px, -220px from trigger) | `#000000` 40% opacity |
| ✕ button inside Overlay | `On Click` | Close Overlay | — | — | — |

Also set `Close when clicking outside` = ON in the overlay settings.

### 7.5 NavArrow — Back Navigation

| Source | Trigger | Action | Destination | Animation |
|--------|---------|--------|-------------|-----------|
| `NavArrow` Back in Frame-3 (set to Default) | `On Click` | Navigate To | `Frame-1_HomeEmpty` | Smart Animate 200ms |

---

## Phase 8 — Configure Variables

> In Figma: **Assets panel → Local Variables → +**.

### 8.1 Create Variables

| Name | Type | Default Value |
|------|------|---------------|
| `CurrentSearchWord` | String | `this` |
| `IsStarred` | Boolean | `false` |

### 8.2 Bind Variables

**`CurrentSearchWord`:**
1. In `Frame-3`, select the headword text layer "this".
2. Right-click the text value in the right panel → **Apply variable** → `CurrentSearchWord`.
3. Repeat for the search bar text layer showing "this".

**`IsStarred` (conditional rendering):**
1. Select `StarToggle` (Filled) instance next to headword.
2. In Prototype panel, right-click → **Add condition**: `If IsStarred == false` → set variant to Empty.
3. Wire `StarToggle` `On Click` → `Set Variable → IsStarred = not IsStarred`.

### 8.3 Sidebar Word Click Variable Binding

For each `SidebarWordItem` in the related words list:
- `On Click` → (1) `Set Variable → CurrentSearchWord = "<word>"` (2) `Change To` Selected variant (3) navigate or update via binding.

> Due to Figma limitations on full variable-driven navigation, the primary demo uses Frame-3 as the static result for "this". Variable binding provides best-effort dynamic text update for the headword and search input.

---

## Phase 9 — Scrolling & Overflow Configuration

### 9.1 Sidebar Scroll
1. Select `Sidebar/ScrollContent` frame.
2. Right panel → Prototype tab → **Overflow Behavior: Vertical scrolling**.
3. Ensure **Clip content** is checked on the frame.

### 9.2 Main Content Scroll
1. Select `MainContent/DictScroll` frame.
2. Overflow: **Vertical scrolling**. Clip content: ON.

### 9.3 Sticky Word Header
1. Select `MainContent/WordHeader` frame.
2. In the Design tab → Constraints → set to **Fixed position** (or in newer Figma: in the parent scroll frame, find the layer and toggle **Fix position when scrolling** = ON).

---

## Phase 10 — Flow Starting Point & Presentation

### 10.1 Set Flow Starting Point
1. Select `Frame-1_HomeEmpty` on the canvas.
2. In Prototype panel → click **+** next to "Flows" → Name: "Main Flow".

### 10.2 Prototype Settings
- **Device:** MacBook Pro (or Generic Desktop)
- **Background:** `#1E1E1E`
- **Starting frame:** `Frame-1_HomeEmpty`

### 10.3 QA Checklist
Run the prototype (**⌘ + Return** or "Present" button) and verify:

- [ ] Clicking search bar in empty state navigates to Frame 2 with autocomplete
- [ ] Pressing Enter or clicking autocomplete "this" navigates to Frame 3
- [ ] Clicking ✕ returns to Frame 1
- [ ] Hovering sidebar word items shows hover state
- [ ] Clicking a dictionary source in sidebar scrolls main content to that section
- [ ] Pronunciation button animates on click, auto-resets after 1.5s
- [ ] Star toggle fills/empties on click
- [ ] Feedback FAB opens overlay with dim background
- [ ] Clicking outside overlay closes it
- [ ] Toolbar 词典 button shows active state in Frame 3
- [ ] Clicking 百科 navigates to placeholder frame
- [ ] Sidebar word list scrolls independently (search bar stays fixed)
- [ ] Main content scrolls; word header stays pinned at top

### 10.4 Timing Refinements
If transitions feel unnatural during QA, adjust:
| Transition | Recommended timing |
|------------|-------------------|
| Search bar focus | Instant |
| Frame 1 → 2 | Smart Animate 150ms ease-in-out |
| Frame 2 → 3 | Smart Animate 280ms ease-out |
| Toolbar tab switch | Dissolve 180ms |
| Scroll To anchor | 380ms ease-in-out |

---

## Appendix: Layer Naming Conventions

All layers follow this pattern: `AreaName/SubComponent/ElementName`

```
Frame-3_SearchResult
├── TitleBar
│   ├── WindowControls
│   ├── TitleBar/SearchBar  (component instance)
│   └── TitleBar/LoginText
├── Sidebar
│   ├── Sidebar/SearchSection
│   ├── Sidebar/ScrollContent
│   │   └── Sidebar/ScrollContent/Inner
│   │       ├── Sidebar/Tree
│   │       │   ├── Sidebar/Tree/SectionHeader
│   │       │   ├── Sidebar/Tree/WordItem-this
│   │       │   └── Sidebar/Tree/DictItems
│   │       └── Sidebar/RelatedWords
│   └── Sidebar/Divider
├── Toolbar
│   ├── Toolbar/NavGroup
│   ├── Toolbar/ButtonGroup
│   └── Toolbar/HistoryGroup
└── MainContent
    ├── MainContent/WordHeader
    ├── MainContent/DictScroll
    │   └── MainContent/DictScroll/Inner
    │       ├── DictBlock-Oxford
    │       ├── DictBlock-LDOCE
    │       ├── DictBlock-Collins
    │       └── ...
    └── MainContent/FeedbackFAB
```

---

## Appendix: Component Dependency Map

```
DefinitionEntry
  └── StarToggle
  └── ExampleItem (×n)

SidebarDictItem  ← used in Sidebar/Tree

SidebarWordItem  ← used in Sidebar/Tree + Sidebar/RelatedWords + AutocompleteDropdown

ToolbarButton    ← used in Toolbar/ButtonGroup (6 instances)

DictSectionHeader ← used at top of each DictBlock

PronunciationButton ← used in MainContent/WordHeader (×2) + DictBlock-Oxford entry

StarToggle ← used in MainContent/WordHeader + DefinitionEntry + DictBlock entry header

POSTag ← used in DictBlock-Oxford POS row

LevelTag ← used in MainContent/WordHeader Row 3

FeedbackFAB ← used in MainContent (1 instance)
FeedbackOverlay ← standalone overlay frame
AutocompleteDropdown ← used in Frame-2 as absolute overlay layer
```
