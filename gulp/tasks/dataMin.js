import gulp from 'gulp';
import prettyData from 'gulp-pretty-data';
import pkg from '../../package.json';

gulp.task('dataMin', () => {
  gulp.src(`${pkg.folders.src}/data/**/*.{xml,json}`)
    .pipe(prettyData({type: 'minify', preserveComments: false}))
    .pipe(gulp.dest(pkg.folders.dest+'/data'))
});