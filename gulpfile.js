var gulp = require('gulp');
var browserify = require('gulp-browserify');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var gutil = require('gulp-util');

gulp.task('dev', ['scripts', 'scss'], function () {
    nodemon({ script: 'app.js', options: '-e sources/ public/'});
    gulp.watch('sources/js/*.js', ['scripts']);
    gulp.watch('sources/scss/*.scss', ['scss']);
})

gulp.task('scripts', function () {
    return gulp.src('sources/js/main.js')
        .pipe(browserify({bare : true, debug : false }))
        .on('error', gutil.log)
        .on('error', gutil.beep)
        .pipe(gulp.dest('./public/js'));
});

gulp.task('scss', function() {
    return gulp.src('sources/scss/main.scss')
        .pipe(sass())
            .on('error', gutil.log)
            .on('error', gutil.beep)
        .pipe(gulp.dest('public/css'));
});
