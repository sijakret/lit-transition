
export function quickDiv():HTMLElement {
  const div = document.createElement('div');
  document.body.appendChild(div);
  div.remove = () => {
    document.body.removeChild(div);
  }
  return div;
}