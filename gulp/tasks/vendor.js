import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import pkg from '../../package.json';

gulp.task('vendor', () => {

	const source = [];
	for (let key in pkg.vendor) {
		source.push(pkg.folders.vendor +"/"+ pkg.vendor[key]);
	}

	return gulp.src(source)
		.pipe(concat('v.js'))
		.pipe(global.isWatching ? gutil.noop() : uglify())
		.pipe(gulp.dest(`${pkg.folders.dest}/js/vendor/`));
		
});