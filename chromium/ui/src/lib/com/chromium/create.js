import sendEvent from './event';
import sendRequest from './request';
import events from '../../events';

/**
 * @returns {EventEmitter & CommunicationMethods}
 */
const create = () => {
  const emitter = events.create();

  /**
   * @param {EventPayload} payload
   */
  const event = payload => sendEvent(payload);

  /**
   * @param {RequestPayload} payload
   * @returns {Promise<any>}
   */
  const request = payload => sendRequest(payload);

  /**
   * @param {EventPayload} payload
   * @param {chrome.runtime.MessageSender} sender
   */
  const onEvent = (payload, sender) => {
    emitter.emit('event', payload, sender);
  };

  /**
   * @param {RequestPayload} payload
   * @param {(...args: any[]) => void} respond
   * @param {chrome.runtime.MessageSender} sender
   */
  const onRequest = (payload, respond, sender) => {
    emitter.emit('request', payload, respond, sender);
  };

  /**
   * @param {RawMessage} message
   * @param {chrome.runtime.MessageSender} sender
   * @param {(...args: any[]) => void} sendResponse
   * @returns {boolean}
   */
  const onMessage = (message, sender, sendResponse) => {
    if (message.type === 'evosoft.voice.event') {
      onEvent(message.payload, sender);
      return false;
    }

    if (message.type === 'evosoft.voice.request') {
      onRequest(message.payload, sendResponse, sender);
      return true;
    }
  };

  /**
   * @returns {void}
   */
  const listen = () => {
    chrome.runtime.onMessage.addListener(onMessage);
  };

  /**
   * @returns {void}
   */
  const dispose = () => {
    chrome.runtime.onMessage.removeListener(onMessage);
  };

  return { ...emitter, event, request, listen, dispose };
};

export default create;
