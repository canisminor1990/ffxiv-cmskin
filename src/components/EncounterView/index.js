import style from './index.scss';

export default ({ data, isActive }) => {
  let Content;
  if (isActive) {
    const Zone = (
      <span className={style.zone}>
        <span>{data.zone}</span>
        {data.name}
      </span>
    );
    const Time = <span className={style.time}> · {data.duration}</span>;
    Content = [Zone, Time];
  } else {
    Content = 'CanisMinor Act';
  }

  return <div className={style.view}>{Content}</div>;
};
