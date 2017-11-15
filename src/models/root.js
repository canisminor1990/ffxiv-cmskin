import wsImpl from '../services/wsImpl';
const ws = new wsImpl(wsUri); // eslint-disable-line

export default {
  namespace: 'root',
  state: {},
  subscriptions: {
    setup({ dispatch }) {
      if (window.wsocket) {
        ws.connect();
        window.onbeforeunload = () => ws.close();
        window.addEventListener('unload', () => ws.close(), false);
      }
      document.addEventListener('onOverlayDataUpdate', e => {
        if (Object.keys(e.detail.Combatant).length > 0)
          dispatch({ type: 'act/update', payload: e.detail });
      });
    },
  },
};
