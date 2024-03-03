import events from '../../lib/events';

const commands = {
  voice: {
    name: 'voice',
    description: 'Toggle voice commands.',
    hotkey: 'Alt+V'
  }
};

const emitter = events.create();

let listened = false;

const listen = () => {
  listened = true;

  if (listened) return;

  console.log('listening for commands');

  document.addEventListener('keydown', e => {
    const ctrl = e.ctrlKey;
    const alt = e.altKey;
    const { key } = e;
    let hotkey = '';

    if (ctrl) hotkey += 'Ctrl+';
    if (alt) hotkey += 'Alt+';
    hotkey += key;

    const command = Object.keys(commands).find(
      command => commands[command].hotkey === hotkey
    );

    if (!command) return;

    emitter.emit('command', { command });
  });
};

export default { listen, ...emitter };
