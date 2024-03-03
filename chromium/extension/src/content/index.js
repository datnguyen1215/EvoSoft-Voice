import commands from './commands';
import voice from './voice';

/**
 * Triggered when a command is received.
 * @param {Command} command
 */
const onCommand = command => {
  console.log('command received', command);

  switch (command.name) {
    case 'voice':
      voice.ui.toggle();
      break;
  }
};

(() => {
  commands.on('command', onCommand);

  commands.listen();

  console.log('content script loaded');
})();
