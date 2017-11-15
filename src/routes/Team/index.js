import { connect } from 'dva';
import { View, Back } from '../../components';
import ViewHeader from '../Overlay/ViewHeader';
import TabGroup from './TabGroup';
import { getSetting } from '../../utils/getSetting';

const { Header, Content, Footer, Split } = View;
const Setting = ['uiMini', 'normalMini'];

const State = state => {
  const act = state.act[state.setting.historyPage];
  return {
    Encounter: act ? act.Encounter : {},
    Combatant: act ? act.Combatant : {},
    ...getSetting(Setting, state.setting),
  };
};

const Team = $ => {
  return [
    <Header key="header" uiMini={$.uiMini}>
      <ViewHeader option={$.normalMini} data={$.Encounter} uiMini={$.uiMini} />
    </Header>,
    <Content key="body">
      <TabGroup Encounter={$.Encounter} Combatant={$.Combatant} />
    </Content>,
    <Split key="split" />,
    <Footer key="footer">
      <Back />
    </Footer>,
  ];
};

export default connect(State)(Team);
