const data = require('./array-methods.json');

module.exports = {
  exportPathMap: () => {
    const routes = data.reduce((acc, curr) => {
      const method = curr.method.replace(/\(\)/g, '').toLowerCase();
      acc[`/${method}`] = { page: '/', query: { method } };
      return acc;
    }, {
      '/clean': { page: '/', query: { filter: 'clean' }},
      '/mutates': { page: '/', query: { filter: 'mutates' }}
    });
    return {
      '/': { page: '/' },
      ...routes,
    };
  },
};
