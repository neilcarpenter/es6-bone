import gulp from 'gulp';
import compass from 'gulp-compass';
import prefix from 'gulp-autoprefixer';
import minifyCSS from 'gulp-minify-css';
import cmq from 'gulp-combine-media-queries';
import gutil from 'gulp-util';
import handleErrors from '../util/handleErrors';
import pkg from '../../package.json';

gulp.task('sass', ['images'], () => {

	return gulp.src(`${pkg.folders.src}/sass/main.scss`)
		.pipe(compass({
            css   : `${pkg.folders.dest}/css`,
            sass  : `${pkg.folders.src}/sass/`,
            image : `${pkg.folders.dest}/static/img/`
        }))
		.on('error', handleErrors)
		.pipe(prefix("ie >= 8", "ff >= 3", "safari >= 4", "opera >= 12", "chrome >= 4"))
		.pipe(global.isWatching ? gutil.noop() : cmq())
		.pipe(global.isWatching ? gutil.noop() : minifyCSS())
		.pipe(gulp.dest(`${pkg.folders.dest}/css`));

});
