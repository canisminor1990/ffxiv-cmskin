import { PieChart, GroupChart, View } from '../';
import _ from 'lodash';
import { Encounter as Options } from '../../data/options';
import style from './index.scss';

export default ({ Encounter, Combatant, Chart }) => {
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

  const ChartData = {
    damage: [],
    healing: [],
    tanking: [],
  };

  _.forEach(Chart, (item, key) => {
    item.forEach(i => {
      ChartData.damage.push({ name: key, time: i.time, value: i.dps });
      ChartData.healing.push({ name: key, time: i.time, value: i.heal });
      ChartData.tanking.push({ name: key, time: i.time, value: i.tank });
    });
  });

  const Tag = type => (
    <div className={style.desc}>
      {Info[type].map(item => (
        <div key={item} className={style.content}>
          <div className={style.title}>{Options[item]}</div>
          <div className={style.number}>{_.result(Encounter, item)}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={style.view}>
      <View.Split title="团队输出" />
      {Tag('damage')}
      <View.Split />
      <PieChart data={PieData.damage} color={Colors.damage} desc={PieDesc.damage} />
      <GroupChart data={ChartData.damage} color={Colors.damage} />
      <br />
      <View.Split title="团队治疗" />
      {Tag('healing')}
      <View.Split />
      <PieChart data={PieData.healing} color={Colors.healing} desc={PieDesc.healing} />
      <GroupChart data={ChartData.healing} color={Colors.healing} />
      <br />
      <View.Split title="团队承伤" />
      {Tag('tanking')}
      <View.Split />
      <PieChart data={PieData.tanking} color={Colors.tanking} desc={PieDesc.tanking} />
      <GroupChart data={ChartData.tanking} color={Colors.tanking} />
    </div>
  );
};
