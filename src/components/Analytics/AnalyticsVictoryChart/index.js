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

export default function AnalyticsVictoryChart({ data: { responseItems } }) {
  const { text } = responseItems[0].code;
  const trimmedText = text.replace(/\[.*/, '').trim();

  // Calculate text size for legend
  const textNode = document.createTextNode(trimmedText);
  tspanTag.appendChild(textNode);
  const textLength = tspanTag.getComputedTextLength();
  tspanTag.removeChild(textNode);
  console.log(textLength);

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
        <VictoryLabel x={225} y={25}
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
          width={textLength + 40}
        />
        <VictoryGroup
          data={responseItems}
          x="date"
          y="value"
          labels={d => d.value.toFixed(2)}
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
        <VictoryBar
          data={responseItems}
          x="date"
          y="value"
        />
      </VictoryChart>
    </div>
  );
};
