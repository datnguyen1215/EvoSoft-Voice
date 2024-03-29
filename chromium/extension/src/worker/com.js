import com from '@src/core/com';

const listen = name => {
  const chromium = com.chromium.create();

  const getTab = async () => {
    const localStorage = await chrome.storage.local.get(name);

    if (!localStorage[name]) return;

    const { tab } = localStorage[name];

    return tab;
  };

  const onChromiumRequest = async (payload, respond, sender) => {
    const { type, data = {} } = payload;

    switch (type) {
      case 'evosoft.loaded':
        if (data.name !== name) return;

        await chrome.storage.local.set({
          [name]: { tab: { id: sender.tab.id } }
        });

        chrome.tabs.onRemoved.addListener(onTabRemoved);
        chromium.emit('opened', { name });
        respond();
        break;

      default:
        const tab = await getTab();

        if (!tab || tab.id !== sender.tab.id) return;

        chromium.emit('request', payload, respond);
    }
  };

  const onChromiumEvent = async (payload, sender) => {
    const tab = await getTab();

    if (!tab || tab.id !== sender.tab.id) return;

    chromium.emit('event', payload);
  };

  const onTabRemoved = async tabId => {
    const tab = await getTab();

    if (!tab || tab.id !== tabId) return;

    await chrome.storage.local.remove(name);
    chrome.tabs.onRemoved.removeListener(onTabRemoved);

    chromium.emit('closed', { name });
  };

  chromium.listen();
  chromium.on('request', onChromiumRequest);
  chromium.on('event', onChromiumEvent);

  return chromium;
};

export default { listen };
