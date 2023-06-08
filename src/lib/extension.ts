import { axios, browser, dlId } from '../../util';
import { wsConnect } from './ws';

browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    const config: {[key: string]: unknown} = {};
    axios('config', 'GET').then((res) => {
      config[dlId] = res.data;
      browser.storage.sync.set(config).then(() => {
        wsConnect();
      });
    }).catch(() => {
      config[dlId] = {
        host: 'http://127.0.0.1:10101',
      };
      browser.storage.sync.set(config).then(() => {
        wsConnect();
      });
    });
  }
  if (details.reason === 'update') {
    wsConnect();
  }
});
