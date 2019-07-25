import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from '../Home';
import Analytics from '../Analytics';
import Surveys from '../Surveys';
import Builder from '../Builder';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <nav className="menu">
            <ul className="menu__list">
              <li className="menu__list-item">
                <Link className="menu__link" to="/">Home</Link>
              </li>
              <li className="menu__list-item">
                <Link className="menu__link" to="/analytics">Analytics</Link>
              </li>
              <li className="menu__list-item">
                <Link className="menu__link" to="/surveys">Surveys</Link>
              </li>
              <li className="menu__list-item">
                <Link className="menu__link" to="/builder">Survey Builder</Link>
              </li>
            </ul>
          </nav>
        </header>
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
