import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DictScrollArea } from './DictScrollArea'
import type React from 'react'

vi.mock('@iconify/react', () => ({
  Icon: ({ icon }: { icon: string }) => <span data-testid="icon" data-icon={icon} />,
}))

vi.mock('./MddImage', () => ({
  MddImage: ({ html }: { html: string }) => <div data-testid="mdd-html" dangerouslySetInnerHTML={{ __html: html }} />,
}))

const emptyRef = { current: {} } as React.MutableRefObject<Record<string, HTMLDivElement | null>>

const RESULTS = [
  { dictId: 'd1', name: 'Oxford', badgeColor: '#E06C00', html: '<p>definition</p>' },
  { dictId: 'd2', name: 'Collins', badgeColor: '#0E639C', html: '<p>another</p>' },
]

describe('DictScrollArea', () => {
  it('shows loading indicator', () => {
    render(<DictScrollArea scrollRef={emptyRef} results={[]} loading={true} word="test" />)
    expect(screen.getByText('查询中…')).toBeInTheDocument()
  })
  it('shows empty message when no results and not loading', () => {
    render(<DictScrollArea scrollRef={emptyRef} results={[]} loading={false} word="xyz" />)
    expect(screen.getByText(/未找到/)).toBeInTheDocument()
  })
  it('renders dict section headers', () => {
    render(<DictScrollArea scrollRef={emptyRef} results={RESULTS} loading={false} word="test" />)
    expect(screen.getByText('Oxford')).toBeInTheDocument()
    expect(screen.getByText('Collins')).toBeInTheDocument()
  })
  it('renders dict HTML content when expanded', () => {
    render(<DictScrollArea scrollRef={emptyRef} results={RESULTS} loading={false} word="test" />)
    const htmlBlocks = screen.getAllByTestId('mdd-html')
    expect(htmlBlocks).toHaveLength(2)
  })
  it('collapses dict content when toggle clicked', () => {
    render(<DictScrollArea scrollRef={emptyRef} results={RESULTS} loading={false} word="test" />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0]) // collapse first dict
    const htmlBlocks = screen.queryAllByTestId('mdd-html')
    expect(htmlBlocks).toHaveLength(1) // only second dict still shown
  })
  it('does not show empty message when loading', () => {
    render(<DictScrollArea scrollRef={emptyRef} results={[]} loading={true} word="test" />)
    expect(screen.queryByText(/未找到/)).not.toBeInTheDocument()
  })
})
