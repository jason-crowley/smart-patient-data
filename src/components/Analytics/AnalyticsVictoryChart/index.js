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
import AnalyticsVictoryTheme from '../AnalyticsVictoryTheme';
import AnalyticsLegendIcon from './AnalyticsLegendIcon';

const svgNS = 'http://www.w3.org/2000/svg';
const svgTag = document.createElementNS(svgNS, 'svg');
const textTag = document.createElementNS(svgNS, 'text');
const tspanTag = document.createElementNS(svgNS, 'tspan');
document.body.appendChild(svgTag);
svgTag.appendChild(textTag);
textTag.appendChild(tspanTag);
tspanTag.setAttribute('font-size', '12');
tspanTag.setAttribute('font-family', "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif");

export default function AnalyticsVictoryChart(props) {
  let {
    width = 450,
    height = 300,
    animate = false,
    data: { responseItems, eventData },
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
  eventData = eventData.filter(events => events.length);

  // Find min value for event bar height
  const values = responseItems.map(({ value }) => value);
  const minValue = reduce(min, Infinity, values);
  const maxValue = reduce(max, -Infinity, values);
  const range = maxValue - minValue;
  const step = range * 1.5 / (eventData.length || 1);

  // Assign a height and color for each grouping of events
  eventData = eventData.map((events, i) => {
    return events.map(event => (
      {
        ...event,
        height: minValue - step * (i + 1),
        color: (i % 2 === 0) ? 'red' : 'green',
      }
    ));
  });
  eventData = flatten(eventData);

  return (
    <div className="AnalyticsVictoryChart">
      <VictoryChart
        width={width} height={height}
        horizontal
        scale={{ y: 'time' }}
        theme={AnalyticsVictoryTheme}
        containerComponent={<VictoryVoronoiContainer />}
        events={[
          {
            childName: 'all',
            target: 'parent',
            eventHandlers: { onClick },
          },
        ]}
        {...restProps}
      >
        <VictoryLabel
          x={width / 2} y={25}
          text={titleText}
          textAnchor="middle"
          style={{ fontSize: 16 }}
        />
        <VictoryAxis
          dependentAxis
          label="Date"
          axisLabelComponent={<VictoryLabel dy={10} />}
        />
        <VictoryAxis
          label={axisText}
          axisLabelComponent={<VictoryLabel dy={-15} />}
        />
        {/* <VictoryBar */}
        {/*   data={eventData} */}
        {/*   x="height" */}
        {/*   y0="startDate" */}
        {/*   y="endDate" */}
        {/*   barWidth={8} */}
        {/*   labels={({ startDate, endDate, code: { text } }) => { */}
        {/*     const start = moment(startDate).format('MM/DD/YY'); */}
        {/*     const end = moment(endDate).format('MM/DD/YY'); */}
        {/*     const dates = `${start}${(start === end) ? '' : ' - ' + end}`; */}
        {/*     return `${text}: ${dates}`; */}
        {/*   }} */}
        {/*   labelComponent={ */}
        {/*     <VictoryTooltip */}
        {/*       cornerRadius={2} */}
        {/*       dy={4} */}
        {/*       flyoutStyle={{ fill: '#fff' }} */}
        {/*       orientation="top" */}
        {/*       pointerLength={5} */}
        {/*     /> */}
        {/*   } */}
        {/* /> */}
        <VictoryGroup
          data={responseItems}
          x="value"
          y="date"
          labels={({ date, value, unit }) => {
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
        <VictoryLegend
          x={90} y={50}
          borderComponent={<Border width={textLength + 35} />}
          data={[{ name: legendText }]}
          dataComponent={<AnalyticsLegendIcon />}
          labelComponent={<VictoryLabel dy={1} />}
          style={{ border: { fill: 'white' } }}
        />
      </VictoryChart>
    </div>
  );
};
