import _ from 'lodash';

let timeBackup;
let graph = {};

export default (time, data) => {
  if (time && time !== timeBackup) {
    _.forEach(data, item => {
      try {
        if (!graph[item.name]) graph[item.name] = [];
        graph[item.name].push({
          time: time,
          dps: item.damage.ps >= 0 ? item.damage.ps : 0,
          heal: item.healing.ps >= 0 ? item.healing.ps : 0,
          tank: item.tanking.total >= 0 ? item.tanking.total : 0,
        });
        if (graph[item.name].length > 30) graph[item.name].shift();
      } catch (e) {}
    });
    timeBackup = time;
  }

  return graph;
};
