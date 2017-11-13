import gulp from 'gulp';
import Changelog from './script/changelog'
import Ngalog from './script/ngalog'
import nga from './script/nag'

gulp.task('changelog',  Changelog);
gulp.task('ngalog',  Ngalog);
gulp.task('nga',  nga);