import create from './create';
import element from './element';
import update from './update';
import emitter from './emitter';

const insertTextBoxRole = (el, text) => {
  console.log('insertTextBoxRole', el, text);
  // make sure el has role="textbox"
  if (el.getAttribute('role') !== 'textbox') return;

  console.log('insertTextBoxRole', el, text);

  const fireEvents = () => {
    // Input event
    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: false
    });
    el.dispatchEvent(inputEvent);

    // Change event (usually for form inputs)
    const changeEvent = new Event('change', {
      bubbles: true,
      cancelable: true
    });
    el.dispatchEvent(changeEvent);

    // Keyboard events (simulating the typing action)
    const keydownEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      charCode: 0
    });
    el.dispatchEvent(keydownEvent);

    const keyupEvent = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      charCode: 0
    });
    el.dispatchEvent(keyupEvent);
  };

  // update the content of the textbox with the new text at the cursor
  const textNode = document.createTextNode(text);
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  range.deleteContents();
  range.insertNode(textNode);
  range.setStartAfter(textNode);
  range.setEndAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(range);

  fireEvents();

  // After inserting text, collapse the range to the end point
  selection.collapseToEnd();

  // const selection = window.getSelection();
  // const range = selection.getRangeAt(0);
  // const newText = document.createTextNode(text);
  // range.insertNode(newText);
  // range.setStartAfter(newText);
  // selection.removeAllRanges();
  // selection.addRange(range);
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

  // check whether it's a text field, also check for textareas`
  if (el.tagName !== 'TEXTAREA' && el.tagName !== 'INPUT') {
    insertTextBoxRole(el, text);
    return;
  }

  insertTextField(el, text);
};

const init = () => {
  create();
  emitter.on('completed', previewCompleted);
};

export default { create, element, update, ...emitter, init };
