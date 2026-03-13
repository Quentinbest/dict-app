import { readFileSync } from 'fs'
import { basename } from 'path'

export interface MdxMeta {
  title: string
  description: string
  encoding: string
}

export function parseMdxMeta(mdxPath: string): MdxMeta {
  const fallback = {
    title: basename(mdxPath, '.mdx'),
    description: '',
    encoding: 'UTF-8',
  }

  try {
    const buf = readFileSync(mdxPath)
    // First 4 bytes: big-endian uint32 = header length in bytes
    const headerLen = buf.readUInt32BE(0)
    if (headerLen <= 0 || headerLen > 65536) return fallback

    // Header is UTF-16LE XML starting at offset 4
    const headerXml = buf.subarray(4, 4 + headerLen).toString('utf16le')

    const title = extractAttr(headerXml, 'Title') || fallback.title
    const description = extractAttr(headerXml, 'Description') || ''
    const encoding = extractAttr(headerXml, 'Encoding') || 'UTF-8'

    return { title, description, encoding }
  } catch {
    return fallback
  }
}

function extractAttr(xml: string, attr: string): string {
  const re = new RegExp(`${attr}="([^"]*)"`, 'i')
  const m = xml.match(re)
  if (!m) return ''
  return decodeHtml(m[1].trim())
}

export function decodeHtml(str: string): string {
  return str
    .replace(/<br\s*\/?>/gi, ' ')   // <br> → space
    .replace(/<[^>]*>/g, '')         // strip remaining tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ')
    .trim()
}
