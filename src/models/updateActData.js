import { parseEncounter, parseCombatant } from '../utils/parseData';
import _ from 'lodash';

export default {
  namespace: 'act',
  state: [],
  reducers: {
    save(state, { payload: data }) {
      return data;
    },
  },
  effects: {
    *update({ payload: newData }, { put, select }) {
      const { Encounter, Combatant, isActive } = newData;

      const { name, time } = yield select(state => state.event);

      let data = yield select(state => state.act);

      const newEncounter = parseEncounter(Encounter);
      const newCombatant = parseCombatant(Combatant);

      const newName = newEncounter.name;
      const newTime = newEncounter.time;

      const { graphTime, graphTimeDefault, graphTimeActive } = yield select(state => state.setting);
      const Length = graphTimeActive ? graphTime : graphTimeDefault;

      let newChart = newName === name && data[0] ? data[0].Chart : {};
      _.forEach(newCombatant, item => {
        if (!newChart[item.name]) newChart[item.name] = [];
        try {
          newChart[item.name].push({
            time: time,
            dps: item.damage.ps >= 0 ? item.damage.ps : 0,
            heal: item.healing.ps >= 0 ? item.healing.ps : 0,
            tank: item.tanking.total >= 0 ? item.tanking.total : 0,
          });
          if (newChart[item.name].length > Length) newChart[item.name].shift();
        } catch (e) {}
      });

      const newDate = new Date();

      const parseData = {
        Date: newDate.getHours() + ':' + newDate.getMinutes(),
        Encounter: newEncounter,
        Combatant: newCombatant,
        Chart: newChart,
        isActive: isActive,
      };

      if (newName === name) {
        data[0] = _.assign(data[0], parseData);
      } else {
        const history = yield select(state => state.setting.historyLength);
        if (data.length > history) data.pop();
        data.unshift(parseData);
      }

      yield put({ type: 'save', payload: data });
      yield put({ type: 'event/save', payload: { name: newName, time: newTime } });
    },
  },
};
