import classnames from 'classnames';
import style from './index.scss';

export default ({ data, isActive, miniMode }) => {
  let Content;
  if (isActive) {
    Content = (
      <span className={classnames.bind(style)(style.zone, { [style.miniMode]: miniMode })}>
        <a
          href={`http://ff14.huijiwiki.com/wiki/${data.zone.split(' ')[0]}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {data.zone}
        </a>
        {data.name !== 'Encounter' ? <span>{` · ${data.name}`}</span> : ''}
      </span>
    );
  } else {
    Content = 'CanisMinor Act';
  }

  return <div className={style.view}>{Content}</div>;
};
