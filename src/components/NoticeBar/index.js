import style from './index.scss';
import { options } from '../../data';
import _ from 'lodash';

const { Encounter } = options;
export default ({ option, data, isActive }) => {
  let Content = [];
  isActive
    ? option.forEach(item =>
        Content.push(
          <span key={item} className={style.title}>
            {Encounter[item]}: {_.result(data, item)}
          </span>
        )
      )
    : (Content = <span className={style.title}>{'等待数据传入...'}</span>);

  return Content;
};
