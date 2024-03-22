import com from './com';
import preview from './preview';
import commands from './commands';

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

  const { type } = payload;

  switch (type) {
    case 'evosoft.voice.transcript':
      await preview.update(payload.data);
      break;

    case 'evosoft.voice.toggle':
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

const onCommand = command => {
  console.log('command received', command);
  switch (command.name) {
    case 'voice-toggle':
      com.chromium.event({ type: 'evosoft.voice.toggle' });
      break;
  }
};

(() => {
  commands.listen();
  commands.on('command', onCommand);

  preview.init();

  com.dom.on('event', onDomEvent);
  com.dom.on('request', onDomRequest);
  com.dom.listen();

  com.chromium.on('event', onChromiumEvent);
  com.chromium.on('request', onChromiumRequest);
  com.chromium.listen();

  console.log('content script loaded');
})();
