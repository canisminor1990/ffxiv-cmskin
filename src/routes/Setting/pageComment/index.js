import { View } from '../../../components';
import style from '../index.scss';
const { Content, Split } = View;
export default () => {
  return (
    <Content key="content" className={style.content}>
      <Split className={style.title} title="评论列表" />
      <div id="SOHUCS" />
    </Content>
  );
};
