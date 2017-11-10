import { Comment, Editor, View } from '../../../components';
import style from '../index.scss';
const { Content, Split } = View;
export default () => {
  return [
    <Content key="content" className={style.content}>
      <Split className={style.title} title="评论列表" />
      <Comment />
    </Content>,
    <Split key="split" />,
    <div className={style.editor} key="footer">
      <Editor />
    </div>,
  ];
};
