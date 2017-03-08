import React from 'react';
import { connect } from 'asha/libs/storage.js';
import { Carousel } from 'antd'
import Img from 'asha/component/image/img.js'

import styles from './index.less';
import Menu from '../components/layout/menu.js'
import banner from "../assets/banner.jpg"

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'Index'
        this.state = {
            a: [1]
        }
    }
    update() {
        this.state.a[0]++
        this.setState({})
        this.props.dispatch({ type: 'app/login', payload: true })
    }
    render() {
        return (
            <div onClick={ this.update.bind(this) } className={ styles.container }>
                <Menu menu={ [{ icon: "cloud", to: "index", title: "网站名" }, { title: "注册", to: { pathname: "register", query: {} }, right: true }, { title: "登录", to: "login", right: true }] } theme="dark" mode="horizontal"></Menu>
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
