import { connect } from 'dva';
import { View, Button, Message, Select, Lang } from '../../../components';
import { Component } from 'react';
import { getSetting } from '../../../utils/getSetting';
import { options } from '../../../data';
import style from '../index.scss';

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
    Message.success(<Lang id="setting.message.reset" />);
  };

  onSave = () => {
    this.setState({ timekey: this.state.timekey + 1 });
    this.props.dispatch({ type: 'setting/update', payload: this.state });
    Message.success(<Lang id="setting.message.apply" />);
  };

  select = (key, options) => {
    return [
      <Split key="Split" className={style.title} id={`setting.normal.${key}`} />,
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
          {this.select('normalFull', options.Encounter)}
          {this.select('normalMini', options.Encounter)}
          {this.select('normalDamage', options.Combatant.damage)}
          {this.select('normalHeal', options.Combatant.healing)}
          {this.select('normalTank', options.Combatant.tanking)}
        </div>
      </Content>,
      <Split key="split" />,
      <Footer className={style.foot} key="footer" hasBtn>
        <div className={style.btngroup}>
          <Button onClick={this.onDefault}>
            <Lang id="setting.btn.reset" />
          </Button>
          <Button onClick={this.onSave}>
            <Lang id="setting.btn.apply" />
          </Button>
        </div>
      </Footer>,
    ];
  }
}

export default connect(State)(Overlay);
