import style from './index.scss';
import { List, ChangeLog } from '../../../components';
import _ from 'lodash';

let content = [];

export default ({ tab, Combatant, Encounter, log, chart, isActive }) => {
  if (isActive) {
    let sortedData = [];
    if (tab === 'dps') {
      sortedData = _.reverse(_.sortBy(Combatant, 'damage.ps'));
    }
    if (tab === 'heal') {
      sortedData = _.reverse(_.sortBy(Combatant, 'healing.ps'));
    }
    if (tab === 'tank') {
      sortedData = _.reverse(_.sortBy(Combatant, 'tanking.total'));
    }
    content = sortedData.map((item, key) => (
      <List
        chart={chart}
        tab={tab}
        key={item.name}
        item={item}
        firstItem={sortedData[0]}
        hasDps={Encounter.hasDps}
        avDps={Encounter.avDps}
        isBattle={Encounter.name === '战斗中'}
      />
    ));
  } else {
    content = <ChangeLog data={log} />;
  }
  return <div className={style.view}>{content}</div>;
};
