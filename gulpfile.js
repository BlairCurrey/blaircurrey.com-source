const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const purgecss = require('gulp-purgecss');
const { watch, series } = require('gulp');

function clean() {
    return del([ '_site' ])
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