export default {
  namespace: 'setting',
  state: {
    fullscreen: true,
  },
  reducers: {
    save(state, { payload: data }) {
      return { ...state, data }.data;
    },
  },
  effects: {
    *update({ payload: data }, { put }) {
      yield put({ type: 'save', payload: data });
    },
  },
};
