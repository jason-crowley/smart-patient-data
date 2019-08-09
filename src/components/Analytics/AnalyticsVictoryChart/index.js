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
import AnalyticsVictoryTheme from './AnalyticsVictoryTheme';
import AnalyticsLegendIcon from './AnalyticsLegendIcon';
import './AnalyticsVictoryChart.css';

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
          dataComponent={<AnalyticsLegendIcon />}
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
          <VictoryLine animate={{ duration: 1500 }} />
          <VictoryScatter
            size={(datum, active) => active ? 5 : 3}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};
