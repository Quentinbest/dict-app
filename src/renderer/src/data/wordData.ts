import type { DictBlock } from '../types'

export const DICT_BLOCKS: DictBlock[] = [
  {
    key: 'oxford',
    name: '牛津高阶英汉双解词典(第8版)',
    badgeColor: '#E06C00',
    entry: {
      word: 'this',
      phoneticBrit: '/ðɪs/',
      phoneticAm: '/ðɪs/',
      pos: 'det., pron., adv.',
      definitions: [
        {
          number: 1,
          text: 'used to refer to a particular person, thing or event that is close to you, being done or talked about now',
          examples: [
            { en: 'I was just talking about this problem.', zh: '我刚才正在说这个问题。' },
            { en: 'How long have you been living in this country?', zh: '你在这个国家住了多久了？' },
            { en: 'Well, make up your mind. Is it this one or that one?', zh: '好了，拿定主意。是这个还是那个？' },
          ],
        },
        {
          number: 2,
          text: 'used to refer to sth/sb that has already been mentioned',
          examples: [
            { en: 'Did she tell you about this new plan?', zh: '她有没有把这个新计划告诉你？' },
            { en: 'There was a court case resulting from this incident.', zh: '有一个由此事引起的诉讼案件。' },
          ],
        },
        {
          number: 3,
          text: 'used for introducing sb or showing sth to sb',
          examples: [
            { en: 'This is my friend Anne.', zh: '这是我的朋友安妮。' },
          ],
        },
      ],
    },
  },
  {
    key: 'ldoce',
    name: 'LDOCE5++ En-Cn V1.35',
    badgeColor: '#C678DD',
    placeholder: '(Content available — click to expand)',
  },
  {
    key: 'youdao',
    name: '有道在线词典',
    badgeColor: '#E06C75',
    placeholder: '(Content available — click to expand)',
  },
  {
    key: 'oxford-living',
    name: 'Oxford English Living Dictiona...',
    badgeColor: '#61AFEF',
    placeholder: '(Content available — click to expand)',
  },
  {
    key: 'collins',
    name: 'Collins COBUILD overhaul V2',
    badgeColor: '#CE9178',
    placeholder: '(Content available — click to expand)',
  },
  {
    key: 'jianming',
    name: '简明英汉必应版',
    badgeColor: '#56B6C2',
    placeholder: '(Content available — click to expand)',
  },
  {
    key: 'macmillan',
    name: '麦克米伦高阶英汉双解词典',
    badgeColor: '#E5C07B',
    placeholder: '(Content available — click to expand)',
  },
  {
    key: 'mw',
    name: "Merriam-Webster's Advanced",
    badgeColor: '#98C379',
    placeholder: '(Content available — click to expand)',
  },
  {
    key: 'notes',
    name: '我的笔记',
    badgeColor: '#9E9E9E',
    placeholder: '(Content available — click to expand)',
  },
]

export const RELATED_WORDS = [
  "'this", 'thistle', 'thistledown', 'thistly', 'thisness',
  'Thisbe', 'this night', 'this evening', 'this afternoon',
  'absinthism', 'acathisia', 'aegithognathism', 'akathisia',
]

export const AUTOCOMPLETE_SUGGESTIONS = [
  'this', 'thistle', 'this morning', 'this evening', 'this afternoon', "'this",
]
