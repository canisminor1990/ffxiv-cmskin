import classnames from 'classnames/bind';
import path from 'path';
import _ from 'lodash';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { getSetting } from '../../utils/getSetting';
import { Avatar, Chart, Progress, Lang } from '../';
import { options } from '../../data';
import style from './index.scss';

const Setting = [
  'fullscreen',
  'uiTrans',
  'name',
  'nameActive',
  'hideName',
  'img',
  'imgActive',
  'uiMini',
  'graphHide',
  'graphScale',
  'pureHps',
  // Tag
  'normalDamage',
  'normalHeal',
  'normalTank',
  // Quantity
  'qtDpsHigh',
  'qtDpsLow',
  'qtTankHigh',
  'qtTankLow',
  'qtHealHigh',
  'qtHealLow',
  'qtOverHealHigh',
  'qtOverHealLow',
  'qtUp',
  'qtDown',
];

const State = state => getSetting(Setting, state.setting);
const ListView = ({ tab, chart, item, firstItem, hasDps, avps, isBattle, ...$ }) => {
  if (!item.job || item.job === 'you') return [];

  const Img = item.isMy ? ($.imgActive ? $.img : item.job) : item.job;
  let Name = item.isMy ? ($.nameActive ? $.name : item.name) : item.name;
  if ($.hideName) Name = Lang(`role.${item.job}`);

  const tabData = {
    dps: {
      value: 'damage',
      desc: $.normalDamage,
      title: item.damage.highest ? item.damage.highest : Lang('setting.damage.title'),
      color: options.Setting.damage.color,
      number: item.damage.ps,
      progress: parseInt(item.damage.ps) / parseInt(firstItem.damage.ps),
    },
    heal: {
      value: 'healing',
      desc: $.normalHeal,
      title: item.healing.highest ? item.healing.highest : Lang('setting.healing.title'),
      color: options.Setting.healing.color,
      number: item.healing.ps,
      progress: parseInt(item.healing.ps) / parseInt(firstItem.healing.ps),
    },
    tank: {
      value: 'tanking',
      desc: $.normalTank,
      title: Lang('setting.tanking.title'),
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
        {Lang(`combatant.${Key}`)}: {_.result(item, Key)}
      </span>
    );
  };

  const Desc = tabData[tab].desc.map(desc => mapDesc(desc, tabData[tab].value));

  let upDown = false;
  let playLevel = false;
  if (tab === 'dps') {
    // 升降
    if (isBattle) {
      const Calc = Math.floor((item.damage.ps10 - item.damage.ps60) / item.damage.ps60 * 100);
      if (Calc > $.qtUp - 100) upDown = 'up';
      if (Calc < $.qtDown - 100) upDown = 'down';
    }
    // 量化
    const CalcDps = Math.floor(item.damage.ps / avps * 100);
    if (hasDps) {
      if (item.role === 'dps') {
        if (CalcDps > $.qtDpsHigh) playLevel = 'high';
        if (CalcDps < $.qtDpsLow) playLevel = 'low';
      }
      if (item.role === 'tank') {
        if (CalcDps > $.qtTankHigh) playLevel = 'high';
        if (CalcDps < $.qtTankLow) playLevel = 'low';
      }
      if (item.role === 'heal') {
        if (CalcDps > $.qtHealHigh) playLevel = 'high';
        if (CalcDps < $.qtHealLow) playLevel = 'low';
      }
    } else {
      if (CalcDps > $.qtDpsHigh) playLevel = 'high';
      if (CalcDps < $.qtHealLow) playLevel = 'low';
    }
  }

  let overProgress = false;

  if (tab === 'heal') {
    if (parseInt(item.healing.over) > $.qtOverHealLow) playLevel = 'low';
    if (parseInt(item.healing.over) > 0 && parseInt(item.healing.over) < $.qtOverHealHigh)
      playLevel = 'high';
    if (!$.pureHps) overProgress = item.healing.over;
  }

  const ChartView = $.graphHide ? null : (
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
  );

  if (!tabData[tab].number || isNaN(tabData[tab].number) || tabData[tab].number === 0) return null;

  return (
    <Link to={path.join('/detail', item.name)} className={listClass}>
      <div className={classnames.bind(style)('left', { leftWithoutGraph: $.graphHide })}>
        <Avatar
          deaths={item.healing.deaths}
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
      <div className={classnames.bind(style)('right', { rightWithoutGraph: $.graphHide })}>
        {ChartView}
        <Progress
          className={style.progress}
          arrow={upDown}
          level={playLevel}
          title={$.uiMini ? false : tabData[tab].title}
          number={tabData[tab].number}
          progress={tabData[tab].progress}
          overProgress={overProgress}
          color={tabData[tab].color}
        />
      </div>
    </Link>
  );
};
export default connect(State)(ListView);
