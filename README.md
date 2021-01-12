# [blaircurrey.com](https://blaircurrey.com/)
## About
This repository holds the source and configuration files for my personal website, [blaircurrey.com](https://blaircurrey.com/), made with the [Eleventy static site generator](https://www.11ty.dev/). My repository for the Eleventy-generated files, which constitute the hosted website, can be found [here](https://github.com/BlairCurrey/blaircurrey.com).

## Development notes

### Startup:

<code>npm run start</code>

<code>gulp</code>

This starts the local server and watches for changes.

### CSS workflow
- main.scss imports entire bootstrap styling then custom styling is defined
- on save, main.scss is saved as main.css (assuming the style gulp task is watching)
- then main.css is purged of unused css according to the rules set in gulpfile and saved to ./purged/main.css (assuming the purge gulp task is watching)
- ./purged/main.css is copied to the output (assuming the eleventy npm script is watching)

Occasionally the CSS changes do not work as expected. Ensure that purge CSS is working as intended. Cleaning and restarting the services generally fixes any of these problems.

### Add Project
Projects are populated from `src/_data/projects.json` using the `src/_includes/projects.njk` template. A `NewProject` can be added by adding new object like to `projects.json`:

        {
            "title": "NewProject Name",
            "img": "/img/projects/NewProject.jpg",
            "githubLink": "https://github.com/BlairCurrey/NewProject",
            "demoLink": "",
            "otherLink": "",
            "otherLinkText": ""
        }

Use `"otherLink"` to link somewhere other than a github repo or demo, and using `"otherLinkText"` to set the display text for the link.

### Add Post

Posts are populated from markdown files in `src/posts/` using `src/_includes/_layouts/post.njk` (or whatever is defined in the `layout` header). Make a `NewPost` like:

        ---
        layout: _layouts/post.njk
        title: NewPost Title
        tags: [posts, NewPostTag1, NewPostTag2]
        ---

        This is the body of the post. Write the post in markdown here. 
        This will show as the excerpt for this post in the list of posts.
        <!-- excerpt --> 

        This part and everything after it will not be included as an excerpt 
        in the list of posts.

All posts need the `posts` tag so that they get displayed to the post list page. The other tags are optional. Excerpts can be defined as shown above or seperately in the header: 

        ---
        layout: _layouts/post.njk
        title: NewPost Title
        tags: [posts, NewPostTag1, NewPostTag2]
        excerpt: Excerpt defined in the header
        ---

Excerpts defined in the header take precedence over excerpts defined in the body of the post.
