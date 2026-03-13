import { useRef, useState, useCallback } from 'react'
import { useAppState } from './hooks/useAppState'
import { useDictLookup } from './hooks/useDictLookup'
import { useDictSuggest } from './hooks/useDictSuggest'
import { TitleBar } from './components/layout/TitleBar'
import { Sidebar } from './components/layout/Sidebar'
import { Toolbar } from './components/layout/Toolbar'
import { MainContent } from './components/layout/MainContent'
import { AutocompleteDropdown } from './components/overlays/AutocompleteDropdown'
import { ManageTab } from './components/manage/ManageTab'
import { ManageSidebar } from './components/manage/ManageSidebar'

const SIDEBAR_MIN = 180
const SIDEBAR_MAX = 520
const SIDEBAR_DEFAULT = 280

function PlaceholderTab() {
  return (
    <div className="flex-1 flex items-center justify-center bg-bg-app">
      <span className="text-def-body text-text-secondary">此功能暂未展示</span>
    </div>
  )
}

function EmptyContent() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-bg-app gap-3">
      <span className="text-[64px] opacity-30">📖</span>
      <span className="text-def-body text-text-secondary">输入单词开始查询</span>
    </div>
  )
}

export default function App() {
  const {
    state,
    focusSearch,
    submitSearch,
    clearSearch,
    setSearchQuery,
    switchTab,
    toggleStar,
    goBack,
  } = useAppState()

  const [manageCategory, setManageCategory] = useState('installed')
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT)

  const showTree = state.screen === 'search-result'
  const showResult = state.screen === 'search-result'
  const showSearch = state.screen === 'search-active'
  const showManage = state.screen === 'placeholder-tab' && state.activeTab === 'manage'
  const showPlaceholder = state.screen === 'placeholder-tab' && state.activeTab !== 'manage'

  const { results, loading } = useDictLookup(showResult ? state.currentWord : '')
  const suggestions = useDictSuggest(state.currentWord)

  const scrollToDictRef = useRef<(key: string) => void>(() => {})
  const handleScrollToDict = (key: string) => scrollToDictRef.current(key)

  const onDragHandleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = sidebarWidth

    const onMove = (ev: MouseEvent) => {
      const newWidth = Math.max(SIDEBAR_MIN, Math.min(SIDEBAR_MAX, startWidth + ev.clientX - startX))
      setSidebarWidth(newWidth)
    }

    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [sidebarWidth])

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-bg-app select-none">
      {/* Title Bar */}
      <div className="relative flex-shrink-0">
        <TitleBar
          searchValue={state.searchQuery}
          title={showResult ? state.currentWord : '欧路词典'}
          onSearchChange={setSearchQuery}
          onSearchFocus={focusSearch}
          onSearchSubmit={submitSearch}
          onSearchClear={clearSearch}
          showBorder={showSearch}
        />
        {showSearch && (
          <AutocompleteDropdown onSelect={submitSearch} />
        )}
      </div>

      {/* Toolbar — full width, above the sidebar split */}
      <Toolbar
        activeTab={state.activeTab}
        onTabChange={switchTab}
        onBack={goBack}
      />

      {/* Body: Sidebar + Drag Handle + Content */}
      <div className="flex flex-1 min-h-0">

        {/* Sidebar slot — dynamic width */}
        <div className="flex-shrink-0 h-full" style={{ width: sidebarWidth }}>
          {showManage
            ? <ManageSidebar selected={manageCategory} onSelect={setManageCategory} />
            : (
              <Sidebar
                searchValue={state.searchQuery}
                currentWord={state.currentWord}
                showTree={showTree}
                dictResults={results}
                suggestions={suggestions}
                onSearchChange={setSearchQuery}
                onSearchSubmit={submitSearch}
                onSearchClear={clearSearch}
                onScrollToDict={handleScrollToDict}
                onWordSelect={submitSearch}
              />
            )
          }
        </div>

        {/* Drag handle */}
        <div
          className="w-px flex-shrink-0 bg-divider hover:bg-accent-blue transition-colors cursor-col-resize relative"
          onMouseDown={onDragHandleMouseDown}
        >
          <div className="absolute inset-y-0 -left-1.5 -right-1.5" />
        </div>

        {/* Content panel */}
        <div className="flex flex-col flex-1 min-w-0 min-h-0">
          {showResult && (
            <MainContent
              word={state.currentWord}
              isStarred={state.isStarred}
              onStarChange={toggleStar}
              onScrollToDictRef={scrollToDictRef}
              results={results}
              loading={loading}
            />
          )}
          {showManage && <ManageTab selectedCategory={manageCategory} />}
          {showPlaceholder && <PlaceholderTab />}
          {!showResult && !showManage && !showPlaceholder && <EmptyContent />}
        </div>
      </div>

    </div>
  )
}
