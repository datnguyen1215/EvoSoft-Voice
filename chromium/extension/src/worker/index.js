import com from '@src/core/com';

(async () => {
  const chromium = com.chromium.create();

  chromium.listen();
  chromium.on('event', async payload => {
    console.log('worker event received', payload);
    await com.tab.active.event(payload);
  });
  chromium.on('request', (payload, respond) => {
    console.log('worker request received', payload);
    respond('worker response');
  });

  console.log('worker');
})();
