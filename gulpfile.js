const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const purgecss = require('gulp-purgecss');
const { watch, series } = require('gulp');

function clean() {
    // Cannot delete entire '_site', because git repo lives there.
    // Alternative is to wrap '_site' in new folder for repo and spoof index.html
    // or find another github pages workaround (gh-pages expects index.html in root)
    build = ['_site/css', '_site/img', '_site/js','_site/posts', '_site/index.html']
    return del(build)
}

function style(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/scss'))
}

function purge(){
    return gulp.src('src/scss/main.css')
        .pipe(purgecss({
            content: ['src/**/*.html', 'src/**/*.njk', 'src/**/*.js'],
            whitelistPatterns: [/tooltip/, /table/],
            whitelistPatternsChildren: [/tooltip/, /table/]
        }))
        .pipe(gulp.dest('src/scss/purged'))
}

function defaultTask(cb){
    watch('src/**/*.scss', series(style, purge));
}

exports.clean = clean
exports.style = style
exports.purge = purge
exports.default = defaultTask