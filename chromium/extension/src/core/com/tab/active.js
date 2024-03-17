import sendEvent from './event';
import sendRequest from './request';

const get = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
};

const event = async payload => {
  const tab = await get();
  console.log('tab', tab);

  if (!tab) return;

  return await sendEvent(tab, payload);
};

const request = async payload => {
  const tab = await get();

  if (!tab) return;

  return await sendRequest(tab, payload);
};

export default { get, event, request };
