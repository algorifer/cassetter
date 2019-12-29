const {app, BrowserWindow, webFrame, Menu} = require('electron');
const path = require('path');
const url = require('url');
const shell = require('electron').shell;

let isShown = true;

require('electron').protocol.registerSchemesAsPrivileged([
  {scheme: 'js', privileges: {standard: true, secure: true}}
]);

app.win = null;

app.on('ready', () => {
  app.win = new BrowserWindow({
    width: 312,
    height: 720,
    minWidth: 312,
    minHeight: 320,
    resizable: true,
    backgroundColor: '#000000',
    frame: process.platform !== 'darwin',
    utoHideMenuBar: process.platform === 'darwin',
    skipTaskbar: process.platform === 'darwin',
    icon: path.join(
      __dirname,
      {
        darwin: 'icon.icns',
        linux: 'icon.png',
        win32: 'icon.ico'
      }[process.platform] || 'icon.ico'
    ),
    icon: 'icon.png',
    webPreferences: {
      zoomFactor: 1.0,
      nodeIntegration: true,
      backgroundThrottling: false
    }
  });

  // app.win.loadURL(path.join(__dirname, 'public', 'index.html'));
  app.win.loadFile(`public/index.html`);

  app.win.on('closed', () => {
    win = null;
    app.quit();
  });

  app.on('window-all-closed', () => {
    app.quit();
  });

  app.on('activate', () => {
    if (app.win === null) {
      createWindow();
    } else {
      app.win.show();
    }
  });

  app.win.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
});

app.inspect = function() {
  app.win.toggleDevTools();
};

app.toggleMenubar = function() {
  app.win.setMenuBarVisibility(!app.win.isMenuBarVisible());
};

app.toggleFullscreen = function() {
  app.win.setFullScreen(!app.win.isFullScreen());
};

app.toggleVisible = function() {
  if (process.platform === 'darwin') {
    if (isShown && !app.win.isFullScreen()) {
      app.win.hide();
    } else {
      app.win.show();
    }
  } else {
    if (!app.win.isMinimized()) {
      app.win.minimize();
    } else {
      app.win.restore();
    }
  }
};

// app.injectMenu = function(menu) {
//   try {
//     Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
//   } catch (err) {
//     console.warn('Cannot inject menu.');
//   }
// };
