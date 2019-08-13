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
import { reduce, min, max, map, filter, flatten } from 'ramda';
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

export default function AnalyticsVictoryChart({
  data: { responseItems, eventData },
  onClick,
}) {
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
  eventData = map(filter(({ startDate, endDate }) => {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    const startInDomain = minTime < startTime && startTime < maxTime;
    const endInDomain = minTime < endTime && endTime < maxTime;
    return startInDomain || endInDomain;
  }), eventData);

  // Find min value for event bar height
  const values = responseItems.map(({ value }) => value);
  const minValue = reduce(min, Infinity, values);
  const maxValue = reduce(max, -Infinity, values);
  const range = maxValue - minValue;
  const step = range / (eventData.length + 1);

  eventData = eventData.map((events, i) => {
    return events.map(event => (
      {
        ...event,
        height: minValue - step * (i + 1),
        color: 'blue',
      }
    ));
  });
  eventData = flatten(eventData);

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
        events={[
          {
            childName: 'all',
            target: 'parent',
            eventHandlers: { onClick },
          },
        ]}
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
          data={eventData}
          x="height"
          y0="startDate"
          y="endDate"
          labels={d => moment(d.startDate).format('MM/DD/YY')}
          labelComponent={
            <VictoryTooltip
              cornerRadius={2}
              dy={-10}
              flyoutStyle={{ fill: '#fff' }}
              orientation="top"
              pointerLength={5}
            />
          }
        />
        <VictoryGroup
          data={responseItems}
          x="value"
          y="date"
          labels={d =>
              `Date: ${moment(d.date).format('MMM DD, YYYY')}\n
              Value: ${d.value.toFixed(2)}`}
          labelComponent={
            <VictoryTooltip width={140} height={40}
              cornerRadius={2}
              flyoutStyle={{ fill: '#fff' }}
              labelComponent={<VictoryLabel dy={8} />}
              orientation="top"
              pointerLength={5}
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
