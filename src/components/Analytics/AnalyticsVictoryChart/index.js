import React from 'react';
import {
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
} from 'victory';
import moment from 'moment';
import AnalyticsVictoryTheme from '../AnalyticsVictoryTheme';
import { makeSingleDateDomain } from 'utils/domainMakers';

export default function AnalyticsVictoryChart(props) {
  const {
    width = 450,
    height = 300,
    animate = false,
    data: responseItems,
    onClick,
    ...restProps
  } = props;

  // Format text for chart labels
  const { unit, code: { text } } = responseItems[0];
  const titleText = text.replace(/\s*\[.*?\]\s*/, ' ');
  const legendText = text.replace(/\[.*/, '').trim();
  const axisText = (legendText.length < 40)
    ? `${legendText} (${unit})`
    : legendText;

  const timeDomain = (responseItems.length === 1)
    ? makeSingleDateDomain(responseItems[0].date)
    : undefined;

  return (
    <div className="AnalyticsVictoryChart">
      <VictoryChart
        width={width} height={height} scale={{ y: 'time' }}
        horizontal
        domain={{ y: timeDomain }}
        theme={AnalyticsVictoryTheme}
        containerComponent={<VictoryVoronoiContainer />}
        {...restProps}
      >
        <VictoryLabel
          x={width / 2} y={30}
          text={titleText}
          textAnchor="middle"
          style={{ fontSize: 16 }}
        />
        <VictoryAxis dependentAxis />
        <VictoryAxis
          label={axisText}
          axisLabelComponent={<VictoryLabel dy={-15} />}
          tickFormat={d => `${d.toFixed(2)}`}
        />
        <VictoryGroup
          data={responseItems}
          x="value"
          y="date"
          labels={({ datum: { date, value, unit } }) => {
            date = moment(date).format('MMM DD, YYYY');
            value = value.toFixed(2);
            return `Date: ${date}\nValue: ${value} ${unit}`;
          }}
          labelComponent={
            <VictoryTooltip
              width={140} height={40}
              cornerRadius={2}
              flyoutStyle={{ fill: '#fff' }}
              orientation="top"
              pointerLength={5}
            />
          }
        >
          <VictoryLine sortKey="date" animate={animate} />
          <VictoryScatter />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};
