# Dict App — Claude Code Rules

This is a desktop Chinese-English dictionary application modeled after Eudic (欧路词典).
The current project phase is **Figma prototype design** (dark mode, macOS desktop).
Design documents: `design-plan.md`, `implementation-plan.md`, `research.md`.

---

## Project Status

- **Phase:** Figma prototype (no application code yet)
- **Reference UI:** Eudic Desktop, Dark Mode, macOS
- **Canvas size:** 1512 × 982 (MacBook Pro 14")
- **Tech stack:** TBD — when code implementation begins, update this file with framework, styling, and component library decisions.

---

## Figma MCP Integration Rules

These rules define how to translate Figma inputs into code for this project.
**Follow this flow for every Figma-driven task. Do not skip steps.**

### Required Flow

1. Run `get_design_context` first to fetch the structured representation for the exact node(s)
2. If the response is too large or truncated, run `get_metadata` to get the high-level node map, then re-fetch only the required node(s) with `get_design_context`
3. Run `get_screenshot` for a visual reference of the node variant being implemented
4. Only after you have both `get_design_context` and `get_screenshot`, download any assets needed and start implementation
5. Translate the output into this project's conventions (see design tokens and components below)
6. Validate against Figma for 1:1 visual fidelity before marking complete

### Implementation Rules

- Treat Figma MCP output (React + Tailwind) as a *reference*, not final code — adapt to this project's conventions
- IMPORTANT: Never hardcode colors — always use tokens from the color system below
- IMPORTANT: Never hardcode spacing — use the 4px-base spacing scale
- Reuse existing components from the component inventory before creating new ones
- Strive for 1:1 visual parity with the Figma design
- Validate final UI against the Figma screenshot for both look and behavior

### Asset Handling

- IMPORTANT: If the Figma MCP server returns a `localhost` source for an image or SVG, use that source directly
- IMPORTANT: Do NOT install new icon packages — use icons sourced from Figma payload or Iconify (already planned)
- Do NOT use placeholder images if a localhost source is provided

---

## Design Tokens

### Color System (Dark Theme)

```
bg/app               #2B2B2B   Main window background
bg/sidebar           #313131   Left sidebar background
bg/sidebar-hover     #3C3C3C   Sidebar list item hover state
bg/sidebar-selected  #0E639C   Selected word highlight in sidebar
bg/toolbar           #2B2B2B   Top toolbar background
bg/input             #3C3C3C   Search input field background
bg/tag-orange        #D4762C   POS tags (DETERMINER, PRONOUN)
bg/tag-level         #3C3C3C   CET-4 / CET-6 level tag background

text/primary         #D4D4D4   Default body text
text/secondary       #9E9E9E   Dimmed / secondary / placeholder text
text/heading         #E8E8E8   Word headings, section titles
text/link-blue       #569CD6   Phonetic transcription text
text/orange          #D4762C   Orange headword in dictionary entry
text/example-en      #CE9178   English example sentence (warm brown)
text/example-zh      #9E9E9E   Chinese translation of example

accent/star          #E8A838   Star / favorite icon (filled)
accent/blue          #0E639C   Active / selected accent

icon/default         #9E9E9E   Default toolbar and UI icons
icon/active          #569CD6   Active / highlighted icon

divider              #3C3C3C   Subtle horizontal/vertical separator lines
```

### Typography

```
type/titlebar        SF Pro Display  Regular   13px  / 20px
type/search-input    SF Pro Text     Regular   14px  / 20px
type/sidebar-section SF Pro Text     Semibold  13px  / 18px
type/sidebar-item    SF Pro Text     Regular   13px  / 18px
type/sidebar-dict    SF Pro Text     Regular   12px  / 16px
type/headword        SF Pro Display  Bold      28px  / 36px
type/phonetic        SF Pro Text     Regular   16px  / 24px
type/pos-tag         SF Pro Text     Semibold  11px  / 14px
type/def-number      SF Pro Text     Bold      16px  / 22px
type/def-body        SF Pro Text     Regular   15px  / 22px
type/example-en      SF Pro Text     Regular   14px  / 20px
type/example-zh      SF Pro Text     Regular   13px  / 19px
type/toolbar-label   SF Pro Text     Regular   10px  / 14px
type/dict-header     SF Pro Text     Semibold  14px  / 20px
```

Fallback: **Inter** if SF Pro is unavailable.

### Spacing Scale (4px base)

```
space-1   4px
space-2   8px
space-3   12px
space-4   16px
space-5   20px
space-6   24px
space-8   32px
space-10  40px
space-12  48px
```

---

## Component Inventory

All components are defined in `implementation-plan.md` Phase 2. The full list:

| Component Name         | Variants / States                          | Notes                                    |
|------------------------|--------------------------------------------|------------------------------------------|
| `SearchBar`            | Default, Hover, Focused, Filled            | Interactive component with ✕ clear icon  |
| `SidebarWordItem`      | Default, Hover, Selected                   | Used in word tree + related words list   |
| `SidebarDictItem`      | Default, Hover                             | Indented 20px; colored circle badge      |
| `ToolbarButton`        | Default, Hover, Active × 6 labels         | 72×56px; icon + label layout            |
| `NavArrow`             | Default, Hover, Disabled × Back/Forward    | 28×28px                                  |
| `PronunciationButton`  | Default, Playing                           | Auto-resets after 1500ms delay           |
| `StarToggle`           | Empty, Filled                              | Driven by `IsStarred` boolean variable   |
| `POSTag`               | DETERMINER, PRONOUN, NOUN, VERB, ADJ, ADV  | Orange badge, static                     |
| `LevelTag`             | 四级, 六级, 雅思, 托福                      | Bordered badge, static                   |
| `DefinitionEntry`      | (content via text overrides)               | Reusable block: def + examples           |
| `DictSectionHeader`    | (content via text overrides)               | Badge + dict name, top border            |
| `FeedbackFAB`          | (single state)                             | Opens overlay on click                   |
| `AutocompleteDropdown` | (single state)                             | 6 word suggestions, absolute position   |
| `FeedbackOverlay`      | (single state)                             | Overlay frame, closes on outside click  |

---

## Layout Structure

```
Frame (1512×982)
├── TitleBar             H: 38px   fill #1E1E1E
├── Sidebar              W: 280px  fill bg/sidebar
│   ├── SearchSection    H: 72px   (search bar + 搜索 button)
│   └── ScrollContent    Vertical Scrolling overflow
│       └── Inner        (taller than visible — tree + related words)
├── Toolbar              H: 64px   fill bg/toolbar   (X: 280)
└── MainContent          W: 1232px fill bg/app       (X: 280, Y: 102)
    ├── WordHeader        H: ~116px Sticky (fixed when scrolling)
    └── DictScroll        Vertical Scrolling overflow
        └── Inner         (all dictionary blocks stacked)
```

---

## Core Frames

| Frame Name                  | Purpose                                            |
|-----------------------------|----------------------------------------------------|
| `Frame-1_HomeEmpty`         | Initial state, empty search bar, empty content     |
| `Frame-2_SearchActive`      | Search bar focused, autocomplete dropdown visible  |
| `Frame-3_SearchResult`      | Full result for "this" (primary demo frame)        |
| `Frame-Placeholder_OtherTabs` | Generic placeholder for non-dictionary tabs      |
| `Overlay_Feedback`          | Feedback form overlay                              |

---

## Prototype Variables

| Name                | Type    | Default  | Bound to                                  |
|---------------------|---------|----------|-------------------------------------------|
| `CurrentSearchWord` | String  | `"this"` | Search bar text, main headword text layer |
| `IsStarred`         | Boolean | `false`  | StarToggle variant (Empty ↔ Filled)       |

---

## Key Prototype Interactions

| Interaction                     | Trigger           | Action          | Animation              |
|---------------------------------|-------------------|-----------------|------------------------|
| Focus search (Frame 1 → 2)      | On Click SearchBar | Navigate To F2 | Smart Animate 200ms    |
| Submit search (Frame 2 → 3)     | Enter / item click | Navigate To F3 | Smart Animate 300ms    |
| Clear search (Frame 3 → 1)      | On Click ✕        | Navigate To F1  | Smart Animate 200ms    |
| Anchor to dictionary section    | On Click dict item | Scroll To       | Animate 400ms          |
| Pronunciation animation         | On Click speaker  | Change To Playing → After 1500ms → Default | —  |
| Star toggle                     | On Click star     | Set Variable IsStarred = not IsStarred | Instant |
| Feedback overlay                | On Click FAB      | Open Overlay    | — (dim background 40%) |
| Toolbar tab switch              | On Click tab      | Navigate To     | Dissolve 200ms         |

---

## Naming Conventions

### Figma Layer Names
Pattern: `AreaName/SubComponent/ElementName`

```
Frame-3_SearchResult
├── TitleBar
│   ├── WindowControls
│   ├── TitleBar/SearchBar
│   └── TitleBar/LoginText
├── Sidebar
│   ├── Sidebar/SearchSection
│   ├── Sidebar/ScrollContent
│   │   └── Sidebar/ScrollContent/Inner
│   │       ├── Sidebar/Tree
│   │       └── Sidebar/RelatedWords
├── Toolbar
│   ├── Toolbar/NavGroup
│   ├── Toolbar/ButtonGroup
│   └── Toolbar/HistoryGroup
└── MainContent
    ├── MainContent/WordHeader
    ├── MainContent/DictScroll
    │   └── MainContent/DictScroll/Inner
    │       ├── DictBlock-Oxford
    │       └── DictBlock-LDOCE ...
    └── MainContent/FeedbackFAB
```

### Component Variant Properties
- Use PascalCase for property names: `State`, `Label`, `Direction`, `Level`
- Use sentence-case for variant values: `Default`, `Hover`, `Selected`, `Active`, `Disabled`

---

## Scope & Constraints (V1)

**In scope:**
- Search flow (3 frames + overlay)
- Word definition display for "this" (Oxford, abbreviated other sources)
- Sidebar tree navigation + anchor scroll links
- Scrolling behavior (sidebar + main content)
- Toolbar states
- Pronunciation button animation
- Star toggle

**Out of scope for V1:**
- Real text input (Figma limitation — simulate with pre-filled frames)
- Full content for all 9 dictionary sources
- User login flow
- Settings / preferences
- Vocabulary book management
- Application code (this is prototype-only)
