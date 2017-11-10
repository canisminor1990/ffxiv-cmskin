import style from './index.scss';
import classnames from 'classnames/bind';

export default ({ title, desc, className, ...other }) => (
  <div className={classnames.bind(style)('item', className)} {...other}>
    <div className={style.time}>{title}</div>
    <p className={style.content}>{desc}</p>
  </div>
);
