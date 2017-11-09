import { connect } from 'dva';
import { Component } from 'react';
import classnames from 'classnames/bind';
import { EncounterView, AllView, CombatantView, View, NoticeBar } from '../../components';
import { getSetting } from '../../utils/getSetting';
import Package from '../../../package.json';
import style from './index.scss';

const { Header, Content, Bar, Footer, Split } = View;
const Setting = [
  'fullscreen',
  'uiMini',
  'uiTrans',
  'normalFull',
  'normalMini',
  'normalDamage',
  'normalHeal',
  'normalTank',
];

const State = state => {
  const act = state.act[state.setting.historyPage];
  return {
    timeout: 0,
    Encounter: act ? act.Encounter : {},
    Combatant: act ? act.Combatant : {},
    Chart: act ? act.Chart : {},
    isActive: act ? act.isActive : false,
    ...getSetting(Setting, state.setting),
  };
};

class Overlay extends Component {
  state = {
    tab: 'dps',
  };

  tabClass = (tab, name) => {
    const tabClass = classnames.bind(style)('tab', { active: this.state.tab === tab });
    return (
      <span key={name} className={tabClass} onClick={() => this.setState({ tab: tab })}>
        {name}
      </span>
    );
  };

  render() {
    const $ = this.props;

    const BarInner = this.props.uiMini ? null : (
      <Bar key="bar">
        <NoticeBar option={$.normalFull} data={$.Encounter} isActive={$.isActive} />
      </Bar>
    );

    const ContentInner =
      this.state.tab === 'all' ? (
        <AllView Encounter={$.Encounter} Combatant={$.Combatant} Chart={$.Chart} />
      ) : (
        <CombatantView
          tab={this.state.tab}
          data={$.Combatant}
          log={Package}
          chart={$.Chart}
          time={$.Encounter ? $.Encounter.duration : ''}
          isActive={$.isActive}
        />
      );

    const FooterInner = this.props.isActive
      ? [
          this.tabClass('dps', '输出'),
          this.tabClass('heal', '治疗'),
          this.tabClass('tank', '承伤'),
          this.tabClass('all', '统计'),
        ]
      : null;

    return (
      <View
        transparent={$.uiTrans}
        style={$.fullscreen || this.state.tab === 'all' ? { height: '100%' } : {}}
      >
        <Header key="header" uiMini={$.uiMini}>
          <EncounterView
            option={$.normalMini}
            data={$.Encounter}
            log={Package}
            isActive={$.isActive}
            uiMini={$.uiMini}
          />
        </Header>
        {BarInner}
        <Content key="body">{ContentInner}</Content>
        <Split key="split" />
        <Footer key="footer" isActive={$.isActive}>
          {FooterInner}
        </Footer>
      </View>
    );
  }
}

export default connect(State)(Overlay);
