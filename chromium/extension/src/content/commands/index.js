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
  if (listened) return;

  listened = true;

  console.log('listening for commands');

  document.addEventListener('keydown', e => {
    console.log('keydown', e);
    const ctrl = e.ctrlKey;
    const alt = e.altKey;
    const { key } = e;
    let hotkey = '';

    if (ctrl) hotkey += 'Ctrl+';
    if (alt) hotkey += 'Alt+';
    hotkey += key?.toLocaleUpperCase();

    console.log('hotkey', hotkey);

    const command = Object.keys(commands).find(
      command => commands[command].hotkey === hotkey
    );

    if (!command) return;

    emitter.emit('command', { command });
  });
};

export default { listen, ...emitter };
