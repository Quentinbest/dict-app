import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockReadFileSync, mockWriteFileSync, mockExistsSync, mockMkdirSync } = vi.hoisted(() => {
  return {
    mockReadFileSync: vi.fn(),
    mockWriteFileSync: vi.fn(),
    mockExistsSync: vi.fn(() => true),
    mockMkdirSync: vi.fn(),
  }
})

vi.mock('electron', () => ({
  app: { getPath: vi.fn(() => '/tmp/test-userdata') }
}))

vi.mock('fs', () => ({
  default: {
    readFileSync: mockReadFileSync,
    writeFileSync: mockWriteFileSync,
    existsSync: mockExistsSync,
    mkdirSync: mockMkdirSync,
  },
  readFileSync: mockReadFileSync,
  writeFileSync: mockWriteFileSync,
  existsSync: mockExistsSync,
  mkdirSync: mockMkdirSync,
}))

import { loadDicts, saveDicts } from './dictStore'

beforeEach(() => {
  vi.clearAllMocks()
  mockExistsSync.mockReturnValue(true)
})

describe('loadDicts', () => {
  it('returns empty array when file does not exist', () => {
    mockExistsSync.mockReturnValue(false)
    expect(loadDicts()).toEqual([])
  })
  it('parses valid JSON from store file', () => {
    const dicts = [{ id: '1', name: 'Oxford', mdxPath: '/a.mdx', enabled: true }]
    mockExistsSync.mockReturnValue(true)
    mockReadFileSync.mockReturnValue(JSON.stringify(dicts))
    expect(loadDicts()).toEqual(dicts)
  })
  it('returns empty array on invalid JSON', () => {
    mockExistsSync.mockReturnValue(true)
    mockReadFileSync.mockReturnValue('not-json{{{')
    expect(loadDicts()).toEqual([])
  })
})

describe('saveDicts', () => {
  it('writes JSON to store file', () => {
    const dicts = [{ id: '1', name: 'Test' }]
    saveDicts(dicts as any)
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      expect.stringContaining('installed-dicts.json'),
      JSON.stringify(dicts, null, 2),
      'utf-8'
    )
  })
  it('does not throw on writeFileSync error', () => {
    mockWriteFileSync.mockImplementation(() => { throw new Error('disk full') })
    expect(() => saveDicts([])).not.toThrow()
  })
})
