const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const purgecss = require('gulp-purgecss');
const { watch, series } = require('gulp');

function clean() {
    //This will delete the _site directory which contains the git repo
    //including other needed files. Need to rework. Probably want
    //to wrap the _site file inside another file to hold the things
    //I dont want to delete on clean.
    // return del([ '_site' ])
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
            whitelistPatterns: [/tooltip/],
            whitelistPatternsChildren: [/tooltip/]
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