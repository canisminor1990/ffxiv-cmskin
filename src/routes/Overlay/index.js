import { connect } from 'dva';
import { EncounterView, AllView, CombatantView, View, NoticeBar } from '../../components';
import { Component } from 'react';
import classnames from 'classnames/bind';
import Package from '../../../package.json';
import style from './index.scss';

const { Header, Content, Bar, Footer, Split } = View;

const State = state => {
  const act = state.act[state.setting.historyPage];
  return {
    Encounter: act ? act.Encounter : {},
    Combatant: act ? act.Combatant : {},
    Chart: act ? act.Chart : {},
    isActive: act ? act.isActive : false,
    fullscreen: state.setting.fullscreen,
    uiMini: state.setting.uiMini,
    uiTrans: state.setting.uiTrans,
    timeout: 0,
  };
};

class Overlay extends Component {
  state = {
    tab: 'dps',
  };

  tabClass = (tab, name) => {
    const tabClass = classnames.bind(style)({
      [style.tab]: true,
      [style.active]: this.state.tab === tab,
    });
    return (
      <span key={name} className={tabClass} onClick={() => this.setState({ tab: tab })}>
        {name}
      </span>
    );
  };

  render() {
    const { Encounter, Combatant, Chart, isActive, uiTrans, fullscreen, uiMini } = this.props;
    return (
      <View transparent={uiTrans} style={fullscreen ? { height: '100%' } : {}}>
        <Header key="header" uiMini={uiMini}>
          <EncounterView data={Encounter} log={Package} isActive={isActive} uiMini={uiMini} />
        </Header>
        {uiMini ? null : (
          <Bar key="bar">
            <NoticeBar data={Encounter} isActive={isActive} />
          </Bar>
        )}
        <Content key="body">
          {this.state.tab === 'all' ? (
            <AllView data={Combatant} />
          ) : (
            <CombatantView
              tab={this.state.tab}
              data={Combatant}
              log={Package}
              chart={Chart}
              time={Encounter ? Encounter.duration : ''}
              isActive={isActive}
            />
          )}
        </Content>
        <Split key="split" />
        <Footer key="footer" isActive={isActive}>
          {isActive
            ? [
                this.tabClass('dps', '输出'),
                this.tabClass('heal', '治疗'),
                this.tabClass('tank', '承伤'),
                this.tabClass('all', '统计'),
              ]
            : null}
        </Footer>
      </View>
    );
  }
}

export default connect(State)(Overlay);
