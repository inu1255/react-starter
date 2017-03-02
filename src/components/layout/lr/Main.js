import React from 'react';
import { connect } from 'dva';
import styles from './main.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)
import { Layout, Icon } from 'antd';
const {Header, Footer, Sider, Content} = Layout;

import Menu from '../menu.js'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Main';
    this.state = {}
  }
  render() {
    return (
      <div className={ cx("main-container") }>
        <Layout>
          <Sider trigger={ null } collapsible collapsed={ this.state.collapsed }>
            <Menu menu={ this.props.sider } theme="dark" mode="inline"></Menu>
          </Sider>
          <Layout>
            <Header style={ { background: '#fff', padding: 0 } }>
              <Icon className="trigger" type={ this.state.collapsed ? 'menu-unfold' : 'menu-fold' } onClick={ this.toggle } />
            </Header>
            <Content style={ { margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 } }>
              Content
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default connect(({menu}) => menu)(Main);
