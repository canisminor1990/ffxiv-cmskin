import { connect } from 'dva';
import { View, Checkbox, Input, Message, Select, Lang } from '../../../components';
import { PageComponent } from '../Page';
import { getSetting } from '../../../utils/getSetting';
import style from '../index.scss';

const { Content, Split } = View;
const State = state => ({
  setting: state.setting,
});

class Overlay extends PageComponent {
  Setting = [
    'lang',
    'name',
    'nameActive',
    'img',
    'imgActive',
    'pureHps',
    'graphHide',
    'graphScale',
    'graphTime',
    'graphTimeActive',
    'historyLength',
    'uiScale',
    'uiScaleActive',
    'uiTrans',
    'uiMini',
    'uiAutoMini',
    'uiAutoMiniActive',
  ];

  state = {
    timekey: 0,
    ...getSetting(this.Setting, this.props.setting),
  };

  handleLangChange = value => {
    this.setState({ lang: value });
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

  checkboxOnChange = (e, name) => {
    const { checked } = e.target;
    this.setState({ [name]: checked });
  };

  render() {
    const $ = this.state;

    const CheckItem = (defaultChecked, inputValue, placeholder) => (
      <Checkbox
        title={Lang(`setting.basic.${defaultChecked}`)}
        defaultChecked={$[defaultChecked]}
        onChange={e => this.checkboxOnChange(e, defaultChecked)}
      >
        {inputValue || placeholder ? (
          <Input
            defaultValue={$[inputValue]}
            placeholder={Lang(placeholder)}
            onChange={e => this.inputOnChange(e, inputValue)}
          />
        ) : null}
      </Checkbox>
    );

    const LangItem = lang => (
      <div className={style.listLang}>
        <div className={style.listLangTitle}>{Lang('setting.basic.' + lang)}</div>
        <Select
          defaultValue={$.lang}
          mode={false}
          options={['cn', 'en']}
          onChange={this.handleLangChange}
        />
      </div>
    );

    const InputItem = lang => (
      <div className={style.listItem}>
        <span>
          <div className={style.listTitle}>{Lang('setting.basic.' + lang)}</div>
          <div className={style.listInput}>
            <Input defaultValue={$[lang]} onChange={e => this.inputOnChange(e, lang)} />
          </div>
        </span>
      </div>
    );
    return [
      <Content key={$.timekey} className={style.content}>
        <div className={style.body}>
          <Split className={style.title} id="setting.basic.split.lang" />
          {LangItem('lang')}
          <Split className={style.title} id="setting.basic.split.personal" />
          {CheckItem('nameActive', 'name', 'placeholder.you')}
          {CheckItem('imgActive', 'img', 'placeholder.img')}
          <br />
          <Split className={style.title} id="setting.basic.split.statistics" />
          {CheckItem('graphTimeActive', 'graphTime')}
          {CheckItem('graphHide')}
          {CheckItem('graphScale')}
          {CheckItem('pureHps')}
          <br />
          <Split className={style.title} id="setting.basic.split.gui" />
          {CheckItem('uiAutoMiniActive', 'uiAutoMini')}
          {CheckItem('uiScaleActive', 'uiScale')}
          <Split className={style.title} id="setting.basic.split.history" />
          {InputItem('historyLength')}
        </div>
      </Content>,
      ...this.Footer,
    ];
  }
}

export default connect(State)(Overlay);
