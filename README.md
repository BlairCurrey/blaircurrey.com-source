This repository holds the source and configuration files for my personal website, [blaircurrey.com](https://blaircurrey.com/), made with the [Eleventy static site generator](https://www.11ty.dev/). My repository for the Eleventy-generated files, which constitute the hosted website, can be found [here](https://github.com/BlairCurrey/blaircurrey.com).

### Development notes

Startup commands:

<code>npm run start</code>

<code>gulp</code>

This starts the local server and watches for changes.

Occasionally the CSS changes do not work as expected. First, ensure that purge CSS is working as intended. If that's not the problem, it's important to understand the flow of CSS.

- main.scss imports entire bootstrap styling then custom styling is defined
- on save, main.scss is saved as main.css (assuming the style gulp task is watching)
- then main.css is purged of unused css according to the rules set in gulpfile and saved to ./purged/main.css (assuming the purge gulp task is watching)
- ./purged/main.css is copied to the output (assuming the eleventy npm script is watching)

Cleaning and restarting the services generally fixes any of these problems.
