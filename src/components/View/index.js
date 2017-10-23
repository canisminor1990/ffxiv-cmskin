import style from './index.scss';
import classnames from 'classnames/bind';

const View = ({ transparent, children, ...other }) => {
  return (
    <div
      className={classnames.bind(style)({
        [style.view]: !transparent,
        [style.viewTrans]: transparent,
      })}
      {...other}
    >
      <div className={style.inner}>{children}</div>
    </div>
  );
};

View.Header = ({ className, children, ...other }) => (
  <div className={classnames.bind(style)(style.header, className)} {...other}>
    {children}
  </div>
);
View.Content = ({ className, children, ...other }) => (
  <div className={style.content}>
    <div className={classnames.bind(style)(style.body, className)} {...other}>
      {children}
    </div>
  </div>
);
View.Footer = ({ className, children, ...other }) => (
  <div className={style.footer}>
    <div className={classnames.bind(style)(style.infooter, className)} {...other}>
      {children}
    </div>
    <a
      className={style.copyright}
      href="https://github.com/canisminor1990/ffxiv-cmskin"
      rel="noopener noreferrer"
      target="_blank"
    >
      By CanisMinor
    </a>
  </div>
);
View.Bar = ({ className, children, ...other }) => (
  <div className={classnames.bind(style)(style.bar, className)} {...other}>
    {children}
  </div>
);
View.Split = ({ className, title, ...other }) => {
  let List = [];
  if (title)
    List.push(
      <div key="title" className={style.title}>
        {title}
      </div>
    );
  List.push(
    <div key="split" className={classnames.bind(style)(style.split, className)} {...other} />
  );
  return List;
};
export default View;
