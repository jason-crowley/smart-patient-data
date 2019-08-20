import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Launcher from '../Launcher';
import AppShell from '../AppShell';
import { oauth2 as SMART } from 'fhirclient';
import './App.css';

export default function App() {
  const [ready, setReady] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Launcher} />
          <Route
            path="/app"
            render={props => {
              SMART.ready()
                .then(() => setReady(true))
                .catch(() => setReady(false));
              return ready && <AppShell />;
            }}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
