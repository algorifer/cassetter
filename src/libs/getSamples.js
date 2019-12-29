const fs = require('fs');

export default path =>
  new Promise((res, rej) => {
    fs.readdir(path, (err, files) => {
      res(
        files
          .filter(file => file.toLowerCase().endsWith('wav'))
          .map(file => file.split('.')[0])
      );
    });
  });
