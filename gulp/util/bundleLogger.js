/* bundleLogger
   ------------
   Provides gulp style logs to the bundle method in browserify.js
*/

import gutil from 'gulp-util';
import prettyHrtime from 'pretty-hrtime';
let startTime;

export default {
  start: () => {
    startTime = process.hrtime();
    gutil.log('Running', gutil.colors.green("'bundle'") + '...');
  },

  end: () => {
    const taskTime = process.hrtime(startTime);
    const prettyTime = prettyHrtime(taskTime);
    gutil.log('Finished', gutil.colors.green("'bundle'"), 'in', gutil.colors.magenta(prettyTime));
  }
};
