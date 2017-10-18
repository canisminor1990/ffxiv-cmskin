import style from './index.scss';

export default ({ data, isActive }) => {
  let Content;
  if (isActive) {
    Content = (
      <span className={style.zone}>
        {data.zone}
        <span> · {data.name}</span>
      </span>
    );
  } else {
    Content = 'CanisMinor Act';
  }

  return <div className={style.view}>{Content}</div>;
};
