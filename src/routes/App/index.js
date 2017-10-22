import { View } from '../../components';
import { connect } from 'dva';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Component } from 'react';
import style from './index.scss';

const { Split } = View;
const State = state => ({
  fullscreen: state.setting.fullscreen,
  uiScale: state.setting.uiScale,
  uiScaleActive: state.setting.uiScaleActive,
});

class App extends Component {
  render() {
    const { dispatch, children, fullscreen, uiScale, uiScaleActive } = this.props;
    if (uiScaleActive)
      document.getElementsByTagName('html')[0].style.fontSize = 16 * uiScale + 'px';
    return (
      <View style={fullscreen ? { height: '100%' } : {}}>
        <ContextMenuTrigger id="view" key="view" holdToDisplay={-1}>
          {children}
        </ContextMenuTrigger>
        <ContextMenu id="view" key="menu" className={style.menu}>
          <div className={style.title}>菜单</div>
          <Split />
          <div className={style.item}>
            <MenuItem
              onClick={() =>
                dispatch({ type: 'setting/update', payload: { fullscreen: !fullscreen } })}
            >
              {fullscreen ? '折叠菜单' : '展开菜单'}
            </MenuItem>
            <MenuItem onClick={() => window.open('/setting', '设置', 'height=500, width=360')}>
              设置
            </MenuItem>
          </div>
        </ContextMenu>
      </View>
    );
  }
}

export default connect(State)(App);
