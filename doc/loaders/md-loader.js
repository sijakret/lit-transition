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
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

module.exports = function(source) {
  const options = getOptions(this);

  // script blocks
  if(options.block&&options.file) {
    const {title,markdown,blocks} = processMd(options.file);
    this.dependency(options.file);
    //return `export default () => 'sers'`;
    const {code,opts} = blocks[Number(options.block)];
    const codeOut = code.match(/\/\/\/run/) ? `
    ${code.replace(/\/\/\/run/, 'export function run(domNode) {')}
    }` : code
    return `
      ${codeOut}
      export const code = ${JSON.stringify(code)};
    `

  }

  // index + markdown
  if(options.folder) {
    const imports = [];
    // Apply some transformations to the source...
    const root = path.join(__dirname,'..',options.folder);
    const files = fs.readdirSync(path.join(root));
    const data = files.map(file => {
      const mdFile = path.join(root,file);
      this.dependency(mdFile);
      const {title, markdown, blocks, index} = processMd(mdFile);
  
      blocks.forEach(({opts},i) => 
        imports.push(`./doc/loaders/md-loader.js?file=${mdFile}&block=${i}&opts=${opts}!`)
      );
      return {
        file,
        title,
        index,
        markdown:  md.render(markdown)
      }
    })
  
    //
    return `
    export function load(id) {
      // generate import statements so chunks are generated
      // by webpack
      switch(id) {
        ${imports.map(i => `case '${i}': return import('${i}');`).join('\n')}
      }
    }
    export const index = ${ JSON.stringify(data) }
    `;
  }

  
}

function processMd(mdFile) {
  let markdown = fs.readFileSync(mdFile, 'utf8').split('\n');
  const title = markdown[0];
  markdown = markdown.slice(1).join('\n');
  const blocks = [];
  markdown = markdown.replace(/<script(.*)>([\s\S]*?)<\/script>/g,(match, opts, code) => {
    opts = opts.trim();
    blocks.push({code,opts});
    return `<doc-demo ${opts} chunk="${
      `./doc/loaders/md-loader.js?file=${mdFile}&block=${blocks.length-1}&opts=${opts}!`
    }"></doc-demo>`;
  });
  let {index,md} = toc(markdown);
  return {
    title,
    blocks,
    markdown: md,
    index
  };
}

function toc(md) {
  const index = [];
  console.log(md);
  md = md.replace(new RegExp('(#+) (.*)', 'ig'), (match, h, title) => {
    index.push(title)
    return `<a id="sec-${index.length-1}"></a>
${match}`;
  });
  return {
    index,
    md
  };
}