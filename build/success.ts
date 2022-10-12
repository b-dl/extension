import { resolve } from 'path';
import fs from 'fs-extra';
import { bgCyan, black } from 'kolorist';

const isDev = process.env.NODE_ENV === 'development';

const logger = (name: string, message: string) => {
  console.log(black(bgCyan(` ${name} `)), message);
};

if (!isDev) {
  fs.moveSync(
    resolve('extension/background.global.js'),
    resolve('extension/background.js'),
    { overwrite: true },
  );
  fs.moveSync(
    resolve('extension/content_scripts.global.js'),
    resolve('extension/content_scripts.js'),
    { overwrite: true },
  );
  logger('BUILD:SW', 'Moved service-worker success!');
}
