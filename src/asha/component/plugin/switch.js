import React from 'react';

class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Switch';
        this.state = {}
    }
    render() {
        var children = this.props.each&&this.props.each(this.props.status)
        if(typeof children=="string")return <span>{children}</span>
        if(React.isValidElement(children))return children
        return this.props.children||null
    }
}

Switch.propTypes = {
    each:React.PropTypes.func
}

export default Switch
