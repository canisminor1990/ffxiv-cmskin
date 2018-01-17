import { connect } from 'dva';
import { View, Input, Message, Lang } from '../../../components';
import { PageComponent } from '../Page';
import { Icon } from 'antd';
import { getSetting } from '../../../utils/getSetting';
import style from '../index.scss';

const { Content, Split } = View;
const State = state => ({
  setting: state.setting,
});

class Overlay extends PageComponent {
  Setting = [
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

  state = {
    timekey: 0,
    ...getSetting(this.Setting, this.props.setting),
  };

  inputOnChange = (e, name, isNumber) => {
    let { value } = e.target;
    if (isNumber) value = parseFloat(value);
    if (!value) {
      Message.error(Lang('setting.message.error'));
    } else {
      this.setState({ [name]: value });
    }
  };

  render() {
    const $ = this.state;

    const Item = (is, data, icon, desc = 'avDps') => (
      <div className={style.qtList}>
        <span>{Lang(`setting.quantity.is.${is}`)}</span>
        <Input defaultValue={$[data]} onChange={e => this.inputOnChange(e, data)} />
        <span>% {Lang(`setting.quantity.desc.${desc}`)}</span>
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
      ...this.Footer,
    ];
  }
}

export default connect(State)(Overlay);
