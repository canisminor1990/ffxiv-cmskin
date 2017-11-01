import { PieChart, View } from '../';
import style from './index.scss';

export default ({ data }) => {
  let Data = [];
  data.forEach(item =>
    Data.push({
      name: item.name,
      dps: parseInt(item.damage.percent),
      hps: parseInt(item.damage.percent),
    })
  );

  return (
    <div className={style.view}>
      <View.Split title="团队输出" />
      <PieChart data={Data} type="dps" />
      <br />
      <View.Split title="团队治疗" />
      <PieChart data={Data} type="hps" />
    </div>
  );
};
