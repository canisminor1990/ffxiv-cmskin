import { connect } from 'dva';
import { Link } from 'dva/router';
import { View, Back, Lang } from '../../components';
import { getSetting } from '../../utils/getSetting';
import classnames from 'classnames/bind';
import style from './index.scss';

const { Header, Content, Bar, Footer, Split } = View;
const Setting = ['historyPage', 'uiMini'];
const State = state => ({
  data: state.act,
  ...getSetting(Setting, state.setting),
});

const History = ({ data, dispatch, ...$ }) => {
  let content = [];
  !data[0]
    ? (content = <div className={style.history}>{Lang('history.null')}</div>)
    : data.forEach((item, key) => {
        const { Encounter, Date } = item;
        const listClass = classnames.bind(style)('list', { active: key === $.historyPage });
        content.push(
          <Link
            className={listClass}
            key={key}
            to="/"
            onClick={() => dispatch({ type: 'setting/update', payload: { historyPage: key } })}
          >
            <div className={style.date}>{Date}</div>
            <div className={style.title}>
              {Encounter.zone}
              {Encounter.name !== 'Encounter' ? <span>{` · ${Encounter.name}`}</span> : ''}
            </div>
          </Link>
        );
      });

  const BarContent = $.uiMini ? null : (
    <Bar key="bar" className={style.bar}>
      {Lang('history.bar')}
    </Bar>
  );

  return [
    <Header key="header" uiMini={$.uiMini}>
      {Lang('history.header')}
    </Header>,
    BarContent,
    <Content key="content" className={style.content}>
      {content}
    </Content>,
    <Split key="split" />,
    <Footer key="footer">
      <Back />
    </Footer>,
  ];
};

export default connect(State)(History);
