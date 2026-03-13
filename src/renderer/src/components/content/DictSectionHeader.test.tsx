import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DictSectionHeader } from './DictSectionHeader'

vi.mock('@iconify/react', () => ({
  Icon: ({ icon }: { icon: string }) => <span data-testid="icon" data-icon={icon} />,
}))

describe('DictSectionHeader', () => {
  it('renders dict name', () => {
    render(<DictSectionHeader name="Oxford" badgeColor="#E06C00" collapsed={false} onToggle={() => {}} />)
    expect(screen.getByText('Oxford')).toBeInTheDocument()
  })
  it('shows chevron-down when expanded', () => {
    render(<DictSectionHeader name="X" badgeColor="#000" collapsed={false} onToggle={() => {}} />)
    const icon = screen.getByTestId('icon')
    expect(icon.getAttribute('data-icon')).toBe('heroicons:chevron-down')
  })
  it('shows chevron-right when collapsed', () => {
    render(<DictSectionHeader name="X" badgeColor="#000" collapsed={true} onToggle={() => {}} />)
    const icon = screen.getByTestId('icon')
    expect(icon.getAttribute('data-icon')).toBe('heroicons:chevron-right')
  })
  it('calls onToggle when button clicked', () => {
    const onToggle = vi.fn()
    render(<DictSectionHeader name="X" badgeColor="#000" collapsed={false} onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledOnce()
  })
})
