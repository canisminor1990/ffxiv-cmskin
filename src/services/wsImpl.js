import wsInterface from './wsInterface';

class wsImpl extends wsInterface {
  constructor(uri, path = 'MiniParse') {
    super(uri, path);
  }

  onRecvMessage(e) {}

  onBroadcastMessage(e) {
    if (e.detail.msgtype === 'CombatData')
      document.dispatchEvent(new CustomEvent('onOverlayDataUpdate', { detail: e.detail.msg }));
  }
}

export default wsImpl;
