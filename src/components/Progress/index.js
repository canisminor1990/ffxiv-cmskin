import { Icon } from 'antd';
import style from './index.scss';

export default ({ title, number, progress, color, arrow, ...other }) => {
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
  const Progress = progress ? (
    <div
      className={style.active}
      style={{
        background: color,
        width: progress.toString().indexOf('%') === -1 ? progress * 100 + '%' : progress,
      }}
    />
  ) : null;
  return (
    <div {...other}>
      {Title}
      <div className={style.show}>
        {Arrow}
        {parseFloat(number).toLocaleString()}
      </div>
      <div className={style.progress}>{Progress}</div>
    </div>
  );
};
