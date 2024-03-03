import commands from './commands';

(() => {
  console.log(commands);
  commands.listen();

  commands.on('command', command => {
    console.log('command activated', command);
  });

  console.log('content script loaded');
})();
