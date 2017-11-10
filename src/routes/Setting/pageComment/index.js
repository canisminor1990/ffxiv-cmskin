import { View } from '../../../components';
import style from '../index.scss';
const { Content, Split } = View;
export default () => {
  window.changyan.api.config({
    appid: 'cytjdgeJ7',
    conf: 'prod_e0ae268a3629c862b8790af46e93c5cb',
  });
  return (
    <Content key="content" className={style.content}>
      <Split className={style.title} title="评论列表" />
      <div id="SOHUCS" />
    </Content>
  );
};
