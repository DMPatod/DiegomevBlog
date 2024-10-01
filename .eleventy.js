const sass = require("sass");
const path = require("node:path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",

    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }

      let result = await sass.compileStringAsync(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });

      return async (data) => {
        return result.css;
      };
    },
  });

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
