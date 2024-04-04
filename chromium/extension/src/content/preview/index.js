import create from './create';
import element from './element';
import update from './update';
import emitter from './emitter';

const insertContentEditable = (el, text) => {
  console.log('insertContentEditable', el, text);

  // check if el has any children
  if (el.childNodes.length === 0) {
    insertUsingTextNode(el, text);
    return;
  }

  insertUsingClipboardEvent(el, text);
};

const insertUsingTextNode = (el, text) => {
  console.log('insertUsingTextNode', el, text);

  // create a text node with the text
  const textNode = document.createTextNode(text);

  // get the current selection
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  // insert the text node at the current selection
  range.deleteContents();
  range.insertNode(textNode);
  range.setStartAfter(textNode);
  range.setEndAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(range);
};

const insertUsingClipboardEvent = (el, text) => {
  console.log('insertUsingClipboardEvent', el, text);

  const clipboardData = new DataTransfer();
  clipboardData.setData('text/plain', text);

  const clipboardEvent = new ClipboardEvent('paste', {
    clipboardData,
    bubbles: true,
    cancelable: true
  });

  el.dispatchEvent(clipboardEvent);
};

const insertTextField = (el, text) => {
  console.log('insertTextField', el, text);
  // get current caret position
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const value = el.value;

  if (value === undefined || value === null) return;

  const before = value.substring(0, start);
  const after = value.substring(end);
  const updated = before + text + after;
  // update input value
  el.value = updated;

  // update carret after text
  const caret = start + text.length;
  if (typeof el.setSelectionRange === 'function')
    el.setSelectionRange(caret, caret);

  const inputEvent = new Event('input', { bubbles: true, cancelable: true });
  el.dispatchEvent(inputEvent);
  const changeEvent = new Event('change', {
    bubbles: true,
    cancelable: true
  });
  el.dispatchEvent(changeEvent);
};

const previewCompleted = text => {
  // send input to currently focused element
  const el = document.activeElement;
  console.log('previewCompleted', el, text);

  // check whether contenteditable
  if (el.isContentEditable) {
    insertContentEditable(el, text);
    return;
  }

  // check whether input or textarea
  if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    insertTextField(el, text);
    return;
  }
};

const init = () => {
  create();
  emitter.on('completed', previewCompleted);
};

export default { create, element, update, ...emitter, init };
