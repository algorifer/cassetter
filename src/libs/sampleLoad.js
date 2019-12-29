const {dialog, app} = require('electron').remote;

export default async () => {
  const paths = await dialog.showOpenDialog(app.win, {
    properties: ['openFile'],
    filters: [{name: 'WAV', extensions: ['wav']}]
  });
  if (!paths) {
    console.log('Nothing to load');
    return;
  }

  return paths.filePaths[0];
};
