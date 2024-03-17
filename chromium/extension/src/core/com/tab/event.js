const event = async (tab, payload) => {
  await chrome.tabs.sendMessage(tab.id, { type: 'evosoft.voice.event', payload });
};

export default event;
