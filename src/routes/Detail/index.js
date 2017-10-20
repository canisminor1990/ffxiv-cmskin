import { connect } from 'dva';
import path from 'path';
import _ from 'lodash';
import { View, Avatar, Progress, Chart, Back } from '../../components';
import style from './index.scss';

const { Header, Content, Bar, Footer, Split } = View;

const State = state => ({
  fullscreen: state.setting.fullscreen,
  Combatant: state.data.Combatant,
  isActive: !state.loading.global && state.data.isActive,
});

const Detail = ({ location, fullscreen, Combatant, isActive }) => {
  if (!isActive) return [];

  const Name = path.basename(location.pathname);
  const Data = Combatant[_.findIndex(Combatant, item => item.name === Name)];
  const tabData = {
    dps: {
      title: '输出',
      desc: [
        ['占比', Data.damage.percent],
        ['暴击', Data.damage.criticals.percent],
        ['直击', Data.damage.directhit.percent],
        ['精准', Data.damage.accuracy.percent],
      ],
      number: Data.damage.ps,
      progress: Data.damage.percent,
      color: '#d86f87',
    },
    heal: {
      title: '输出',
      desc: [
        ['占比', Data.healing.percent],
        ['暴击', Data.healing.criticals.percent],
        ['溢出', Data.healing.over],
        ['放生', Data.deaths],
      ],
      number: Data.healing.ps,
      progress: Data.healing.percent,
      color: '#649029',
    },
    tank: {
      title: '承伤',
      desc: [
        ['占比', Data.tanking.percent],
        ['招架', Data.tanking.parry],
        ['格挡', Data.tanking.block],
        ['减伤', Data.tanking.inc],
      ],
      number: Data.tanking.total,
      progress: Data.tanking.percent,
      color: '#4488fc',
    },
  };

  let ProgressList = [];
  let DataList = [];
  let ChartList = [];
  _.forEach(tabData, (item, key) => {
    ProgressList.push(
      <Progress
        key={key}
        title={item.title}
        number={item.number}
        progress={item.progress}
        color={item.color}
      />
    );
    DataList.push(<Split key={key + 'split'} title={`${item.title}数据`} />);
    const Desc = item.desc.map(desc => (
      <div key={desc[0]} className={style.content}>
        <div className={style.title}>{desc[0]}</div>
        <div className={style.number}>{desc[1]}</div>
      </div>
    ));
    DataList.push(
      <div key={key + 'desc'} className={style.desc}>
        {Desc}
      </div>
    );
    ChartList.push(
      <Chart
        key={key + 'chart'}
        className={style.chart}
        name={Data.name}
        tab={key}
        color={item.color}
      />
    );
  });

  return [
    <Header key="header" className={style.header}>
      <Avatar size="3rem" deaths={Data.deaths} job={Data.job} />
      <div>
        <div className={style.name}>{Data.name}</div>
        <div className={style.role}>
          {Data.role}: {Data.longjob}
        </div>
      </div>
    </Header>,
    <div key="progerss" className={style.progress}>
      {ProgressList}
    </div>,
    <Bar key="bar" style={!fullscreen ? { display: 'none' } : {}}>
      详细数据
    </Bar>,
    <Content key="body" style={!fullscreen ? { display: 'none' } : {}}>
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
