const { dialog } = require('electron').remote
const fs = require('fs')

import { tapes } from '../stores/tapes'

const readData = (path) => {
  if (!path) return
  if (!fs.existsSync(path)) {
    console.warn('Source', 'File does not exist: ' + path)
    return
  }
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}

export const open = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(null, {
    properties: ['openFile'],
    filters: [{ name: 'JSON', extensions: ['json'] }],
  })

  if (canceled) return

  const data = readData(filePaths[0])

  if (!Array.isArray(data)) return

  tapes.openSetting(data)
}
