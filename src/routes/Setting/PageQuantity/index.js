import { connect } from 'dva';
import { View, Button, Input, Message } from '../../../components';
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
      Message.error('数值错误');
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
    Message.success('重置成功');
  };

  onSave = () => {
    this.setState({ timekey: this.state.timekey + 1 });
    this.props.dispatch({ type: 'setting/update', payload: this.state });
    Message.success('应用成功');
  };

  render() {
    const $ = this.state;

    const Item = (title, data, icon, desc = '团队平均DPS') => (
      <div className={style.qtList}>
        <span>{title}</span>
        <Input defaultValue={$[data]} onChange={e => this.inputOnChange(e, data)} />
        <span>% {desc}</span>
        <span className={style.qtRight}>
          <Icon type="caret-right" />
        </span>
        <span className={style[icon]}>
          <Icon type={icon} />
        </span>
      </div>
    );

    const Group = (title, type, func = ['大于', '小于'], desc, icon = ['smile', 'frown']) => (
      <div className={style.qtGroup}>
        <Split className={style.title} title={title} />
        {Item(func[0], type[0], icon[0], desc)}
        {Item(func[1], type[1], icon[1], desc)}
      </div>
    );

    return [
      <Content key={$.timekey} className={style.content}>
        <div className={style.body}>
          {Group('输出升降提示', ['qtUp', 'qtDown'], ['10秒DPS 高于', '10秒DPS 低于'], '60秒DPS', [
            'arrow-up',
            'arrow-down',
          ])}
          {Group('输出职业DPS判定', ['qtDpsHigh', 'qtDpsLow'])}
          {Group('坦克职业DPS判定', ['qtTankHigh', 'qtTankLow'])}
          {Group('治疗职业DPS判定', ['qtHealHigh', 'qtHealLow'])}
          {Group('治疗职业过量判定', ['qtOverHealHigh', 'qtOverHealLow'], ['低于', '高于'], '过量治疗')}
        </div>
      </Content>,
      <Split key="split" />,
      <Footer className={style.foot} key="footer" hasBtn>
        <div className={style.btngroup}>
          <Button onClick={this.onDefault}>恢复默认</Button>
          <Button onClick={this.onSave}>应用</Button>
        </div>
      </Footer>,
    ];
  }
}

export default connect(State)(Overlay);
