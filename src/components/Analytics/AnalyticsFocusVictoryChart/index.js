import React, { useState } from 'react';
import {
  createContainer,
  VictoryBrushContainer,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
} from 'victory';
import { reduce, minBy, maxBy } from 'ramda';
import moment from 'moment';
import AnalyticsVictoryChart from '../AnalyticsVictoryChart';
import AnalyticsVictoryTheme from '../AnalyticsVictoryTheme';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const MULTIPLIER = 0.07747933884;

export default function AnalyticsFocusVictoryChart({ data, onClick }) {
  const { responseItems } = data;
  const { date: firstDate } = responseItems[0];
  const dates = responseItems.map(({ date }) => date);
  const minDate = reduce(minBy(d => d.getTime()), firstDate, dates);
  const maxDate = reduce(maxBy(d => d.getTime()), firstDate, dates);
  const range = maxDate - minDate;
  const zoomOffset = MULTIPLIER * range;
  const zoomMin = new Date(+minDate - zoomOffset);
  const zoomMax = new Date(+maxDate + zoomOffset);
  const [zoomDomain, setZoomDomain] = useState({ y: [zoomMin, zoomMax] });
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}><p onClick={onClick}>Go Back</p></Grid>
      <Grid item xs={12}>
        <Paper>
          <AnalyticsVictoryChart
            width={600} height={250}
            padding={{ top: 50, right: 80, bottom: 50, left: 80 }}
            data={responseItems}
            containerComponent={
              <VictoryZoomVoronoiContainer
                zoomDimension="y"
                onZoomDomainChange={domain => setZoomDomain(domain)}
              />
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <VictoryChart
            width={600} height={100} scale={{ y: 'time' }}
            horizontal
            theme={AnalyticsVictoryTheme}
            padding={20}
            containerComponent={
              <VictoryBrushContainer
                allowDrag={false}
                allowResize={false}
                brushDimension="y"
                brushDomain={{ y: zoomDomain.y }}
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
        </Paper>
      </Grid>
    </Grid>
  );
};
