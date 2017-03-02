import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup.js'
import './transition.css'

const App = ({ children, location }) => {
  return <div>
    <ReactCSSTransitionGroup
      component="div"
      transitionName="router"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={50}
    >
      {React.cloneElement(children, {
        key: location.pathname
      })}
    </ReactCSSTransitionGroup>
  </div>
}

export default App
