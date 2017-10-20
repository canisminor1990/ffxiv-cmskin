import _ from 'lodash';
import { parseCombatant } from '../utils/parseData';

export default {
  namespace: 'chart',
  state: {
    time: '',
    data: {},
  },
  reducers: {
    save(state, { payload: data }) {
      return { ...state, data }.data;
    },
  },
  effects: {
    *update({ payload: data }, { put, select }) {
      const { Encounter, Combatant } = data;
      const isActive = data.isActive;
      const Time = Encounter.duration;
      const timeBackup = yield select(state => state.chart.time);
      const { graphTime, graphTimeDefault, graphTimeActive } = yield select(state => state.setting);
      const Length = graphTimeActive ? graphTime : graphTimeDefault;
      let Graph = yield select(state => state.chart.data);
      if (isActive) {
        if (Time !== timeBackup) {
          _.forEach(parseCombatant(Combatant), item => {
            if (!Graph[item.name]) Graph[item.name] = [];
            try {
              Graph[item.name].push({
                time: Time,
                dps: item.damage.ps >= 0 ? item.damage.ps : 0,
                heal: item.healing.ps >= 0 ? item.healing.ps : 0,
                tank: item.tanking.total >= 0 ? item.tanking.total : 0,
              });
              if (Graph[item.name].length > Length) Graph[item.name].shift();
            } catch (e) {}
          });
        }
      } else {
        Graph = {};
      }
      yield put({ type: 'save', payload: { time: Time, data: Graph } });
    },
  },
};
