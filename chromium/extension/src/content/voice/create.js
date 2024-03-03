/**
 * Create a new SpeechRecognition instance
 * @param {string} lang
 * @returns {SpeechRecognition}
 */
const create = (lang = 'en-US') => {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();
  recognition.lang = lang;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.continuous = true;
  return recognition;
};

export default create;
