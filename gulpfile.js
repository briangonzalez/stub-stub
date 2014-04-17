
var gulp  = require('gulp');
var mocha = require('gulp-mocha');
var shell = require('gulp-shell');

gulp.task('test', function() {
    gulp.src('./test/**/*.js')
        .pipe(mocha({reporter: 'dot'}));
});

gulp.task('watch', function() {
  gulp.watch('./**/*.js', ['test']);
});

gulp.task('publish-module', shell.task([
  'npm publish ./'
]));