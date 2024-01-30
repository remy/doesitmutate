const markdownIt = require('markdown-it');
const methods = require('./methods.json');
const mutators = require('./mutators.json');

const markdown = markdownIt({
  html: true,
  linkify: true,
})
  .use(require('./src/markdown-it-base')('https://developer.mozilla.org'))
  .use(require('markdown-it-prism'));

module.exports = function (config) {
  config.addGlobalData('layout', 'base.njk');

  config.addPassthroughCopy('src/static', {
    filter: ['*', '*/*.*'],
  });

  config.addFilter('asCode', (s) => '```js\n' + s + '```');

  config.addFilter('markdown', (s) => {
    if (typeof s !== 'string') return;
    return markdown.render(s);
  });

  config.addCollection('methods', () => {
    return methods.map((method) => {
      method.mutates = mutators.includes(method.name);
      return method;
    });
  });

  let opts = {
    permalink: true,
    permalinkClass: 'direct-link',
    permalinkSymbol: '#',
  };

  return {
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
    },
  };
};
