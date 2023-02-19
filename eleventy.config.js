const EleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const {EleventyHtmlBasePlugin} = require("@11ty/eleventy");
const fs = require('fs')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPassthroughCopy({"src/static/theme/favicon.ico": "/"});

  eleventyConfig.addFilter("truncateTitle", function(value) {
    /*  TODO: find a more elegant way to truncate our first names:
        Michael       -> M.
        Constanze von -> C. v.
        Claus-Peter   -> C.-P.
    */
    let textAsArray = value.split(" ");
    const lastName = textAsArray.pop();
    let firstName = textAsArray.join(" ");

    const truncatePattern = /^(?<FIRSTNAME1>[A-Z]?)[a-z]*(?<FIRSTNAMEDELIMITER>-)?(?<FIRSTNAME2>[A-Z]?)(\s)?(?<ADEL>v?)/g;
    const matches = [...firstName.matchAll(truncatePattern)];
    const nameProps = matches[0].groups

    const firstNameDelimiter = nameProps.FIRSTNAMEDELIMITER ? `${nameProps.FIRSTNAMEDELIMITER}` : "";
    const firstName2 = nameProps.FIRSTNAME2 ? `${nameProps.FIRSTNAME2}. ` : "";
    const adel = nameProps.ADEL ? ` ${nameProps.ADEL}. ` : "";
    return `${nameProps.FIRSTNAME1}.${firstNameDelimiter}${firstName2}${adel} ${lastName}`;
  });

  eleventyConfig.addShortcode("getDozentImg", function(dozentSlug, dozentName) {
    const path = `src/static/img/${dozentSlug}.jpg`;

    if (fs.existsSync(path)) {
      return `<img src="/static/img/${dozentSlug}.jpg" alt="${dozentName}">`
    } else {
      return ""
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    },
  }
}
