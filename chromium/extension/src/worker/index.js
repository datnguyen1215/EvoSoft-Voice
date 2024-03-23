import com from './com';

const onChromiumEvent = async payload => {
  console.log(`msg from content script`, payload);

  const { type } = payload;

  switch (type) {
    case 'evosoft.voice.transcript':
      // send to current tab
      com.tab.active.event(payload);
      break;

    case 'evosoft.voice.started':
      com.chromium.event({ type: 'evosoft.voice.started' });
      break;

    case 'evosoft.voice.stopped':
      com.chromium.event({ type: 'evosoft.voice.stopped' });
      break;

    case 'evosoft.voice.toggle':
      com.chromium.event({ type: 'evosoft.voice.stopped' });
      break;
  }
};

const onChromiumRequest = (payload, respond) => {
  console.log('request received', payload);
  respond('response');
};

(async () => {
  com.chromium.listen();
  com.chromium.on('event', onChromiumEvent);
  com.chromium.on('request', onChromiumRequest);
  console.log('worker');
})();
