import style from './index.scss';
import { View } from '../';
const { Split } = View;
export default ({ data }) => {
  const { usage, changelog, copyright } = data;
  const map = (item, key) => {
    const Data = item.split('|');
    return (
      <div className={style.item} key={key}>
        <div className={style.time}>{Data[1]}</div>
        <p className={style.content}>
          {Data[2]}
          {Data[3] ? ` ${Data[3]}` : null}
        </p>
      </div>
    );
  };
  return (
    <div>
      <Split className={style.line} title="更新说明" />
      <div className={style.list}>{changelog.map(map)}</div>
      <Split className={style.line} title="使用说明" />
      <div className={style.list}>{usage.map(map)}</div>
      <Split className={style.line} title="版权信息" />
      <div className={style.list}>{copyright.map(map)}</div>
    </div>
  );
};
