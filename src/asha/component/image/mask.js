import React from 'react';
import styles from './mask.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

class Mask extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Mask';
        this.state = {show:true}
    }
    componentDidMount(){
        document.body.style.overflow = "hidden"
    }
    componentWillUnmount(){
        document.body.style.removeProperty('overflow')
    }
    toggle(e){
        this.setState({show:!this.state.show})
        if(this.state.show)Reflect.deleteProperty(document.body.style,"overflow")
        else document.body.style.overflow = "hidden"
    }
    render() {
        if(!this.state.show)return null
        return <div onClick={this.props.onClick} className={cx("inu-mask")}>
            {this.props.children}
            <div onClick={this.toggle.bind(this)} className={cx("close","ion-close-round")}></div>
        </div>
    }
}

export default Mask
