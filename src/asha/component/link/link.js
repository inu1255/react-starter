import React from 'react';
import { Link,withRouter } from 'react-router'

class InuLink extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'InuLink';
        this.state = {}
    }
    render() {
        return <Link {...this.props} to={{...this.props.location,...this.props.to}}></Link>
    }
}

export default withRouter(InuLink)
