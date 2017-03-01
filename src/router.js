import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import MainLayout from './components/layout/lr/Main.js';

const EmptyRoute = ({ children }) => (children);
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={EmptyRoute}>
        <IndexRoute component={IndexPage}></IndexRoute>
        <Route path="" component={MainLayout}>
          <Route path="/index" component={IndexPage}></Route>
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
