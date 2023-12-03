var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');

gulp.task('build', function () {
    return browserify({
        basedir: './src',
        debug: false,
        entries: ['SnakeTheGame.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('publish-linux', function () {
    return gulp.src(['./**/*.{html,js,css}', '!node_modules/**', '!gulpfile.js'])
        .pipe(gulp.dest('/var/www/snake'));
});

gulp.task('copy', function() {
    return gulp.src(['./**/*.{html,js,css}', '!node_modules/**', '!gulpfile.js'])
        .pipe(gulp.dest('./_site'));
});

gulp.task('default', gulp.series('build', 'copy'));