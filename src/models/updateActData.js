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
      const { graphTime, graphTimeDefault, graphTimeActive, historyLength, pureHps } = yield select(
        state => state.setting
      );

      const newEncounter = parseEncounter(Encounter);
      const newCombatant = parseCombatant(Combatant);

      if (pureHps) {
        newCombatant.forEach(item => {
          item.healing.ps = parseInt(item.healing.ps * (100 - parseInt(item.healing.over)) / 100);
        });
      }

      const Length = graphTimeActive ? graphTime : graphTimeDefault;
      const isNew = newEncounter.name !== 'Encounter';

      let data = yield select(state => state.act);
      let newChart =
        data[0] && data[0].Encounter && data[0].Encounter.name !== '战斗历史已保存' ? data[0].Chart : {};
      newCombatant.forEach(item => {
        if (!newChart[item.name]) newChart[item.name] = [];
        try {
          newChart[item.name].push({
            time: newEncounter.time,
            dps: item.damage.ps >= 0 ? item.damage.ps : 0,
            heal: item.healing.ps >= 0 ? item.healing.ps : 0,
            tank: item.tanking.total >= 0 ? item.tanking.total : 0,
          });
          if (newChart[item.name].length > Length) newChart[item.name].shift();
        } catch (e) {}
      });

      const newDate = new Date();
      const FormatDate = input => (input.toString().length === 1 ? `0${input}` : input);
      const parseData = {
        Date: FormatDate(newDate.getHours()) + ':' + FormatDate(newDate.getMinutes()),
        Encounter: newEncounter,
        Combatant: newCombatant,
        Chart: newChart,
        isActive: isActive,
      };
      if (isNew) {
        if (data.length > historyLength) data.pop();
        data.unshift(parseData);
        data[1].Encounter.name = newEncounter.name;
        data[0].Encounter.name = '战斗历史已保存';
      } else {
        parseData.Encounter.name = '战斗中';
        data[0] = _.assign(data[0], parseData);
      }

      yield put({ type: 'save', payload: data });
    },
  },
};
