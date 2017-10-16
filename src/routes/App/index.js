import { connect } from 'dva';
import { View } from '../../components';
const App = ({ dispatch, children }) => {
  document.addEventListener('onOverlayDataUpdate', data => {
    dispatch({ type: 'data/update', payload: data.detail });
  });
  window.addEventListener('message', data => {
    if (data.data.type === 'onOverlayDataUpdate') {
      dispatch({ type: 'data/update', payload: data.data.detail });
    }
  });

  return <View>{children}</View>;
};

export default connect()(App);
