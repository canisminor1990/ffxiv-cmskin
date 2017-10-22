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
    name: this.props.setting.name,
    nameActive: this.props.setting.nameActive,
    img: this.props.setting.img,
    imgActive: this.props.setting.imgActive,
    graphTime: this.props.setting.graphTime,
    graphTimeActive: this.props.setting.graphTimeActive,
    uiScale: this.props.setting.uiScale,
    uiScaleActive: this.props.setting.uiScaleActive,
    uiTrans: this.props.setting.uiTrans,
    miniMode: this.props.setting.miniMode,
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
      name: this.props.setting.nameDefault,
      nameActive: false,
      img: this.props.setting.imgDefault,
      imgActive: false,
      graphTime: this.props.setting.graphTimeDefault,
      graphTimeActive: false,
      uiScale: this.props.setting.uiScaleDefault,
      uiScaleActive: false,
      uiTrans: false,
      miniMode: false,
    };
    this.setState(Default);
    Message.success('重置成功');
  };

  onSave = () => {
    this.setState({ timekey: this.state.timekey + 1 });
    this.props.dispatch({ type: 'setting/update', payload: this.state });
    setCookie('setting', this.state);
    Message.success('保存成功');
    Message.info('请刷新界面');
  };

  render() {
    const {
      timekey,
      name,
      nameActive,
      img,
      imgActive,
      graphTime,
      graphTimeActive,
      uiScale,
      uiScaleActive,
      uiTrans,
      miniMode,
    } = this.state;
    return (
      <View style={{ height: '100%' }}>
        <Header key="header">设置</Header>
        <Bar key="bar" className={style.bar}>
          基础设置
        </Bar>
        <Content key={timekey} className={style.content}>
          <div className={style.body}>
            <div className={style.title}>个人</div>
            <Checkbox
              title="自定义昵称"
              defaultChecked={nameActive}
              onChange={e => this.checkboxOnChange(e, 'nameActive')}
            >
              <Input defaultValue={name} onChange={e => this.inputOnChange(e, 'name')} />
            </Checkbox>
            <Checkbox
              title="自定义头像"
              defaultChecked={imgActive}
              onChange={e => this.checkboxOnChange(e, 'imgActive')}
            >
              <Input
                defaultValue={img}
                placeholder={'图片网址'}
                onChange={e => this.inputOnChange(e, 'img')}
              />
            </Checkbox>
            <br />
            <div className={style.title}>常规</div>
            <Checkbox
              title="图表统计时长(秒)"
              defaultChecked={graphTimeActive}
              onChange={e => this.checkboxOnChange(e, 'graphTimeActive')}
            >
              <Input
                defaultValue={graphTime}
                onChange={e => this.inputOnChange(e, 'graphTime', true)}
              />
            </Checkbox>
            <Checkbox
              title="UI缩放(倍)"
              defaultChecked={uiScaleActive}
              onChange={e => this.checkboxOnChange(e, 'uiScaleActive')}
            >
              <Input
                defaultValue={uiScale}
                onChange={e => this.inputOnChange(e, 'uiScale', true)}
              />
            </Checkbox>
            <Checkbox
              title="默认开启 透明模式"
              defaultChecked={uiTrans}
              onChange={e => this.checkboxOnChange(e, 'uiTrans')}
            />
            <Checkbox
              title="默认开启 迷你模式"
              defaultChecked={miniMode}
              onChange={e => this.checkboxOnChange(e, 'miniMode')}
            />
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
