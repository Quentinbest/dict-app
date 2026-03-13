import { useState } from 'react'
import type { AppState, ActiveTab } from '../types'

const initialState: AppState = {
  screen: 'home',
  activeTab: 'dict',
  searchQuery: '',
  currentWord: 'this',
  isStarred: false,
  feedbackOverlayOpen: false,
}

export function useAppState() {
  const [state, setState] = useState<AppState>(initialState)

  const focusSearch = () => {
    setState(s => ({ ...s, screen: 'search-active' }))
  }

  const submitSearch = (query: string) => {
    const word = query.trim() || 'this'
    setState(s => ({
      ...s,
      screen: 'search-result',
      currentWord: word,
      searchQuery: word,
      activeTab: 'dict',
    }))
  }

  const clearSearch = () => {
    setState(s => ({ ...s, screen: 'home', searchQuery: '' }))
  }

  const setSearchQuery = (q: string) => {
    setState(s => ({ ...s, searchQuery: q }))
  }

  const switchTab = (tab: ActiveTab) => {
    if (tab === 'dict') {
      setState(s => ({
        ...s,
        activeTab: 'dict',
        screen: s.currentWord ? 'search-result' : 'home',
      }))
    } else {
      setState(s => ({ ...s, activeTab: tab, screen: 'placeholder-tab' }))
    }
  }

  const toggleStar = () => {
    setState(s => ({ ...s, isStarred: !s.isStarred }))
  }

  const openFeedback = () => {
    setState(s => ({ ...s, feedbackOverlayOpen: true }))
  }

  const closeFeedback = () => {
    setState(s => ({ ...s, feedbackOverlayOpen: false }))
  }

  const goBack = () => {
    setState(s => ({ ...s, screen: 'home', searchQuery: '' }))
  }

  return {
    state,
    focusSearch,
    submitSearch,
    clearSearch,
    setSearchQuery,
    switchTab,
    toggleStar,
    openFeedback,
    closeFeedback,
    goBack,
  }
}
