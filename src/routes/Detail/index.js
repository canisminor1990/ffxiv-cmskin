import { connect } from 'dva';
import path from 'path';
import _ from 'lodash';
import { View, Avatar, Progress, Chart, Back } from '../../components';
import style from './index.scss';

const { Header, Content, Bar, Footer, Split } = View;

const State = state => {
  const act = state.act[state.setting.historyPage];
  return {
    Combatant: act ? act.Combatant : {},
    ChartData: act ? act.Chart : {},
    fullscreen: state.setting.fullscreen,
    uiTrans: state.setting.uiTrans,
    name: state.setting.name,
    nameActive: state.setting.nameActive,
    img: state.setting.img,
    imgActive: state.setting.imgActive,
    miniMode: state.setting.miniMode,
  };
};

const Detail = ({
  location,
  Combatant,
  ChartData,
  fullscreen,
  uiTrans,
  name,
  nameActive,
  img,
  imgActive,
  miniMode,
}) => {
  const Name = path.basename(location.pathname);
  const Data = Combatant[_.findIndex(Combatant, item => item.name === Name)];
  let MyName, MyImg;
  if (Data.isMy) {
    MyName = nameActive ? name : Data.name;
    MyImg = imgActive ? img : Data.job;
  } else {
    MyName = Data.name;
    MyImg = Data.job;
  }
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
      title: '治疗',
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
        ['回避', Data.tanking.inc],
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
        title={miniMode ? false : item.title}
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
        data={ChartData}
        key={key + 'chart'}
        className={style.chart}
        name={Data.name}
        tab={key}
        size={miniMode ? 20 : 32}
        color={item.color}
      />
    );
  });

  return (
    <View transparent={uiTrans} style={fullscreen ? { height: '100%' } : {}}>
      <Header key="header" className={style.header}>
        <Avatar size={miniMode ? '1.5rem' : '3rem'} deaths={Data.deaths} job={MyImg} />
        <div>
          <div className={style.name}>{MyName}</div>
          {miniMode ? null : (
            <div className={style.role}>
              {Data.role}: {Data.longjob}
            </div>
          )}
        </div>
      </Header>
      <div key="progerss" className={style.progress}>
        {ProgressList}
      </div>
      {miniMode ? null : (
        <Bar key="bar" style={!fullscreen ? { display: 'none' } : {}}>
          详细数据
        </Bar>
      )}
      <Content key="body" style={!fullscreen ? { display: 'none' } : {}}>
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
