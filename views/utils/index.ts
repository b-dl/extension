export const browser = chrome;

export const warn = (...msg: unknown[]) => {
  console.warn(...msg);
};

export const debug = (...msg: unknown[]) => {
  console.debug(...msg);
};

export const sendMessage = <D>(message: unknown[], tabId?: number): Promise<{ code: number, data: D }> => {
  if (tabId !== undefined) {
    return browser.tabs.sendMessage(tabId, message);
  }
  return browser.runtime.sendMessage(message);
};

export const onMessage = (cb: (message: unknown[], sender: chrome.runtime.MessageSender, sendResponse: (res?: unknown) => void)=> void) => {
  browser.runtime.onMessage.addListener((message: unknown[], sender: chrome.runtime.MessageSender, sendResponse: (res?: unknown) => void) => {
    cb(message, sender, sendResponse);
    return browser.runtime.lastError;
  });
  return browser.runtime.lastError;
};
