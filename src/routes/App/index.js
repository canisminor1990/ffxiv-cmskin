import { connect } from 'dva';
import Overlay from '../../components/Overlay';

const App = ({ dispatch }) => {
  document.addEventListener('onOverlayDataUpdate', data => {
    dispatch({ type: 'data/update', payload: data.detail });
  });
  window.addEventListener('message', data => {
    if (data.data.type === 'onOverlayDataUpdate') {
      dispatch({ type: 'data/update', payload: data.data.detail });
    }
  });

  return <Overlay />;
};

export default connect()(App);
