const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
// const CleanCSS = require("clean-css");

module.exports = (function(eleventyConfig) {

    //Set additional files to copy over to output.
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy({ "src/scss/purged/main.css": "css/main.css" });
    eleventyConfig.addPassthroughCopy("src/img");

    //Add filters
    // eleventyConfig.addFilter("cssmin", function(code) {
    //     return new CleanCSS({}).minify(code).styles;
    //   });
    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('MM/dd/yyyy');
    });
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LLL-dd');
    });
    eleventyConfig.addFilter("sortByOrder", (values) => {
        let vals = [...values];     // this *seems* to prevent collection mutation...
        return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
    });
    eleventyConfig.addFilter('markdown', function(value) {
        let markdown = require('markdown-it')({
            html: true
        });
        return markdown.render(String(value));
    });

    //Parsing options
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        // Optional, default is "---"
        excerpt_separator: "<!-- excerpt -->"
    });

    //Template Engines
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    });
    eleventyConfig.setLibrary("md", markdownLibrary);

    return {

        dir: {
            input: "src",
            output: "_site",
            include: "_includes",
            layout: "_layouts",
            data: "_data"
        },
    
        templateFormats: ["html", "njk", "md"]
    };
});
