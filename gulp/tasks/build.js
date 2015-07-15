import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', () => {

    const args = [
        'unrevAssets',
        ['browserify', 'sass', 'vendor', 'images', 'dataMin'],
        'html',
    ];

    if (!global.isWatching) {
        args.splice(2, 0, 'revAssets');
    }

    runSequence.apply(this, args);

});
