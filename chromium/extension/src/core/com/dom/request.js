const request = (service, payload) => {
  return new Promise((resolve, reject) => {
    const id = crypto.randomUUID();

    const timer = setTimeout(() => {
      document.removeEventListener('evosoft.voice.response', onResponse);
      reject(new Error('Request timeout'));
    }, payload.timeout || 3000);

    const onResponse = e => {
      if (e.detail.id !== id) return;

      if (e.detail.service?.id !== service.id) return;

      document.removeEventListener('evosoft.voice.response', onResponse);
      clearTimeout(timer);
      resolve(e.detail.payload);
    };

    document.addEventListener('evosoft.voice.response', onResponse);
    document.dispatchEvent(
      new CustomEvent('evosoft.voice.request', {
        detail: { id, service, payload }
      })
    );
  });
};

export default request;
