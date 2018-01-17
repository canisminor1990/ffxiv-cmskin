import style from './index.scss';
import { Link } from 'dva/router';
import { Icon } from 'antd';
import { LangStr } from '../';

export default ({ to = '/' }) => (
  <Link to={to} className={style.tab}>
    <Icon type="left" /> {LangStr('footer.back')}
  </Link>
);
