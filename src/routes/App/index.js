import { View } from '../../components';
import { connect } from 'dva';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Component } from 'react';
import style from './index.scss';

const { Split } = View;
const State = state => ({
  fullscreen: state.setting.fullscreen,
  uiTrans: state.setting.uiTrans,
  uiScale: state.setting.uiScale,
  uiScaleActive: state.setting.uiScaleActive,
  miniMode: state.setting.miniMode,
});

class App extends Component {
  render() {
    const {
      dispatch,
      children,
      uiTrans,
      fullscreen,
      uiScale,
      uiScaleActive,
      miniMode,
    } = this.props;
    let Scale = 16;
    if (uiScaleActive) Scale = Scale * uiScale;
    document.getElementsByTagName('html')[0].style.fontSize = Scale + 'px';
    return [
      <ContextMenuTrigger id="view" key="view" holdToDisplay={-1}>
        {children}
      </ContextMenuTrigger>,
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
          <MenuItem
            onClick={() => dispatch({ type: 'setting/update', payload: { uiTrans: !uiTrans } })}
          >
            {uiTrans ? '实体模式' : '透明模式'}
          </MenuItem>
          <MenuItem
            onClick={() => dispatch({ type: 'setting/update', payload: { miniMode: !miniMode } })}
          >
            {miniMode ? '完全模式' : '迷你模式'}
          </MenuItem>
        </div>
        <Split />
        <div className={style.item}>
          <MenuItem onClick={() => window.open('/setting', '设置', 'height=500, width=360')}>
            设置
          </MenuItem>
          <MenuItem onClick={() => window.location.reload()}>刷新</MenuItem>
          <MenuItem
            onClick={() => window.open('https://coding.net/u/canisminor1990/p/ffxiv-cmskin/topic')}
          >
            反馈
          </MenuItem>
        </div>
      </ContextMenu>,
    ];
  }
}

export default connect(State)(App);
