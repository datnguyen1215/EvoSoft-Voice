/**
 * @typedef {object} EventEmitter
 * @property {function} on - Add an event listener.
 * @property {function} off - Remove an event listener.
 * @property {function} emit - Emit an event.
 * @property {function} removeEventListener - Remove all event listeners for a given event.
 */

/**
 * Create an event emitter.
 * @returns {EventEmitter} - An object with the following methods:
 */
const create = () => {
  const events = {};

  const on = (name, fn) => {
    events[name] = events[name] || [];
    events[name].push(fn);
  };

  const emit = (name, data) => {
    const func = events[name] || [];
    func.forEach(fn => fn(data));
  };

  const off = (name, fn) => {
    const func = events[name] || [];
    events[name] = func.filter(f => f !== fn);
  };

  const removeEventListener = name => {
    delete events[name];
  };

  return {
    on,
    off,
    emit,
    removeEventListener
  };
};

export default create;
