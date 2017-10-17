import style from './index.scss';
import { DamageList } from '../';
import _ from 'lodash';

let timeBackup;
let content = [];
let graph = {};

export default ({ tab, data, time, isActive }) => {
  const sortedData = _.reverse(_.sortBy(data, 'damage.ps'));
  if (isActive) {
    if (tab === 'dps') {
      if (time !== timeBackup) {
        _.forEach(data, item => {
          if (!graph[item.name]) graph[item.name] = [];
          graph[item.name].push({ time: time, dps: item.damage.ps, hps: item.healing.ps });
          if (graph[item.name].length > 30) graph[item.name].shift();
        });
        timeBackup = time;
      }
      content = sortedData.map((item, key) => (
        <DamageList
          key={item.name}
          item={item}
          graph={graph[item.name]}
          firstItem={sortedData[0]}
        />
      ));
    }
    if (tab === 'heal') {
    }
    if (tab === 'tank') {
    }
  } else {
    content = 2;
  }
  return <div className={style.view}>{content}</div>;
};
