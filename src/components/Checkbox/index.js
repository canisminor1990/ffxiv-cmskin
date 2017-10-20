import { Checkbox } from 'antd';
import style from './index.scss';

export default ({ title, children, ...other }) => {
  return (
    <Checkbox className={style.item} {...other}>
      <div className={style.title}>{title}</div>
      <div className={style.input}>{children}</div>
    </Checkbox>
  );
};
