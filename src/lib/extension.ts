import { browser } from '../utils';
import { wsConnect } from './ws';

browser.runtime.onInstalled.addListener((details: chrome.runtime.InstalledDetails) => {
  if (details.reason === 'install' || details.reason === 'update') {
    wsConnect();
  }
});
