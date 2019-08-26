import React, { useState } from 'react';
import AnalyticsVictoryChart from '../AnalyticsVictoryChart';
import AnalyticsEventsChart from '../AnalyticsEventsChart';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles(theme => ({
  cardContent: {
    padding: theme.spacing(0),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function AnalyticsChartCard(props) {
  const {
    data: { responseItems, eventData },
    onClick,
  } = props;
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => setExpanded(wasExpanded => !wasExpanded);
  const classes = useStyles();
  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <AnalyticsVictoryChart data={responseItems} />
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.cardContent}>
          <AnalyticsEventsChart data={eventData} />
        </CardContent>
      </Collapse>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          Select
        </Button>
        <Button size="small" color="primary">
          Details
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpand}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
