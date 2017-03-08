import React, { PropTypes } from 'react';
import { connect } from 'asha/libs/storage.js';
import styles from './login.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)
import { Button, Row, Form, Input } from 'antd'
const FormItem = Form.Item
import Link from 'asha/component/link/link.js'
import { routerRedux } from 'dva/router'

import UserModel from '../../services/user.js'
const model = new UserModel()

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'Login'
        this.state = {
            loginButtonLoading: false,
            loginErrorMsg: ""
        }
    }
    handleOk() {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            this.setState({ loginButtonLoading: true })
            model.login(values).then((data) => {
                this.state.loginButtonLoading = true
                this.props.dispatch({})
            }, (msg) => {
                this.setState({ loginErrorMsg: msg, loginButtonLoading: false })
            })
        })
    }
    onChange() {
        if (this.state.loginErrorMsg) {
            this.setState({ loginErrorMsg: "" })
        }
    }
    render() {
        return (
            <div className={ cx("login-container") }>
                <div className={ cx("logo") }>
                    <Link to="/index">
                    <img src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
                    <span>Cloud Center</span>
                    </Link>
                </div>
                <form>
                    <FormItem hasFeedback>
                        { this.props.form.getFieldDecorator('telphone', {
                              rules: [{ required: true, message: '请填写用户名' }]
                          })(<Input onChange={ this.onChange.bind(this) }
                                    size='large'
                                    onPressEnter={ this.handleOk.bind(this) }
                                    placeholder='用户名' />) }
                    </FormItem>
                    <FormItem hasFeedback>
                        { this.props.form.getFieldDecorator('password', {
                              rules: [{ required: true, message: '请填写密码' }]
                          })(<Input onChange={ this.onChange.bind(this) }
                                    size='large'
                                    type='password'
                                    onPressEnter={ this.handleOk.bind(this) }
                                    placeholder='密码' />) }
                    </FormItem>
                    <Row>
                        <Button type='primary'
                                size='large'
                                onClick={ this.handleOk.bind(this) }
                                loading={ this.state.loginButtonLoading }>
                            登录
                        </Button>
                    </Row>
                    <div className={ cx("footer") }>
                        <div className={ cx("error-msg") }>
                            { this.state.loginErrorMsg }
                        </div>
                        <Link query={ { register: 1 } }> 去注册
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    form: PropTypes.object
}

export default connect("app")(Form.create()(Login))