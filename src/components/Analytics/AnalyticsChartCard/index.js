import React from 'react';
import AnalyticsVictoryChart from '../AnalyticsVictoryChart';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  cardContent: {
    padding: theme.spacing(0),
  },
}));

export default function AnalyticsChartCard(props) {
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea>
        <CardContent className={classes.cardContent}>
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
