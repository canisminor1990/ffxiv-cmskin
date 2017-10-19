import { View } from '../../components';
import { connect } from 'dva';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import style from './index.scss';

const { Split } = View;
const State = state => ({
  fullscreen: state.setting.fullscreen,
});

const App = ({ children, fullscreen, dispatch }) => {
  const handleClick = e => dispatch({ type: 'setting/update', payload: e });

  return (
    <View style={fullscreen ? { height: '100%' } : {}}>
      <ContextMenuTrigger id="view" key="view">
        {children}
      </ContextMenuTrigger>
      <ContextMenu id="view" key="menu" className={style.menu}>
        <div className={style.title}>菜单</div>
        <Split />
        <MenuItem className={style.time} onClick={() => handleClick({ fullscreen: !fullscreen })}>
          {fullscreen ? '折叠菜单' : '展开菜单'}
        </MenuItem>
      </ContextMenu>
    </View>
  );
};

export default connect(State)(App);
