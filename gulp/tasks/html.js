import gulp from 'gulp';
import gutil from 'gulp-util';
import replace from 'gulp-replace';
import minifyHTML from 'gulp-minify-html';
import minifyInline from 'gulp-minify-inline';
import pkg from '../../package.json';

gulp.task('html', () => {

	let manifest = {};

	// use versioned assets if going to production, otherwise use default paths
	if (!global.isWatching) {
		try {
			manifest = require('../../rev-manifest.json');
		} catch (e) {
			gutil.log('\'' + gutil.colors.cyan('html') + '\' - no manifest, using defaults');
		}
	}

	return gulp.src(`${pkg.folders.src}/html/*.html`)
		.pipe(replace(/\{{ ([^{}]*) \}}/g, (a, b) => {
			const r = manifest[b];
			return r && (typeof r === 'string' || typeof r === 'number') ? r : b;
		}))
		.pipe(global.isWatching ? gutil.noop() : minifyInline())
		.pipe(global.isWatching ? gutil.noop() : minifyHTML())
		.pipe(gulp.dest(pkg.folders.dest));

});