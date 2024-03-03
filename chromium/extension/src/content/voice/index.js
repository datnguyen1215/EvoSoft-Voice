import ui from './ui';
import create from './create';
import events from '@src/lib/events';

let recogniztion = null;
const emitter = events.create();

/**
 * Start listening
 */
const onEnded = () => {
  recogniztion.onend = null;
  recogniztion.onresult = null;
  recogniztion = null;
  console.log('listening ended');
  ui.remove();
};

/**
 * On transcript event
 * @param {SpeechRecognitionEvent} e
 */
const onResult = e => {
  const result = e.results[e.resultIndex];
  const transcript = result[0].transcript;

  console.log('transcript', transcript);
  emitter.emit('transcript', transcript);
};

/**
 * On error event
 * @param {SpeechRecognitionEvent} e
 */
const onError = e => {
  console.error('voice recognition error', e);
};

/**
 * Start listening
 * @returns {void}
 */
const listen = () => {
  if (recogniztion) return;

  recogniztion = create();
  recogniztion.onresult = onResult;
  recogniztion.onend = onEnded;
  recogniztion.onerror = onError;
  recogniztion.start();
};

/**
 * Stop listening
 * @returns {void}
 */
const stop = () => {
  if (!recogniztion) return;

  recogniztion.stop();
};

/**
 * Toggle the voice recognition.
 * @returns {void}
 */
const toggle = () => {
  if (recogniztion) {
    stop();
    return;
  }

  listen();
  ui.display();
};

export default { ui, listen, stop, toggle, ...emitter };
