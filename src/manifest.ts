import type { Manifest } from 'webextension-polyfill';
import pkg from '../package.json';

const isDev = process.env.NODE_ENV === 'development';

export default async function getManifest() {
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    homepage_url: 'https://doc.wssio.com/dl',
    options_ui: {
      page: 'views/options/index.html',
      open_in_tab: true,
    },
    action: {
      default_popup: 'views/popup/index.html',
      default_icon: 'icons/icon-256.png',
    },
    background: {
      service_worker: isDev ? 'background.global.js' : 'background.js',
    },
    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*'],
        exclude_globs: ['chrome://*/*', '*://*.google.*/*'],
        js: [isDev ? 'content_scripts.global.js' : 'content_scripts.js'],
        run_at: 'document_start',
      },
    ],
    icons: {
      16: 'icons/icon-16.png',
      48: 'icons/icon-48.png',
      128: 'icons/icon-128.png',
      256: 'icons/icon-256.png',
      512: 'icons/icon-512.png',
    },
    permissions: [
      'alarms',
      'tabs',
      'storage',
      'cookies',
    ],
    content_security_policy: {
      extension_pages: 'script-src \'self\'; object-src \'self\'',
    },
    host_permissions: [
      'http://*/*', 'https://*/*',
    ],
  };
  return manifest;
}
