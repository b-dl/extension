import { Browser } from 'webextension-polyfill';

export const browser: Browser = chrome as unknown as Browser;

export const dlId = 'G3SIbNyWezvRpqdlc9HFInkWw';

export const warn = (...msg: unknown[]) => {
  console.warn(...msg);
};

export const debug = (...msg: unknown[]) => {
  console.debug(...msg);
};

export const axios = <T>(path: string, method: 'GET' | 'POST' | 'HEAD', body?: unknown): Promise<{ code: 200 | 400 | 401 | 503, msg: string, data: T }> => new Promise((resolve, reject) => {
  browser.storage.sync.get(dlId).then((data) => {
    const config = data[dlId];
    if (config) {
      let { host } = config;
      const { token } = config;
      if (host) {
        if (!host.startsWith('http')) {
          host += `http://${host}`;
        }
        const url = `${host}${path}`;
        debug('请求url:', url);
        fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(body),
        }).then((res) => {
          debug('服务响应数据：', res);
          if (!res.ok) {
            resolve({ code: res.status as 200 | 400 | 401 | 503, msg: res.statusText, data: undefined as T });
          } else {
            res.json().then((json) => {
              debug('服务响应数据获取：', json);
              resolve(json);
            }).catch((reason) => resolve({ code: res.status as 200 | 400 | 401 | 503, msg: (reason as {message: string}).message, data: reason as T }));
          }
        }).catch((error) => {
          reject(error);
        });
      } else {
        reject(new Error('配置获取失败'));
      }
    } else {
      reject(new Error('配置获取失败'));
    }
  }).catch((reason) => reject(reason));
});
export const sendMessage = <D>(message: unknown[], tabId?: number): Promise<{ code: 200 | 400 | 401 | 503, msg: string, data: D }> => {
  if (tabId !== undefined) {
    return browser.tabs.sendMessage(tabId, message);
  }
  return browser.runtime.sendMessage(message);
};

export const IsURL = (url: string) => {
  const strRegex = '^((https|http|ftp|rtsp|mms)?://)'
  + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"
   + '(([0-9]{1,3}.){3}[0-9]{1,3}'
   + '|'
   + "([0-9a-z_!~*'()-]+.)*"
   + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].'
   + '[a-z]{2,6})'
   + '(:[0-9]{1,4})?'
   + '((/?)|'
   + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
  const re = new RegExp(strRegex);
  if (re.test(url)) {
    return (true);
  }
  return (false);
};
