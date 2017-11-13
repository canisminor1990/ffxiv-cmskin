import { connect } from 'dva';
import { View, Button, Checkbox, Input, Message, Select, Lang, LangStr } from '../../../components';
import { Component } from 'react';
import { getSetting } from '../../../utils/getSetting';
import style from '../index.scss';

const { Content, Footer, Split } = View;
const State = state => ({
  setting: state.setting,
});

const Setting = [
  'lang',
  'name',
  'nameActive',
  'img',
  'imgActive',
  'pureHps',
  'graphScale',
  'graphTime',
  'graphTimeActive',
  'uiScale',
  'uiScaleActive',
  'uiTrans',
  'uiMini',
  'uiAutoMini',
  'uiAutoMiniActive',
];

class Overlay extends Component {
  state = {
    timekey: 0,
    ...getSetting(Setting, this.props.setting),
  };

  handleLangChange = value => {
    this.setState({ lang: value });
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
    window.lang = this.state.lang;
    this.setState({ timekey: this.state.timekey + 1 });
    this.props.dispatch({ type: 'setting/update', payload: this.state });
    Message.success(<Lang id="setting.message.apply" />);
  };

  render() {
    const $ = this.state;

    const CheckItem = (defaultChecked, inputValue, placeholder) => (
      <Checkbox
        title={<Lang id={`setting.basic.${defaultChecked}`} />}
        defaultChecked={$[defaultChecked]}
        onChange={e => this.checkboxOnChange(e, defaultChecked)}
      >
        {inputValue || placeholder ? (
          <Input
            defaultValue={$[inputValue]}
            placeholder={LangStr(placeholder)}
            onChange={e => this.inputOnChange(e, inputValue)}
          />
        ) : null}
      </Checkbox>
    );

    const LangItem = lang => (
      <div className={style.listItem}>
        <div className={style.listTitle}>
          <Lang id={'setting.basic.' + lang} />
        </div>
        <Select
          defaultValue={$.lang}
          mode={false}
          options={['cn', 'en']}
          onChange={this.handleLangChange}
        />
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
          {CheckItem('graphScale')}
          {CheckItem('pureHps')}
          <br />
          <Split className={style.title} id="setting.basic.split.gui" />
          {CheckItem('uiAutoMiniActive', 'uiAutoMini')}
          {CheckItem('uiScaleActive', 'uiScale')}
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
