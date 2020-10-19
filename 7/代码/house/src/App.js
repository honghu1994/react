import React from 'react';
import Layout from './component/layout/layout.jsx';
import Notfound from './component/notfound/notfound.jsx';

import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';


function App() {
  return (
    <HashRouter>
        <Switch>
          <Route path="/layout" component={ Layout } />
          <Redirect exact from="/" to="/layout" />
          <Route  component={ Notfound } />
        </Switch>
    </HashRouter>
  );
}

export default App;
