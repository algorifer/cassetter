// Electron
const { app, Menu } = require('electron').remote
const shell = require('electron').shell

import selectFolder from '../libs/selectFolder'
import { samplesFolder } from '../stores/tapes'
import { save } from './save'
import { open } from './open'

const createSubmenu = (isFolder) => [
  ...(isFolder
    ? [
        {
          label: 'Save',
          click: save,
          accelerator: 'CmdOrCtrl+s',
        },
        {
          label: 'Open',
          click: open,
          accelerator: 'CmdOrCtrl+o',
        },
      ]
    : []),
  {
    label: 'Folder',
    click: async () => {
      const path = await selectFolder()
      samplesFolder.set(path)
    },
    accelerator: 'CmdOrCtrl+f',
  },
  { type: 'separator' },
  {
    label: 'About',
    click: () => shell.openExternal('https://person0b.itch.io/cassetter'),
  },
  {
    label: 'Source',
    click: () => shell.openExternal('https://github.com/person0b/cassetter'),
  },
  { type: 'separator' },
  { role: 'togglefullscreen' },
  { role: 'hide' },
  { type: 'separator' },
  { role: 'quit' },
  { role: 'reload' },
  { role: 'toggledevtools' },
]

const menuTemplate = (isFolder) => [
  ...(process.platform === 'darwin'
    ? [
        {
          label: app.getName(),
          submenu: createSubmenu(isFolder),
        },
      ]
    : [
        {
          label: 'File',
          submenu: createSubmenu(isFolder),
        },
      ]),
]

export default (isFolder) =>
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(isFolder)))
