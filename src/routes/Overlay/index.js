import { connect } from 'dva';
import { EncounterView, CombatantView, View } from '../../components';

const { Header, Body } = View;

const State = state => ({
  Encounter: state.data.Encounter,
  Combatant: state.data.Combatant,
  isActive: !state.loading.global && state.data.isActive,
});

const Overlay = ({ Encounter, Combatant, isActive }) => {
  return [
    <Header key="header">
      <EncounterView data={Encounter} isActive={isActive} />
    </Header>,
    <Body key="body">
      <CombatantView data={Combatant} isActive={isActive} />
    </Body>,
  ];
};

export default connect(State)(Overlay);
