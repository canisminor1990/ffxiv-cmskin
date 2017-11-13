import { connect } from 'dva';
import { View, Button, Input, Message, Lang } from '../../../components';
import { Component } from 'react';
import { Icon } from 'antd';
import { getSetting } from '../../../utils/getSetting';
import style from '../index.scss';

const { Content, Footer, Split } = View;
const State = state => ({
  setting: state.setting,
});

const Setting = [
  'qtDpsHigh',
  'qtDpsLow',
  'qtTankHigh',
  'qtTankLow',
  'qtHealHigh',
  'qtHealLow',
  'qtOverHealHigh',
  'qtOverHealLow',
  'qtUp',
  'qtDown',
];

class Overlay extends Component {
  state = {
    timekey: 0,
    ...getSetting(Setting, this.props.setting),
  };

  inputOnChange = (e, name, isNumber) => {
    let { value } = e.target;
    if (isNumber) value = parseFloat(value);
    if (!value) {
      Message.error(<Lang id="setting.message.error" />);
    } else {
      this.setState({ [name]: value });
    }
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

  render() {
    const $ = this.state;

    const Item = (is, data, icon, desc = 'avDps') => (
      <div className={style.qtList}>
        <span>
          <Lang id={`setting.quantity.is.${is}`} />
        </span>
        <Input defaultValue={$[data]} onChange={e => this.inputOnChange(e, data)} />
        <span>
          % <Lang id={`setting.quantity.desc.${desc}`} />
        </span>
        <span className={style.qtRight}>
          <Icon type="caret-right" />
        </span>
        <span className={style[icon]}>
          <Icon type={icon} />
        </span>
      </div>
    );

    const Group = (title, type, is = ['large', 'small'], desc, icon = ['smile', 'frown']) => (
      <div className={style.qtGroup}>
        <Split className={style.title} id={`setting.quantity.title.${title}`} />
        {Item(is[0], type[0], icon[0], desc)}
        {Item(is[1], type[1], icon[1], desc)}
      </div>
    );

    return [
      <Content key={$.timekey} className={style.content}>
        <div className={style.body}>
          {Group('updwon', ['qtUp', 'qtDown'], ['dps10high', 'dps10low'], 'dps60', [
            'arrow-up',
            'arrow-down',
          ])}
          {Group('damage', ['qtDpsHigh', 'qtDpsLow'])}
          {Group('tank', ['qtTankHigh', 'qtTankLow'])}
          {Group('heal', ['qtHealHigh', 'qtHealLow'])}
          {Group('overheal', ['qtOverHealHigh', 'qtOverHealLow'], ['low', 'high'], 'overHeal')}
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
