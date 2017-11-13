import style from './index.scss';
import classnames from 'classnames/bind';
import { Component } from 'react';
import { Icon } from 'antd';
import { View, LangStr } from '../';

const { Split } = View;

class ChangeLog extends Component {
  state = {
    changelog: false,
    usage: false,
    copyright: false,
  };

  Buildlog = type =>
    LangStr(type).map((item, key) => {
      if (!this.state[type] && key > 1) return;
      const Data = item.split('|');
      return (
        <div className={classnames.bind(style)('item', `${type}-${key}`)} key={key}>
          <div className={style.time}>{Data[1]}</div>
          <p className={style.content}>
            {Data[2]}
            {Data[3] ? ` ${Data[3]}` : null}
          </p>
        </div>
      );
    });

  ShowAll = type =>
    this.state[type] ? null : (
      <a key="showall" className={style.showall} onClick={() => this.setState({ [type]: true })}>
        展开 <Icon type="caret-down" />
      </a>
    );

  render() {
    return (
      <div>
        <Split className={style.line} title="更新说明" right={this.ShowAll('changelog')} />
        <div className={style.list}>{this.Buildlog('changelog')}</div>
        <Split className={style.line} title="使用说明" right={this.ShowAll('usage')} />
        <div className={style.list}>{this.Buildlog('usage')}</div>
        <Split className={style.line} title="版权信息" right={this.ShowAll('copyright')} />
        <div className={style.list}>{this.Buildlog('copyright')}</div>
      </div>
    );
  }
}

export default ChangeLog;
