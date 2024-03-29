import sendEvent from './event';
import sendRequest from './request';
import events from '@src/core/events';

/**
 * @returns {EventEmitter & CommunicationMethods}
 */
const create = () => {
  const emitter = events.create();

  const event = payload => sendEvent(payload);

  const request = payload => sendRequest(payload);

  const onMessage = (message, sender, sendResponse) => {
    if (message.type === 'evosoft.voice.event') {
      emitter.emit('event', message.payload, sender);
      return;
    }

    if (message.type === 'evosoft.voice.request') {
      emitter.emit('request', message.payload, sendResponse, sender);
      return true;
    }
  };

  const listen = () => {
    chrome.runtime.onMessage.addListener(onMessage);
  };

  const dispose = () => {
    chrome.runtime.onMessage.removeListener(onMessage);
  };

  return { ...emitter, event, request, listen, dispose };
};

export default create;
