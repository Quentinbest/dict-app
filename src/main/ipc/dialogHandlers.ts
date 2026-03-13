import { ipcMain, dialog } from 'electron'

export function registerDialogHandlers(): void {
  ipcMain.handle('dialog:openMdxFile', async () => {
    const result = await dialog.showOpenDialog({
      title: '选择 MDX 词典文件',
      properties: ['openFile'],
    })
    if (result.canceled || !result.filePaths[0]) return null
    const path = result.filePaths[0]
    if (!path.toLowerCase().endsWith('.mdx')) return null
    return path
  })

  ipcMain.handle('dialog:openMddFile', async () => {
    const result = await dialog.showOpenDialog({
      title: '选择 MDD 资源文件',
      properties: ['openFile'],
    })
    if (result.canceled || !result.filePaths[0]) return null
    const path = result.filePaths[0]
    if (!path.toLowerCase().endsWith('.mdd')) return null
    return path
  })
}
