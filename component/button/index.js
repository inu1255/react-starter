import React from 'react';
import styles from './index.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {}
    }
    render() {
        return <button {...this.props} className={"inu-button "+(this.props.className||"")}>
            {this.props.title||"按钮"}
        </button>
    }
}

export default App
