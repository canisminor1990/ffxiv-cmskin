import style from './index.scss';
import data from '../../changelog.js';

export default () => {
  const List = data.map((item, key) => {
    const Data = item.split('||');
    return (
      <div className={style.list} key={key}>
        <div className={style.time}>{Data[0]}</div>
        <p className={style.content}>{Data[1]}</p>
      </div>
    );
  });
  return List;
};
