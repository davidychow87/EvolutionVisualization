import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import { Router, Route, browserHistory } from 'react-router'

import App from 'containers/App/App';
import NotFound from 'containers/NotFound/NotFound';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    {/* add the routes here */}

    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('app'));
