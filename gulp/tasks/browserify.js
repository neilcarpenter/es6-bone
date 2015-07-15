/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gutil from 'gulp-util';
import stripDebug from 'gulp-strip-debug';
import bundleLogger from '../util/bundleLogger';
import handleErrors from '../util/handleErrors';
import pkg from '../../package.json';

gulp.task('browserify', () => {

  let bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: false,
    // Browserify Options
    entries: [`./${pkg.folders.src}/js/Source.js`],
    // Enable source maps!
    debug: global.isWatching
  });

  bundler.transform(babelify.configure({
    optional: ["es7.classProperties"]
  }));

  const bundle = () => {

    // Log when bundling starts
    bundleLogger.start();

    return bundler
      .bundle()
      // Report compile errors
      .on('error', handleErrors)

      // Use vinyl-source-stream to make the
      // stream gulp compatible. Specifiy the
      // desired output filename here.
      .pipe(source('main.js'))

			// if not watching, prepare for production
      .pipe(buffer())
      .pipe(global.isWatching ? gutil.noop() : stripDebug())
			.pipe(global.isWatching ? gutil.noop() : uglify())

      // Specify the output destination
      .pipe(gulp.dest(`./${pkg.folders.dest}/js/`))

      // Log when bundling completes!
      .on('end', bundleLogger.end);
  };

  if(global.isWatching) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  return bundle();
});
