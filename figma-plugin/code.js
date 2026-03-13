// Dict App Builder — Figma Plugin
// Builds the Eudic-style dark-mode dictionary prototype as defined in design-plan.md

figma.showUI(__html__, { width: 320, height: 180 });

figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'build') return;

  try {
    figma.ui.postMessage({ status: 'Loading fonts…' });
    await loadFonts();
    figma.ui.postMessage({ status: 'Creating color styles…' });
    await createColorStyles();
    figma.ui.postMessage({ status: 'Building Frame 3 (Search Result)…' });
    const f3 = buildFrame3();
    figma.ui.postMessage({ status: 'Building Frame 1 (Home Empty)…' });
    const f1 = buildFrame1();
    f1.x = 1560;

    figma.viewport.scrollAndZoomIntoView([f3, f1]);
    figma.ui.postMessage({ status: '✅ Done! 2 frames created.' });
    figma.closePlugin('✅ Dict App frames created successfully.');
  } catch (err) {
    figma.ui.postMessage({ status: '❌ Error: ' + err.message });
    figma.closePlugin('Error: ' + err.message);
  }
};

// ─── Color tokens ────────────────────────────────────────────────────────────

const C = {
  bgApp:            { r: 0.169, g: 0.169, b: 0.169 },
  bgTitleBar:       { r: 0.118, g: 0.118, b: 0.118 },
  bgSidebar:        { r: 0.192, g: 0.192, b: 0.192 },
  bgSidebarHover:   { r: 0.235, g: 0.235, b: 0.235 },
  bgSidebarSelected:{ r: 0.055, g: 0.388, b: 0.612 },
  bgInput:          { r: 0.235, g: 0.235, b: 0.235 },
  bgTagOrange:      { r: 0.831, g: 0.463, b: 0.173 },

  textPrimary:      { r: 0.831, g: 0.831, b: 0.831 },
  textSecondary:    { r: 0.620, g: 0.620, b: 0.620 },
  textHeading:      { r: 0.910, g: 0.910, b: 0.910 },
  textLinkBlue:     { r: 0.337, g: 0.612, b: 0.839 },
  textOrange:       { r: 0.831, g: 0.463, b: 0.173 },
  textExampleEn:    { r: 0.808, g: 0.569, b: 0.471 },
  textExampleZh:    { r: 0.620, g: 0.620, b: 0.620 },

  accentStar:       { r: 0.910, g: 0.659, b: 0.220 },
  accentBlue:       { r: 0.055, g: 0.388, b: 0.612 },
  iconDefault:      { r: 0.620, g: 0.620, b: 0.620 },
  iconActive:       { r: 0.337, g: 0.612, b: 0.839 },
  divider:          { r: 0.235, g: 0.235, b: 0.235 },
  white:            { r: 1,     g: 1,     b: 1     },
  trafficRed:       { r: 1,     g: 0.357, b: 0.341 },
  trafficYellow:    { r: 0.996, g: 0.737, b: 0.180 },
  trafficGreen:     { r: 0.157, g: 0.784, b: 0.251 },
  navDisabled:      { r: 0.290, g: 0.290, b: 0.290 },

  dictOxford:       { r: 0.878, g: 0.424, b: 0.000 },
  dictLDOCE:        { r: 0.776, g: 0.471, b: 0.867 },
  dictYoudao:       { r: 0.878, g: 0.424, b: 0.459 },
  dictOxfordLiving: { r: 0.380, g: 0.686, b: 0.937 },
  dictCollins:      { r: 0.808, g: 0.569, b: 0.471 },
  dictJianming:     { r: 0.337, g: 0.714, b: 0.761 },
  dictMacmillan:    { r: 0.898, g: 0.753, b: 0.482 },
  dictMW:           { r: 0.596, g: 0.765, b: 0.475 },
  dictNotes:        { r: 0.620, g: 0.620, b: 0.620 },
};

function solid(color, opacity = 1) {
  return [{ type: 'SOLID', color, opacity }];
}

// ─── Font loading ─────────────────────────────────────────────────────────────

async function loadFonts() {
  const fonts = [
    { family: 'Inter', style: 'Regular' },
    { family: 'Inter', style: 'Bold' },
    { family: 'Inter', style: 'Semi Bold' },
    { family: 'Inter', style: 'Italic' },
    { family: 'Inter', style: 'Bold Italic' },
  ];
  await Promise.all(fonts.map(f => figma.loadFontAsync(f)));
}

// ─── Color style registration ─────────────────────────────────────────────────

async function createColorStyles() {
  const entries = [
    ['bg/app',              C.bgApp],
    ['bg/titlebar',         C.bgTitleBar],
    ['bg/sidebar',          C.bgSidebar],
    ['bg/sidebar-hover',    C.bgSidebarHover],
    ['bg/sidebar-selected', C.bgSidebarSelected],
    ['bg/input',            C.bgInput],
    ['bg/tag-orange',       C.bgTagOrange],
    ['text/primary',        C.textPrimary],
    ['text/secondary',      C.textSecondary],
    ['text/heading',        C.textHeading],
    ['text/link-blue',      C.textLinkBlue],
    ['text/orange',         C.textOrange],
    ['text/example-en',     C.textExampleEn],
    ['text/example-zh',     C.textExampleZh],
    ['accent/star',         C.accentStar],
    ['accent/blue',         C.accentBlue],
    ['icon/default',        C.iconDefault],
    ['icon/active',         C.iconActive],
    ['divider',             C.divider],
  ];
  const existing = figma.getLocalPaintStyles().reduce((m, s) => { m[s.name] = s; return m; }, {});
  for (const [name, color] of entries) {
    if (!existing[name]) {
      const style = figma.createPaintStyle();
      style.name = name;
      style.paints = solid(color);
    }
  }
}

// ─── Low-level helpers ────────────────────────────────────────────────────────

function frame(name, w, h, x, y, bg = C.bgApp) {
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, h);
  f.x = x; f.y = y;
  f.fills = solid(bg);
  f.clipsContent = false;
  return f;
}

function rect(name, w, h, x, y, color) {
  const r = figma.createRectangle();
  r.name = name;
  r.resize(w, h);
  r.x = x; r.y = y;
  r.fills = solid(color);
  return r;
}

function ellipse(name, w, h, x, y, color) {
  const e = figma.createEllipse();
  e.name = name;
  e.resize(w, h);
  e.x = x; e.y = y;
  e.fills = solid(color);
  return e;
}

function text(name, content, size, style, color, x, y, opts = {}) {
  const t = figma.createText();
  t.name = name;
  t.fontName = { family: 'Inter', style };
  t.fontSize = size;
  t.fills = solid(color);
  t.characters = content;
  t.x = x; t.y = y;
  if (opts.width) { t.textAutoResize = 'HEIGHT'; t.resize(opts.width, t.height); }
  if (opts.lineHeight) t.lineHeight = { value: opts.lineHeight, unit: 'PIXELS' };
  return t;
}

function dividerH(w, x, y) {
  return rect('Divider', w, 1, x, y, C.divider);
}

function dividerV(h, x, y) {
  return rect('Divider', 1, h, x, y, C.divider);
}

function roundedFrame(name, w, h, x, y, bg, radius) {
  const f = frame(name, w, h, x, y, bg);
  f.cornerRadius = radius;
  return f;
}

function borderedBadge(name, label, x, y) {
  const f = roundedFrame(name, 36, 20, x, y, C.bgInput, 3);
  f.strokes = [{ type: 'SOLID', color: { r: 0.353, g: 0.353, b: 0.353 } }];
  f.strokeWeight = 1;
  f.strokeAlign = 'INSIDE';
  const t = text('Label', label, 11, 'Semi Bold', C.textSecondary, 5, 3);
  f.appendChild(t);
  return f;
}

function orangeBadge(name, label, x, y) {
  const charWidth = label.length * 7;
  const w = charWidth + 12;
  const f = roundedFrame(name, w, 20, x, y, C.bgTagOrange, 3);
  const t = text('Label', label, 11, 'Semi Bold', C.white, 6, 3);
  f.appendChild(t);
  return f;
}

// ─── Frame 3: Search Result State ────────────────────────────────────────────

function buildFrame3() {
  const root = frame('Frame-3_SearchResult', 1512, 982, 0, 0, C.bgApp);
  figma.currentPage.appendChild(root);

  root.appendChild(buildTitleBar(1512, 38, 'this'));
  root.appendChild(buildSidebar(280, 944, 38, true));
  root.appendChild(buildToolbar(1232, 64, 280, 38));
  root.appendChild(buildMainContent(1232, 880, 280, 102, true));

  return root;
}

// ─── Frame 1: Home / Empty State ─────────────────────────────────────────────

function buildFrame1() {
  const root = frame('Frame-1_HomeEmpty', 1512, 982, 0, 0, C.bgApp);
  figma.currentPage.appendChild(root);

  root.appendChild(buildTitleBar(1512, 38, ''));
  root.appendChild(buildSidebar(280, 944, 38, false));
  root.appendChild(buildToolbar(1232, 64, 280, 38));
  root.appendChild(buildMainContent(1232, 880, 280, 102, false));

  return root;
}

// ─── Title Bar ────────────────────────────────────────────────────────────────

function buildTitleBar(w, h, searchText) {
  const bar = frame('TitleBar', w, h, 0, 0, C.bgTitleBar);

  // Traffic lights
  const tlColors = [C.trafficRed, C.trafficYellow, C.trafficGreen];
  tlColors.forEach((c, i) => {
    bar.appendChild(ellipse(['Close','Minimize','Maximize'][i], 12, 12, 16 + i * 20, 13, c));
  });

  // Center search pill
  const pill = roundedFrame('TitleBar/SearchBar', 220, 26, (w - 220) / 2, 6, C.bgInput, 13);
  if (searchText) {
    pill.appendChild(text('Text', searchText, 13, 'Regular', C.textPrimary, 10, 5));
    // Clear icon
    pill.appendChild(text('ClearBtn', '✕', 11, 'Regular', C.textSecondary, 195, 6));
  } else {
    pill.appendChild(text('Placeholder', '搜索...', 13, 'Regular', C.textSecondary, 10, 5));
  }
  bar.appendChild(pill);

  // Window title (word name)
  const title = text('TitleBar/Title', searchText || '欧路词典', 13, 'Regular', C.textSecondary,
    (w - (searchText ? 20 : 60)) / 2, 11);
  bar.appendChild(title);

  // Login text
  bar.appendChild(text('TitleBar/Login', '登录学习账号', 12, 'Regular', C.textSecondary, w - 100, 11));

  return bar;
}

// ─── Left Sidebar ─────────────────────────────────────────────────────────────

function buildSidebar(w, h, y, populated) {
  const sb = frame('Sidebar', w, h, 0, y, C.bgSidebar);
  sb.clipsContent = true;
  sb.appendChild(dividerV(h, w - 1, 0));

  // Search section
  sb.appendChild(buildSidebarSearch(w, populated));

  // Scrollable content
  if (populated) {
    sb.appendChild(buildSidebarTree(w, 72));
  } else {
    const emptyHint = text('Sidebar/EmptyHint', '搜索单词查看结果', 12, 'Regular',
      C.textSecondary, 52, 120);
    sb.appendChild(emptyHint);
  }

  return sb;
}

function buildSidebarSearch(w, filled) {
  const sec = frame('Sidebar/SearchSection', w, 72, 0, 0, C.bgSidebar);

  const input = roundedFrame('Sidebar/SearchBar', w - 32, 32, 16, 8, C.bgInput, 6);
  if (filled) {
    input.appendChild(text('Text', 'this', 14, 'Regular', C.textPrimary, 10, 7));
    input.appendChild(text('Clear', '✕', 11, 'Regular', C.textSecondary, w - 52, 10));
  } else {
    input.appendChild(text('Placeholder', '搜索', 14, 'Regular', C.textSecondary, 10, 7));
  }
  sec.appendChild(input);

  const btn = roundedFrame('Sidebar/SearchBtn', w - 32, 24, 16, 44, C.accentBlue, 4);
  btn.appendChild(text('Label', '搜索', 13, 'Regular', C.white, (w - 32 - 26) / 2, 4));
  sec.appendChild(btn);

  return sec;
}

function buildSidebarTree(w, startY) {
  const inner = frame('Sidebar/ScrollContent', w, 1400, 0, startY, C.bgSidebar);

  let y = 0;

  // Section header
  const hdr = frame('Sidebar/Tree/SectionHeader', w, 28, 0, y, C.bgSidebar);
  hdr.appendChild(text('Label', '▼  单词搜索', 13, 'Semi Bold', C.textSecondary, 12, 7));
  inner.appendChild(hdr);
  y += 28;

  // Selected word item "this"
  const wordSel = roundedFrame('Sidebar/Tree/WordItem-this', w - 8, 28, 4, y, C.bgSidebarSelected, 4);
  wordSel.appendChild(text('Label', 'this', 13, 'Regular', C.white, 16, 7));
  inner.appendChild(wordSel);
  y += 28;

  // Dictionary sources
  const dicts = [
    { label: '牛津高阶英汉双解词典 (第8版)', color: C.dictOxford },
    { label: 'LDOCE5++ En-Cn V1.35',      color: C.dictLDOCE },
    { label: '有道在线词典',               color: C.dictYoudao },
    { label: 'Oxford English Living Dictiona...', color: C.dictOxfordLiving },
    { label: 'Collins COBUILD overhaul V2',color: C.dictCollins },
    { label: '简明英汉必应版',             color: C.dictJianming },
    { label: '麦克米伦高阶英汉双解词典',   color: C.dictMacmillan },
    { label: "Merriam-Webster's Advanced", color: C.dictMW },
    { label: '我的笔记',                   color: C.dictNotes },
  ];
  for (const d of dicts) {
    const item = frame(`Sidebar/DictItem`, w, 24, 0, y, C.bgSidebar);
    item.appendChild(ellipse('Badge', 10, 10, 36, 7, d.color));
    item.appendChild(text('Label', d.label, 12, 'Regular', C.textSecondary, 52, 5));
    inner.appendChild(item);
    y += 24;
  }

  // Divider
  inner.appendChild(dividerH(w - 32, 16, y + 6));
  y += 16;

  // Related words
  const related = [
    "'this", 'thistle', 'thistledown', 'thistly', 'thisness',
    'Thisbe', 'this night', 'this evening', 'this afternoon',
    'absinthism', 'acathisia', 'aegithognathism', 'akathisia',
  ];
  for (const word of related) {
    const item = frame('Sidebar/RelatedWord', w, 26, 0, y, C.bgSidebar);
    item.appendChild(text('Label', word, 13, 'Regular', C.textPrimary, 16, 5));
    inner.appendChild(item);
    y += 26;
  }

  return inner;
}

// ─── Top Toolbar ──────────────────────────────────────────────────────────────

function buildToolbar(w, h, x, y) {
  const tb = frame('Toolbar', w, h, x, y, C.bgApp);
  tb.appendChild(dividerH(w, 0, h - 1));

  const buttons = [
    { label: '词典',   active: true  },
    { label: '百科',   active: false },
    { label: '翻译写作', active: false },
    { label: '生词笔记', active: false },
    { label: '背单词', active: false },
    { label: '管 理', active: false },
  ];

  const btnW = 72;
  const groupW = buttons.length * btnW;
  const startX = (w - groupW) / 2;

  buttons.forEach((btn, i) => {
    const bx = startX + i * btnW;
    const bf = frame(`Toolbar/Btn-${btn.label}`, btnW, h - 2, bx, 0, C.bgApp);

    // Icon circle placeholder
    bf.appendChild(ellipse('Icon', 22, 22, (btnW - 22) / 2, 8,
      btn.active ? C.iconActive : C.iconDefault));

    // Label
    const labelX = btn.label.length > 3 ? 4 : (btnW - btn.label.length * 7) / 2;
    bf.appendChild(text('Label', btn.label, 10, 'Regular',
      btn.active ? C.iconActive : C.textSecondary, labelX, 34));

    // Active underline
    if (btn.active) {
      bf.appendChild(rect('Underline', btnW, 2, 0, h - 3, C.accentBlue));
    }

    tb.appendChild(bf);
  });

  // Right nav group
  const nav = frame('Toolbar/NavGroup', 200, h, w - 200, 0, C.bgApp);
  nav.appendChild(text('Back',    '‹', 22, 'Regular', C.navDisabled,  8, 18));
  nav.appendChild(text('Forward', '›', 22, 'Regular', C.navDisabled, 28, 18));
  nav.appendChild(dividerV(20, 54, 22));
  nav.appendChild(text('History', '历史记录', 13, 'Regular', C.textSecondary,  62, 24));
  nav.appendChild(text('Tags',    '标签',     13, 'Regular', C.textSecondary, 150, 24));
  tb.appendChild(nav);

  return tb;
}

// ─── Main Content Area ────────────────────────────────────────────────────────

function buildMainContent(w, h, x, y, populated) {
  const mc = frame('MainContent', w, h, x, y, C.bgApp);
  mc.clipsContent = true;

  mc.appendChild(buildWordHeader(w, populated));

  const dictScroll = frame('MainContent/DictScroll', w, h - 116, 0, 116, C.bgApp);
  dictScroll.clipsContent = true;

  const inner = frame('MainContent/DictScroll/Inner', w, 2400, 0, 0, C.bgApp);
  if (populated) {
    buildOxfordBlock(inner, w, 0);
    buildPlaceholderDictBlock(inner, w, 'LDOCE5++ En-Cn V1.35',        C.dictLDOCE,    720);
    buildPlaceholderDictBlock(inner, w, 'Collins COBUILD overhaul V2', C.dictCollins,  800);
  } else {
    const ef = frame('EmptyState', w, h - 116, 0, 0, C.bgApp);
    ef.appendChild(text('EmptyHint', '输入单词开始查询', 16, 'Regular',
      C.textSecondary, (w - 140) / 2, (h - 116) / 2 - 10));
    inner.appendChild(ef);
  }

  dictScroll.appendChild(inner);
  mc.appendChild(dictScroll);

  // Feedback FAB
  const fab = roundedFrame('MainContent/FeedbackFAB', 44, 44, w - 56, h - 58, C.bgSidebarHover, 22);
  fab.appendChild(text('Icon', '···', 18, 'Regular', C.iconDefault, 9, 12));
  mc.appendChild(fab);

  return mc;
}

// ─── Word Header (Sticky) ─────────────────────────────────────────────────────

function buildWordHeader(w, populated) {
  const hdr = frame('MainContent/WordHeader', w, 116, 0, 0, C.bgApp);

  if (!populated) {
    hdr.appendChild(dividerH(w, 0, 115));
    return hdr;
  }

  // Headword
  hdr.appendChild(text('Headword', 'this', 28, 'Bold', C.textHeading, 24, 10));

  // Phonetics row
  const phonRow = frame('WordHeader/Phonetics', w - 48, 28, 24, 50, C.bgApp);
  phonRow.appendChild(text('UK', '🔊  英 /ðɪs/', 14, 'Regular', C.textSecondary,  0, 4));
  phonRow.appendChild(text('US', '🔊  美 /ðɪs/', 14, 'Regular', C.textSecondary, 140, 4));
  phonRow.appendChild(text('Global', '🌐  全球',  14, 'Regular', C.textSecondary, 280, 4));
  phonRow.appendChild(text('Stars', '☆ ☆ ☆ ☆ ☆', 13, 'Regular', C.iconDefault,  380, 5));
  hdr.appendChild(phonRow);

  // Level tags row
  const tagsRow = frame('WordHeader/Tags', 100, 24, 24, 84, C.bgApp);
  tagsRow.appendChild(borderedBadge('Tag-CET4', '四级',  0, 2));
  tagsRow.appendChild(borderedBadge('Tag-CET6', '六级', 44, 2));
  hdr.appendChild(tagsRow);

  hdr.appendChild(dividerH(w, 0, 115));
  return hdr;
}

// ─── Oxford Dictionary Block ──────────────────────────────────────────────────

function buildOxfordBlock(parent, w, y) {
  // Section header
  const sHdr = frame('DictBlock-Oxford/SectionHeader', w, 36, 0, y, C.bgApp);
  sHdr.appendChild(dividerH(w, 0, 0));
  sHdr.appendChild(ellipse('Badge', 12, 12, 16, 12, C.dictOxford));
  sHdr.appendChild(text('DictName', '牛津高阶英汉双解词典(第8版)', 14, 'Semi Bold', C.textHeading, 36, 8));
  parent.appendChild(sHdr);
  y += 36;

  // Entry header
  y = buildOxfordEntryHeader(parent, w, y);

  // Definitions
  const defs = [
    {
      num: '1.', star: true,
      en: 'used to refer to a particular person, thing or event that is close to you, especially compared with another',
      zh: '（指较近的人或事物）这，这个',
      examples: [
        { en: 'How long have you been living in this country?',                zh: '你在这个国家居住了多久啦？' },
        { en: 'Well, make up your mind. Which do you want? This one or that one?', zh: '哎，拿定主意。你要哪一个？这个还是那个？' },
        { en: "I think you'll find these more comfortable than those.",        zh: '我想你会觉得这些比那些更舒适。' },
      ],
    },
    {
      num: '2.', star: true,
      en: 'used to refer to sth/sb that has already been mentioned',
      zh: '（指已提到过的人或事物）这，这个',
      examples: [
        { en: 'There was a court case resulting from this incident.', zh: '这一事件引起一宗案件。' },
        { en: 'The boy was afraid and the dog had sensed this.',      zh: '男孩害怕了，狗已经察觉到这一点。' },
        { en: "What's this I hear about you getting married?",        zh: '我听说你结婚了，这是怎么回事？' },
      ],
    },
    {
      num: '3.', star: true,
      en: 'used for introducing sb or showing sth to sb',
      zh: '（介绍人或展示事物时用）这，这样',
      examples: [
        { en: 'Hello, this is Maria Diaz (= on the telephone).', zh: '喂，我是玛丽亚·迪亚兹。' },
        { en: 'Jo, this is Kate (= when you are introducing them).', zh: '乔，这位是凯特。' },
      ],
    },
  ];

  for (const def of defs) {
    y = buildDefinitionEntry(parent, w, def, y);
    y += 8;
  }

  return y;
}

function buildOxfordEntryHeader(parent, w, y) {
  const eh = frame('DictBlock-Oxford/EntryHeader', w - 48, 80, 24, y, C.bgApp);

  // Line 1: headword + phonetics + POS
  eh.appendChild(text('Word',     'this',            18, 'Bold',    C.textOrange,    0,   0));
  eh.appendChild(text('Star',     ' ★',              14, 'Regular', C.accentStar,   46,   1));
  eh.appendChild(text('Phonetic', '/ðɪs ; ðɪs/',     15, 'Regular', C.textLinkBlue, 66,   2));
  eh.appendChild(text('POS',      ' det., pron., adv.', 14, 'Italic', C.textSecondary, 200, 2));

  // Line 2: POS tags
  eh.appendChild(orangeBadge('Tag-DET',  'DETERMINER',  0, 28));
  eh.appendChild(orangeBadge('Tag-PRN',  'PRONOUN',    102, 28));
  eh.appendChild(text('TagStar', '★', 14, 'Regular', C.accentStar, 186, 30));

  // Line 3: plural
  eh.appendChild(text('Plural',   'pl. these', 14, 'Regular', C.textPrimary,  0, 54));
  eh.appendChild(text('PlPhon',   '/ðiːz ; ðiz/', 14, 'Regular', C.textLinkBlue, 74, 55));

  parent.appendChild(eh);
  return y + 84;
}

function buildDefinitionEntry(parent, w, def, y) {
  const contentW = w - 48;
  let innerY = 0;

  const entry = frame(`Def-${def.num}`, contentW, 10, 24, y, C.bgApp);

  // Definition header row
  const defHdr = frame('DefHeader', contentW, 28, 0, innerY, C.bgApp);
  defHdr.appendChild(text('Num',  def.num,  16, 'Bold',    C.textLinkBlue, 0,  4));
  if (def.star) {
    defHdr.appendChild(text('Star', ' ★ ', 13, 'Regular', C.accentStar,  22,  5));
  }
  // Definition text with wrapping estimation
  const defLabel = text('DefEn', def.en, 15, 'Regular', C.textPrimary, 52, 3, { width: contentW - 52 });
  defHdr.appendChild(defLabel);
  const defH = Math.max(28, Math.ceil(def.en.length / 90) * 22 + 6);
  defHdr.resize(contentW, defH);

  // Chinese translation on next line
  const defZh = text('DefZh', def.zh, 14, 'Regular', C.textSecondary, 52, defH);
  defHdr.resize(contentW, defH + 22);
  defHdr.appendChild(defZh);
  entry.appendChild(defHdr);
  innerY += defH + 26;

  // Examples
  for (const ex of def.examples) {
    const exF = frame('Example', contentW - 20, 46, 20, innerY, C.bgApp);

    exF.appendChild(text('Bullet', '○', 13, 'Regular', C.textSecondary, 0, 0));
    exF.appendChild(text('EN', ex.en, 14, 'Regular', C.textExampleEn, 18, 0,
      { width: contentW - 40 }));
    const enLines = Math.ceil(ex.en.length / 88);
    const zhY = enLines * 21;
    exF.appendChild(text('ZH', ex.zh, 13, 'Regular', C.textExampleZh, 18, zhY));
    const exH = zhY + 20;
    exF.resize(contentW - 20, exH);

    entry.appendChild(exF);
    innerY += exH + 6;
  }

  entry.resize(contentW, innerY);
  parent.appendChild(entry);
  return y + innerY;
}

// ─── Placeholder dict blocks ──────────────────────────────────────────────────

function buildPlaceholderDictBlock(parent, w, name, color, y) {
  const block = frame(`DictBlock-${name}`, w, 56, 0, y, C.bgApp);
  block.appendChild(dividerH(w, 0, 0));
  block.appendChild(ellipse('Badge', 12, 12, 16, 22, color));
  block.appendChild(text('DictName', name, 14, 'Semi Bold', C.textHeading, 36, 18));
  block.appendChild(text('Placeholder', '(Content available — click to expand)',
    13, 'Italic', C.textSecondary, 24, 38));
  parent.appendChild(block);
}
