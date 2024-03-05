// @ts-nocheck
import create from './create';
import events from '@extension/src/lib/events';

const emitter = events.create();
let recognition = null;

/**
 * On end event
 */
const onEnded = () => {
  recognition.onend = null;
  recognition.onresult = null;
  recognition.stop();
  recognition = null;
  console.log('speech recognition ended');
  emitter.emit('ended');
};

/**
 * On started event
 */
const onStarted = () => {
  console.log('speech recognition started');
  emitter.emit('started');
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
  console.error('speech recognition error', e);
};

/**
 * Start the speech recognition.
 * @returns {void}
 */
const start = () => {
  if (recognition) return;

  recognition = create();
  recognition.onresult = onResult;
  recognition.onend = onEnded;
  recognition.onstart = onStarted;
  recognition.onerror = onError;
  recognition.start();
};

/**
 * Stop the speech recognition.
 * @returns {void}
 */
const stop = () => {
  if (!recognition) return;

  onEnded();
};

/**
 * Toggle the speech recognition.
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
