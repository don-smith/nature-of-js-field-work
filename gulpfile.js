var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['serve']);

gulp.task('build', function() {
  return gulp.src([
      '**/*.js',
      '!gulpfile.js',
      '!node_modules{,/**}',
      '!dist{,/**}'
    ], { base: '.' })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('test', ['build'], function() {
  gulp.src('dist/tests/*_test.js')
    .pipe(mocha());

    // Uncomment for more nyancat
    //.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('serve', ['build'], function() {
  nodemon({
    script: 'dist/server.js',
    ext: 'js',
    ignore: 'dist'
  });
});
