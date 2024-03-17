(async () => {
  console.log('worker');
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('message', message);
  });
})();
