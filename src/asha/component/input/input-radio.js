import React from 'react';
import styles from './input-radio.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

class InputRadio extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'InputRadio';
        this.state = {
            value:props.value
        }
    }
    componentWillReceiveProps(nextProps){
        this.state.value = nextProps.value
    }
    onChange(v){
        this.setState({value:v})
        if(this.props.onChange)this.props.onChange(v)
    }
    render() {
        var select = this.props.select||[]
        return <div className={cx("inu-input-radio")}>{
            select.map((item,i)=>{
                return <div key={i} onClick={this.onChange.bind(this,item)}>
                    <input type="radio" checked={this.state.value==item}/>
                    {i+1+" 、"}
                    {item}
                </div>
            })
        }</div>
    }
}

export default InputRadio
