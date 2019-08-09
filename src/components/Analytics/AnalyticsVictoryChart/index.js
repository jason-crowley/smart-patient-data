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

export default function AnalyticsVictoryChart({ data: { responseItems } }) {
  const { text } = responseItems[0].code;
  const trimmedText = text.replace(/\[.*/, '');
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
        <VictoryLabel x={220} y={25}
          text={text}
          textAnchor="middle"
          style={{ fontSize: 16 }}
        />
        <VictoryAxis
          label="Date"
          axisLabelComponent={<VictoryLabel dy={10} />}
          tickFormat={date => moment(date).format('MM/DD')}
        />
        <VictoryAxis dependentAxis
          label={trimmedText}
          axisLabelComponent={<VictoryLabel dy={-15} />}
        />
        <VictoryLegend x={90} y={50}
          data={[{ name: trimmedText }]}
          dataComponent={<AnalyticsLegendIcon />}
        />
        <VictoryGroup
          data={responseItems}
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
