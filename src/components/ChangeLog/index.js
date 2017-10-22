import style from './index.scss';
import { Help, Changelog, Copyright } from '../../changelog.js';
import { View } from '../';
const { Split } = View;
export default () => {
  const map = (item, key) => {
    const Data = item.split('||');
    return (
      <div className={style.item} key={key}>
        <div className={style.time}>{Data[0]}</div>
        <p className={style.content}>{Data[1]}</p>
      </div>
    );
  };
  return (
    <div>
      <Split className={style.line} title="使用说明" />
      <div className={style.list}>{Help.map(map)}</div>
      <Split className={style.line} title="更新说明" />
      <div className={style.list}>{Changelog.map(map)}</div>
      <Split className={style.line} title="版权信息" />
      <div className={style.list}>{Copyright.map(map)}</div>
    </div>
  );
};
