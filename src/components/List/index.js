import classnames from 'classnames/bind';
import style from './index.scss';
import path from 'path';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Avatar, Chart, Progress } from '../';

const State = state => ({
  fullscreen: state.setting.fullscreen,
});
const ListView = ({ tab, item, firstItem, fullscreen }) => {
  if (!item.job || item.job === 'you') return [];
  if (!fullscreen && !item.isMy) return [];
  const tabData = {
    dps: {
      desc: [['暴击', item.damage.criticals.percent], ['直击', item.damage.directhit.percent]],
      title: item.damage.highest.full ? item.damage.highest.full : '输出',
      number: item.damage.ps,
      progress: parseInt(item.damage.ps) / parseInt(firstItem.damage.ps),
      color: '#d86f87',
    },
    heal: {
      desc: [['暴击', item.healing.criticals.percent], ['溢出', item.healing.over]],
      title: item.healing.highest.full ? item.healing.highest.full : '治疗',
      number: item.healing.ps,
      progress: parseInt(item.healing.ps) / parseInt(firstItem.healing.ps),
      color: '#649029',
    },
    tank: {
      desc: [['招架', item.tanking.parry], ['格挡', item.tanking.block]],
      title: '承伤总量',
      number: item.tanking.total,
      progress: parseInt(item.tanking.total) / parseInt(firstItem.damage.total),
      color: '#4488fc',
    },
  };

  const listClass = classnames.bind(style)({
    [style.list]: true,
    [style.my]: item.isMy && fullscreen,
    [style.mini]: !fullscreen,
  });

  return (
    <Link to={path.join('/detail', item.name)} className={listClass}>
      <Avatar deaths={item.deaths} job={item.job} />
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
        <Chart name={item.name} tab={tab} color={tabData[tab].color} size={32} />
      </div>
      <Progress
        className={style.right}
        title={tabData[tab].title}
        number={tabData[tab].number}
        progress={tabData[tab].progress}
        color={tabData[tab].color}
      />
    </Link>
  );
};
export default connect(State)(ListView);
