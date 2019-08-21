import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { FhirClientContext } from 'contexts/FhirClientContext';
import usePatientData from 'hooks/usePatientData';
import Header from '../Header';
import Home from '../Home';
import Analytics from '../Analytics';
import Surveys from '../Surveys';
import Builder from '../Builder';
import { RESOURCE_TYPES } from 'constants/index.js';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
}));

export default function AppShell() {
  const client = useContext(FhirClientContext);
  const { isLoading, isError, data } = usePatientData(client, RESOURCE_TYPES);
  const classes = useStyles();

  // Display loading progress and error messages
  if (isLoading)
    return (
      <Grid className={classes.progressContainer} container>
        <Grid item><CircularProgress /></Grid>
      </Grid>
    );
  if (isError)
    return <h2>There was an error processing your request.</h2>;

  return (
    <BrowserRouter>
      <div className="AppShell">
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <Switch>
              <Redirect from="/app" to="/home" />
              <Route path="/home" component={Home} />
              <Route
                path="/analytics"
                render={props => <Analytics {...props} data={data} />}
              />
              <Route path="/surveys" component={Surveys} />
              <Route path="/builder" component={Builder} />
            </Switch>
          </Grid>
        </Grid>
      </div>
    </BrowserRouter>
  );
};
