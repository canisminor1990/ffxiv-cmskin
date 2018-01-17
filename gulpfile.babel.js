import gulp from 'gulp';
import Changelog from './script/changelog';
import Ngalog from './script/ngalog';
import nga from './script/nag';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';

gulp.task('changelog', Changelog);
gulp.task('ngalog', Ngalog);
gulp.task('nga', nga);
gulp.task('test', () => {
	browserSync.create().init({
		                          server: {
			                          baseDir: './dist',
			                          middleware: [ historyApiFallback() ]
		                          }
	                          });
});