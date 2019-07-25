import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from '../Home';
import Analytics from '../Analytics';
import Surveys from '../Surveys';
import Builder from '../Builder';
import Header from '../Header';
import './App.css';

export default function App() {
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
          <Route path="/analytics" component={Analytics} />
          <Route path="/surveys" component={Surveys} />
          <Route path="/builder" component={Builder} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
