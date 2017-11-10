import { connect } from 'dva';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Component } from 'react';
import { View } from '../../components';
import { getSetting } from '../../utils/getSetting';
import style from './index.scss';

const { Split } = View;
const SYNC_SETTING_TIMEOUT = 2000;
const Setting = ['fullscreen', 'uiTrans', 'uiScale', 'uiScaleActive', 'uiMini', 'hideName'];
const State = state => getSetting(Setting, state.setting);

class App extends Component {
  handleUiSize = fontSize =>
    (document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px');

  handleClick = payload => this.props.dispatch({ type: 'setting/update', payload: payload });
  handleSetting = () => {
    const Scale = this.props.uiScaleActive ? this.props.uiScale : 1;
    window.open('/setting/basic', '设置', `height=${640 * Scale}, width=${540 * Scale}`);
  };
  handleReload = () => window.location.reload();
  handleDebug = () => (window.debug = true);

  componentWillMount() {
    this.props.dispatch({ type: 'setting/root' });
    setInterval(() => this.props.dispatch({ type: 'setting/root' }), SYNC_SETTING_TIMEOUT);
  }

  render() {
    const $ = this.props;

    // 设置UI缩放
    this.handleUiSize($.uiScaleActive ? 16 * $.uiScale : 16);

    // 判断路径和环境
    const isInSetting = window.location.pathname.indexOf('setting') !== -1;
    const isInDevelop = process.env.NODE_ENV === 'development';

    // 规划右键菜单
    const BuildMenuItem = (name, data, on, off) => (
      <MenuItem key={name} onClick={() => this.handleClick({ [name]: !data })}>
        {data ? on : off}
      </MenuItem>
    );
    const MenuItemGroup = isInSetting
      ? null
      : [
          <div key="group" className={style.item}>
            {BuildMenuItem('fullscreen', $.fullscreen, '折叠菜单', '展开菜单')}
            {BuildMenuItem('uiTrans', $.uiTrans, '实体模式', '透明模式')}
            {BuildMenuItem('uiMini', $.uiMini, '完全模式', '迷你模式')}
            {BuildMenuItem('hideName', $.hideName, '显示ID', '马赛克ID')}
          </div>,
          <Split key="split" />,
        ];

    const MenuItemGroupSec = [
      isInSetting ? null : (
        <MenuItem key="setting" onClick={this.handleSetting}>
          设置
        </MenuItem>
      ),
      <MenuItem key="reload" onClick={this.handleReload}>
        刷新
      </MenuItem>,
      isInDevelop ? (
        <MenuItem key="debug" onClick={this.handleDebug}>
          DEBUG
        </MenuItem>
      ) : null,
    ];

    return [
      <ContextMenuTrigger key="menuTrigger" id="view" holdToDisplay={-1}>
        {$.children}
      </ContextMenuTrigger>,
      <ContextMenu key="menu" id="view" className={style.menu}>
        <div className={style.title}>菜单</div>
        <Split />
        {MenuItemGroup}
        <div className={style.item}>{MenuItemGroupSec}</div>
      </ContextMenu>,
    ];
  }
}

export default connect(State)(App);
