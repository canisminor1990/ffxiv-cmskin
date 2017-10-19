import { View } from '../../components';
import { connect } from 'dva';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Component } from 'react';
import style from './index.scss';

const { Split } = View;
const State = state => ({
  fullscreen: state.setting.fullscreen,
});

class App extends Component {
  handleClick = e => this.props.dispatch({ type: 'setting/update', payload: e });
  showMenu = () => {};

  render() {
    const { children, fullscreen } = this.props;
    return (
      <View style={fullscreen ? { height: '100%' } : {}}>
        <ContextMenuTrigger id="view" key="view">
          <div className={style.setting} onClick={this.showMenu} />
          {children}
        </ContextMenuTrigger>
        <ContextMenu id="view" key="menu" className={style.menu}>
          <div className={style.title}>菜单</div>
          <Split />
          <MenuItem
            className={style.time}
            onClick={() => this.handleClick({ fullscreen: !fullscreen })}
          >
            {fullscreen ? '折叠菜单' : '展开菜单'}
          </MenuItem>
        </ContextMenu>
      </View>
    );
  }
}

export default connect(State)(App);
