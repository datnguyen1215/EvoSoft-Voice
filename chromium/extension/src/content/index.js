import com from '@src/core/com';
import preview from './preview';

/**
 * Event received from DOM event when the page generated
 * an event.
 * @param {*} payload
 */
const onDomEvent = payload => {
  console.log('dom event received', payload);
  com.chromium.event(payload);
};

/**
 * Request received from DOM event when the page generated
 * a request.
 * @param {*} payload
 * @param {*} respond
 */
const onDomRequest = async (payload, respond) => {
  console.log('dom request received', payload);
  const resp = await com.chromium.request(payload);
  respond(resp);
};

/**
 * Event received from Worker. This is used to handle
 * the message on active tab.
 * @param {*} payload
 */
const onChromiumEvent = async payload => {
  console.log(`msg from worker`, payload);

  const { data } = payload;

  switch (payload.type) {
    case 'evosoft.voice.transcript':
      await preview.update(data);
      break;
  }
};

/**
 * Request received from Worker. This is used to handle
 * the message on active tab.
 * @param {*} payload
 * @param {*} respond
 */
const onChromiumRequest = (payload, respond) => {
  console.log('request received', payload);
  respond('response');
};

(() => {
  const dom = com.dom.create();
  dom.on('event', onDomEvent);
  dom.on('request', onDomRequest);
  dom.listen();

  const chromium = com.chromium.create();
  chromium.on('event', onChromiumEvent);
  chromium.on('request', onChromiumRequest);
  chromium.listen();

  console.log('content script loaded');
})();
