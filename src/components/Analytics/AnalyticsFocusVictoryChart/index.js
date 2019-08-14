import React, { useState } from 'react';
import { createContainer, VictoryZoomContainer, VictoryBrushContainer } from 'victory';
import AnalyticsVictoryChart from '../AnalyticsVictoryChart';
import { reduce, minBy, maxBy } from 'ramda';
import './AnalyticsFocusVictoryChart.css';

// const data = {
//   responseItems: [
//     { id: 'id1', date: new Date(), value: 2, code: { text: 'hello' } },
//     { id: 'id2', date: new Date(+new Date() + 100), value: 3, code: { text: 'hello' } },
//   ],
//   eventData: [],
// };

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
              zoomDimension="y"
              zoomDomain={zoomDomain}
              onZoomDomainChange={domain => setZoomDomain(domain)}
            />
          }
        />
      </div>
      <div className="AnalyticsFocus__brush">
        <AnalyticsVictoryChart
          data={{ responseItems, eventData: [] }}
          onClick={() => console.log('hi')}
          containerComponent={
            <VictoryBrushContainer
              className="AnalyticsVictoryChart__container"
              brushDimension="y"
              brushDomain={zoomDomain}
              onBrushDomainChange={domain => setZoomDomain(domain)}
            />
          }
        />
      </div>
    </div>
  );
};
