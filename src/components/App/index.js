import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { FhirClientContext } from 'contexts/FhirClientContext';
import Launcher from '../Launcher';
import AppShell from '../AppShell';
import { oauth2 as SMART } from 'fhirclient';
import './App.css';

export default function App() {
  const [client, setClient] = useState(null);
  useEffect(() => {
    SMART.ready().then(setClient)
      .catch(() => setClient(null));
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Launcher} />
          <Route
            path="/app"
            render={props => client && (
              <FhirClientContext.Provider value={client}>
                <AppShell />
              </FhirClientContext.Provider>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
