import { connect } from 'dva';

const State = state => ({
  Encounter: state.data.Encounter,
  Combatant: state.data.Combatant,
  isActive: !state.loading.global && state.data.isActive,
});

const Overlay = ({ Encounter, Combatant, isActive }) => {
  let title = '';

  if (isActive) {
    title = Encounter.currentZone;
  }

  return (
    <div>
      {title}
      <div>No data to show.</div>
    </div>
  );
};

export default connect(State)(Overlay);
