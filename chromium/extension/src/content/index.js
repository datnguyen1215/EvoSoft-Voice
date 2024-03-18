import com from '@src/core/com';
import preview from './preview';

(() => {
  preview.create();
  preview.on('displayed', () => {
    console.log('preview shown');
  });

  preview.on('completed', text => {
    console.log('preview hidden');
    // send input to currently focused element
    const el = document.activeElement;
    // get current caret position
    const start = el.selectionStart;
    const end = el.selectionEnd;
    // insert text
    const value = el.value;
    const before = value.substring(0, start);
    const after = value.substring(end);
    const updated = before + text + after;
    // update input value
    el.value = updated;

    // update carret after text
    const caret = start + text.length;
    if (typeof el.setSelectionRange === 'function')
      el.setSelectionRange(caret, caret);
  });

  const dom = com.dom.create();
  dom.listen();
  dom.on('event', payload => {
    console.log('dom event received', payload);
    chromium.event(payload);
  });

  dom.on('request', async (payload, respond) => {
    console.log('dom request received', payload);
    const resp = await chromium.request(payload);
    respond(resp);
  });

  const chromium = com.chromium.create();
  chromium.listen();

  chromium.on('event', async payload => {
    console.log(`msg from worker`, payload);

    const { data } = payload;

    switch (payload.type) {
      case 'evosoft.voice.transcript':
        await preview.update(data);
        break;
    }
  });

  chromium.on('request', (payload, respond) => {
    console.log('request received', payload);
    respond('response');
  });

  console.log('content script loaded');
})();
