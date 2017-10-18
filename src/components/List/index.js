import classnames from 'classnames/bind';
import style from './index.scss';
import path from 'path';
import createG2 from 'g2-react';

export default ({ tab, item, firstItem, graph }) => {
  const tabData = {
    dps: {
      desc: [['暴击', item.damage.criticals.percent], ['直击', item.damage.directhit.percent]],
      skill: item.damage.highest.full,
      progressShow: item.damage.ps,
      progress: parseInt(item.damage.ps) / parseInt(firstItem.damage.ps),
      color: '#d86f87',
    },
    heal: {
      desc: [['暴击', item.healing.criticals.percent], ['溢出', item.healing.over]],
      skill: item.healing.highest.full,
      progressShow: item.healing.ps,
      progress: parseInt(item.healing.ps) / parseInt(firstItem.healing.ps),
      color: '#649029',
    },
    tank: {
      desc: [['招架', item.tanking.parry], ['格挡', item.tanking.block]],
      skill: '承伤总量',
      progressShow: item.tanking.total,
      progress: parseInt(item.tanking.total) / parseInt(firstItem.damage.total),
      color: '#4488fc',
    },
  };

  // if (tabData[tab].progressShow <= 0) return [];

  const Chart = createG2(chart => {
    chart.col('time', { range: [0, 1] });
    chart.col(tab);
    chart
      .area()
      .position(`time*${tab}`)
      .color(tabData[tab].color);
    chart
      .line()
      .position(`time*${tab}`)
      .color(tabData[tab].color);
    chart.axis(false);
    chart.tooltip(false);
    chart.animate(false);
    chart.render();
  });

  const listClass = classnames.bind(style)({
    [style.list]: true,
    [style.my]: item.name === 'YOU',
  });

  return (
    <div className={listClass}>
      <div className={style.avatar}>
        {item.deaths > 0 ? <div className={style.deaths}>✗{item.deaths}</div> : null}
        <img src={path.join('img/jobs', item.job + '.png')} />
      </div>
      <div className={style.header}>
        <div className={style.name}>{item.name}</div>
        <div className={style.desc}>
          {tabData[tab].desc.map((desc, i) => (
            <span key={i}>
              {desc[0]}: {desc[1]}
            </span>
          ))}
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
      <div className={style.right}>
        <div className={style.skill}>{tabData[tab].skill}</div>
        <div className={style.show}>{parseFloat(tabData[tab].progressShow).toLocaleString()}</div>
        <div className={style.progress}>
          <div
            className={style.active}
            style={{
              background: tabData[tab].color,
              width: tabData[tab].progress * 100 + '%',
            }}
          />
        </div>
      </div>
    </div>
  );
};
