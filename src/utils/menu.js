// Electron
const {app, Menu} = require('electron').remote;
const shell = require('electron').shell;

const menuTemplate = () => [
  ...(process.platform === 'darwin'
    ? [
        {
          label: app.getName(),
          submenu: [
            {
              label: 'About',
              click: () =>
                shell.openExternal('https://person0b.itch.io/cassetter')
            },
            {
              label: 'Source',
              click: () =>
                shell.openExternal('https://github.com/person0b/cassetter')
            },
            {type: 'separator'},
            {role: 'togglefullscreen'},
            {role: 'hide'},
            {type: 'separator'},
            {role: 'quit'},
            {role: 'reload'},
            {role: 'toggledevtools'}
          ]
        }
      ]
    : [
        {
          label: 'File',
          submenu: [
            {
              label: 'About',
              click: () =>
                shell.openExternal('https://person0b.itch.io/cassetter')
            },
            {
              label: 'Source',
              click: () =>
                shell.openExternal('https://github.com/person0b/cassetter')
            },
            {type: 'separator'},
            {role: 'togglefullscreen'},
            {role: 'hide'},
            {type: 'separator'},
            {role: 'quit'}
          ]
        }
      ])
];

export default () =>
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate()));
