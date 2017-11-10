import { View, InfoList, Logo } from '../../../components';
import { Author, Contact, Github, Link } from '../../../data';
import Package from '../../../../package.json';
import style from '../index.scss';

const { Content, Footer, Split } = View;
const Version = Package.version;

export default () => {
  const mapInfo = (title, data) => [
    <Split key={title + 'split'} className={style.title} title={title} />,
    <div key={title + 'list'} className={style.list}>
      {data.map(item => <InfoList key={item.title} title={item.title} desc={item.desc} />)}
    </div>,
  ];
  return [
    <Content key="content" className={style.content}>
      <Split className={style.title} title="当前版本" />
      <div className={style.logo}>
        <Logo size={300} />
      </div>
      <div className={style.list}>
        <InfoList title="Version" desc={Version} />
      </div>
      {mapInfo('作者信息', Author)}
      {mapInfo('联系方式', Contact)}
      {mapInfo('项目地址', Github)}
      {mapInfo('外部链接', Link)}
    </Content>,
    <Split key="split" />,
    <Footer className={style.foot} key="footer" />,
  ];
};
