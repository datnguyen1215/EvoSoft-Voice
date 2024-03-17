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
      clearTimeout(timer);
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};

export default request;
