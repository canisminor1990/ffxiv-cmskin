import { connect } from 'dva';
import { View, Button, Checkbox, Input, Message } from '../../../components';
import { Component } from 'react';
import { getSetting } from '../../../utils/getSetting';
import style from '../index.scss';

const { Content, Footer, Split } = View;
const State = state => ({
  setting: state.setting,
});

const Setting = [
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

    const CheckItem = (title, defaultChecked, inputValue, placeholder) => (
      <Checkbox
        title={title}
        defaultChecked={$[defaultChecked]}
        onChange={e => this.checkboxOnChange(e, defaultChecked)}
      >
        {inputValue || placeholder ? (
          <Input
            defaultValue={$[inputValue]}
            placeholder={placeholder}
            onChange={e => this.inputOnChange(e, inputValue)}
          />
        ) : null}
      </Checkbox>
    );

    return [
      <Content key={$.timekey} className={style.content}>
        <Split className={style.title} title="个人" />
        <div className={style.body}>
          {CheckItem('自定义昵称', 'nameActive', 'name')}
          {CheckItem('自定义头像', 'imgActive', 'img', '图片网址')}
          <br />
          <Split className={style.title} title="统计" />
          {CheckItem('图表统计时长 (秒)', 'graphTimeActive', 'graphTime')}
          {CheckItem('图表动态缩放', 'graphScale')}
          {CheckItem('过量不计入HPS', 'pureHps')}
          <br />
          <Split className={style.title} title="界面" />
          {CheckItem('自动切换迷你 (>人数)', 'uiAutoMiniActive', 'uiAutoMini')}
          {CheckItem('UI缩放 (倍)', 'uiScaleActive', 'uiScale')}
          {CheckItem('默认开启『透明模式』', 'uiTrans')}
          {CheckItem('默认开启『迷你模式』', 'uiMini')}
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
