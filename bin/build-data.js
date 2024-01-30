const fs = require('fs');
const list = `https://api.github.com/repos/mdn/content/contents/files/en-us/web/javascript/reference/global_objects/array`;
const examples = `https://api.github.com/repos/mdn/interactive-examples/contents/live-examples/js-examples/array`;

function getFenced(code) {
  return code.match(/```.+\n([\s\S]*?)```/)[1].trim();
}

function parseMarkdownToObject(lines) {
  const obj = {};
  let currentHeading = null;
  let content = [];

  lines.forEach((line) => {
    // Check if the line is a heading
    if (/^## /.test(line)) {
      // Save previous heading and its content
      if (currentHeading) {
        obj[currentHeading] = content.join('\n').trim();
      }
      currentHeading = line.substring(3).trim().toLowerCase();
      content = [];
    } else if (currentHeading) {
      content.push(line);
    }
  });

  // Save the last heading and its content
  if (currentHeading) {
    obj[currentHeading] = content.join('\n').trim();
  }

  return obj;
}

/**
 *
 * @param {string[]} lines
 * @param {string} start
 * @param {string[]} end
 * @returns
 */
function find(lines, start, end) {
  if (!Array.isArray(end)) {
    end = [end];
  }

  let i1 = lines.findIndex((_) => _.startsWith(start));
  let i2 = lines.findIndex((_, i) => {
    if (i > i1) {
      return end.some((_) => _.startsWith(_));
    }
  });

  return lines
    .slice(i1 + 1, i2)
    .join('\n')
    .trim();
}

function cleanJSXReference(lines) {
  return lines
    .split('\n')
    .map((_) => {
      return _.replace(/{{jsxref\((.+?)\)}}/g, (match, p1) => {
        p1 = p1.replace(/["\s]/g, '');
        const [a, b] = p1.split(',');
        if (b) {
          return `[\`${b}\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${a})`;
        }
        return `[\`${a}\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${a})`;
      });
    })
    .join('\n');
}

function processSource(fileName) {
  const text = fs.readFileSync(__dirname + `/source/${fileName}.md`, 'utf-8');
  const lines = text.split('\n');

  const title = lines[1].replace(/^title: /, '');
  const slug = lines[2].replace(/^slug: /, '');

  lines.splice(0, 8, '## Synopsis');
  const res = parseMarkdownToObject(lines);

  debugger;

  const url = `https://developer.mozilla.org/en-US/docs/${slug}`;

  let syntax = getFenced(res.syntax).split('\n').slice(-1)[0].trim();

  if (!syntax.startsWith('Array.prototype.')) {
    syntax = `Array.prototype.${syntax.replace(
      new RegExp(`^.*?\.${fileName}`),
      fileName
    )}`;
  }

  let synopsis = cleanJSXReference(res.synopsis);
  let example = '';

  if (synopsis.includes('{{EmbedInteractiveExample')) {
    synopsis = synopsis
      .replace(/{{EmbedInteractiveExample\("(.+?)"\)}}/g, (match, p1) => {
        const filename = p1.split('/').pop().split('.').shift();

        example = fs.readFileSync(
          __dirname + `/examples/${filename}.js`,
          'utf-8'
        );

        return '';
      })
      .trim();
  } else {
    // get it from the original page
    example = res.examples.match(/```js\n([\s\S]*?)```/)[1].trim();
  }

  return {
    title,
    url,
    name: fileName,
    synopsis: synopsis.split('\n\n').shift(),
    syntax: cleanJSXReference(syntax),
    example,
  };
}

async function collectSource() {
  const res = await fetch(list).then((res) => res.json());

  const methods = res
    .filter((_) => !_.name.startsWith('@@'))
    .map((_) => {
      return { name: _.name, url: convertUrlToReturn(_.html_url) };
    });

  for (const method of methods) {
    const res = await fetch(method.url);
    const text = await res.text();
    fs.writeFileSync(__dirname + `/source/${method.name}.md`, text);
  }
}

const convertUrlToReturn = (url) => {
  const parts = url.split('/');
  const fileName = parts[parts.length - 1];
  const returnUrl = `https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/javascript/reference/global_objects/array/${fileName}/index.md`;
  return returnUrl;
};

async function collectExamples() {
  const examplesRes = await fetch(examples);
  const examplesJson = await examplesRes.json();

  const res = examplesJson
    .map((_) => ({
      filename: _.name,
      url: _.download_url,
    }))
    .filter((_) => _.filename.endsWith('.js'));

  for (const url of res) {
    const res = await fetch(url.url);
    const text = await res.text();
    fs.writeFileSync(__dirname + `/examples/${url.filename}`, text);
  }
}

function buildData() {
  const skip = ['constructor'];

  const arrayMethods = Object.getOwnPropertyNames(Array.prototype).filter(
    (_) => typeof [][_] === 'function' && !skip.includes(_)
  );
  console.log(JSON.stringify(arrayMethods.map(processSource), null, 2));
}

// collectSource();
// collectExamples();
// console.log(processSource('find'));
buildData();
