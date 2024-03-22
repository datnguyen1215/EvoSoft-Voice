/**
 * Create a new preview div and insert to the DOM, but hide it.
 * @returns {HTMLDivElement}
 */
const create = () => {
  console.log('creating preview');
  const outerDiv = document.createElement('div');
  outerDiv.id = 'evosoft-voice';

  const innerDiv = document.createElement('div');
  innerDiv.id = 'evosoft-voice-transcript';
  innerDiv.style.position = 'fixed';
  innerDiv.style.top = '20%';
  innerDiv.style.left = '0';
  innerDiv.style.right = '0';
  innerDiv.style.width = 'fit-content';
  innerDiv.style.margin = '0 auto';
  innerDiv.style.display = 'none';
  innerDiv.style.padding = '4px 5px 4px 5px';
  innerDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  innerDiv.style.color = 'white';
  innerDiv.style.fontSize = '20px';

  outerDiv.appendChild(innerDiv);
  document.body.appendChild(outerDiv);
  return outerDiv;
};

export default create;
