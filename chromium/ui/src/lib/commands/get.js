const get = () => {
  return [
    {
      command: 'period',
      text: '.',
      description: `Replace "period" with "."`
    },
    {
      command: 'comma',
      text: ',',
      description: `Replace "comma" with ","`
    },
    {
      command: 'semicolon',
      text: ';',
      description: `Replace "semicolon" with ";"`
    },
    {
      command: 'colon',
      text: ':',
      description: `Replace "colon" with ":"`
    },
    {
      command: 'question mark',
      text: '?',
      description: `Replace "question mark" with "?"`
    },
    {
      command: 'exclamation mark',
      text: '!',
      description: `Replace "exclamation mark" with "!"`
    },
    {
      command: 'open parenthesis',
      text: '(',
      description: `Replace "open parenthesis" with "("`
    },
    {
      command: 'close parenthesis',
      text: ')',
      description: `Replace "close parenthesis" with ")"`
    }
  ];
};

export default get;
