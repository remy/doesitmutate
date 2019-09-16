module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./site/img');
  eleventyConfig.addPassthroughCopy('./site/css');

  return {
    templateFormats: ['njk'],
    passthroughFileCopy: true,
    dir: {
      input: 'site',
    },
  };
};
