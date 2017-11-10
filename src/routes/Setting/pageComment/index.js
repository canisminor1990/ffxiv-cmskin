import { Comment, View } from '../../../components';
import style from '../index.scss';
const { Content, Footer, Split } = View;
export default () => {
  return [
    <Content key="content" className={style.content}>
      <Comment />
    </Content>,
    <Split key="split" />,
    <Footer className={style.foot} key="footer" />,
  ];
};
