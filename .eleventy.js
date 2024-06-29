module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css/styles.css");

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
