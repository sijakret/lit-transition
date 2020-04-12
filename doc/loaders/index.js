const { getOptions } = require('loader-utils');
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');

const md = new MarkdownIt({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="highlight"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="highlight"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

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
    // markdown = markdown.map(l => {
    //   const m = line.match(/CODE:(.*)/);
    //   if(m) {
    //     return require('js')
    //   }
    // })
    return {
      file,
      title,
      data: md.render(markdown.slice(1).join('\n'))
    }
  })
  return `export default ${ JSON.stringify(data) }`;
}