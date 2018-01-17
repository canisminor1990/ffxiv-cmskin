import style from './index.scss';
import { Link } from 'dva/router';
import { Icon } from 'antd';
import { Lang } from '../';

export default ({ to = '/' }) => (
  <Link to={to} className={style.tab}>
    <Icon type="left" /> {Lang('footer.back')}
  </Link>
);
