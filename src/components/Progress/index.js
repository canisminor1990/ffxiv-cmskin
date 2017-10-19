import style from './index.scss';

export default ({ title, number, progress, color, ...other }) => {
  return (
    <div {...other}>
      <div className={style.skill}>{title}</div>
      <div className={style.show}>{parseFloat(number).toLocaleString()}</div>
      <div className={style.progress}>
        {progress ? (
          <div
            className={style.active}
            style={{
              background: color,
              width: progress.toString().indexOf('%') === -1 ? progress * 100 + '%' : progress,
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
