import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Launcher from '../Launcher';
import AppShell from '../AppShell';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Launcher} />
          <Route path="/app" component={AppShell} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
