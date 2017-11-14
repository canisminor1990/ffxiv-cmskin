import { webs } from '../utils/ActWebsocket';

export default {
  namespace: 'event',
  state: {},
  subscriptions: {
    setup({ dispatch }) {
      if (window.websocket) {
        webs.connect();
        window.onbeforeunload = () => webs.close();
        window.addEventListener('unload', () => webs.close(), false);
      }
      document.addEventListener('onOverlayDataUpdate', e => {
        if (Object.keys(e.detail.Combatant).length > 0)
          dispatch({ type: 'act/update', payload: e.detail });
      });
    },
  },
};
