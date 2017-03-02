import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
    }
    render() {
        return this.props.children
    }
}

export default App
