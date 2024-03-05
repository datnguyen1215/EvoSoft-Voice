// @ts-nocheck
import create from './create';
import events from '../events';

const emitter = events.create();
let recognition = null;

/**
 * Start listening
 */
const onEnded = () => {
  recognition.onend = null;
  recognition.onresult = null;
  recognition = null;
  console.log('listening ended');
};

/**
 * On transcript event
 * @param {SpeechRecognitionEvent} e
 */
const onResult = e => {
  const result = e.results[e.resultIndex];
  const transcript = result[0].transcript;

  emitter.emit('transcript', { text: transcript, final: result.isFinal });
};

/**
 * On error event
 * @param {SpeechRecognitionEvent} e
 */
const onError = e => {
  console.error('voice recognition error', e);
};

const start = () => {
  if (recognition) return;

  recognition = create();
  recognition.onresult = onResult;
  recognition.onend = onEnded;
  recognition.onerror = onError;
  recognition.start();
  emitter.emit('start');
};

const stop = () => {
  if (!recognition) return;

  onEnded();
  emitter.emit('stop');
};

/**
 * Toggle the voice recognition.
 * @returns {void}
 */
const toggle = () => {
  if (recognition) {
    stop();
    return;
  }

  start();
};

export default { start, stop, toggle, ...emitter };
