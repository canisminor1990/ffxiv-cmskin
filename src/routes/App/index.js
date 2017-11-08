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
    const fontSize = this.props.uiScaleActive ? 16 * this.props.uiScale : 16;
    document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px';
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

  render() {
    const $ = this.props;

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
        </div>
      </ContextMenu>,
    ];
  }
}

export default connect(State)(App);
