import { connect } from 'dva';
import { View, Button, Checkbox, Input, Message } from '../../components';
import { Component } from 'react';
import { getSetting } from '../../utils/getSetting';
import style from './index.scss';

const { Content, Footer, Split } = View;
const State = state => ({
  setting: state.setting,
});

const Setting = [
  'name',
  'nameActive',
  'nameHide',
  'nameHideActive',
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

  render() {
    const $ = this.state;

    const CheckItem = (title, defaultChecked, onChange, inputValue, inputName, placeholder) => (
      <Checkbox
        title={title}
        defaultChecked={defaultChecked}
        onChange={e => this.checkboxOnChange(e, onChange)}
      >
        {inputValue || placeholder ? (
          <Input
            defaultValue={inputValue}
            placeholder={placeholder}
            onChange={e => this.inputOnChange(e, inputName)}
          />
        ) : null}
      </Checkbox>
    );

    return [
      <Content key={$.timekey} className={style.content}>
        <Split className={style.title} title="个人" />
        <div className={style.body}>
          {CheckItem('自定义昵称', $.nameActive, 'nameActive', $.name, 'name')}
          {CheckItem('自定义头像', $.imgActive, 'imgActive', $.img, 'img', '图片网址')}
          {CheckItem('自定义马赛克', $.nameHideActive, 'nameHideActive', $.nameHide, 'nameHide')}
          <br />
          <Split className={style.title} title="统计" />
          {CheckItem('图表统计时长(秒)', $.graphTimeActive, 'graphTimeActive', $.graphTime, 'graphTime')}
          {CheckItem('图表动态缩放', $.graphScale, 'graphScale')}
          {CheckItem('溢出量不计入HPS', $.pureHps, 'pureHps')}
          <br />
          <Split className={style.title} title="界面" />
          {CheckItem('UI缩放(倍)', $.uiScaleActive, 'uiScaleActive', $.uiScale, 'uiScale')}
          {CheckItem('默认开启『透明模式』', $.uiTrans, 'uiTrans')}
          {CheckItem('默认开启『迷你模式』', $.uiMini, 'uiMini')}
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
