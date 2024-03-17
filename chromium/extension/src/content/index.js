import com from '@src/core/com';

(() => {
  const dom = com.dom.create();
  dom.listen();
  dom.on('event', console.log);
  dom.on('request', (payload, respond) => {
    console.log('request received', payload);
    respond('response');
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
