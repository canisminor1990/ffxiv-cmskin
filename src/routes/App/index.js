import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Component } from 'react';
import { View, Message, Lang } from '../../components';
import { getSetting } from '../../utils/getSetting';
import style from './index.scss';

const { Split } = View;
const Setting = [
  'fullscreen',
  'uiTrans',
  'uiScale',
  'uiScaleActive',
  'uiMini',
  'uiAutoMiniActive',
  'hideName',
  'lang',
];
const State = state => getSetting(Setting, state.setting);

class App extends Component {
  state = { fullscreen: true };

  handleUiSize = fontSize =>
    (document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px');

  handleClick = payload => this.props.dispatch({ type: 'setting/update', payload: payload });
  handleSetting = () => {
    if (window.websocket) {
      this.props.dispatch(routerRedux.push('/setting/basic'));
    } else {
      const Scale = this.props.uiScaleActive ? this.props.uiScale : 1;
      window.open('/setting/basic', '设置', `height=${680 * Scale}, width=${480 * Scale}`);
    }
  };
  handleFullscreen = () => {
    const newState = !this.state.fullscreen;
    this.props.dispatch({ type: 'setting/update', payload: { fullscreen: newState } });
    this.setState({ fullscreen: newState });
  };
  handleReload = () => window.location.reload();
  handleDebug = () => (window.debug = true);
  handleRoot = () => {
    Message.info(Lang('setting.message.root'));
    setTimeout(() => {
      document.cookie = 'setting=false;path=/';
      document.cookie = 'setting=false';
      window.location.reload();
    }, 500);
  };

  componentWillMount() {
    this.props.dispatch({ type: 'setting/root' });
    setInterval(() => this.props.dispatch({ type: 'setting/root' }), 2000);
  }

  render() {
    const $ = this.props;
    // 设置UI缩放
    this.handleUiSize($.uiScaleActive ? 16 * $.uiScale : 16);

    // 判断路径和环境
    const isInSetting = window.location.pathname.indexOf('setting') !== -1;
    const isInDevelop = $isDev;

    // 规划右键菜单
    const BuildMenuItem = (name, data) => (
      <MenuItem key={name} onClick={() => this.handleClick({ [name]: !data })}>
        {Lang(data ? `menu.${name}.on` : `menu.${name}.off`)}
        {}
      </MenuItem>
    );
    const MenuItemGroup = [
      <div key="group" className={style.item}>
        {BuildMenuItem('fullscreen', $.fullscreen)}
        {BuildMenuItem('uiTrans', $.uiTrans)}
        {$.uiAutoMiniActive ? null : BuildMenuItem('uiMini', $.uiMini)}
        {BuildMenuItem('hideName', $.hideName)}
      </div>,
      <Split key="split" />,
    ];
    const MenuItemGroupSec = [
      isInSetting ? null : (
        <MenuItem key="setting" onClick={this.handleSetting}>
          {Lang('menu.setting')}
        </MenuItem>
      ),
      <MenuItem key="reload" onClick={this.handleReload}>
        {Lang('menu.refresh')}
      </MenuItem>,
      <MenuItem key="root" onClick={this.handleRoot}>
        {Lang('menu.root')}
      </MenuItem>,
      !isInDevelop ? null : (
        <MenuItem key="debug" onClick={this.handleDebug}>
          {Lang('menu.debug')}
        </MenuItem>
      ),
    ];

    const AppContent = $.fullscreen ? (
      [
        <ContextMenuTrigger key="menuTrigger" id="view" holdToDisplay={-1}>
          <View transparent={$.uiTrans} style={{ height: '100%' }}>
            <div className={style.fullscreenBtn} onClick={this.handleFullscreen}>
              <div className={style.fullscreenBtnInner} />
            </div>
            {$.children}
          </View>
        </ContextMenuTrigger>,
        <ContextMenu key="menu" id="view" className={style.menu}>
          <div className={style.title}>{Lang('menu.title')}</div>
          <Split />
          {MenuItemGroup}
          <div className={style.item}>{MenuItemGroupSec}</div>
        </ContextMenu>,
      ]
    ) : (
      <div className={$.uiTrans ? style.iconTrans : style.icon} onClick={this.handleFullscreen}>
        <div className={style.iconInner}>
          <img src="/img/icon.png" />
        </div>
      </div>
    );

    return AppContent;
  }
}

export default connect(State)(App);
