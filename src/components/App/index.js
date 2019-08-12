import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import usePatientData from 'hooks/usePatientData';
import Home from '../Home';
import Analytics from '../Analytics';
import Surveys from '../Surveys';
import Builder from '../Builder';
import Header from '../Header';
import './App.css';

const PATIENT_ID = '030b3765-844c-4cc1-a36f-974c37895eee';
const RESOURCE_TYPES = [
  'Observation',
  'MedicationRequest',
  'Condition',
  'Encounter',
];

export default function App() {
  const { isLoading, isError, data } =
    usePatientData(PATIENT_ID, RESOURCE_TYPES);

  // Display loading and error messages
  if (isLoading)
    return <h2>Loading...</h2>;
  if (isError)
    return <h2>There was an error processing your request.</h2>;

  return (
    <BrowserRouter>
      <div className="App">
        <Header>
          <Link className="HeaderNav__link" to="/">Home</Link>
          <Link className="HeaderNav__link" to="/analytics">Analytics</Link>
          <Link className="HeaderNav__link" to="/surveys">Surveys</Link>
          <Link className="HeaderNav__link" to="/builder">Survey Builder</Link>
        </Header>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/analytics"
            render={(props) => <Analytics {...props} data={data} />}
          />
          <Route path="/surveys" component={Surveys} />
          <Route path="/builder" component={Builder} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
