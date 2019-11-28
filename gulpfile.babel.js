import gulp from 'gulp';
import htmlbeautify from 'gulp-html-beautify';
import { create } from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import Changelog from './script/changelog';
import Ngalog from './script/ngalog';
import nga from './script/nag';
import { writeFileSync } from 'fs';

gulp.task('changelog', Changelog);
gulp.task('ngalog', Ngalog);
gulp.task('nga', nga);
gulp.task('html', done => {
  const options = { indentSize: 2 };
  gulp
    .src('./docs/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./docs/'));
  writeFileSync('./docs/.nojekyll', '');
  done();
});
gulp.task('test', () => {
  const options = {
    server: {
      baseDir: './docs',
      middleware: [historyApiFallback()],
    },
  };
  create.init(options);
});
