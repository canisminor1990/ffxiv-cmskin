import { connect } from 'dva';
import path from 'path';
import _ from 'lodash';
import { View, Avatar, Progress, Chart, Back, Lang } from '../../components';
import { getSetting } from '../../utils/getSetting';
import { options } from '../../data';
import style from './index.scss';

const { Header, Content, Bar, Footer, Split } = View;
const Setting = [
  'uiTrans',
  'name',
  'nameActive',
  'img',
  'imgActive',
  'uiMini',
  'detailDamage',
  'detailHeal',
  'detailTank',
];
const State = state => {
  const act = state.act[state.setting.historyPage];
  return {
    Combatant: act ? act.Combatant : {},
    ChartData: act ? act.Chart : {},
    ...getSetting(Setting, state.setting),
  };
};

const Detail = $ => {
  const ProgressList = [];
  const DataList = [];
  const ChartList = [];
  const BarContent = [];
  const FullHeader = [];
  const Name = path.basename($.location.pathname);
  const Data = $.Combatant[_.findIndex($.Combatant, item => item.name === Name)];
  const MyName = Data.isMy ? ($.nameActive ? $.name : Data.name) : Data.name;
  const MyImg = Data.isMy ? ($.imgActive ? $.img : Data.job) : Data.job;
  const tabData = {
    dps: {
      value: 'damage',
      color: options.Setting.damage.color,
      desc: $.detailDamage,
      number: Data.damage.ps,
      progress: Data.damage.percent,
    },
    heal: {
      value: 'healing',
      color: options.Setting.healing.color,
      desc: $.detailHeal,
      number: Data.healing.ps,
      progress: Data.healing.percent,
    },
    tank: {
      value: 'tanking',
      color: options.Setting.tanking.color,
      desc: $.detailTank,
      number: Data.tanking.total,
      progress: Data.tanking.percent,
    },
  };

  _.forEach(tabData, (item, key) => {
    ProgressList.push(
      <Progress
        key={key}
        title={$.uiMini ? false : Lang(item.value)}
        number={item.number}
        progress={item.progress}
        color={item.color}
      />
    );

    ChartList.push(
      <Chart
        data={$.ChartData}
        key={key + 'chart'}
        className={style.chart}
        name={Data.name}
        tab={key}
        size={$.uiMini ? 20 : 32}
        color={item.color}
      />
    );
    DataList.push(<Split key={key + 'split'} id={`detail.data.${item.value}`} />);

    DataList.push(
      <div key={key + 'desc'} className={style.desc}>
        {item.desc.map(desc => {
          const Key = `${item.value}.${desc}`;
          return (
            <div key={desc} className={style.content}>
              <div className={style.title}>{Lang(`combatant.${Key}`)}</div>
              <div className={style.number}>{_.result(Data, Key)}</div>
            </div>
          );
        })}
      </div>
    );
  });

  if (!$.uiMini) {
    BarContent.push(<Bar key="bar">{Lang('detail.bar')}</Bar>);
    FullHeader.push = $.uiMini ? null : (
      <div className={style.role}>
        {Lang(`role.${Data.role}`)}: {Lang(`role.${Data.job}`)}
      </div>
    );
  }

  return [
    <Header key="header" className={style.header}>
      <Avatar size={$.uiMini ? '1.5rem' : '3rem'} deaths={Data.healing.deaths} job={MyImg} />
      <div>
        <div className={style.name}>{MyName}</div>
        {FullHeader}
      </div>
    </Header>,
    <div key="progerss" className={style.progress}>
      {ProgressList}
    </div>,
    BarContent,
    <Content key="body">
      <div className={style.chartlist}>{ChartList}</div>
      {DataList}
    </Content>,
    <Split key="split" />,
    <Footer key="footer">
      <Back />
    </Footer>,
  ];
};

export default connect(State)(Detail);
