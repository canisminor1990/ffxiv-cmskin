import { parseEncounter, parseCombatant } from '../services/parseData';
import { Lang } from '../components';
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
      try {
        const { Encounter, Combatant, isActive } = newData;
        const {
          graphTime,
          graphTimeDefault,
          graphTimeActive,
          historyLength,
          pureHps,
        } = yield select(state => state.setting);

        const newEncounter = parseEncounter(Encounter);
        const newCombatant = parseCombatant(Combatant);

        const Length = graphTimeActive ? graphTime : graphTimeDefault;
        const isNew = newEncounter.name !== 'Encounter';

        let data = yield select(state => state.act);
        let newChart =
          data[0] && data[0].Encounter && data[0].Encounter.name !== 'header.save'
            ? data[0].Chart
            : {};

        let avAllDps = 0;
        let numberAll = 0;
        let hasDps = false;

        const reMap = item => {
          // 平均dps
          if (item.role) {
            avAllDps += item.damage.ps;
            numberAll += 1;
          }

          // 是否有输出职业
          if (item.role === 'dps') hasDps = true;

          // 过量是否计入hps
          if (pureHps)
            item.healing.ps = parseInt(item.healing.ps * (100 - parseInt(item.healing.over)) / 100);

          // 图标和历史记录相关
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
        };

        newCombatant.forEach(reMap);

        // 有DPS职业只计算DPS职业的平均dps
        newEncounter.damage.avps = Math.floor(avAllDps / numberAll);
        newEncounter.hasDps = hasDps;

        // 重构数据结构
        const newDate = new Date();
        const FormatDate = input => (input.toString().length === 1 ? `0${input}` : input);
        const parseData = {
          Date: FormatDate(newDate.getHours()) + ':' + FormatDate(newDate.getMinutes()),
          Encounter: newEncounter,
          Combatant: newCombatant,
          Chart: newChart,
          isActive: isActive,
        };

        // 判断战斗是否结束
        if (isNew) {
          if (data.length > historyLength) data.pop();
          data.unshift(parseData);
          data[1].Encounter.name = newEncounter.name;
          data[0].Encounter.name = Lang('header.save');
        } else {
          parseData.Encounter.name = Lang('header.inbattle');
          data[0] = _.assign(data[0], parseData);
        }

        yield put({ type: 'save', payload: data });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
