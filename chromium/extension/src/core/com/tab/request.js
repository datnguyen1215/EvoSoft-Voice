const request = (tabid, payload) => {
  return new Promise(async (resolve, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      reject(new Error('Request timeout'));
    }, payload.timeout || 3000);

    try {
      const resp = await chrome.tabs.sendMessage(tabid, {
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
