import { View } from '../../components';
import { getCookie } from '../../utils/cookie';
import { connect } from 'dva';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Component } from 'react';
import style from './index.scss';

const { Split } = View;
const State = state => ({
  timekey: state.setting.timekey,
  fullscreen: state.setting.fullscreen,
  uiScale: state.setting.uiScale,
  uiScaleActive: state.setting.uiScaleActive,
});

class App extends Component {
  render() {
    const { dispatch, children, timekey, fullscreen, uiScale, uiScaleActive } = this.props;
    setInterval(() => {
      const data = getCookie('setting');
      if (data.timekey !== timekey) dispatch({ type: 'setting/root' });
    }, 1000);
    let Scale = 16;
    if (uiScaleActive) Scale = Scale * uiScale;
    document.getElementsByTagName('html')[0].style.fontSize = Scale + 'px';
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
              扩展设置
            </MenuItem>
            <MenuItem onClick={() => window.location.reload()}> 刷新 </MenuItem>
            <MenuItem
              onClick={() =>
                window.open('https://coding.net/u/canisminor1990/p/ffxiv-cmskin/topic')}
            >
              反馈
            </MenuItem>
          </div>
        </ContextMenu>
      </View>
    );
  }
}

export default connect(State)(App);
