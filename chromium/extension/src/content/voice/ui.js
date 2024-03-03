let element = null;

/**
 * Display the voice recognition UI.
 * @returns {void}
 */
const display = () => {
  if (element) return;

  console.log('displaying voice recognition UI');

  element = document.createElement('div');
  element.style.position = 'fixed';
  element.style.top = '0';
  element.style.right = '0';
  element.style.width = '100%';
  element.style.height = '100%';
  element.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  element.style.display = 'flex';
  element.style.alignItems = 'center';
  element.style.justifyContent = 'center';
  element.style.zIndex = '9999';
  element.style.fontSize = '2em';
  element.style.color = 'white';
  element.textContent = 'Voice recognition is active';

  document.body.appendChild(element);
};

/**
 * Remove the voice recognition UI.
 * @returns {void}
 */
const remove = () => {
  if (!element) return;

  console.log('removing voice recognition UI');

  element.remove();
  element = null;
};

/**
 * Toggle the voice recognition UI.
 * @returns {void}
 */
const toggle = () => {
  if (element) {
    remove();
    return;
  }

  display();
};

export default { display, remove, toggle };
