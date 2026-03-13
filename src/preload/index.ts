import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const dictAPI = {
  openMdxFile: () => ipcRenderer.invoke('dialog:openMdxFile'),
  openMddFile: () => ipcRenderer.invoke('dialog:openMddFile'),
  getImage: (key: string, mddPath: string) => ipcRenderer.invoke('mdd:getImage', { key, mddPath }),
  getText: (key: string, mddPath: string) => ipcRenderer.invoke('mdd:getText', { key, mddPath }),
  getAllDicts: () => ipcRenderer.invoke('dict:getAll'),
  installDict: (mdxPath: string, mddPath?: string) => ipcRenderer.invoke('dict:install', { mdxPath, mddPath }),
  updateMdd: (id: string, mddPath: string) => ipcRenderer.invoke('dict:updateMdd', { id, mddPath }),
  toggleDict: (id: string, enabled: boolean) => ipcRenderer.invoke('dict:toggle', { id, enabled }),
  removeDict: (id: string) => ipcRenderer.invoke('dict:remove', { id }),
  reorderDicts: (orderedIds: string[]) => ipcRenderer.invoke('dict:reorder', { orderedIds }),
  suggestWords: (word: string) => ipcRenderer.invoke('dict:suggest', { word }),
  lookupWord: (word: string) => ipcRenderer.invoke('dict:lookup', { word }),
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('dictAPI', dictAPI)
  } catch (error) {
    console.error(error)
  }
}
