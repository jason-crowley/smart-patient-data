import React from 'react';
import AnalyticsVictoryChart from '../AnalyticsVictoryChart';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

export default function AnalyticsChartCard(props) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <AnalyticsVictoryChart {...props} />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={props.onClick}>
          Select
        </Button>
        <Button size="small" color="primary">
          Details
        </Button>
      </CardActions>
    </Card>
  );
};
