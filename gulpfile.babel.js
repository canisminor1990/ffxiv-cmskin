import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import { create } from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import Changelog from './script/changelog';
import Ngalog from './script/ngalog';
import nga from './script/nag';

gulp.task('changelog', Changelog);
gulp.task('ngalog', Ngalog);
gulp.task('nga', nga);
gulp.task('html', () => gulp.src('dist/*.html')
                            .pipe(htmlmin({collapseWhitespace: true}))
                            .pipe(gulp.dest('dist')));
gulp.task('test', () => create.init({
	                                    server: {
		                                    baseDir   : './dist',
		                                    middleware: [historyApiFallback()]
	                                    }
                                    }));