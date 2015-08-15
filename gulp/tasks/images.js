import changed from 'gulp-changed';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pkg from '../../package.json';

gulp.task('images', () => {
  const dest = `${pkg.folders.dest}/static/img`;

  return gulp.src(`${pkg.folders.src}/img/**`)
    .pipe(changed(dest))
    .pipe(imagemin())
    .pipe(gulp.dest(dest));
});
