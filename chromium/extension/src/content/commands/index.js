import events from '../../core/events';

const commands = [
  {
    name: 'voice',
    description: 'Toggle voice commands.',
    hotkey: 'Alt+V'
  }
];

const emitter = events.create();

let listened = false;

/**
 * Handle keydown events.
 * @param {KeyboardEvent} e
 * @returns {void}
 */
const onKeydown = e => {
  const ctrl = e.ctrlKey;
  const alt = e.altKey;
  const { key } = e;
  let hotkey = '';

  if (ctrl) hotkey += 'Ctrl+';
  if (alt) hotkey += 'Alt+';
  hotkey += key?.toLocaleUpperCase();

  const command = commands.find(c => c.hotkey === hotkey);

  if (!command) return;

  emitter.emit('command', command);
};

/**
 * Listen to commands.
 * @returns {void}
 */
const listen = () => {
  if (listened) return;

  listened = true;

  console.log('listening for commands');

  document.addEventListener('keydown', onKeydown);
};

/**
 * Stop listening to commands.
 * @returns {void}
 */
const stop = () => {
  if (!listened) return;

  listened = false;

  console.log('stopped listening for commands');

  document.removeEventListener('keydown', onKeydown);
};

export default { listen, stop, ...emitter };
