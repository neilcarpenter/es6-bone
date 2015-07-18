import browserSync from 'browser-sync';
import gulp from 'gulp';
import fs from 'fs';
import pkg from '../../package.json';

gulp.task('browserSync', ['build'], () => {
  browserSync.create('herro server').init({
    server: {
      baseDir: [pkg.folders.src, pkg.folders.dest],
      middleware: (req, res, next) => {

        const filePath = req.url.split("?");

        // static route for pushstate
        const exists = fs.existsSync(process.cwd() + "/" + pkg.folders.dest + filePath[0]);
        if((req.url == "/" || !exists) && req.url.indexOf("browser-sync-client") == -1) req.url = "/index.html";

        if(filePath.length > 1) req.url += filePath[1];

        next();
      }
    }
  });
});
