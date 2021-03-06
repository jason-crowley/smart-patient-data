import React from 'react';
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryBar,
  Bar,
  VictoryTooltip,
} from 'victory';
import moment from 'moment';
import AnalyticsVictoryTheme from '../AnalyticsVictoryTheme';
import { makeDomainFromDates } from 'utils/domainMakers';
import { assocPath } from 'ramda';

const COLORS = {
  'MedicationRequest': '#8884d8',
  'Condition': '#82ca9d',
  'Encounter': 'red',
};

const MinHeightBar = ({ x0, x, ...props }) => (
  <Bar x0={x0} x={Math.max(x0 + 0.5, x)} {...props} />
);

export default function AnalyticsEventsChart(props) {
  const {
    width = 450,
    height = 240,
    data,
    ...restProps
  } = props;

  // Get all unique times in data
  const times = new Set();
  for (const events of data) {
    for (const { startDate, endDate } of events) {
      times.add(+startDate);
      times.add(+endDate);
    }
  }

  // Calculate default domain
  const dates = Array.from(times, time => new Date(time));
  const domain = { y: makeDomainFromDates(dates) };

  return (
    <VictoryChart
      width={width} height={height} scale={{ y: 'time' }}
      horizontal
      domain={domain}
      theme={assocPath(['chart', 'padding', 'top'], 0, AnalyticsVictoryTheme)}
      containerComponent={<VictoryVoronoiContainer />}
      {...restProps}
    >
      <VictoryAxis
        invertAxis
        tickFormat={data.length ? undefined : () => ''}
        style={{
          grid: { stroke: 'none' },
          ticks: { stroke: 'none' },
          tickLabels: { fontSize: 10 },
        }}
      />
      <VictoryAxis
        dependentAxis
        style={{
          grid: { strokeDasharray: '2 2' },
          tickLabels: { fontSize: 10 },
        }}
      />
      {data.map(events => (
        <VictoryBar
          key={events[0].code.text}
          data={events}
          style={{ data: { fill: COLORS[events[0].category] } }}
          x={datum => datum.code.text}
          y0="startDate"
          y="endDate"
          barWidth={8}
          dataComponent={<MinHeightBar />}
          labels={({ datum: { startDate, endDate } }) => {
            const start = moment(startDate).format('MM/DD/YY');
            const end = moment(endDate).format('MM/DD/YY');
            return `${start}${(start === end) ? '' : ' - ' + end}`;
          }}
          labelComponent={
            <VictoryTooltip
              cornerRadius={2}
              dy={4}
              flyoutStyle={{ fill: '#fff' }}
              orientation="top"
              pointerLength={5}
            />
          }
        />
      ))}
    </VictoryChart>
  );
}
