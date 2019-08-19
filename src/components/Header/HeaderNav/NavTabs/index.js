import React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  fullHeight: {
    ...theme.mixins.toolbar,
  },
}));

export default function NavTabs(props) {
  const { tab, handleChangeTab, children } = props;
  const classes = useStyles();

  return (
    <Tabs
      variant="fullWidth"
      value={tab}
      onChange={handleChangeTab}
      aria-label="nav tabs"
    >
      {children.map((tabProps, index) => (
        <Tab
          className={classes.fullHeight}
          key={index}
          component={Link}
          {...tabProps}
        />
      ))}
    </Tabs>
  );
};
