import style from './index.scss';

export default ({ data, isActive }) => {
  let Content;
  if (isActive) {
    Content = (
      <span className={style.zone}>
        <a
          href={`http://ff14.huijiwiki.com/wiki/${data.zone.split(' ')[0]}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {data.zone}
        </a>
        <span> · {data.name}</span>
      </span>
    );
  } else {
    Content = 'CanisMinor Act';
  }

  return <div className={style.view}>{Content}</div>;
};
