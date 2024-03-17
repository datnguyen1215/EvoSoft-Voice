import dom from './dom';
import chromium from './chromium';

const create = () => {
  if (!chrome.runtime) return dom.create();

  return chromium.create();
};

export default { dom, chromium, create };
