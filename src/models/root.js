import { wsImpl } from '../services/websocket';

export default {
  namespace: 'root',
  state: {},
  subscriptions: {
    setup({ dispatch }) {
      document.addEventListener('onOverlayDataUpdate', e => {
        if (Object.keys(e.detail.Combatant).length > 0)
          dispatch({ type: 'act/update', payload: e.detail });
      });

      window.onload = () => {
        if (window.websocket) {
					const ws = new wsImpl(wsUri); // eslint-disable-line
          ws.connect();
          window.onbeforeunload = () => ws.close();
          window.addEventListener('unload', () => ws.close(), false);
        }
      };
    },
  },
};
