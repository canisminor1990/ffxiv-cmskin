import style from './index.scss';

const View = ({ children, ...other }) => {
  return (
    <div className={style.view} {...other}>
      <div className={style.inner}>{children}</div>
    </div>
  );
};

View.Header = ({ children }) => <div className={style.header}>{children}</div>;
View.Content = ({ children }) => (
  <div className={style.content}>
    <div className={style.body}>{children}</div>
  </div>
);
View.Footer = ({ children }) => (
  <div className={style.footer}>
    <div className={style.infooter}>{children}</div>
    <a
      className={style.copyright}
      href="https://coding.net/u/canisminor1990/p/ffxiv-cmskin/git"
      rel="noopener noreferrer"
      target="_blank"
    >
      By CanisMinor
    </a>
  </div>
);
View.Bar = ({ children }) => <div className={style.bar}>{children}</div>;
View.Split = () => <div className={style.split} />;
export default View;
