import QRCode from 'qrcode.react';
import { View, Back, Lang } from '../../components';
import style from './index.scss';

const { Header, Content, Split, Footer } = View;
export default () => {
  const Qrcode = window.wsURL ? (
    <QRCode value={window.wsURL} bgColor="#eee1c5" fgColor="#333" size={160} level="Q" />
  ) : (
    Lang('qrcode.null')
  );
  return [
    <Header key="header">{Lang('qrcode.header')}</Header>,
    <Content className={style.content} key="content">
      <div className={style.qrcode}>{Qrcode}</div>
      <div className={style.scan}>{Lang('qrcode.scan')}</div>
    </Content>,
    <Split key="split" />,
    <Footer key="footer">
      <Back />
    </Footer>,
  ];
};
