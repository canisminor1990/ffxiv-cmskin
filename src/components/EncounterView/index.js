import classnames from 'classnames';
import { Version } from '../../changelog';
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
    Content = (
      <span className={classnames.bind(style)(style.zone, { [style.miniMode]: miniMode })}>
        <a
          href="https://github.com/canisminor1990/ffxiv-cmskin"
          rel="noopener noreferrer"
          target="_blank"
        >
          CanisMinor Act
        </a>
        <span>{` · ${Version}`}</span>
      </span>
    );
  }

  return <div className={style.view}>{Content}</div>;
};
