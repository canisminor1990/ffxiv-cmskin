import { connect } from 'dva';
import { EncounterView, CombatantView, View, NoticeBar } from '../../components';
import { Component } from 'react';
import classnames from 'classnames/bind';
import style from './index.scss';

const { Header, Content, Bar, Footer, Split } = View;

const State = state => ({
  Encounter: state.data.Encounter,
  Combatant: state.data.Combatant,
  isActive: !state.loading.global && state.data.isActive,
  fullscreen: state.setting.fullscreen,
  miniTime: state.setting.miniTime,
  miniTimeActive: state.setting.miniTimeActive,
  timeout: 0,
});

class Overlay extends Component {
  state = {
    tab: 'dps',
  };

  tabClass = tab =>
    classnames.bind(style)({
      [style.tab]: true,
      [style.active]: this.state.tab === tab,
    });

  componentWillMount() {
    const { dispatch, isActive, fullscreen, miniTime, miniTimeActive } = this.props;
    if (miniTimeActive) {
      if (fullscreen && !isActive) {
        setTimeout(
          () => dispatch({ type: 'setting/update', payload: { fullscreen: false } }),
          miniTime * 1000
        );
      } else {
        dispatch({ type: 'setting/update', payload: { fullscreen: true } });
        this.setState({ timeout: new Date() });
      }
    }
  }

  render() {
    const { Encounter, Combatant, isActive } = this.props;

    return [
      <Header key="header">
        <EncounterView data={Encounter} isActive={isActive} />
      </Header>,
      <Bar key="bar">
        <NoticeBar data={Encounter} isActive={isActive} />
      </Bar>,
      <Content key="body">
        <CombatantView
          tab={this.state.tab}
          data={Combatant}
          time={Encounter ? Encounter.duration : ''}
          isActive={isActive}
        />
      </Content>,
      <Split key="split" />,
      <Footer key="footer">
        <span className={this.tabClass('dps')} onClick={() => this.setState({ tab: 'dps' })}>
          输出
        </span>
        <span className={this.tabClass('heal')} onClick={() => this.setState({ tab: 'heal' })}>
          治疗
        </span>
        <span className={this.tabClass('tank')} onClick={() => this.setState({ tab: 'tank' })}>
          承伤
        </span>
      </Footer>,
    ];
  }
}

export default connect(State)(Overlay);
