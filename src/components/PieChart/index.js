import createG2 from 'g2-react';
import G2 from 'g2';

export default ({ data, type, width = 200, height = 280 }) => {
  const colors =
    type === 'dps'
      ? ['#F55678', '#FB7B34', '#FFA108', '#FFE102', '#F86B50', '#FE8C17', '#FFC804', '#FFF200']
      : null;
  const Chart = createG2(chart => {
    const Stat = G2.Stat;
    chart.coord('theta', {
      radius: 0.4, // 设置饼图的大小
    });
    chart.legend('name', {
      position: 'bottom',
      itemWrap: true,
      word: {
        fill: 'rgba(255,255,255,.5)',
      },
      formatter: name => {
        const Item = data.find(itme => itme.name === name);
        return `${name}: ${Item[type]}%`;
      },
    });
    chart
      .intervalStack()
      .position(Stat.summary.percent(type))
      .color('name', colors)
      .label('name');
    chart.axis(false);
    chart.tooltip(false);
    chart.animate(false);
    chart.render();
  });
  return (
    <div style={{ width: '100%', height: `${height}px` }}>
      <Chart
        data={data}
        plotCfg={{ margin: [0, 0, 40, 0] }}
        width={width}
        height={height}
        syncXYScales={true}
        forceFit={true}
      />
    </div>
  );
};
