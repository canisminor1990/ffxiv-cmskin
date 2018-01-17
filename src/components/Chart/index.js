import createG2 from 'g2-react';
import classnames from 'classnames/bind';
import hexToRgba from '../../utils/hexToRgba';
import { Lang } from '../';

import style from './index.scss';

const ChartView = ({
  className,
  data,
  name,
  tab,
  color,
  size = 32,
  firstItem,
  graphScale = false,
}) => {
  const Data = data[name];
  let content = [];
  let Config = {};
  if (!graphScale) Config = firstItem ? { min: 0, max: firstItem } : { min: 0 };
  if (!Data || Data.length <= 1) {
    content = <div className={style.loading}>{Lang('placeholder.chart')}</div>;
  } else {
    const Chart = createG2(chart => {
      chart.col('time', {
        range: [0, 1],
      });
      chart.col(tab, Config);
      chart
        .area()
        .position(`time*${tab}`)
        .color(`l(90) 0:${color} 1:${hexToRgba(color, '.75')}`);
      chart
        .line()
        .position(`time*${tab}`)
        .color(color);
      chart.axis(false);
      chart.tooltip(false);
      chart.animate(false);
      chart.render();
    });

    content = (
      <Chart
        data={data[name]}
        plotCfg={{
          margin: [0, 0, 0, 0],
        }}
        width={100}
        height={size}
        syncXYScales={true}
        forceFit={true}
      />
    );
  }
  return (
    <div
      className={classnames.bind(style)('chart', className)}
      style={{ height: `${size}px`, lineHeight: `${size}px` }}
    >
      {content}
    </div>
  );
};

export default ChartView;
