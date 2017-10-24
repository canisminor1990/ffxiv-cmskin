import _ from 'lodash';
import { getCookie } from '../utils/cookie';

export default {
  namespace: 'setting',
  state: {
    fullscreen: true,
    uiTrans: false,
    miniMode: false,
    hideName: false,
    name: '我',
    nameDefault: '我',
    nameActive: false,
    img: '',
    imgDefault: '',
    imgActive: false,
    diyHideName: '光之战士',
    diyHideNameDefault: '光之战士',
    diyHideNameActive: false,
    graphTime: 30,
    graphTimeDefault: 30,
    graphTimeActive: false,
    uiScale: 1,
    uiScaleDefault: 1,
    uiScaleActive: false,
  },
  reducers: {
    save(state, { payload: data }) {
      return { ...state, data }.data;
    },
  },
  effects: {
    *root({}, { put, select }) {
      const data = getCookie('setting');
      const Setting = yield select(state => state.setting);
      yield put({ type: 'save', payload: _.assign(Setting, data) });
    },
    *update({ payload: data }, { put, select }) {
      const Setting = yield select(state => state.setting);
      yield put({ type: 'save', payload: _.assign(Setting, data) });
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
