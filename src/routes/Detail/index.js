import { connect } from 'dva';
import path from 'path';
import _ from 'lodash';
import { View, Avatar, Progress, Chart, Back, Lang } from '../../components';
import { getSetting } from '../../utils/getSetting';
import { options } from '../../data';
import style from './index.scss';

const { Header, Content, Bar, Footer, Split } = View;
const Setting = [
  'fullscreen',
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
  const Name = path.basename($.location.pathname);
  const Data = $.Combatant[_.findIndex($.Combatant, item => item.name === Name)];
  const MyName = Data.isMy ? ($.nameActive ? $.name : Data.name) : Data.name;
  const MyImg = Data.isMy ? ($.imgActive ? $.img : Data.job) : Data.job;
  const tabData = {
    dps: {
      value: 'damage',
      title: options.Setting.damage.title,
      color: options.Setting.damage.color,
      desc: $.detailDamage,
      number: Data.damage.ps,
      progress: Data.damage.percent,
    },
    heal: {
      value: 'healing',
      title: options.Setting.healing.title,
      color: options.Setting.healing.color,
      desc: $.detailHeal,
      number: Data.healing.ps,
      progress: Data.healing.percent,
    },
    tank: {
      value: 'tanking',
      title: options.Setting.tanking.title,
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
        title={$.uiMini ? false : item.title}
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
    DataList.push(<Split key={key + 'split'} title={`${item.title}数据`} />);

    DataList.push(
      <div key={key + 'desc'} className={style.desc}>
        {item.desc.map(desc => {
          const Key = `${item.value}.${desc}`;
          return (
            <div key={desc} className={style.content}>
              <div className={style.title}>{_.result(options.Combatant, Key)}</div>
              <div className={style.number}>{_.result(Data, Key)}</div>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <View transparent={$.uiTrans} style={$.fullscreen ? { height: '100%' } : {}}>
      <Header key="header" className={style.header}>
        <Avatar size={$.uiMini ? '1.5rem' : '3rem'} deaths={Data.healing.deaths} job={MyImg} />
        <div>
          <div className={style.name}>{MyName}</div>
          {$.uiMini ? null : (
            <div className={style.role}>
              {Data.roleCN}: {Data.jobCN}
            </div>
          )}
        </div>
      </Header>
      <div key="progerss" className={style.progress}>
        {ProgressList}
      </div>
      {$.uiMini ? null : (
        <Bar key="bar" style={!$.fullscreen ? { display: 'none' } : {}}>
          <Lang id="detail.bar" />
        </Bar>
      )}
      <Content key="body" style={!$.fullscreen ? { display: 'none' } : {}}>
        <div className={style.chartlist}>{ChartList}</div>
        {DataList}
      </Content>
      <Split key="split" />
      <Footer key="footer">
        <Back />
      </Footer>
    </View>
  );
};

export default connect(State)(Detail);
