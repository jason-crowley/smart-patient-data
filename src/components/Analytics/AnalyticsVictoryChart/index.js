import React from 'react';
import {
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
  VictoryLegend,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
} from 'victory';
import ResponseItem from 'models/ResponseItem';
import moment from 'moment';
import './AnalyticsVictoryChart.css';

const AnalyticsVictoryTheme = {
  axis: {
    style: {
      axis: { stroke: '#666' },
      grid: { stroke: '#ccc', strokeDasharray: '5 5' },
      ticks: { size: 6, stroke: '#666' },
      tickLabels: { fill: '#666' },
    },
  },
  // bar: {},
  chart: {
    domainPadding: 30,
    padding: { top: 50, right: 50, bottom: 60, left: 60 },
  },
  legend: {
    orientation: 'horizontal',
    style: {
      border: { stroke: 'black' },
      labels: { fontSize: 12 },
    },
  },
  line: {
    interpolation: 'monotoneX',
    style: {
      data: { stroke: '#3182bd', strokeWidth: 1 },
    },
  },
  scatter: {
    size: 3,
    style: {
      data: { fill: '#fff', stroke: '#3182bd', strokeWidth: 1 },
    },
  },
  tooltip: {
    cornerRadius: 0.8,
    flyoutStyle: { fill: '#fff' },
  },
};

const LegendIcon = props => {
  const { x, y } = props;
  return (
    <g transform={`translate(${x - 4},${y - 6})`}>
      <svg width="14" height="14" viewBox="0 0 32 32">
        <path
          strokeWidth="4"
          fill="none"
          stroke="#3182bd"
          d="M0,16h10.666666666666666
          A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
          H32M21.333333333333332,16
          A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
        >
        </path>
      </svg>
    </g>
  );
};

const data = [
  new ResponseItem({ id: 'id1', date: '2019-02-24', value: 34.2, code: {} }),
  new ResponseItem({ id: 'id2', date: '2019-02-25', value: 29.5, code: {} }),
  new ResponseItem({ id: 'id3', date: '2019-02-26', value: 19.3, code: {} }),
  new ResponseItem({ id: 'id4', date: '2019-02-27', value: 62.2, code: {} }),
];

export default function AnalyticsVictoryChart(props) {
  const text = 'Body Mass Index';
  return (
    <div className="AnalyticsVictoryChart">
      <VictoryChart
        theme={AnalyticsVictoryTheme}
        containerComponent={
          <VictoryVoronoiContainer
            className="AnalyticsVictoryChart__container"
          />
        }
      >
        <VictoryLabel x={160} y={25}
          text={text}
          style={{ fontSize: 18 }}
        />
        <VictoryAxis
          label="Date"
          axisLabelComponent={<VictoryLabel dy={10} />}
          tickFormat={date => moment(date).format('MM/DD')}
        />
        <VictoryAxis dependentAxis
          label={text}
          axisLabelComponent={<VictoryLabel dy={-15} />}
        />
        <VictoryLegend x={70} y={60}
          data={[{ name: text }]}
          dataComponent={<LegendIcon />}
        />
        <VictoryGroup
          data={data}
          x="date"
          y="value"
          labels={d => d.value}
          labelComponent={<VictoryTooltip />}
        >
          <VictoryLine animate={{ duration: 1500 }} />
          <VictoryScatter
            size={(datum, active) => active ? 5 : 3}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};
