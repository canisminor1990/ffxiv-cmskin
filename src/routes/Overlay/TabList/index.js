import style from './index.scss';
import { List } from '../../../components';
import _ from 'lodash';

export default ({ tab, Combatant, Encounter, chart }) => {
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
  const BuildList = (item, key) => (
    <List
      chart={chart}
      tab={tab}
      key={item.name}
      item={item}
      firstItem={sortedData[0]}
      hasDps={Encounter.hasDps}
      avps={Encounter.damage.avps}
      isBattle={Encounter.name === '战斗中'}
    />
  );
  return <div className={style.view}>{sortedData.map(BuildList)}</div>;
};
