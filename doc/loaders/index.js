const { getOptions } = require('loader-utils');
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const markdownItHighlight = require('markdown-it-highlight').default;

const md = new MarkdownIt();
md.use(markdownItHighlight);

module.exports = function(source) {
  const options = getOptions(this);

  // Apply some transformations to the source...
  const root = path.join(__dirname,'..',options.folder);
  const files = fs.readdirSync(path.join(root));
  const data = files.map(file => {
    const mdFile = path.join(root,file);
    this.dependency(mdFile);
    const markdown = fs.readFileSync(mdFile, 'utf8').split('\n');
    const title = markdown[0]
    return {
      file,
      title,
      data: md.render(markdown.slice(1).join('\n'))
    }
  })
  console.log('data',data);
  return `export default ${ JSON.stringify(data) }`;
}