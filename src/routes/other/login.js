import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './login.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)
import { Button, Row, Form, Input } from 'antd'
const FormItem = Form.Item
import Link from 'asha/component/link/link.js'

const Login = ({loginButtonLoading, onOk, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      onOk(values)
    })
  }

  return (
    <div className={ cx("login-container") }>
      <div className={ styles.logo }>
        <Link to="/index">
        <img src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
        <span>Ant Design</span>
        </Link>
      </div>
      <form>
        <FormItem hasFeedback>
          { getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名'
                }
              ]
            })(<Input size='large' onPressEnter={ handleOk } placeholder='用户名' />) }
        </FormItem>
        <FormItem hasFeedback>
          { getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请填写密码'
                }
              ]
            })(<Input size='large' type='password' onPressEnter={ handleOk } placeholder='密码' />) }
        </FormItem>
        <Row>
          <Button type='primary' size='large' onClick={ handleOk } loading={ loginButtonLoading }>
            登录
          </Button>
        </Row>
        <p>
          <span>账号：guest</span>
          <span>密码：guest</span>
        </p>
      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func
}

export default Form.create()(Login)