import _ from 'lodash';
import { PieChart, View, Lang } from '../../../components';
import style from './index.scss';

export default ({ Encounter, Combatant }) => {
  const Info = {
    damage: ['damage.total', 'damage.ps', 'damage.highest'],
    healing: ['healing.total', 'healing.ps', 'healing.highest'],
    tanking: ['tanking.total'],
  };

  const Colors = {
    damage: ['#F97F67', '#EA7261', '#C66962', '#865C5E', '#525358'],
    healing: ['#ACF241', '#D8FF57', '#EDFFB3', '#B8FFED', '#96FFC7'],
    tanking: ['#BEE8E7', '#A3D6DA', '#73BCCF', '#379EBF', '#2589AB'],
  };

  const PieData = {
    damage: [],
    healing: [],
    tanking: [],
  };

  const PieDesc = {
    damage: {},
    healing: {},
    tanking: {},
  };

  Combatant.forEach(item => {
    if (item.damage.percent !== '0%') {
      PieData.damage.push({ name: item.name, data: item.damage.ps });
      PieDesc.damage[item.name] = {
        ps: item.damage.ps,
        percent: item.damage.percent,
      };
    }
    if (item.healing.percent !== '0%') {
      PieData.healing.push({ name: item.name, data: item.healing.ps });
      PieDesc.healing[item.name] = {
        ps: item.healing.ps,
        percent: item.healing.percent,
      };
    }
    if (item.tanking.percent !== '0%') {
      PieData.tanking.push({ name: item.name, data: item.tanking.total });
      PieDesc.tanking[item.name] = {
        ps: item.tanking.total,
        percent: item.tanking.percent,
      };
    }
  });

  const Tag = type => (
    <div className={style.desc}>
      {Info[type].map(item => (
        <div key={item} className={style.content}>
          <div className={style.title}>{Lang(`encounter.${item}`)}</div>
          <div className={style.number}>{_.result(Encounter, item)}</div>
        </div>
      ))}
    </div>
  );

  const MapData = type => (
    <div>
      <View.Split id={`normal.all.${type}`} />
      {Tag(type)}
      <View.Split />
      <PieChart data={PieData[type]} color={Colors[type]} desc={PieDesc[type]} />
    </div>
  );

  return (
    <div className={style.view}>
      {MapData('damage')}
      <br />
      {MapData('healing')}
      <br />
      {MapData('tanking')}
    </div>
  );
};
