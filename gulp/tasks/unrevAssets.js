import gulp from 'gulp';
import rename from 'gulp-rename';
import rimraf from 'gulp-rimraf';
import filter from 'gulp-filter';
import pkg from '../../package.json';

const exts = ['css', 'js'];
const re   = new RegExp('(-[a-z0-9]{8})(.('+exts.join('|')+'))$', 'i');

const src  = pkg.folders.dest+'/**/*.{'+exts.join(',')+'}';
const dest = pkg.folders.dest;

function removeHash(path) {

    if (exts.indexOf(path.extname.substr(1)) > -1) {
        path.basename = path.basename.replace(/(-[a-z0-9]{8})$/i, '');
    }

}

gulp.task('_cleanFilenames', () => {

    return gulp.src(src)
        .pipe(rename(removeHash))
        .pipe(gulp.dest(dest));

});

gulp.task('unrevAssets', ['_cleanFilenames'], () => {

    var hashedFilter = filter((file) => { return re.test(file.path); });

    return gulp.src(src)
        .pipe(hashedFilter)
        .pipe(rimraf());

});
