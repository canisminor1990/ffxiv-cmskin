import style from './index.scss';

export default ({ children, ...other }) => (
  <a className={style.btn} {...other}>
    {children}
  </a>
);
