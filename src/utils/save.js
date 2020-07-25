const { dialog } = require('electron').remote
const fs = require('fs')

import { get } from 'svelte/store'
import { tapes } from '../stores/tapes'

export const save = () => {
  const tapesData = get(tapes)

  const processedTapes = tapesData.map((item) => {
    if (item.player === null) return null

    const processedItem = { name: item.name, ranges: {}, effects: {} }

    item.ranges.forEach(({ param, msgValue }) => {
      processedItem.ranges[param] = msgValue
    })

    item.effects.forEach(({ param, msgValue }) => {
      processedItem.effects[param] = msgValue
    })

    return processedItem
  })

  dialog
    .showSaveDialog(null, { defaultPath: `cassetter` })
    .then(({ canceled, filePath }) => {
      if (filePath === undefined || canceled) return

      if (filePath.indexOf('.json') < 0) {
        filePath += '.json'
      }

      fs.writeFileSync(filePath, JSON.stringify(processedTapes, null, 2))
    })
}
