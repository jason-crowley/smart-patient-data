import React from 'react';
import AnalyticsVictoryChart from '../AnalyticsVictoryChart';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  cardContent: {
    padding: theme.spacing(0),
  },
}));

export default function AnalyticsChartCard(props) {
  const {
    data: { responseItems, eventData },
    onClick,
  } = props;
  const classes = useStyles();
  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <AnalyticsVictoryChart data={responseItems} />
      </CardContent>
        <CardContent className={classes.cardContent}>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          Select
        </Button>
        <Button size="small" color="primary">
          Details
        </Button>
      </CardActions>
    </Card>
  );
};
