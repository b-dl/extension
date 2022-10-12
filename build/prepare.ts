import { execSync } from 'child_process';
import fs from 'fs-extra';
import chokidar from 'chokidar';
import { resolve } from 'path';

const isDev = process.env.NODE_ENV === 'development';
const writeManifest = () => {
  if (!fs.pathExistsSync(resolve(__dirname, '../extension'))) {
    fs.mkdirSync(resolve(__dirname, '../extension'));
  }
  if (!fs.pathExistsSync(resolve(__dirname, '../extension/icons'))) {
    fs.copySync(resolve(__dirname, '../src/assets'), resolve(__dirname, '../extension/icons'));
  }
  execSync('npx esno ./build/manifest.ts', { stdio: 'inherit' });
};

writeManifest();

if (isDev) {
  chokidar.watch([resolve(__dirname, '../src/manifest.ts'), resolve(__dirname, '../package.json')])
    .on('change', () => {
      writeManifest();
    });
}
