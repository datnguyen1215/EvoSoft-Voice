import com from '@src/core/com';

(() => {
  const dom = com.dom.create();
  dom.listen();
  dom.on('event', payload => {
    chromium.event(payload);
  });
  dom.on('request', async (payload, respond) => {
    console.log('dom request received', payload);
    const resp = await chromium.request(payload);
    respond(resp);
  });

  const chromium = com.chromium.create();
  chromium.listen();
  chromium.on('event', console.log);
  chromium.on('request', (payload, respond) => {
    console.log('request received', payload);
    respond('response');
  });

  console.log('content script loaded');
})();
