import gulp from 'gulp';
import htmlbeautify from 'gulp-html-beautify';
import { create } from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import Changelog from './script/changelog';
import Ngalog from './script/ngalog';
import nga from './script/nag';

gulp.task('changelog', Changelog);
gulp.task('ngalog', Ngalog);
gulp.task('nga', nga);
gulp.task('html', () => {
  const options = { indentSize: 2 };
  gulp
    .src('./dist/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./dist/'));
});
gulp.task('test', () => {
  const options = {
    server: {
      baseDir: './dist',
      middleware: [historyApiFallback()],
    },
  };
  create.init(options);
});
