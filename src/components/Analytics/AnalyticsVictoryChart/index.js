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

  // Map date strings to date objects for time scale
  responseItems = responseItems.map(({ date, value }) => ({ date: new Date(date), value }));
  events = events.map(({ startDate, endDate }) => ({ startDate: new Date(startDate), endDate: new Date(endDate) }));

  // Calculate text size for legend
  const textNode = document.createTextNode(legendText);
  tspanTag.appendChild(textNode);
  const textLength = tspanTag.getComputedTextLength();
  tspanTag.removeChild(textNode);

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
        />
        <VictoryBar
          data={events}
          x={d => 0}
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
