import events from '$lib/events';
import sendEvent from './event';
import sendRequest from './request';

/**
 * @returns {EventEmitter & CommunicationMethods}
 */
const create = () => {
  const emitter = events.create();

  const service = { id: crypto.randomUUID() };

  const event = payload => sendEvent(service, payload);

  const request = payload => sendRequest(service, payload);

  const onEvent = e => {
    // ignore events from the same service
    if (e.detail.service?.id === service.id) return;

    emitter.emit('event', e.detail.payload);
  };

  const onRequest = e => {
    // ignore requests from the same service
    if (e.detail.service?.id === service.id) return;

    const respond = payload => {
      document.dispatchEvent(
        new CustomEvent('evosoft.voice.response', {
          detail: { id: e.detail.id, service, payload }
        })
      );
    };

    emitter.emit('request', e.detail.payload, respond);
  };

  const listen = () => {
    document.addEventListener('evosoft.voice.event', onEvent);
    document.addEventListener('evosoft.voice.request', onRequest);
  };

  const dispose = () => {
    document.removeEventListener('evosoft.voice.event', onEvent);
    document.removeEventListener('evosoft.voice.request', onRequest);
  };

  return { ...emitter, event, request, listen, dispose };
};

export default create;
