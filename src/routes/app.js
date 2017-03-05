import React from 'react';
import { connect } from 'dva';
import styles from './app.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

import Login from './other/login.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {}
    }
    render() {
        if (!this.props.login) return <Login {...a}></Login>
        return (
            <div className={ cx("app-container") }>
              <Layout>
                <Sider trigger={ null } collapsible collapsed={ this.state.collapsed }>
                  <Menu menu={ this.props.sider } theme="dark" mode="inline"></Menu>
                </Sider>
                <Layout>
                  <Header style={ { background: '#fff', padding: 0 } }>
                    <Icon className="trigger" type={ this.state.collapsed ? 'menu-unfold' : 'menu-fold' } onClick={ this.toggle } />
                  </Header>
                  <Content style={ { margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 } }>
                    { this.props.children }
                  </Content>
                </Layout>
              </Layout>
            </div>
        )
    }
}

export default connect(({app}) => app)(App)
