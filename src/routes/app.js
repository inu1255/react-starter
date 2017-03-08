import React from 'react';
import { connect } from 'asha/libs/storage.js';
import styles from './app.less';
import classnames from "classnames/bind"
import Menu from '../components/layout/menu.js'
import { Layout, Icon } from "antd"
const {Header, Sider, Content} = Layout;
const cx = classnames.bind(styles)

import Login from './other/login.js'
import Register from './other/register.js'
import siderMenu from '../storage/sidermenu.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {}
    }
    toggle() {
        this.setState({ collapsed: !this.state.collapsed })
    }
    render() {
        if (!this.props.isLogin()) {
            if (this.props.location.query.register) return <Register></Register>
            return <Login></Login>
        }
        return (
            <div className={ cx("app-container") }>
                <Layout>
                    <Sider trigger={ null }
                           collapsible
                           collapsed={ this.state.collapsed }>
                        <Menu menu={ siderMenu }
                              theme="dark"
                              mode="inline"></Menu>
                    </Sider>
                    <Layout>
                        <Header style={ { background: '#fff', padding: 0 } }>
                            <Icon className={ cx("trigger") }
                                  type={ this.state.collapsed ? 'menu-unfold' : 'menu-fold' }
                                  onClick={ this.toggle.bind(this) } />
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

export default connect("app")(App)
