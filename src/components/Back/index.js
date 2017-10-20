import style from './index.scss';
import { Link } from 'dva/router';
import { Icon } from 'antd';

export default ({ to = '/' }) => (
  <Link to={to} className={style.tab}>
    <Icon type="left" /> 返回
  </Link>
);
