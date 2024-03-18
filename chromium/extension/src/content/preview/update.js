import element from './element';
import emitter from './emitter';
import wait from '@src/core/wait';

const update = async options => {
  console.log('updating preview', options);
  const { text, final } = options;
  const el = element();

  if (el.style.display === 'none') emitter.emit('displayed');

  el.innerText = text;
  el.style.display = 'block';

  if (final) {
    await wait(1000);
    el.style.display = 'none';
    emitter.emit('completed', text);
    return;
  }
};

export default update;
