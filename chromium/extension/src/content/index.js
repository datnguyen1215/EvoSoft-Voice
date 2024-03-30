import com from './com';
import preview from './preview';
import commands from './commands';

/**
 * Event received from DOM event when the page generated
 * an event.
 * @param {*} payload
 */
const onWebpageEvent = payload => {
  com.worker.event(payload);
};

/**
 * Request received from DOM event when the page generated
 * a request.
 * @param {*} payload
 * @param {*} respond
 */
const onWebpageRequest = async (payload, respond) => {
  const resp = await com.worker.request(payload);
  respond(resp);
};

/**
 * Event received from Worker. This is used to handle
 * the message on active tab.
 * @param {*} payload
 */
const onWorkerEvent = async payload => {
  const { type } = payload;

  switch (type) {
    case 'evosoft.voice.transcript':
      await preview.update(payload.data);
      break;

    case 'evosoft.voice.toggle':
      await com.webpage.event(payload);
      break;
  }
};

/**
 * Request received from Worker. This is used to handle
 * the message on active tab.
 * @param {*} payload
 * @param {*} respond
 */
const onWorkerRequest = (payload, respond) => {
  // TODO: Need to implement
  respond('response');
};

const onCommand = command => {
  switch (command.name) {
    case 'voice-toggle':
      console.log(command);
      com.worker.event({ type: 'evosoft.voice.toggle' });
      break;
  }
};

(() => {
  commands.on('command', onCommand);
  commands.listen();

  preview.init();

  com.webpage.on('event', onWebpageEvent);
  com.webpage.on('request', onWebpageRequest);
  com.webpage.listen();

  com.worker.on('event', onWorkerEvent);
  com.worker.on('request', onWorkerRequest);
  com.worker.listen();
  console.log('content script loaded');
})();
