import get from './get';

const replace = text => {
  const commands = get();

  // go through every command
  for (const command of commands) {
    // replace command with text, but also remove the space before the command
    text = text.replace(new RegExp(`\\s?${command.command}`, 'g'), command.text);
  }

  return text;
};

export default replace;
