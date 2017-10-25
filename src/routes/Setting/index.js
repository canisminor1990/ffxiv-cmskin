import { connect } from 'dva';
import { View, Button, Checkbox, Input, Message } from '../../components';
import { setCookie } from '../../utils/cookie';
import { Component } from 'react';
import style from './index.scss';

const { Header, Content, Bar, Footer, Split } = View;
const State = state => ({
  setting: state.setting,
});

class Overlay extends Component {
  state = {
    timekey: 0,
    // DIY
    name: this.props.setting.name,
    nameActive: this.props.setting.nameActive,
    nameHide: this.props.setting.nameHide,
    nameHideActive: this.props.setting.nameHideActive,
    img: this.props.setting.img,
    imgActive: this.props.setting.imgActive,
    // DATA
    pureHps: this.props.setting.pureHps,
    graphScale: this.props.setting.graphScale,
    graphTime: this.props.setting.graphTime,
    graphTimeActive: this.props.setting.graphTimeActive,
    // UI
    uiScale: this.props.setting.uiScale,
    uiScaleActive: this.props.setting.uiScaleActive,
    uiTrans: this.props.setting.uiTrans,
    uiMini: this.props.setting.uiMini,
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
      // DIY
      name: this.props.setting.nameDefault,
      nameActive: false,
      nameHide: this.props.setting.nameHideDefault,
      nameHideActive: false,
      img: this.props.setting.imgDefault,
      imgActive: false,
      // DATA
      pureHps: false,
      graphScale: false,
      graphTime: this.props.setting.graphTimeDefault,
      graphTimeActive: false,
      // UI
      uiScale: this.props.setting.uiScaleDefault,
      uiScaleActive: false,
      uiTrans: false,
      uiMini: false,
    };
    this.setState(Default);
    Message.success('重置成功');
  };

  onSave = () => {
    this.setState({ timekey: this.state.timekey + 1 });
    this.props.dispatch({ type: 'setting/update', payload: this.state });
    setCookie('setting', this.state);
    Message.success('保存成功');
    if (typeof window.OverlayPluginApi !== 'undefined') {
      window.OverlayPluginApi.broadcastMessage('reload');
    } else {
      Message.info('请刷新界面');
    }
  };

  render() {
    const {
      timekey,
      // DIY
      name,
      nameActive,
      nameHide,
      nameHideActive,
      img,
      imgActive,
      // DATA
      pureHps,
      graphScale,
      graphTime,
      graphTimeActive,
      // UI
      uiScale,
      uiScaleActive,
      uiTrans,
      uiMini,
    } = this.state;

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

    return (
      <View style={{ height: '100%' }}>
        <Header key="header">设置</Header>
        <Bar key="bar" className={style.bar}>
          基础设置
        </Bar>
        <Content key={timekey} className={style.content}>
          <div className={style.body}>
            {CheckItem('自定义昵称', nameActive, 'nameActive', name, 'name')}
            {CheckItem('自定义头像', imgActive, 'imgActive', img, 'img', '图片网址')}
            {CheckItem('自定义马赛克', nameHideActive, 'nameHideActive', nameHide, 'nameHide')}
            <br />
            <Split className={style.title} title="统计" />
            {CheckItem('图表统计时长(秒)', graphTimeActive, 'graphTimeActive', graphTime, 'graphTime')}
            {CheckItem('图表动态缩放', graphScale, 'graphScale')}
            {CheckItem('溢出量不计入HPS', pureHps, 'pureHps')}
            <br />
            <Split className={style.title} title="界面" />
            {CheckItem('UI缩放(倍)', uiScaleActive, 'uiScaleActive', uiScale, 'uiScale')}
            {CheckItem('默认开启『透明模式』', uiTrans, 'uiTrans')}
            {CheckItem('默认开启『迷你模式』', uiMini, 'uiMini')}
          </div>
        </Content>
        <Split />
        <Footer className={style.foot} key="footer">
          <div className={style.btngroup}>
            <Button onClick={this.onDefault}>恢复默认</Button>
            <Button onClick={this.onSave}>保存</Button>
          </div>
        </Footer>
      </View>
    );
  }
}

export default connect(State)(Overlay);
