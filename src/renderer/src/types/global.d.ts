interface Window {
  dictAPI: {
    openMdxFile: () => Promise<string | null>
    openMddFile: () => Promise<string | null>
    getImage: (key: string, mddPath: string) => Promise<string | null>
    getText: (key: string, mddPath: string) => Promise<string | null>
    getAllDicts: () => Promise<any[]>
    installDict: (mdxPath: string, mddPath?: string) => Promise<any>
    updateMdd: (id: string, mddPath: string) => Promise<any>
    toggleDict: (id: string, enabled: boolean) => Promise<void>
    removeDict: (id: string) => Promise<void>
    reorderDicts: (orderedIds: string[]) => Promise<void>
    suggestWords: (word: string) => Promise<string[]>
    lookupWord: (word: string) => Promise<{ dictId: string; name: string; badgeColor: string; html: string; mddPath?: string }[]>
  }
}
