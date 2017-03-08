import React from 'react';
import { connect } from 'asha/libs/storage.js';
import { Menu, Icon, Carousel } from 'antd'
import Img from 'asha/component/image/img.js'

import styles from './index.less';
import Link from 'asha/component/link/link.js'
import banner from "../assets/banner.jpg"

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'Index'
        this.state = {}
    }
    render() {
        return (
            <div className={ styles.container }>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item>
                        <Icon type="cloud"></Icon>网站名
                    </Menu.Item>
                    <Menu.Item style={ { float: "right" } }>
                        <Link to={ { pathname: "movie", query: { register: 1 } } }></Link> 注册
                    </Menu.Item>
                    <Menu.Item style={ { float: "right" } }>
                        <Link to={ { pathname: "movie", query: {} } }></Link> 登录
                    </Menu.Item>
                </Menu>
                <Carousel autoplay>
                    <div>
                        <Img src={ banner }></Img>
                    </div>
                    <div>
                        <Img src={ banner }></Img>
                    </div>
                    <div>
                        <Img src={ banner }></Img>
                    </div>
                    <div>
                        <Img src={ banner }></Img>
                    </div>
                </Carousel>
            </div>
        )
    }
}

Index.propTypes = {
};

export default connect("app")(Index);
