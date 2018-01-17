import style from './index.scss';
import { Component } from 'react';
import { Icon } from 'antd';
import { View, InfoList, Logo, Lang } from '../../../components';

const { Split } = View;

class Splash extends Component {
  state = {
    changelog: false,
    usage: false,
    copyright: false,
  };

  HandleShowAll = type =>
    this.state[type] ? null : (
      <a key="showall" className={style.showall} onClick={() => this.setState({ [type]: true })}>
        {Lang('splash.more')} <Icon type="caret-down" />
      </a>
    );

  MapList = type =>
    Lang(type).map((item, key) => {
      if (!this.state[type] && key > 1) return;
      const Data = item.split('|');
      const title = Data[1];
      const desc = Data[2] + (Data[3] ? ` ${Data[3]}` : '');
      return <InfoList key={key} title={title} desc={desc} className={`${type}-${key}`} />;
    });

  BuildList = name => [
    <Split
      key={name}
      className={style.line}
      id={`splash.${name}`}
      right={this.HandleShowAll(name)}
    />,
    <div key={name + 'list'} className={style.list}>
      {this.MapList(name)}
    </div>,
  ];

  render() {
    return (
      <div className={style.view}>
        <div className={style.logo}>
          <Logo size={300} />
        </div>
        {this.BuildList('changelog')}
        {this.BuildList('usage')}
        {this.BuildList('copyright')}
      </div>
    );
  }
}

export default Splash;
