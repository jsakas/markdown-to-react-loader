const fm = require('front-matter');
const marked = require('marked');
const Prism = require('prismjs');
const renderer = new marked.Renderer();

const singleReplaceChars = {
  '\(': '&#40;',
  '\)': '&#41;',
  '\{': '&#123;',
  '\}': '&#125;',
}
const regexString = `[${Object.keys(singleReplaceChars).join('')}]`;
const regex = new RegExp(regexString, 'gm');

function replaceReact(string) {
  return string
    .replace(regex, m => singleReplaceChars[m])
    .replace(/class="/g, 'className="')
}

const reactSafe = (fn) => {
  return function () {
    let original = fn.apply(renderer, [...arguments]);
    let replaced = replaceReact(original);
    return replaced;
  }
}

function processCodeBlock (code, lang) {
  let className, highlighter, replaced;

  // users can easily type in any language they want,
  // we don't want the app to blow up in case of bad input.
  try {
    if (!lang) {
      className = '';
      highlighter = '';
    } else {
      require(`prismjs/components/prism-${lang}`);
      className = `language-${lang}`;
      highlighter = Prism.languages[lang];
    }
  } catch (e) {
    console.warn(`Could not find PrismJS language ${lang}`, e);
    className = '';
    highlighter = '';
  }

  try {
    const wrapped = Prism.highlight(code, highlighter);
    replaced = wrapped.replace(/\n/g, '<br />');
  } catch (e) {
    console.error(`Failed to highlight syntax for language ${lang}`);
    console.error(e);

    // fallback to the original input on error
    replaced = code;
  }

  return `
      <pre class="${className}">
        <code class="${className}">
         ${replaced}
        </code>
      </pre>
    `;
}

/**
 * Block level renderer methods
 * https://marked.js.org/#/USING_PRO.md#block-level-renderer-methods
 */
renderer.code = reactSafe(processCodeBlock);
renderer.blockquote = reactSafe(renderer.blockquote);
renderer.paragraph = reactSafe(renderer.paragraph);
renderer.heading = reactSafe(renderer.heading);
renderer.html = renderer.html;
renderer.hr = reactSafe(renderer.hr);
renderer.list = reactSafe(renderer.list);
renderer.listitem = reactSafe(renderer.listitem);
renderer.checkbox = reactSafe(renderer.checkbox);
renderer.paragraph = reactSafe(renderer.paragraph);
renderer.table = reactSafe(renderer.table);
renderer.tablerow = reactSafe(renderer.tablerow);
renderer.tablecell = reactSafe(renderer.tablecell);

/**
 * Inline level renderer methods
 * https://marked.js.org/#/USING_PRO.md#inline-level-renderer-methods
 */
renderer.strong = reactSafe(renderer.strong);
renderer.em = reactSafe(renderer.em);
renderer.codespan = reactSafe(renderer.codespan);
renderer.br = reactSafe(renderer.br);
renderer.del = reactSafe(renderer.del);
renderer.link = reactSafe(renderer.link);
renderer.image = reactSafe(renderer.image);
renderer.text = reactSafe(renderer.text);

function extraExports(extra) {
  let ret = '';
  for (var key in extra) {
    ret += `
      const ${key} = ${JSON.stringify(extra[key])};
      export { ${key} };
    `
  }

  return ret;
}

module.exports = function (source, map) {
  const parsed = fm(source);
  const attributes = parsed.attributes;
  const html = marked(parsed.body, {
    renderer: renderer,
    xhtml: true,
  });

  const extra = Object.keys(attributes)
    .filter(k => k !== 'imports')
    .reduce((acc, cur) => {
      acc[cur] = attributes[cur];
      return acc;
    }, {});

  const processed = `
    import React, { Fragment } from 'react';
    ${parsed.attributes.imports ? parsed.attributes.imports : ''}
    ${extraExports(extra)}
    const Markdown = () => (<Fragment>${html}</Fragment>);
    export default Markdown;
  `;

  return processed;
};
