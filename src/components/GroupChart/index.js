import createG2 from 'g2-react';
import style from './index.scss';

const ChartView = ({ data, color, size = 66 }) => {
  const Chart = createG2(chart => {
    chart.col('time', {
      range: [0, 1],
    });
    chart
      .areaStack()
      .position('time*value')
      .color('name', color);
    chart.axis(false);
    chart.tooltip(false);
    chart.animate(false);
    chart.render();
  });

  return (
    <div className={style.chart} style={{ height: `${size}px`, lineHeight: `${size}px` }}>
      <Chart
        data={data}
        plotCfg={{ margin: [0, 0, 0, 0] }}
        width={100}
        height={size}
        forceFit={true}
      />
    </div>
  );
};

export default ChartView;
