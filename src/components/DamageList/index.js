import style from './index.scss';
import path from 'path';
import createG2 from 'g2-react';

export default ({ item, firstItem, graph }) => {
  const Chart = createG2(chart => {
    chart.col('time', { range: [0, 1] });
    chart.col('dps');
    chart
      .area()
      .position('time*dps')
      .color('#d86f87');
    chart
      .line()
      .position('time*dps')
      .color('#d86f87');
    chart.axis(false);
    chart.animate(false);
    chart.render();
  });
  return (
    <div className={style.list}>
      <img src={path.join('img/jobs', item.job + '.png')} />
      <div className={style.header}>
        <div className={style.name}>{item.name}</div>
        <div className={style.desc}>
          <span>暴击: {item.damage.criticals.percent}</span>
          <span>直击: {item.damage.directhit.percent}</span>
          <span>放生: {item.deaths}</span>
        </div>
      </div>
      <div className={style.info}>
        <Chart
          data={graph}
          plotCfg={{ margin: [0, 0, 0, 0] }}
          width={100}
          height={32}
          forceFit={true}
        />
      </div>
      <div className={style.damage}>
        <div className={style.skill}>{item.damage.highest.full}</div>
        <div className={style.dps}>{parseFloat(item.damage.ps).toLocaleString()}</div>
        <div className={style.progress}>
          <div
            className={style.active}
            style={{ width: parseInt(item.damage.ps) / parseInt(firstItem.damage.ps) * 100 + '%' }}
          />
        </div>
      </div>
    </div>
  );
};
