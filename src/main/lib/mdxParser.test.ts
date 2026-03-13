import { describe, it, expect, vi } from 'vitest'

const { mockReadFileSync, mockExistsSync } = vi.hoisted(() => {
  return {
    mockReadFileSync: vi.fn(),
    mockExistsSync: vi.fn(),
  }
})

vi.mock('fs', () => ({
  default: {
    readFileSync: mockReadFileSync,
    existsSync: mockExistsSync,
  },
  readFileSync: mockReadFileSync,
  existsSync: mockExistsSync,
}))

import { parseMdxMeta, decodeHtml } from './mdxParser'

function makeMdxBuffer(attrs: Record<string, string>): Buffer {
  const attrsStr = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')
  const xml = `<Dictionary ${attrsStr} />`
  const xmlBuf = Buffer.from(xml, 'utf16le')
  const header = Buffer.alloc(4)
  header.writeUInt32BE(xmlBuf.length, 0)
  return Buffer.concat([header, xmlBuf])
}

describe('decodeHtml', () => {
  it('decodes HTML entities', () => {
    expect(decodeHtml('&lt;br/&gt;')).toBe('<br/>')
    expect(decodeHtml('&amp;')).toBe('&')
    expect(decodeHtml('&quot;')).toBe('"')
    expect(decodeHtml('&apos;')).toBe("'")
  })
  it('strips <br> tags and replaces with space', () => {
    expect(decodeHtml('line1<br/>line2')).toBe('line1 line2')
    expect(decodeHtml('line1<BR>line2')).toBe('line1 line2')
  })
  it('strips HTML tags', () => {
    expect(decodeHtml('<b>bold</b>')).toBe('bold')
  })
  it('collapses whitespace', () => {
    expect(decodeHtml('  hello   world  ')).toBe('hello world')
  })
  it('handles numeric character references', () => {
    expect(decodeHtml('&#65;')).toBe('A')
  })
})

describe('parseMdxMeta', () => {
  it('parses Title, Description, Encoding from binary header', () => {
    const buf = makeMdxBuffer({ Title: 'Oxford', Description: 'A great dict', Encoding: 'UTF-8' })
    mockReadFileSync.mockReturnValue(buf)
    const meta = parseMdxMeta('/fake/oxford.mdx')
    expect(meta.title).toBe('Oxford')
    expect(meta.description).toBe('A great dict')
    expect(meta.encoding).toBe('UTF-8')
  })
  it('decodes HTML entities in Description', () => {
    // In XML attribute context, a literal <br/> inside the attribute value
    // gets extracted by the regex and then passed to decodeHtml which strips it
    const buf = makeMdxBuffer({ Title: 'Test', Description: 'Version: 1.0<br/>Author: Test', Encoding: 'UTF-8' })
    mockReadFileSync.mockReturnValue(buf)
    const meta = parseMdxMeta('/fake/test.mdx')
    expect(meta.description).toBe('Version: 1.0 Author: Test')
  })
  it('falls back to filename when header is unreadable', () => {
    mockReadFileSync.mockImplementation(() => { throw new Error('ENOENT') })
    const meta = parseMdxMeta('/fake/my-dict.mdx')
    expect(meta.title).toBe('my-dict')
    expect(meta.encoding).toBe('UTF-8')
  })
  it('falls back when header length is invalid', () => {
    const buf = Buffer.alloc(4)
    buf.writeUInt32BE(99999, 0) // too large
    mockReadFileSync.mockReturnValue(buf)
    const meta = parseMdxMeta('/fake/bad.mdx')
    expect(meta.title).toBe('bad')
  })
})
