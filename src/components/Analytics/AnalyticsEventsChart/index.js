import React from 'react';
import { VictoryChart, VictoryAxis, VictoryBar, Bar, VictoryTooltip } from 'victory';
import moment from 'moment';
import AnalyticsVictoryTheme from '../AnalyticsVictoryTheme';
import { DEFAULT_TIME_DOMAIN } from 'constants/index.js';

const COLORS = {
  'MedicationRequest': '#8884d8',
  'Condition': '#82ca9d',
  'Encounter': 'red',
};

const MinHeightBar = ({ x0, x, ...props }) => {
  return <Bar x0={x0} x={Math.max(x0 + 0.5, x)} {...props} />;
};

export default function AnalyticsEventsChart({ data }) {
  return (
    <VictoryChart
      width={600} scale={{ y: 'time' }}
      horizontal
      padding={{ top: 50, right: 50, bottom: 50, left: 200 }}
      domainPadding={{ x: 20, y: [20, 30] }}
      theme={AnalyticsVictoryTheme}
    >
      <VictoryAxis
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
      {data.map(d => (
        <VictoryBar
          key={d[0].code.text}
          data={d}
          style={{ data: { fill: COLORS[d[0].category] } }}
          x={datum => datum.code.text}
          y0="startDate"
          y="endDate"
          barWidth={8}
          dataComponent={<MinHeightBar />}
          labels={({ startDate, endDate, code: { text } }) => {
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
