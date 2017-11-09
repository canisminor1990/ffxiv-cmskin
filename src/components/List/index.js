import classnames from 'classnames/bind';
import path from 'path';
import _ from 'lodash';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { getSetting } from '../../utils/getSetting';
import { Avatar, Chart, Progress } from '../';
import { options } from '../../data';
import style from './index.scss';

const Setting = [
  'fullscreen',
  'uiTrans',
  'name',
  'nameActive',
  'hideName',
  'nameHide',
  'nameHideDefault',
  'nameHideActive',
  'img',
  'imgActive',
  'uiMini',
  'graphScale',
  'normalDamage',
  'normalHeal',
  'normalTank',
];

const State = state => getSetting(Setting, state.setting);
const ListView = ({ tab, chart, item, firstItem, ...$ }) => {
  if (!item.job || item.job === 'you') return [];
  if (!$.fullscreen && !item.isMy) return [];

  const Img = item.isMy ? ($.imgActive ? $.img : item.job) : item.job;
  let Name = item.isMy ? ($.nameActive ? $.name : item.name) : item.name;
  if ($.hideName && Name !== '极限技' && Name !== '陆行鸟')
    Name = $.nameHideActive ? $.nameHide : $.nameHideDefault;

  const tabData = {
    dps: {
      value: 'damage',
      desc: $.normalDamage,
      title: item.damage.highest ? item.damage.highest : options.Setting.damage.title,
      color: options.Setting.damage.color,
      number: item.damage.ps,
      progress: parseInt(item.damage.ps) / parseInt(firstItem.damage.ps),
    },
    heal: {
      value: 'healing',
      desc: $.normalHeal,
      title: item.healing.highest ? item.healing.highest : options.Setting.healing.title,
      color: options.Setting.healing.color,
      number: item.healing.ps,
      progress: parseInt(item.healing.ps) / parseInt(firstItem.healing.ps),
    },
    tank: {
      value: 'tanking',
      desc: $.normalTank,
      title: options.Setting.tanking.title,
      color: options.Setting.tanking.color,
      number: item.tanking.total,
      progress: parseInt(item.tanking.total) / parseInt(firstItem.tanking.total),
    },
  };

  const firstTabData = {
    dps: parseInt(firstItem.damage.ps),
    heal: parseInt(firstItem.healing.ps),
    tank: parseInt(firstItem.tanking.total),
  };

  const listClass = classnames.bind(style)('list', {
    my: item.isMy && $.fullscreen,
    trans: $.uiTrans,
    fullscreen: !$.fullscreen,
    uiMini: $.uiMini,
    uiFull: !$.uiMini,
  });

  const mapDesc = (desc, value) => {
    const Key = `${value}.${desc}`;
    return (
      <span key={desc}>
        {_.result(options.Combatant, Key)}: {_.result(item, Key)}
      </span>
    );
  };

  const Desc = tabData[tab].desc.map(desc => mapDesc(desc, tabData[tab].value));

  return (
    <Link to={path.join('/detail', item.name)} className={listClass}>
      <div className={style.left}>
        <Avatar
          deaths={item.deaths}
          job={Img}
          diy={$.imgActive && item.isMy}
          size={$.uiMini ? '1.5rem' : '2.5rem'}
        />
        <div className={style.header}>
          <div key="name" className={style.name}>
            {Name}
          </div>
          <div key="desc" className={style.desc}>
            {Desc}
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.chart}>
          <Chart
            graphScale={$.graphScale}
            firstItem={firstTabData[tab]}
            data={chart}
            name={item.name}
            tab={tab}
            color={tabData[tab].color}
            size={$.uiMini ? 20 : 32}
          />
        </div>
        <Progress
          className={style.progress}
          title={$.uiMini ? false : tabData[tab].title}
          number={tabData[tab].number}
          progress={tabData[tab].progress}
          color={tabData[tab].color}
        />
      </div>
    </Link>
  );
};
export default connect(State)(ListView);
