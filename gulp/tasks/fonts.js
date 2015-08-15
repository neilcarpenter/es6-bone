import gulp from 'gulp';
import pkg from '../../package.json';

gulp.task('fonts', () => {

    const dest = `${pkg.folders.dest}/fonts`;

    return gulp.src(`${pkg.folders.src}/fonts/**`)
        .pipe(gulp.dest(dest));

});
