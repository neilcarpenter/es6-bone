import gulp from 'gulp';
import sass from 'gulp-sass';
import prefix from 'gulp-autoprefixer';
import minifyCSS from 'gulp-minify-css';
import livereload from 'gulp-livereload';
import cmq from 'gulp-combine-media-queries';
import gutil from 'gulp-util';
import handleErrors from '../util/handleErrors';
import pkg from '../../package.json';

gulp.task('scss', [ 'images' ], () => {

    if (global.isWatching) {

        livereload.listen();

    }

    return gulp.src(`${pkg.folders.src}/scss/main.scss`)
        .pipe(sass())
        .on('error', handleErrors)
        .pipe(prefix('ie >= 8', 'ff >= 3', 'safari >= 4', 'opera >= 12', 'chrome >= 4'))
        .pipe(global.isProduction ? cmq() : gutil.noop())
        .pipe(global.isProduction ? minifyCSS() : gutil.noop())
        .pipe(gulp.dest(`${pkg.folders.dest}/css`))
        .pipe(!global.isWatching ? gutil.noop() : livereload({
            host: 'localhost',
            port: 4000
        }));

});
