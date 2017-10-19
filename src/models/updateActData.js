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
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(() => {
        document.addEventListener('onOverlayDataUpdate', data => {
          dispatch({ type: 'update', payload: data.detail });
          dispatch({ type: 'chart/update', payload: data.detail });
        });
        window.addEventListener('message', data => {
          if (data.data.type === 'onOverlayDataUpdate') {
            dispatch({ type: 'update', payload: data.data.detail });
            dispatch({ type: 'chart/update', payload: data.data.detail });
          }
        });
      });
    },
  },
};
