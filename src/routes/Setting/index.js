import { Route } from 'dva/router';
import { View, Icon } from '../../components';
import style from './index.scss';
import PageBasic from './PageBasic';
import PageNormal from './PageNormal';
import PageDetail from './PageDetail';
import pageComment from './pageComment';
import _ from 'lodash';

const { Bar, Header } = View;

export default () => {
  const Doc = {
    '/setting/basic': {
      name: '一般设置',
      icon: 'laptop',
      component: PageBasic,
    },
    '/setting/normal': {
      name: '基础页面',
      icon: 'bars',
      component: PageNormal,
    },
    '/setting/detail': {
      name: '详情页面',
      icon: 'idcard',
      component: PageDetail,
    },
    '/setting/comment': {
      name: '评论反馈',
      icon: 'message',
      component: pageComment,
    },
  };

  const sidebar = [];
  const route = [];
  _.forEach(Doc, (item, to) => {
    sidebar.push(<Icon key={item.name} type={item.icon} to={to} />);
    route.push(<Route key={to} path={to} component={item.component} />);
  });
  return (
    <View style={{ height: '100%' }}>
      <Header key="header">设置</Header>
      <Bar className={style.bar}>{Doc[window.location.pathname].name}</Bar>
      <div className={style.flex}>
        <div className={style.left}>{sidebar}</div>
        <div className={style.right}>{route}</div>
      </div>
    </View>
  );
};
