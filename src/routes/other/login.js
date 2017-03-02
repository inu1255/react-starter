import React from 'react';
import { connect } from 'dva';
import styles from './login.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Login';
        this.state = {}
    }
    render() {
        return <div className={cx("login-container")}></div>
    }
}

export default connect(({login})=>login)(Login);
