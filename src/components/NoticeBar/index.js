import style from './index.scss';

export default ({ data, isActive }) => {
  let Content;
  if (isActive) {
    Content = [
      <span key="time" className={style.title}>
        时间: {data.duration}
      </span>,
      <span key="dps" className={style.title}>
        输出: {data.damage.ps}
      </span>,
      <span key="deaths" className={style.title}>
        放生: {data.deaths}
      </span>,
    ];
  } else {
    Content = <span className={style.title}>{'等待数据传入...'}</span>;
  }

  return Content;
};
