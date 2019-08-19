import React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function NavTabs(props) {
  const { tab, handleChangeTab, children } = props;
  return (
    <Tabs
      variant="fullWidth"
      value={tab}
      onChange={handleChangeTab}
      aria-label="nav tabs"
    >
      {children.map((tabProps, index) => (
        <Tab
          key={index}
          component={Link}
          {...tabProps}
        />
      ))}
    </Tabs>
  );
};
