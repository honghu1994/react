import React, { Component } from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import Layout from './component/layout/layout';
import Notfound from './component/notfound/notfound';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/layout" component={ Layout } />
          <Redirect exact from="/" to="/layout" />
          <Route component={ Notfound } />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
