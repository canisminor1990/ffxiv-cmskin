import style from './index.scss';

const View = ({ children }) => {
  return (
    <div className={style.view}>
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
View.Footer = ({ children }) => <div className={style.footer}>{children}</div>;
View.Bar = ({ children }) => <div className={style.bar}>{children}</div>;
View.Split = () => <div className={style.split} />;
export default View;
