import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import Analytics from '../Analytics/Analytics';
import Surveys from '../Surveys/Surveys';
import Builder from '../Builder/Builder';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <nav className="menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/analytics">Analytics</Link></li>
              <li><Link to="/surveys">Surveys</Link></li>
              <li><Link to="/builder">Survey Builder</Link></li>
            </ul>
          </nav>
        </header>

        <Route path="/" exact component={Home} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/surveys" component={Surveys} />
        <Route path="/builder" component={Builder} />
      </div>
    </BrowserRouter>
  );
}

export default App;
