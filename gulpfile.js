var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['serve']);

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build', ['clean'], function() {
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
  gulp.src('dist/tests/**/*_test.js')
    .pipe(mocha({reporter: 'progress'}))
    .once('error', function () {
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
});

gulp.task('serve', ['build'], function() {
  nodemon({
    script: 'dist/server.js',
    delay: 10,
    ignore: ['dist/*'],
    tasks: ['test']
  });
});
