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
  uiMini: state.setting.uiMini,
  hideName: state.setting.hideName,
});

class App extends Component {
  handleClick = payload => this.props.dispatch({ type: 'setting/update', payload: payload });

  render() {
    const { children, uiTrans, fullscreen, uiScale, uiScaleActive, uiMini, hideName } = this.props;
    let Scale = 16;
    if (uiScaleActive) Scale = Scale * uiScale;
    document.getElementsByTagName('html')[0].style.fontSize = Scale + 'px';
    return [
      <ContextMenuTrigger id="view" key="overlay" holdToDisplay={-1}>
        {children}
      </ContextMenuTrigger>,
      <ContextMenu id="view" key="menu" className={style.menu}>
        <div className={style.title}>菜单</div>
        <Split />
        <div className={style.item}>
          <MenuItem onClick={() => this.handleClick({ fullscreen: !fullscreen })}>
            {fullscreen ? '折叠菜单' : '展开菜单'}
          </MenuItem>
          <MenuItem onClick={() => this.handleClick({ uiTrans: !uiTrans })}>
            {uiTrans ? '实体模式' : '透明模式'}
          </MenuItem>
          <MenuItem onClick={() => this.handleClick({ uiMini: !uiMini })}>
            {uiMini ? '完全模式' : '迷你模式'}
          </MenuItem>
          <MenuItem onClick={() => this.handleClick({ hideName: !hideName })}>
            {hideName ? '显示ID' : '马赛克ID'}
          </MenuItem>
        </div>
        <Split />
        <div className={style.item}>
          <MenuItem onClick={() => window.open('/setting', '设置', 'height=500, width=380')}>
            设置
          </MenuItem>
          <MenuItem onClick={() => window.location.reload()}>刷新</MenuItem>
        </div>
      </ContextMenu>,
    ];
  }
}

export default connect(State)(App);
