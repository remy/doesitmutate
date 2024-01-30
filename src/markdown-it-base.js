module.exports = (baseUrl) => {
  return (md) => {
    md.core.ruler.after('inline', 'replace-link', function (state) {
      state.tokens.forEach(function (blockToken) {
        if (blockToken.type === 'inline' && blockToken.children) {
          blockToken.children.forEach(function (token) {
            const type = token.type;
            if (type === 'link_open') {
              const hrefIndex = token.attrIndex('href');
              const href = token.attrs[hrefIndex][1];
              if (
                !href.startsWith('http://') &&
                !href.startsWith('https://') &&
                !href.startsWith('//')
              ) {
                token.attrs[hrefIndex][1] = baseUrl + href;
              }
            }
          });
        }
      });
    });
  };
};
