const event = (service, payload) => {
  document.dispatchEvent(
    new CustomEvent('evosoft.voice.event', {
      detail: { service, payload }
    })
  );
};

export default event;
