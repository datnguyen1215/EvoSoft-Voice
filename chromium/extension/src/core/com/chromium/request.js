const request = payload => {
  return new Promise(async (resolve, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      reject(new Error('Request timeout'));
    }, payload.timeout || 3000);

    try {
      const resp = await chrome.runtime.sendMessage({
        type: 'evosoft.voice.request',
        payload
      });
      resolve(resp);
    } catch (e) {
      reject(e);
    } finally {
      clearTimeout(timer);
    }
  });
};

export default request;

// frontend
// 2 different types, depending on how you launch them.
// 
// 1. http://localhost:5173/teacher/portal << chrome.tabs.sendMessage(tabid, message)
// 2. chrome.windows.create('portal.html') << chrome.runtime.sendMessage(), chrome.tabs.sendMessage(tabid, message)
//
// chrome.runtime.sendMessage() << content -> background
// chrome.tabs.sendMessage() << background -> content script (tabid)
// document.dispatchEvent() << webpage -> content script
