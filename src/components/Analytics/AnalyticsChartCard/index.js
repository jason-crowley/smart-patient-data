import React, { useState } from 'react';
import AnalyticsVictoryChart from '../AnalyticsVictoryChart';
import AnalyticsEventsChart from '../AnalyticsEventsChart';
import { makeDomainFromDates } from 'utils/domainMakers';
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
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
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

  // Calculate domain of responseItems
  const dates = responseItems.map(({ date }) => date);
  const [minDate, maxDate] = makeDomainFromDates(dates);
  const domain = { y: [minDate, maxDate] };

  // Filter out events not in the domain of responseItems
  const eventsInDomain = eventData.map(events => {
    return events.filter(({ startDate, endDate }) => {
      const startInDomain = +minDate <= +startDate && +startDate <= +maxDate;
      const endInDomain = +minDate <= +endDate && +endDate <= +maxDate;
      return startInDomain || endInDomain;
    });
  }).filter(events => events.length);

  const classes = useStyles();
  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <AnalyticsVictoryChart data={responseItems} domain={domain} />
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.cardContent}>
          <AnalyticsEventsChart data={eventsInDomain} domain={domain} />
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
