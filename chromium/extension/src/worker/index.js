import com from '@src/core/com';
import app from './app';

const onContentScriptEvent = async payload => {
  const { type, data } = payload;

  switch (type) {
    case 'evosoft.voice.toggle':
      await com.tab.active.event({ type: 'evosoft.voice.toggle' });
      await app.event({ type: 'evosoft.voice.toggle' });
      break;
  }
};

(async () => {
  const chromium = com.chromium.create();
  chromium.on('event', onContentScriptEvent);
  chromium.listen();

  app.on('opened', async () => {
    console.log('opened');
  });

  app.on('closed', async () => {
    console.log('closed');
  });

  app.on('event', async payload => {
    console.log(payload);
    const { type, data } = payload;
    switch (type) {
      case 'evosoft.voice.transcript':
        await com.tab.active.event(payload);
        break;
    }
  });
})();
