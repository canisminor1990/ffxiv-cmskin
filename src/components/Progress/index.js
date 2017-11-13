import { Icon } from 'antd';
import classnames from 'classnames/bind';
import style from './index.scss';

export default ({ title, number, progress, overProgress, color, arrow, level, ...other }) => {
  let Arrow = [];
  if (arrow === 'up')
    Arrow = (
      <span className={style.up}>
        <Icon type="arrow-up" />
      </span>
    );
  if (arrow === 'down')
    Arrow = (
      <span className={style.down}>
        <Icon type="arrow-down" />
      </span>
    );

  const Title = title ? <div className={style.skill}>{title}</div> : null;
  const Overprogress = overProgress ? (
    <div
      className={style.overActive}
      style={{
        width: overProgress,
      }}
    />
  ) : null;
  const Progress = progress ? (
    <div
      className={style.active}
      style={{
        background: color,
        width: progress.toString().indexOf('%') === -1 ? progress * 100 + '%' : progress,
      }}
    >
      {Overprogress}
    </div>
  ) : null;

  const NumberClass = classnames.bind(style)('show', {
    high: level === 'high',
    low: level === 'low',
  });

  return (
    <div {...other}>
      {Title}
      <div className={NumberClass}>
        {Arrow}
        {parseFloat(number).toLocaleString()}
      </div>
      <div className={style.progress}>{Progress}</div>
    </div>
  );
};
