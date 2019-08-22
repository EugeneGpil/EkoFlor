"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');

//style paths
var sassFiles = 'src/sass/*.scss',
    cssDest = 'public/css/',
    cssFiles = 'src/css/*.css'

gulp.task('styles', () => {
    return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

gulp.task('watch-sass',function() {
    gulp.watch(sassFiles,gulp.series('styles'));
});

function minifyCss() {
    return gulp.src(cssFiles)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(cssDest));
}

gulp.task('minify-css', () => { return minifyCss() });

const minify = require('gulp-minify');
const jsSrc = 'src/js/*.js';
const jsDest = 'public/js/';
 
gulp.task('js', () => {
    return gulp.src([jsSrc])
        .pipe(gulp.dest(jsDest))
});

gulp.task('watch-js',function() {
    gulp.watch(jsSrc,gulp.series('js'));
});

gulp.task('watch',function() {
    gulp.watch(sassFiles,gulp.series('styles'));
    gulp.watch(jsSrc,gulp.series('js'));
});

gulp.task('production', () => {
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(cssDest));
    gulp.src([jsSrc])
        .pipe(minify({noSource: true, ext:{min:'.js'}}))
        .pipe(gulp.dest(jsDest))
    return minifyCss();
});