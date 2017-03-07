import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './register.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)
import { Button, Row, Form, Input, Col } from 'antd'
const FormItem = Form.Item
import Link from 'asha/component/link/link.js'

import UserModel from '../../services/user.js'
const model = new UserModel()

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'Register'
        this.state = {
            ButtonLoading: false,
            ErrorMsg: ""
        }
    }
    handleOk() {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            this.setState({ ButtonLoading: true })
            model.register(values).then((data) => {
                this.props.dispatch({ type: 'app/login', payload: data })
                this.setState({ ButtonLoading: false })
            }, (msg) => {
                this.setState({ ErrorMsg: msg, ButtonLoading: false })
            })
        })
    }
    onChange() {
        if (this.state.ErrorMsg) {
            this.setState({ ErrorMsg: "" })
        }
    }
    Unfreezing() {
        setTimeout(() => {
            this.state.codeFreezing--
            this.setState({})
        }, 1000)
    }
    sendCode() {
        const form = this.props.form
        if (form.isFieldValidating("telphone")) {
            const telphone = this.props.form.getFieldValue("telphone")
            model.request("/verify/send/" + telphone)
            this.setState({ codeFreezing: 60 })
            this.Unfreezing()
        } else {

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
                              rules: [{ required: true, message: '请填写邮箱' }, { message: '邮箱格式不正确', type: "email" }]
                          })(<Input onChange={ this.onChange.bind(this) } size='large' onPressEnter={ this.handleOk.bind(this) } placeholder='邮箱' />) }
                    </FormItem>
                    <FormItem>
                        <Row gutter={ 8 }>
                            <Col span={ 12 }>
                            { this.props.form.getFieldDecorator('code', {
                                  rules: [{ required: true, message: '请填写验证码' }]
                              })(<Input onChange={ this.onChange.bind(this) } size='large' onPressEnter={ this.handleOk.bind(this) } placeholder='验证码' />) }
                            </Col>
                            <Col span={ 12 }>
                            <Button onClick={ this.sendCode.bind(this) } disabled={ this.state.codeFreezing }>
                                { this.state.codeFreezing ? this.state.codeFreezing + '秒' : "发送验证码" }
                            </Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem hasFeedback>
                        { this.props.form.getFieldDecorator('password', {
                              rules: [{ required: true, message: '请填写密码' }]
                          })(<Input
                                    onChange={ this.onChange.bind(this) }
                                    size='large'
                                    type='password'
                                    onPressEnter={ this.handleOk.bind(this) }
                                    placeholder='密码' />) }
                    </FormItem>
                    <Row>
                        <Button type='primary' size='large' onClick={ this.handleOk.bind(this) } loading={ this.state.ButtonLoading }>
                            注册
                        </Button>
                    </Row>
                    <div className={ cx("footer") }>
                        <div className={ cx("error-msg") }>
                            { this.state.ErrorMsg }
                        </div>
                        <Link to="/login"> 去登录
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    form: PropTypes.object
}

export default connect(({app}) => app)(Form.create()(Register))