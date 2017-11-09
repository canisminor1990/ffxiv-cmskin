import { connect } from 'dva';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Component } from 'react';
import { View } from '../../components';
import { getSetting } from '../../utils/getSetting';
import style from './index.scss';

const { Split } = View;
const Setting = ['fullscreen', 'uiTrans', 'uiScale', 'uiScaleActive', 'uiMini', 'hideName'];
const State = state => getSetting(Setting, state.setting);

class App extends Component {
  componentWillMount() {
    this.props.dispatch({ type: 'setting/root' });
    setInterval(() => {
      this.props.dispatch({ type: 'setting/root' });
    }, 1000);
  }

  handleClick = payload => this.props.dispatch({ type: 'setting/update', payload: payload });
  handleSetting = () => {
    const Scale = this.props.uiScaleActive ? this.props.uiScale : 1;
    window.open('/setting/basic', '设置', `height=${640 * Scale}, width=${540 * Scale}`);
  };
  handleReload = () => window.location.reload();

  MenuItem = (name, data, on, off) => (
    <MenuItem onClick={() => this.handleClick({ [name]: !data })}>{data ? on : off}</MenuItem>
  );

  UiSize = fontSize => (document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px');

  render() {
    const $ = this.props;
    this.UiSize($.uiScaleActive ? 16 * $.uiScale : 16);
    return [
      <ContextMenuTrigger id="view" key="overlay" holdToDisplay={-1}>
        {$.children}
      </ContextMenuTrigger>,
      <ContextMenu id="view" key="menu" className={style.menu}>
        <div className={style.title}>菜单</div>
        <Split />
        <div className={style.item}>
          {this.MenuItem('fullscreen', $.fullscreen, '折叠菜单', '展开菜单')}
          {this.MenuItem('uiTrans', $.uiTrans, '实体模式', '透明模式')}
          {this.MenuItem('uiMini', $.uiMini, '完全模式', '迷你模式')}
          {this.MenuItem('hideName', $.hideName, '显示ID', '马赛克ID')}
        </div>
        <Split />
        <div className={style.item}>
          <MenuItem onClick={this.handleSetting}>设置</MenuItem>
          <MenuItem onClick={this.handleReload}>刷新</MenuItem>
          {process.env.NODE_ENV === 'development' ? (
            <MenuItem onClick={() => (window.debug = true)}>DEBUG</MenuItem>
          ) : null}
        </div>
      </ContextMenu>,
    ];
  }
}

export default connect(State)(App);
