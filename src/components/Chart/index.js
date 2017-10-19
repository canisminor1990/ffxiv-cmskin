import createG2 from 'g2-react';
import style from './index.scss';
import { connect } from 'dva';

const State = state => ({ data: state.chart.data });

const ChartView = ({ data, name, tab, color, size = 32 }) => {
  const Data = data[name];
  let content = [];

  if (!Data || Data.length <= 1) {
    content = '等待数据积累...';
  } else {
    const Chart = createG2(chart => {
      chart.col('time', {
        range: [0, 1],
      });
      chart.col(tab);
      chart
        .area()
        .position(`time*${tab}`)
        .color(color);
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
        forceFit={true}
      />
    );
  }
  return (
    <div className={style.chart} style={{ height: `${size}px`, lineHeight: `${size}px` }}>
      {content}
    </div>
  );
};

export default connect(State)(ChartView);
