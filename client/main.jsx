import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from 'containers/App/App';
import NotFound from 'containers/NotFound/NotFound';
import One from 'containers/One';
import Two from 'containers/Two';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={One} />
    </Route>
    <Route path="two" component={Two} />

    {/* add the routes here */}

    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('app'));
