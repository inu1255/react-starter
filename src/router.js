import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import App from './routes/app.js';

const EmptyRoute = ({children}) => (children);
function RouterConfig({history}) {
    return (
        <Router history={ history }>
            <Route path="/" component={ EmptyRoute }>
                <IndexRoute component={ require("./routes/index.js") }></IndexRoute>
                <Route path="index" component={ require("./routes/index.js") }></Route>
                <Route path="" component={ App }>
                    <Route path="movie" component={ require("./routes/movies/movie.js") }></Route>
                </Route>
            </Route>
        </Router>
    )
}

export default RouterConfig;
