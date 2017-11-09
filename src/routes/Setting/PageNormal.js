import { connect } from 'dva';
import { View, Button, Message, Select } from '../../components';
import { Component } from 'react';
import { getSetting } from '../../utils/getSetting';
import { options } from '../../data';
import style from './index.scss';

const { Content, Footer, Split } = View;
const State = state => ({
  setting: state.setting,
});

const Setting = ['normalFull', 'normalMini', 'normalDamage', 'normalHeal', 'normalTank'];

class Overlay extends Component {
  state = {
    timekey: 0,
    ...getSetting(Setting, this.props.setting),
  };

  checkboxOnChange = (e, name) => {
    const { checked } = e.target;
    this.setState({ [name]: checked });
  };

  onDefault = () => {
    const Default = {
      timekey: this.state.timekey + 1,
      ...getSetting(Setting, this.props.setting, true),
    };
    this.setState(Default);
    Message.success('重置成功');
  };

  onSave = () => {
    this.setState({ timekey: this.state.timekey + 1 });
    this.props.dispatch({ type: 'setting/update', payload: this.state });
    Message.success('保存成功');
  };

  select = (title, key, options) => {
    return [
      <Split key="Split" className={style.title} title={title} />,
      <Select
        key="Select"
        defaultValue={this.state[key]}
        options={options}
        onChange={value => this.setState({ [key]: value })}
      />,
      <br key="br" />,
    ];
  };

  render() {
    const $ = this.state;
    return [
      <Content key={$.timekey} className={style.content}>
        <div className={style.body}>
          {this.select('完全模式', 'normalFull', options.Encounter)}
          {this.select('迷你模式', 'normalMini', options.Encounter)}
          {this.select('输出标签', 'normalDamage', options.Combatant.damage)}
          {this.select('治疗标签', 'normalHeal', options.Combatant.healing)}
          {this.select('承伤标签', 'normalTank', options.Combatant.tanking)}
        </div>
      </Content>,
      <Split key="split" />,
      <Footer className={style.foot} key="footer">
        <div className={style.btngroup}>
          <Button onClick={this.onDefault}>恢复默认</Button>
          <Button onClick={this.onSave}>保存</Button>
        </div>
      </Footer>,
    ];
  }
}

export default connect(State)(Overlay);
