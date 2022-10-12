import fs from 'fs-extra';
import { resolve } from 'path';
import { bgCyan, black } from 'kolorist';

import manifest from '../src/manifest';

const logger = (name: string, message: string) => {
  console.log(black(bgCyan(` ${name} `)), message);
};

export default async function writeManifest() {
  await fs.writeJSON(resolve(__dirname, '../extension/manifest.json'), await manifest(), { spaces: 2 });
  logger('PRE', 'write manifest.json');
}

writeManifest();
