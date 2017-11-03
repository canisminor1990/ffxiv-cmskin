import classnames from 'classnames';
import style from './index.scss';

export default ({ data, log, isActive, uiMini }) => {
  let Content;
  let Subtitle;

  if (isActive) {
    if (uiMini) {
      Subtitle = <span> · 输出：{data.damage.ps}</span>;
    } else {
      Subtitle = data.name !== 'Encounter' ? <span>{` · ${data.name}`}</span> : '';
    }
    Content = (
      <span className={classnames.bind(style)(style.zone, { [style.uiMini]: uiMini })}>
        <a
          href={`http://ff14.huijiwiki.com/wiki/${data.zone.split(' ')[0]}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {data.zone}
        </a>
        {Subtitle}
      </span>
    );
  } else {
    Content = (
      <span className={classnames.bind(style)(style.zone, { [style.uiMini]: uiMini })}>
        <a
          href="https://github.com/canisminor1990/ffxiv-cmskin"
          rel="noopener noreferrer"
          target="_blank"
        >
          CanisMinor Act
        </a>
        <span>{` · ${log.version}`}</span>
      </span>
    );
  }

  return <div className={style.view}>{Content}</div>;
};
