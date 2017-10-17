import { parseEncounter, parseCombatant } from '../utils/parseData';

export default {
  namespace: 'data',
  state: {},
  reducers: {
    save(state, { payload: data }) {
      return { ...state, data }.data;
    },
  },
  effects: {
    *update({ payload: data }, { put }) {
      const { Encounter, Combatant } = data;

      const Data = {
        Encounter: parseEncounter(Encounter),
        Combatant: parseCombatant(Combatant),
        isActive: data.isActive,
      };
      yield put({ type: 'save', payload: Data });
    },
  },
};
