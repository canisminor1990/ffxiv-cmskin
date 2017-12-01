import _ from 'lodash';
import { getCookie, setCookie } from '../services/cookie';
import { Console } from '../services/debug';

let timekey = -1;
const Setting = {
  lang: 'cn',
  // DIY
  name: '我',
  nameActive: true,
  img: '',
  imgActive: false,
  // Data
  graphHide: false,
  graphTime: 30,
  graphTimeActive: false,
  graphScale: true,
  pureHps: false,
  historyLength: 30,
  historyPage: 0,
  // UI
  fullscreen: true,
  uiTrans: false,
  uiMini: false,
  hideName: false,
  uiScale: 1,
  uiScaleActive: false,
  uiAutoMini: 5,
  uiAutoMiniActive: false,
  // Detail
  normalFull: ['time', 'damage.ps', 'healing.deaths'],
  normalMini: ['damage.ps'],
  normalDamage: ['directhit', 'criticals'],
  normalHeal: ['over', 'criticals'],
  normalTank: ['parry', 'block'],
  // Detail
  detailDamage: ['percent', 'criticals', 'directhit', 'critdirecthit'],
  detailHeal: ['percent', 'over', 'criticals', 'deaths'],
  detailTank: ['percent', 'parry', 'block', 'dodge'],
  // Quantityp
  qtDpsHigh: 140,
  qtDpsLow: 80,
  qtTankHigh: 80,
  qtTankLow: 50,
  qtHealHigh: 60,
  qtHealLow: 30,
  qtOverHealHigh: 10,
  qtOverHealLow: 30,
  qtUp: 120,
  qtDown: 80,
};

const SettingDefault = {};
_.forEach(Setting, (item, name) => {
  SettingDefault[`${name}Default`] = item;
});

export default {
  namespace: 'setting',
  state: {
    ...Setting,
    ...SettingDefault,
  },
  reducers: {
    save(state, { payload: data }) {
      return data;
    },
  },
  effects: {
    *root({}, { put, select }) {
      const Setting = yield select(state => state.setting);
      try {
        const Cookie = getCookie('setting');
        if (Cookie.timekey !== timekey) {
          const Data = _.assign(Setting, Cookie);
          timekey = Cookie.timekey;
          window.lang = Data.lang;
          yield put({ type: 'save', payload: Data });
          // debug
          console.log('[CM] Setting Load');
          Console.table(Data);
        }
      } catch (e) {
        setCookie('setting', Setting);
        console.log('[CM] Setting Root');
      }
    },
    *update({ payload: data }, { put, select }) {
      const Setting = yield select(state => state.setting);
      const Data = _.assign(Setting, data);
      Data.timekey++;
      setCookie('setting', Data);
      yield put({ type: 'save', payload: Data });
      // debug
      console.log('[CM] Setting Update');
      Console.table(Data);
    },
  },
};
