import create from './create';
import element from './element';
import update from './update';
import emitter from './emitter';

const previewCompleted = text => {
  // send input to currently focused element
  const el = document.activeElement;
  // get current caret position
  const start = el.selectionStart;
  const end = el.selectionEnd;
  // insert text
  const value = el.value;
  const before = value.substring(0, start);
  const after = value.substring(end);
  const updated = before + text + after;
  // update input value
  el.value = updated;

  // update carret after text
  const caret = start + text.length;
  if (typeof el.setSelectionRange === 'function')
    el.setSelectionRange(caret, caret);
};

const init = () => {
  preview.create();

  preview.on('completed', previewCompleted);
};

export default { create, element, update, ...emitter };
