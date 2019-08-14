import React, { useState } from 'react';
import {
  createContainer,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
} from 'victory';
import { reduce, minBy, maxBy } from 'ramda';
import moment from 'moment';
import AnalyticsVictoryChart from '../AnalyticsVictoryChart';
import AnalyticsVictoryTheme from '../AnalyticsVictoryTheme';
import './AnalyticsFocusVictoryChart.css';

export default function AnalyticsFocusVictoryChart({ data, onClick }) {
  const { responseItems } = data;
  const { date: firstDate } = responseItems[0];
  const dates = responseItems.map(({ date }) => date);
  const minDate = reduce(minBy(d => d.getTime()), firstDate, dates);
  const maxDate = reduce(maxBy(d => d.getTime()), firstDate, dates);
  const [zoomDomain, setZoomDomain] = useState({ y: [minDate, maxDate] });
  const VictoryZoomVoronoiContainer = VictoryZoomContainer;

  return (
    <div className="AnalyticsFocus">
      <div className="AnalyticsFocus__zoom">
        <AnalyticsVictoryChart
          data={data}
          onClick={() => console.log('hi')}
          containerComponent={
            <VictoryZoomVoronoiContainer
              className="AnalyticsVictoryChart__container"
              onZoomDomainChange={domain => setZoomDomain(domain)}
            />
          }
        />
      </div>
      <div className="AnalyticsFocus__brush">
        <VictoryChart
          width={600} height={100} scale={{ y: 'time' }}
          horizontal
          theme={AnalyticsVictoryTheme}
          padding={20}
          containerComponent={
            <VictoryBrushContainer
              className="AnalyticsVictoryChart__container"
              allowDrag={false}
              allowResize={false}
              brushDimension="y"
              brushDomain={zoomDomain}
            />
          }
        >
          <VictoryAxis
            dependentAxis
            tickFormat={date => moment(date).format('YYYY')}
          />
          <VictoryLine
            data={responseItems}
            x="value" y="date" sortKey="date"
          />
        </VictoryChart>
        {/* <AnalyticsVictoryChart */}
        {/*   data={{ responseItems, eventData: [] }} */}
        {/*   onClick={() => console.log('hi')} */}
        {/*   containerComponent={ */}
        {/*     <VictoryBrushContainer */}
        {/*       className="AnalyticsVictoryChart__container" */}
        {/*       brushDimension="y" */}
        {/*       brushDomain={zoomDomain} */}
        {/*       onBrushDomainChange={domain => setZoomDomain(domain)} */}
        {/*     /> */}
        {/*   } */}
        {/* /> */}
      </div>
    </div>
  );
};
