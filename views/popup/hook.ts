import {
  axios, sendMessage, debug, warn, browser,
} from '../../util';

export const status = ref(500);

axios('/ping', 'HEAD').then((pingRes) => {
  debug('pingRes', pingRes);
  status.value = pingRes.code;
  if (pingRes.code === 200) {
    browser.tabs.query({
      status: 'complete', windowType: 'normal', active: true, currentWindow: true,
    }).then((tabs) => {
      if (tabs && tabs.length === 1 && tabs) {
        const tab = tabs[0];
        if (tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
          sendMessage(['data'], tab.id).then((dataRes) => {
            debug('popup后台脚本响应数据:', dataRes);
          }).catch((error) => warn(error.message));
        }
      }
    });
  }
}).catch((reason) => {
  warn('请求错误：', reason);
});
