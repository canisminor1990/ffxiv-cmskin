import style from './index.scss';

export default ({ data, isActive }) => {
  let Content = [];
  if (isActive) {
    Content = 1;
  } else {
    Content = 2;
  }
  return <div className={style.view}>{Content}</div>;
};
