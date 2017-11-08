import _ from 'lodash';
import { getCookie, setCookie } from '../utils/cookie';

const Setting = {
  // DIY
  name: '我',
  nameActive: false,
  img: '',
  imgActive: false,
  nameHide: '光之战士',
  nameHideActive: false,
  // Data
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
      return { ...state, data }.data;
    },
  },
  effects: {
    *root({}, { put, select }) {
      const Cookie = getCookie('setting');
      const Setting = yield select(state => state.setting);
      const Data = _.assign(Setting, Cookie);
      Data.fullscreen = true;
      Data.hideName = false;
      yield put({ type: 'save', payload: Data });
    },
    *update({ payload: data }, { put, select }) {
      const Setting = yield select(state => state.setting);
      const Data = _.assign(Setting, data);
      _.forEach(Data, (item, key) => {
        if (key.indexOf('Default') !== -1) delete Data[key];
      });
      setCookie('setting', Data);
      console.log('[CM] Setting Update');
      yield put({ type: 'save', payload: Data });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(() => {
        dispatch({ type: 'root' });
      });
    },
  },
};
