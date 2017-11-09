export default {
  namespace: 'event',
  state: {},
  subscriptions: {
    setup({ dispatch }) {
      document.addEventListener('onOverlayDataUpdate', e => {
        if (Object.keys(e.detail.Combatant).length > 0) {
          dispatch({ type: 'act/update', payload: e.detail });
        }
      });
    },
  },
};
