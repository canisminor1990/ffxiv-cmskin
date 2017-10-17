import style from './index.scss';

export default ({ data, isActive }) => {
  let Content;
  if (isActive) {
    Content = (
      <span className={style.zone}>
        {data.name}
        <span> · {data.zone}</span>
      </span>
    );
  } else {
    Content = 'CanisMinor Act';
  }

  return <div className={style.view}>{Content}</div>;
};
