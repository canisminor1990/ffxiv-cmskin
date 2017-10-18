import { View } from '../../components';
import { connect } from 'dva';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import style from './index.scss';

const State = state => ({
  fullscreen: state.setting.fullscreen,
});

const App = ({ children, fullscreen, dispatch }) => {
  const handleClick = e => dispatch({ type: 'setting/update', payload: e });

  return [
    <ContextMenuTrigger key="view">
      <View>{children}</View>
    </ContextMenuTrigger>,
    <ContextMenu key="menu" className={style.menu}>
      <div>菜单</div>
      <MenuItem onClick={() => handleClick({ fullscreen: !fullscreen })}>
        {fullscreen ? '折叠菜单' : '展开菜单'}
      </MenuItem>
    </ContextMenu>,
  ];
};

export default connect(State)(App);
