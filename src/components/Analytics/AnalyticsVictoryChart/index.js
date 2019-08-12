import React from 'react';
import {
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
  VictoryLegend,
  Border,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryBar,
  VictoryTooltip,
} from 'victory';
import { reduce, min, max } from 'ramda';
import moment from 'moment';
import AnalyticsVictoryTheme from './AnalyticsVictoryTheme';
import AnalyticsLegendIcon from './AnalyticsLegendIcon';
import './AnalyticsVictoryChart.css';

const svgNS = 'http://www.w3.org/2000/svg';
const svgTag = document.createElementNS(svgNS, 'svg');
const textTag = document.createElementNS(svgNS, 'text');
const tspanTag = document.createElementNS(svgNS, 'tspan');
document.body.appendChild(svgTag);
svgTag.appendChild(textTag);
textTag.appendChild(tspanTag);
tspanTag.setAttribute('font-size', '12');
tspanTag.setAttribute('font-family', "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif");

export default function AnalyticsVictoryChart({ data: { responseItems, events } }) {
  const { text } = responseItems[0].code;
  const titleText = text.replace(/\s*\[.*?\]\s*/, ' ');
  const legendText = text.replace(/\[.*/, '').trim();
  const axisText = (text.length < 40)
    ? text.replace(/(?<=\]).*/, '').trim()
    : legendText;

  // Calculate text size for legend
  const textNode = document.createTextNode(legendText);
  tspanTag.appendChild(textNode);
  const textLength = tspanTag.getComputedTextLength();
  tspanTag.removeChild(textNode);

  // Filter out events that are not contained within the domain
  const times = responseItems.map(({ date }) => date.getTime());
  const minTime = reduce(min, Infinity, times);
  const maxTime = reduce(max, -Infinity, times);
  events = events.filter(({ startDate, endDate }) => {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    const startInDomain = minTime < startTime && startTime < maxTime;
    const endInDomain = minTime < endTime && endTime < maxTime;
    return startInDomain || endInDomain;
  });

  // Find min value for event bar height
  const values = responseItems.map(({ value }) => value);
  const minValue = reduce(min, Infinity, values);

  return (
    <div className="AnalyticsVictoryChart">
      <VictoryChart
        theme={AnalyticsVictoryTheme}
        horizontal
        scale={{ y: 'time' }}
        containerComponent={
          <VictoryVoronoiContainer
            className="AnalyticsVictoryChart__container"
          />
        }
      >
        <VictoryLabel x={225} y={25}
          text={titleText}
          textAnchor="middle"
          style={{ fontSize: 16 }}
        />
        <VictoryAxis
          dependentAxis
          label="Date"
          axisLabelComponent={<VictoryLabel dy={10} />}
          tickFormat={date => moment(date).format('MMM YYYY')}
        />
        <VictoryAxis
          label={axisText}
          axisLabelComponent={<VictoryLabel dy={-15} />}
        />
        <VictoryLegend x={90} y={50}
          borderComponent={<Border width={textLength + 35} />}
          data={[{ name: legendText }]}
          dataComponent={<AnalyticsLegendIcon />}
          labelComponent={<VictoryLabel dy={1} />}
        />
        <VictoryBar
          data={events}
          x={() => minValue}
          y0="startDate"
          y="endDate"
        />
        <VictoryGroup
          data={responseItems}
          x="value"
          y="date"
          labels={d => d.value.toFixed(2)}
          labelComponent={
            <VictoryTooltip
              cornerRadius={2}
              flyoutStyle={{ fill: '#fff' }}
              horizontal={false}
            />
          }
        >
          <VictoryLine sortKey="date" animate={{ duration: 1500 }} />
          <VictoryScatter
            size={(datum, active) => active ? 5 : 3}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};
