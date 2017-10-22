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
  uiTrans: state.setting.uiTrans,
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

  render() {
    const { Encounter, Combatant, isActive, uiTrans, fullscreen } = this.props;

    return (
      <View transparent={uiTrans} style={fullscreen ? { height: '100%' } : {}}>
        <Header key="header">
          <EncounterView data={Encounter} isActive={isActive} />
        </Header>
        <Bar key="bar">
          <NoticeBar data={Encounter} isActive={isActive} />
        </Bar>
        <Content key="body">
          <CombatantView
            tab={this.state.tab}
            data={Combatant}
            time={Encounter ? Encounter.duration : ''}
            isActive={isActive}
          />
        </Content>
        <Split key="split" />
        {isActive ? (
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
          </Footer>
        ) : null}
      </View>
    );
  }
}

export default connect(State)(Overlay);
