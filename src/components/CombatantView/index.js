import style from './index.scss';
import { List, ChangeLog } from '../';
import _ from 'lodash';

let timeBackup;
let content = [];
let graph = {};

export default ({ tab, data, time, isActive }) => {
  if (isActive) {
    if (time !== timeBackup) {
      _.forEach(data, item => {
        if (!graph[item.name]) graph[item.name] = [];
        graph[item.name].push({
          time: time,
          dps: item.damage.ps,
          heal: item.healing.ps,
          tank: item.tanking.total,
        });
        if (graph[item.name].length > 30) graph[item.name].shift();
      });
      timeBackup = time;
    }
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
      <List
        tab={tab}
        key={item.name}
        item={item}
        graph={graph[item.name]}
        firstItem={sortedData[0]}
      />
    ));
  } else {
    content = <ChangeLog />;
  }
  return <div className={style.view}>{content}</div>;
};
