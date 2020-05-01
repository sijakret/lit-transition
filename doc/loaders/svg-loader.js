module.exports = function(source) {
  return `
  import {svg} from 'lit-html';
  const s = svg\`${source}\`;
  export default s;
  `
}