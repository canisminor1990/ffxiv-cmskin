import { connect } from 'dva';
import { EncounterView, CombatantView, View, NoticeBar } from '../../components';
import { Component } from 'react';

const { Header, Content, Bar, Footer } = View;

const State = state => ({
  Encounter: state.data.Encounter,
  Combatant: state.data.Combatant,
  isActive: !state.loading.global && state.data.isActive,
});

class Overlay extends Component {
  state = {
    tab: 'dps',
  };

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
      <Footer key="footer">
        <span onClick={() => this.setState({ tab: 'dps' })}>输出</span>
        <span onClick={() => this.setState({ tab: 'heal' })}>治疗</span>
        <span onClick={() => this.setState({ tab: 'tank' })}>承伤</span>
      </Footer>,
    ];
  }
}

export default connect(State)(Overlay);
