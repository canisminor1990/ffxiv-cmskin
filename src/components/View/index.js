import classnames from 'classnames/bind';
import { Lang } from '../';
import { Icon } from 'antd';
import { Link } from 'dva/router';
import style from './index.scss';

const View = ({ transparent, children, ...other }) => {
  return (
    <div
      className={classnames.bind(style)({
        view: !transparent,
        viewTrans: transparent,
      })}
      {...other}
    >
      <div className={style.inner}>{children}</div>
    </div>
  );
};

View.Header = ({ className, children, uiMini, ...other }) => (
  <div className={classnames.bind(style)('header', className, { uiMini: uiMini })} {...other}>
    {children}
  </div>
);
View.Content = ({ className, children, ...other }) => (
  <div className={style.content}>
    <div className={classnames.bind(style)('body', className)} {...other}>
      {children}
    </div>
  </div>
);
View.Footer = ({ className, children, hasBtn, isActive, ...other }) => (
  <div className={classnames.bind(style)('footer', { hasBtn: hasBtn })}>
    <div className={classnames.bind(style)('infooter', className)} {...other}>
      {children}
    </div>
    {window.location.pathname === '/' && isActive ? (
      <Link className={style.history} to="/history">
        <Icon type="clock-circle-o" />
      </Link>
    ) : (
      <a
        className={style.copyright}
        href="https://github.com/canisminor1990/ffxiv-cmskin"
        rel="noopener noreferrer"
        target="_blank"
      >
        By CanisMinor
      </a>
    )}
  </div>
);
View.Bar = ({ className, children, ...other }) => (
  <div className={classnames.bind(style)('bar', className)} {...other}>
    {children}
  </div>
);
View.Split = ({ right, className, title, id, ...other }) => {
  const rightContent = right ? <div>{right}</div> : null;
  return [
    id ? (
      <div key="title" className={style.title}>
        <Lang id={id} />
        {rightContent}
      </div>
    ) : null,
    title ? (
      <div key="title" className={style.title}>
        {title}
        {rightContent}
      </div>
    ) : null,
    <div key="split" className={classnames.bind(style)('split', className)} {...other} />,
  ];
};
export default View;
