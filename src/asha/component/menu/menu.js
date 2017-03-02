import React from 'react';
import url from 'asha/libs/url.js'
import {Link} from 'react-router'
import styles from './menu.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {
            data:(props.menu&&props.menu.childRoutes)||[]
        }
    }
    render() {
        return <div className={cx("inu-menu")}>{
            this.state.data.map((item,i)=>{
                return <Link key={i} to={item.path} className={cx("item")} activeClassName="active">{item.title||item.path}</Link>
            })
        }</div>
    }
}

export default App
