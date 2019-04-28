const methods = require('./array-methods.json');
const fetch = require('isomorphic-unfetch');

// one that's missing
const toSource =
  "<pre><code>var alpha = new Array('a', 'b', 'c');\n\nalpha.toSource();\n//returns ['a', 'b', 'c']";

const API =
  'https://raw.githubusercontent.com/mdn/interactive-examples/master/live-examples/js-examples/array/array-';

async function main() {
  const res = await Promise.all(
    methods.map(_ => {
      let method = _.method.replace(/\(\)/g, '').toLowerCase();
      if (method === 'reduceright') {
        method = 'reduce-right';
      }

      return fetch(`${API}${method}.html`)
        .then(res => {
          if (res.status === 404) {
            if (method === 'tosource') {
              return toSource;
            }
            return 'Not available';
          }

          return res.text();
        })
        .then(example => {
          return { ..._, example };
        });
    })
  );

  console.log(JSON.stringify(res, 0, 2));
}

main();
