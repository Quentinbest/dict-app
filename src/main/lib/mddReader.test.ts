import { describe, it, expect, vi, beforeEach } from 'vitest'

const { MockMDD, mockLocate } = vi.hoisted(() => {
  const mockLocate = vi.fn()
  const MockMDD = vi.fn(function(this: any) {
    this.locate = mockLocate
  })
  return { MockMDD, mockLocate }
})

vi.mock('js-mdict', () => ({
  MDD: MockMDD,
}))

import { getMddResource, clearMddCache } from './mddReader'

beforeEach(() => {
  mockLocate.mockReset()
  MockMDD.mockClear()
  clearMddCache()
})

describe('getMddResource', () => {
  it('returns null when MDD locate returns no definition', () => {
    mockLocate.mockReturnValue({ keyText: 'foo', definition: null })
    const result = getMddResource('foo.css', '/path/to.mdd')
    expect(result).toBeNull()
  })
  it('decodes base64 definition to Buffer', () => {
    const content = 'hello css'
    const b64 = Buffer.from(content).toString('base64')
    mockLocate.mockImplementation((key: string) => {
      if (key === '\\foo.css') return { keyText: key, definition: b64 }
      return { keyText: key, definition: null }
    })
    const result = getMddResource('foo.css', '/path/to.mdd')
    expect(result).not.toBeNull()
    expect(result!.toString('utf-8')).toBe(content)
  })
  it('tries all 4 key variants', () => {
    mockLocate.mockReturnValue({ keyText: 'x', definition: null })
    getMddResource('sub/img.png', '/path/to.mdd')
    const calledKeys = mockLocate.mock.calls.map((c: any[]) => c[0])
    expect(calledKeys).toContain('sub/img.png')
    expect(calledKeys).toContain('\\sub/img.png')
    expect(calledKeys).toContain('sub\\img.png')
    expect(calledKeys).toContain('\\sub\\img.png')
  })
  it('returns null on exception', () => {
    mockLocate.mockImplementation(() => { throw new Error('corrupt') })
    const result = getMddResource('foo.css', '/path/to.mdd')
    expect(result).toBeNull()
  })
  it('caches MDD instances by path', () => {
    mockLocate.mockReturnValue({ keyText: 'x', definition: null })
    getMddResource('a.css', '/path/dict.mdd')
    getMddResource('b.css', '/path/dict.mdd')
    expect(MockMDD).toHaveBeenCalledTimes(1)
  })
})

describe('clearMddCache', () => {
  it('clears specific path', () => {
    mockLocate.mockReturnValue({ keyText: 'x', definition: null })
    getMddResource('a.css', '/path/dict.mdd')
    clearMddCache('/path/dict.mdd')
    getMddResource('b.css', '/path/dict.mdd')
    expect(MockMDD).toHaveBeenCalledTimes(2)
  })
})
