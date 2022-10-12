export const browser = chrome;

export const host = '127.0.0.1:10101';

export const warn = (...msg: unknown[]) => {
  console.warn(...msg);
};

export const debug = (...msg: unknown[]) => {
  console.debug(...msg);
};

export const http = <T>(path: string, method: 'GET' | 'POST' | 'HEAD', body?: string): Promise<{ code: number, msg: string, data: T }> => new Promise((resolve, reject) => {
  const url = `http://${host}${path}`;
  debug('请求url:', url);
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.text();
  }).then((txt) => {
    try {
      resolve(JSON.parse(txt));
    } catch (error) {
      resolve(txt as unknown as { code: number, msg: string, data: T });
    }
  }).catch((error) => {
    reject(error);
  });
});

export const ping = (): Promise<{ code: number; msg: string; data: unknown; }> => http('/ping', 'HEAD');

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
