import style from './index.scss';
import { List, ChangeLog } from '../';
import _ from 'lodash';

let content = [];

export default ({ tab, data, log, chart, isActive }) => {
  if (isActive) {
    let sortedData = [];
    if (tab === 'dps') {
      sortedData = _.reverse(_.sortBy(data, 'damage.ps'));
    }
    if (tab === 'heal') {
      sortedData = _.reverse(_.sortBy(data, 'healing.ps'));
    }
    if (tab === 'tank') {
      sortedData = _.reverse(_.sortBy(data, 'tanking.total'));
    }
    content = sortedData.map((item, key) => (
      <List chart={chart} tab={tab} key={item.name} item={item} firstItem={sortedData[0]} />
    ));
  } else {
    content = <ChangeLog data={log} />;
  }
  return <div className={style.view}>{content}</div>;
};
