import { connect } from 'dva';
import { Link } from 'dva/router';
import { View, Back } from '../../components';
import classnames from 'classnames/bind';
import style from './index.scss';

const { Header, Content, Bar, Footer, Split } = View;
const State = state => ({
  data: state.act,
  historyPage: state.setting.historyPage,
});

const History = ({ data, historyPage, dispatch }) => {
  let content = [];
  if (!data[0]) {
    content = <div className={style.history}>暂无历史记录</div>;
  } else {
    data.forEach((item, key) => {
      const { Encounter, Date } = item;
      const listClass = classnames.bind(style)(style.list, { [style.active]: key === historyPage });
      content.push(
        <Link
          className={listClass}
          key={key}
          to="/"
          onClick={() => {
            dispatch({ type: 'setting/update', payload: { historyPage: key } });
          }}
        >
          <div className={style.date}>{Date}</div>
          <div className={style.title}>
            {Encounter.zone}
            {Encounter.name !== 'Encounter' ? <span>{` · ${Encounter.name}`}</span> : ''}
          </div>
        </Link>
      );
    });
  }
  return (
    <View style={{ height: '100%' }}>
      <Header key="header">历史记录</Header>
      <Bar className={style.bar}>最多显示30条记录</Bar>
      <Content className={style.content}>{content}</Content>
      <Split />
      <Footer key="footer">
        <Back />
      </Footer>
    </View>
  );
};

export default connect(State)(History);
