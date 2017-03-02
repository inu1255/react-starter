import React from 'react';
import styles from './input-checkbox.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

class InputCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'InputCheckbox';
        this.state = {
            value:props.value||[]
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.value instanceof Array)this.state.value = nextProps.value
    }
    onChange(v){
        this.setState({value:v})
        if(this.props.onChange)this.props.onChange(v)
    }
    render() {
        var select = this.props.select||[]
        return <div className={cx("inu-input-checkbox")}>{
            select.map((item,i)=>{
                return <div key={i} onClick={this.onChange.bind(this,item)}>
                    <input type="checkbox" checked={this.state.value.indexOf(item)>=0}/>
                    {i+1+" 、"}
                    {item}
                </div>
            })
        }</div>
    }
}

export default InputCheckbox
