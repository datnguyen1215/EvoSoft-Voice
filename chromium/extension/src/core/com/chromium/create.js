import sendEvent from './event';
import sendRequest from './request';
import events from '@src/core/events';

const create = () => {
  const emitter = events.create();

  const event = payload => sendEvent(payload);

  const request = payload => sendRequest(payload);

  const onEvent = payload => {
    emitter.emit('event', payload);
  };

  const onRequest = (payload, respond) => {
    emitter.emit('request', payload, respond);
  };

  const onMessage = (message, sender, sendResponse) => {
    if (message.type === 'evosoft.voice.event') {
      onEvent(message.payload);
      return;
    }

    if (message.type === 'evosoft.voice.request') {
      onRequest(message.payload, sendResponse);
      return true;
    }
  };

  const listen = () => {
    console.log('listening');
    chrome.runtime.onMessage.addListener(onMessage);
  };

  const dispose = () => {
    chrome.runtime.onMessage.removeListener(onMessage);
  };

  return { ...emitter, event, request, listen, dispose };
};

export default create;
