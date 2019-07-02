const fm = require('front-matter');
const marked = require('marked');
const Prism = require('prismjs');
const renderer = new marked.Renderer();


renderer.code = function(code, lang) {
  let className, highlighter, replaced;

  // users can easily type in any language they want,
  // we don't want the app to blow up in case of bad input.
  try {
    require(`prismjs/components/prism-${lang}`);
    className = `language-${lang}`;
    highlighter = Prism.languages[lang];
  } catch (e) {
    console.warn(`Could not find PrismJS language ${lang}`);
    className = '';
    highlighter = '';
  }

  try {
    const wrapped = Prism.highlight(code,  highlighter);
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
};

const extraExports = extra => {
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

  const replaced = html
    .replace(/class="/g, 'className="')
    .replace(/\(/g, '&#40;')
    .replace(/\)/g, '&#41;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');

  const processed = `
    import React, { Fragment } from 'react';
    ${parsed.attributes.imports ? parsed.attributes.imports : ''}
    ${extraExports(extra)}
    const Markdown = () => (<Fragment>${replaced}</Fragment>);
    export default Markdown;
  `;

  return processed;
};
