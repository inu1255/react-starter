import React from 'react';
import { Link, withRouter } from 'react-router'

class InuLink extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'InuLink';
        this.state = {}
    }
    render() {
        const to = { ...this.props.location }
        if (typeof this.props.to == "string")
            to.pathname = this.props.to
        else if (typeof this.props.to == "object")
            Object.assign(to, this.props.to)
        return (
            <Link
                  activeStyle={ this.props.activeStyle }
                  activeClassName={ this.props.activeClassName }
                  onlyActiveOnIndex={ this.props.onlyActiveOnIndex }
                  onClick={ this.props.onClick }
                  target={ this.props.target }
                  to={ to }>
            { this.props.children }
            </Link>
        )
    }
}

InuLink.defaultProps = {
    to: {}
}

export default withRouter(InuLink)
