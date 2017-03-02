import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import MainLayout from './components/layout/lr/main.js';

const EmptyRoute = ({ children }) => (children);
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={EmptyRoute}>
        <IndexRoute component={require("./routes/index.js")}></IndexRoute>
        <Route path="" component={MainLayout}>
          <Route path="/index" component={require("./routes/index.js")}></Route>
          <Route path="/login" component={require("./routes/other/login.js")}></Route>
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
