const event = payload => {
  chrome.runtime.sendMessage({ type: 'evosoft.voice.event', payload });
};

export default event;
