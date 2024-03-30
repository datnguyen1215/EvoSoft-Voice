const request = (tab, payload) => {
  return new Promise(async (resolve, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      reject(new Error('Request timeout'));
    }, payload.timeout || 3000);

    try {
      const resp = await chrome.tabs.sendMessage(tab.id, {
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
