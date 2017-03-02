import React from 'react';
import { connect } from 'dva';
import styles from './register.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Register'
    this.state = {}
  }
  render() {
    return (
      <div className={ cx("register-container") }>
        touch register.less
      </div>
    )
  }
}

export default connect()(Register)
