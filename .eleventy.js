module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css/styles.css");
  eleventyConfig.addPassthroughCopy("src/js/learning.js");

  eleventyConfig.addCollection("pages", function (api) {
    var pages = api.getFilteredByTag("pages").sort((a, b) => {
      return b.page.date - a.page.date;
    });
    return pages.slice(pages.lenght - 2, 2);
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
