import { useEffect, useRef } from 'react'

interface MddImageProps {
  html: string
  mddPath?: string
}

// Track injected CSS/JS by key to avoid duplicates across dict blocks
const injectedResources = new Set<string>()

async function injectStyleFromMdd(href: string, mddPath: string) {
  const id = `mdd-css-${href.replace(/[^a-z0-9]/gi, '-')}`
  if (injectedResources.has(id)) return
  injectedResources.add(id)
  try {
    const css = await window.dictAPI.getText(href, mddPath)
    if (css) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = css
      document.head.appendChild(style)
    }
  } catch {
    injectedResources.delete(id)
  }
}

async function injectScriptFromMdd(src: string, mddPath: string) {
  const id = `mdd-js-${src.replace(/[^a-z0-9]/gi, '-')}`
  if (injectedResources.has(id)) return
  injectedResources.add(id)
  try {
    const js = await window.dictAPI.getText(src, mddPath)
    if (js) {
      const script = document.createElement('script')
      script.id = id
      script.textContent = js
      document.head.appendChild(script)
    }
  } catch {
    injectedResources.delete(id)
  }
}

export function MddImage({ html, mddPath }: MddImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || !mddPath || !window.dictAPI) return

    // Inject CSS from MDD into document.head
    const links = el.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
    links.forEach((link) => {
      const href = link.getAttribute('href') ?? ''
      link.remove()
      if (!href || href.startsWith('http') || href.startsWith('data:')) return
      injectStyleFromMdd(href, mddPath)
    })

    // Inject JS from MDD into document.head (in order)
    const scripts = el.querySelectorAll<HTMLScriptElement>('script[src]')
    const srcs: string[] = []
    scripts.forEach((script) => {
      const src = script.getAttribute('src') ?? ''
      script.remove()
      if (src && !src.startsWith('http')) srcs.push(src)
    })
    // Inject sequentially to preserve dependency order (e.g. jquery before plugins)
    srcs.reduce((p, src) => p.then(() => injectScriptFromMdd(src, mddPath)), Promise.resolve())

    // Resolve <img> from MDD
    const imgs = el.querySelectorAll<HTMLImageElement>('img[src]')
    imgs.forEach(async (img) => {
      const src = img.getAttribute('src') ?? ''
      if (!src || src.startsWith('data:') || src.startsWith('http')) return
      try {
        const b64 = await window.dictAPI.getImage(src, mddPath)
        if (b64) img.src = b64
      } catch {
        // ignore
      }
    })
  }, [html, mddPath])

  return (
    <div
      ref={containerRef}
      className="dict-html-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
