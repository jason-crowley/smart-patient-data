import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import usePatientData from 'hooks/usePatientData';
import Header from '../Header';
import Home from '../Home';
import Analytics from '../Analytics';
import Surveys from '../Surveys';
import Builder from '../Builder';
import './AppShell.css';

const RESOURCE_TYPES = [
  'Observation',
  'MedicationRequest',
  'Condition',
  'Encounter',
];

export default function AppShell() {
  const { isLoading, isError, data } = usePatientData(RESOURCE_TYPES);

  // Display loading and error messages
  if (isLoading)
    return <h2>Loading...</h2>;
  if (isError)
    return <h2>There was an error processing your request.</h2>;

  return (
    <BrowserRouter>
      <div className="AppShell">
        <Header />

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
      </div>
    </BrowserRouter>
  );
};
