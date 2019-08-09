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

const axisStyle = {
  axis: { stroke: '#666' },
  grid: { stroke: '#ccc', strokeDasharray: '5 5' },
  ticks: { size: 6, stroke: '#666' },
  tickLabels: { fill: '#666' },
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
        containerComponent={
          <VictoryVoronoiContainer
            className="AnalyticsVictoryChart__container"
          />
        }
        padding={{ top: 50, right: 50, bottom: 60, left: 60 }}
        domainPadding={30}
      >
      <VictoryLabel
        text={text}
        style={{ fontSize: 18 }}
        x={160}
        y={25}
      />
      <VictoryAxis
        label="Date"
        axisLabelComponent={<VictoryLabel dy={10} />}
        tickFormat={date => moment(date).format('MM/DD')}
        style={axisStyle}
      />
      <VictoryAxis
        dependentAxis
        label={text}
        axisLabelComponent={<VictoryLabel dy={-15} />}
        style={axisStyle}
      />
      <VictoryLegend x={70} y={60}
        orientation="horizontal"
        data={[{ name: text }]}
        dataComponent={<LegendIcon />}
        style={{
          border: { stroke: 'black' },
          labels: { fontSize: 12 },
        }}
      />
      <VictoryGroup
        data={data}
        x="date"
        y="value"
        labels={d => d.value}
        labelComponent={
          <VictoryTooltip
            cornerRadius={0.8}
            flyoutStyle={{ fill: '#fff' }}
          />
        }
      >
        <VictoryLine
          animate={{ duration: 1500 }}
          interpolation="monotoneX"
          style={{
            data: { stroke: '#3182bd', strokeWidth: 1 },
          }}
        />
        <VictoryScatter
          size={(datum, active) => active ? 5 : 3}
          style={{
            data: { fill: '#fff', stroke: '#3182bd', strokeWidth: 1 },
          }}
        />
      </VictoryGroup>
    </VictoryChart>
  </div>
  );
};
