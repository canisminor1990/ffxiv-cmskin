import style from './index.scss';

const View = ({ children }) => {
  return <div className={style.view}>{children}</div>;
};

View.Header = ({ children }) => {
  return (
    <div className={style.header}>
      {children}
      <hr />
    </div>
  );
};

View.Body = ({ children }) => {
  return <div className={style.body}>{children}</div>;
};

export default View;
