import create from './create';
import events from '$lib/events';

const emitter = events.create();

/** @type {SpeechRecognition} */
let recognition = null;

/**
 * On end event
 * @param {SpeechRecognitionErrorEvent} ev
 */
const onEnded = ev => {
  console.log('speech recognition ended', ev);
  recognition.onend = null;
  recognition.onresult = null;
  recognition.stop();
  recognition = null;
  emitter.emit('ended');
  start();
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
  console.log(result);

  emitter.emit('transcript', { text: transcript, final: result.isFinal });
};

/**
 * On error event
 * @param {SpeechRecognitionErrorEvent} ev
 */
const onError = ev => {
  console.error('speech recognition error', ev);
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

  recognition.onresult = null;
  recognition.onend = null;
  recognition.onstart = null;
  recognition.onerror = null;
  recognition.stop();
  recognition = null;
  emitter.emit('ended');
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
