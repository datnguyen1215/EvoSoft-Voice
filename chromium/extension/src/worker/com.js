import com from '@src/core/com';
import events from '@src/core/events';

const listen = name => {
  const emitter = events.create();
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
        emitter.emit('opened', { name });
        respond();
        break;

      default:
        const tab = await getTab();

        if (!tab || tab.id !== sender.tab.id) return;

        emitter.emit('request', payload, respond);
    }
  };

  const onChromiumEvent = async (payload, sender) => {
    const tab = await getTab();

    if (!tab || tab.id !== sender.tab.id) return;

    emitter.emit('event', payload);
  };

  const onTabRemoved = async tabId => {
    const tab = await getTab();

    if (!tab || tab.id !== tabId) return;

    await chrome.storage.local.remove(name);
    chrome.tabs.onRemoved.removeListener(onTabRemoved);

    emitter.emit('closed', { name });
  };

  chromium.listen();
  chromium.on('request', onChromiumRequest);
  chromium.on('event', onChromiumEvent);

  return { ...chromium, ...emitter };
};

export default { listen };
