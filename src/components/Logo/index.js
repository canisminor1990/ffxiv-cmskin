import style from './index.scss';

export default ({ size = 400 }) => (
  <div className={style.logo} style={{ maxWidth: size + 'px' }}>
    <img alt="logo" src="/img/logo.png" />
  </div>
);
