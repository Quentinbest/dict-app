export type Screen = 'home' | 'search-active' | 'search-result' | 'placeholder-tab'
export type ActiveTab = 'dict' | 'baike' | 'translate' | 'vocabulary' | 'memorize' | 'manage'

export interface ExamplePair {
  en: string
  zh: string
}

export interface Definition {
  number: number
  text: string
  examples: ExamplePair[]
}

export interface DictEntry {
  word: string
  phoneticBrit: string
  phoneticAm: string
  pos: string
  definitions: Definition[]
}

export interface DictBlock {
  key: string
  name: string
  badgeColor: string
  entry?: DictEntry
  placeholder?: string
}

export interface AppState {
  screen: Screen
  activeTab: ActiveTab
  searchQuery: string
  currentWord: string
  isStarred: boolean
  feedbackOverlayOpen: boolean
}
