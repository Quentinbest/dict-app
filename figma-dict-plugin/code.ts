// Helper to convert hex to RGB
function hexToRgb(hex: string): RGB {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16) / 255;
    g = parseInt(hex[2] + hex[2], 16) / 255;
    b = parseInt(hex[3] + hex[3], 16) / 255;
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16) / 255;
    g = parseInt(hex[3] + hex[4], 16) / 255;
    b = parseInt(hex[5] + hex[6], 16) / 255;
  }
  return { r, g, b };
}

// Generate the Desktop UI Frames and Prototype Interactions
async function generateUI() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  const colors = {
    bgMain: hexToRgb("#1E1E1E"),
    bgSidebar: hexToRgb("#252526"),
    textLight: hexToRgb("#D4D4D4"),
    textSecondary: hexToRgb("#858585"),
    accentBlue: hexToRgb("#0E639C"),
    highlightOrange: hexToRgb("#E36D25"),
    highlightSelection: hexToRgb("#37373D"),
    searchBg: hexToRgb("#333333"),
    searchFocus: hexToRgb("#005A9E")
  };

  const frames: FrameNode[] = [];

  // ==========================================
  // FRAME 1: HOME / EMPTY STATE
  // ==========================================
  const frame1 = figma.createFrame();
  frame1.name = "1. Home / Empty State";
  frame1.resize(1512, 982);
  frame1.x = 0;
  frame1.fills = [{ type: 'SOLID', color: colors.bgMain }];
  frames.push(frame1);

  const sidebar1 = figma.createFrame();
  sidebar1.name = "Left Sidebar";
  sidebar1.resize(300, 982);
  sidebar1.fills = [{ type: 'SOLID', color: colors.bgSidebar }];
  frame1.appendChild(sidebar1);

  const searchBox1 = figma.createRectangle();
  searchBox1.resize(260, 40);
  searchBox1.x = 20; searchBox1.y = 20;
  searchBox1.cornerRadius = 8;
  searchBox1.fills = [{ type: 'SOLID', color: colors.searchBg }];
  sidebar1.appendChild(searchBox1);

  const searchText1 = figma.createText();
  sidebar1.appendChild(searchText1);
  searchText1.characters = "Search...";
  searchText1.fontSize = 16;
  searchText1.fills = [{ type: 'SOLID', color: colors.textSecondary }];
  searchText1.x = 40; searchText1.y = 30;

  const emptyText = figma.createText();
  frame1.appendChild(emptyText);
  emptyText.characters = "Eudic Dictionary";
  emptyText.fontSize = 32;
  emptyText.fills = [{ type: 'SOLID', color: colors.textSecondary }];
  emptyText.x = 800; emptyText.y = 450;


  // ==========================================
  // FRAME 2: SEARCH ACTIVE STATE
  // ==========================================
  const frame2 = figma.createFrame();
  frame2.name = "2. Search Active State";
  frame2.resize(1512, 982);
  frame2.x = 1600; 
  frame2.fills = [{ type: 'SOLID', color: colors.bgMain }];
  frames.push(frame2);

  const sidebar2 = figma.createFrame();
  sidebar2.name = "Left Sidebar";
  sidebar2.resize(300, 982);
  sidebar2.fills = [{ type: 'SOLID', color: colors.bgSidebar }];
  frame2.appendChild(sidebar2);

  const searchBox2 = figma.createRectangle();
  searchBox2.resize(260, 40);
  searchBox2.x = 20; searchBox2.y = 20;
  searchBox2.cornerRadius = 8;
  searchBox2.fills = [{ type: 'SOLID', color: colors.searchBg }];
  searchBox2.strokes = [{ type: 'SOLID', color: colors.accentBlue }];
  searchBox2.strokeWeight = 2;
  sidebar2.appendChild(searchBox2);

  const searchText2 = figma.createText();
  sidebar2.appendChild(searchText2);
  searchText2.characters = "thi|"; 
  searchText2.fontSize = 16;
  searchText2.fills = [{ type: 'SOLID', color: colors.textLight }];
  searchText2.x = 40; searchText2.y = 30;

  // Dropdown suggestions
  const dropdown = figma.createFrame();
  dropdown.name = "Suggestions Dropdown";
  dropdown.resize(260, 150);
  dropdown.x = 20; dropdown.y = 65;
  dropdown.cornerRadius = 8;
  dropdown.fills = [{ type: 'SOLID', color: colors.highlightSelection }];
  dropdown.effects = [{
    type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.5 },
    offset: { x: 0, y: 4 }, radius: 10, visible: true, blendMode: "NORMAL"
  }];
  sidebar2.appendChild(dropdown);

  // Hit area for the word "this" to make it clickable
  const hitAreaThis = figma.createRectangle();
  hitAreaThis.name = "Clickable Area - this";
  hitAreaThis.resize(260, 32);
  hitAreaThis.x = 0; hitAreaThis.y = 8;
  hitAreaThis.fills = [{ type: 'SOLID', color: colors.highlightSelection }];
  // We will add the reaction to this after creating Frame 3
  dropdown.appendChild(hitAreaThis);

  ["this", "think", "thing", "thick"].forEach((word, idx) => {
    const sugText = figma.createText();
    dropdown.appendChild(sugText);
    sugText.characters = word;
    sugText.fontSize = 14;
    sugText.fills = [{ type: 'SOLID', color: colors.textLight }];
    sugText.x = 20; sugText.y = 15 + (idx * 32);
  });

  const emptyText2 = figma.createText();
  frame2.appendChild(emptyText2);
  emptyText2.characters = "Eudic Dictionary";
  emptyText2.fontSize = 32;
  emptyText2.fills = [{ type: 'SOLID', color: colors.textSecondary }];
  emptyText2.x = 800; emptyText2.y = 450;


  // ==========================================
  // FRAME 3: SEARCH RESULT STATE
  // ==========================================
  const frame3 = figma.createFrame();
  frame3.name = "3. Search Result State";
  frame3.resize(1512, 982);
  frame3.x = 3200; 
  frame3.fills = [{ type: 'SOLID', color: colors.bgMain }];
  frames.push(frame3);

  const sidebar3 = figma.createFrame();
  sidebar3.name = "Left Sidebar";
  sidebar3.resize(300, 982);
  sidebar3.fills = [{ type: 'SOLID', color: colors.bgSidebar }];
  frame3.appendChild(sidebar3);

  const searchBox3 = figma.createRectangle();
  searchBox3.resize(260, 40);
  searchBox3.x = 20; searchBox3.y = 20;
  searchBox3.cornerRadius = 8;
  searchBox3.fills = [{ type: 'SOLID', color: colors.searchBg }];
  sidebar3.appendChild(searchBox3);

  const searchText3 = figma.createText();
  sidebar3.appendChild(searchText3);
  searchText3.characters = "this";
  searchText3.fontSize = 16;
  searchText3.fills = [{ type: 'SOLID', color: colors.textLight }];
  searchText3.x = 40; searchText3.y = 30;

  const sectionHeader = figma.createText();
  sidebar3.appendChild(sectionHeader);
  sectionHeader.characters = "▼ 单词搜索";
  sectionHeader.fontSize = 14;
  sectionHeader.fills = [{ type: 'SOLID', color: colors.textSecondary }];
  sectionHeader.x = 20; sectionHeader.y = 100;

  const items = ["this", "thistle", "thistledown", "thistly", "thisness", "Thisbe"];
  let yPos = 130;
  items.forEach((item, index) => {
    if (index === 0) {
      const selectionBg = figma.createRectangle();
      selectionBg.resize(300, 32);
      selectionBg.x = 0; selectionBg.y = yPos - 8;
      selectionBg.fills = [{ type: 'SOLID', color: colors.highlightSelection }];
      sidebar3.appendChild(selectionBg);
    }
    const textNode = figma.createText();
    sidebar3.appendChild(textNode);
    textNode.characters = item;
    textNode.fontSize = 14;
    textNode.x = 40; textNode.y = yPos;
    textNode.fills = [{ type: 'SOLID', color: index === 0 ? colors.textLight : colors.textSecondary }];
    yPos += 32;
  });

  const contentAreaX = 300;
  
  const title = figma.createText();
  frame3.appendChild(title);
  title.fontName = { family: "Inter", style: "Bold" };
  title.characters = "this";
  title.fontSize = 48;
  title.fills = [{ type: 'SOLID', color: colors.textLight }];
  title.x = contentAreaX + 40; title.y = 60;

  const phonetics = figma.createText();
  frame3.appendChild(phonetics);
  phonetics.characters = "🔊 英 /ðɪs/  🔊 美 /ðɪs/ 🌍 全球";
  phonetics.fontSize = 18;
  phonetics.fills = [{ type: 'SOLID', color: colors.textSecondary }];
  phonetics.x = contentAreaX + 40; phonetics.y = 130;

  const dictHeaderBg = figma.createRectangle();
  frame3.appendChild(dictHeaderBg);
  dictHeaderBg.resize(1212, 40); 
  dictHeaderBg.x = contentAreaX; dictHeaderBg.y = 200;
  dictHeaderBg.fills = [{ type: 'SOLID', color: colors.bgSidebar }];

  const dictTitle = figma.createText();
  frame3.appendChild(dictTitle);
  dictTitle.characters = "▾ 牛津高阶英汉双解词典(第8版)";
  dictTitle.fontSize = 16;
  dictTitle.fills = [{ type: 'SOLID', color: colors.textLight }];
  dictTitle.x = contentAreaX + 20; dictTitle.y = 210;

  const definitionHighlight = figma.createText();
  frame3.appendChild(definitionHighlight);
  definitionHighlight.fontName = { family: "Inter", style: "Bold" };
  definitionHighlight.characters = "this";
  definitionHighlight.fontSize = 32;
  definitionHighlight.fills = [{ type: 'SOLID', color: colors.highlightOrange }];
  definitionHighlight.x = contentAreaX + 20; definitionHighlight.y = 270;

  const defPhonetic = figma.createText();
  frame3.appendChild(defPhonetic);
  defPhonetic.characters = "/ðɪs/; /ðɪs/";
  defPhonetic.fontSize = 18;
  defPhonetic.fills = [{ type: 'SOLID', color: colors.accentBlue }];
  defPhonetic.x = contentAreaX + 100; defPhonetic.y = 282;

  const defParts = figma.createText();
  frame3.appendChild(defParts);
  defParts.characters = "det., pron., adv.";
  defParts.fontSize = 18;
  defParts.fills = [{ type: 'SOLID', color: colors.highlightOrange }];
  defParts.x = contentAreaX + 210; defParts.y = 282;

  const tagBg1 = figma.createRectangle();
  frame3.appendChild(tagBg1);
  tagBg1.resize(110, 24);
  tagBg1.x = contentAreaX + 20; tagBg1.y = 330;
  tagBg1.fills = [{ type: 'SOLID', color: colors.highlightOrange }];
  tagBg1.cornerRadius = 2;

  const tagText1 = figma.createText();
  frame3.appendChild(tagText1);
  tagText1.fontName = { family: "Inter", style: "Bold" };
  tagText1.characters = "DETERMINER";
  tagText1.fontSize = 14;
  tagText1.fills = [{ type: 'SOLID', color: colors.bgMain }];
  tagText1.x = contentAreaX + 25; tagText1.y = 335;

  const def1 = figma.createText();
  frame3.appendChild(def1);
  def1.characters = "1. ★ used to refer to a particular person, thing or event that is close to you (指较近的人或事物) 这，这个";
  def1.fontSize = 18;
  def1.fills = [{ type: 'SOLID', color: colors.textLight }];
  def1.x = contentAreaX + 20; def1.y = 390;

  const ex1En = figma.createText();
  frame3.appendChild(ex1En);
  ex1En.characters = "○ How long have you been living in this country?";
  ex1En.fontSize = 16;
  ex1En.fills = [{ type: 'SOLID', color: {r: 0.8, g: 0.7, b: 0.5} }]; 
  ex1En.x = contentAreaX + 40; ex1En.y = 430;

  const ex1Zh = figma.createText();
  frame3.appendChild(ex1Zh);
  ex1Zh.characters = "你在这个国家居住多久啦？";
  ex1Zh.fontSize = 16;
  ex1Zh.fills = [{ type: 'SOLID', color: colors.textSecondary }];
  ex1Zh.x = contentAreaX + 40; ex1Zh.y = 455;


  // ==========================================
  // APPLY PROTOTYPE INTERACTIONS
  // ==========================================

  // 1. Link Frame 1 Search Box -> Frame 2 (Instant Transition)
  searchBox1.reactions = [
    {
      action: {
        type: "NODE",
        destinationId: frame2.id,
        navigation: "NAVIGATE",
        transition: { type: "INSTANT" }
      },
      trigger: { type: "ON_CLICK" }
    }
  ] as any; // Casting to any to bypass strict type checking for the API

  // 2. Link Frame 2 Hit Area -> Frame 3 (Smart Animate)
  hitAreaThis.reactions = [
    {
      action: {
        type: "NODE",
        destinationId: frame3.id,
        navigation: "NAVIGATE",
        transition: { 
          type: "SMART_ANIMATE", 
          duration: 400, 
          easing: { type: "EASE_OUT" } 
        }
      },
      trigger: { type: "ON_CLICK" }
    }
  ] as any;

  // 3. Set Flow Starting Point on Frame 1
  figma.currentPage.flowStartingPoints = [
    {
      nodeId: frame1.id,
      name: "Dictionary Interactive Prototype"
    }
  ];

  figma.viewport.scrollAndZoomIntoView(frames);
  figma.closePlugin("Prototype generated and linked successfully!");
}

generateUI();