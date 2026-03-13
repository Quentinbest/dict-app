import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAppState } from './useAppState'

describe('useAppState', () => {
  it('starts at home screen with dict tab', () => {
    const { result } = renderHook(() => useAppState())
    expect(result.current.state.screen).toBe('home')
    expect(result.current.state.activeTab).toBe('dict')
  })

  it('focusSearch → search-active', () => {
    const { result } = renderHook(() => useAppState())
    act(() => { result.current.focusSearch() })
    expect(result.current.state.screen).toBe('search-active')
  })

  it('submitSearch → search-result with correct word and resets to dict tab', () => {
    const { result } = renderHook(() => useAppState())
    act(() => { result.current.submitSearch('hello') })
    expect(result.current.state.screen).toBe('search-result')
    expect(result.current.state.currentWord).toBe('hello')
    expect(result.current.state.searchQuery).toBe('hello')
    expect(result.current.state.activeTab).toBe('dict')
  })

  it('submitSearch trims whitespace', () => {
    const { result } = renderHook(() => useAppState())
    act(() => { result.current.submitSearch('  world  ') })
    expect(result.current.state.currentWord).toBe('world')
  })

  it('clearSearch → home, clears query', () => {
    const { result } = renderHook(() => useAppState())
    act(() => { result.current.submitSearch('test') })
    act(() => { result.current.clearSearch() })
    expect(result.current.state.screen).toBe('home')
    expect(result.current.state.searchQuery).toBe('')
  })

  it('switchTab to non-dict → placeholder-tab', () => {
    const { result } = renderHook(() => useAppState())
    act(() => { result.current.switchTab('manage') })
    expect(result.current.state.screen).toBe('placeholder-tab')
    expect(result.current.state.activeTab).toBe('manage')
  })

  it('switchTab to dict with existing word → search-result', () => {
    const { result } = renderHook(() => useAppState())
    act(() => { result.current.submitSearch('test') })
    act(() => { result.current.switchTab('manage') })
    act(() => { result.current.switchTab('dict') })
    expect(result.current.state.screen).toBe('search-result')
    expect(result.current.state.activeTab).toBe('dict')
  })

  it('toggleStar flips isStarred', () => {
    const { result } = renderHook(() => useAppState())
    expect(result.current.state.isStarred).toBe(false)
    act(() => { result.current.toggleStar() })
    expect(result.current.state.isStarred).toBe(true)
    act(() => { result.current.toggleStar() })
    expect(result.current.state.isStarred).toBe(false)
  })

  it('setSearchQuery updates searchQuery only', () => {
    const { result } = renderHook(() => useAppState())
    act(() => { result.current.setSearchQuery('par') })
    expect(result.current.state.searchQuery).toBe('par')
    expect(result.current.state.screen).toBe('home') // screen unchanged
  })

  it('goBack resets to home', () => {
    const { result } = renderHook(() => useAppState())
    act(() => { result.current.submitSearch('test') })
    act(() => { result.current.goBack() })
    expect(result.current.state.screen).toBe('home')
  })
})
