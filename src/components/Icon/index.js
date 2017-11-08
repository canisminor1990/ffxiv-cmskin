import classnames from 'classnames/bind';
import { Link } from 'dva/router';
import { Icon as AntIcon } from 'antd';
import style from './index.scss';

export default ({ to, type, ...otehr }) => {
  return (
    <Link
      to={to}
      className={classnames.bind(style)('icon', {
        active: window.location.pathname === to,
      })}
      {...otehr}
    >
      <AntIcon type={type} />
    </Link>
  );
};
