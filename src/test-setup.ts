/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.dictAPI for renderer tests
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'dictAPI', {
    value: {
      openMdxFile: vi.fn().mockResolvedValue(null),
      openMddFile: vi.fn().mockResolvedValue(null),
      getImage: vi.fn().mockResolvedValue(null),
      getText: vi.fn().mockResolvedValue(null),
      getAllDicts: vi.fn().mockResolvedValue([]),
      installDict: vi.fn().mockResolvedValue({}),
      updateMdd: vi.fn().mockResolvedValue({}),
      toggleDict: vi.fn().mockResolvedValue(undefined),
      removeDict: vi.fn().mockResolvedValue(undefined),
      reorderDicts: vi.fn().mockResolvedValue(undefined),
      suggestWords: vi.fn().mockResolvedValue([]),
      lookupWord: vi.fn().mockResolvedValue([]),
    },
    writable: true,
  })
}
