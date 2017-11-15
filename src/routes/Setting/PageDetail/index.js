import { connect } from 'dva';
import { View, Select } from '../../../components';
import { PageComponent } from '../Page';
import { getSetting } from '../../../utils/getSetting';
import { options } from '../../../data';
import style from '../index.scss';

const { Content, Split } = View;
const State = state => ({
  setting: state.setting,
});

class Overlay extends PageComponent {
  Setting = ['detailDamage', 'detailHeal', 'detailTank'];

  state = {
    timekey: 0,
    ...getSetting(this.Setting, this.props.setting),
  };

  select = (key, options) => {
    return [
      <Split key="Split" className={style.title} id={`setting.detail.${key}`} />,
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
          {this.select('detailDamage', options.Combatant.damage)}
          {this.select('detailHeal', options.Combatant.healing)}
          {this.select('detailTank', options.Combatant.tanking)}
        </div>
      </Content>,
      ...this.Footer,
    ];
  }
}

export default connect(State)(Overlay);
