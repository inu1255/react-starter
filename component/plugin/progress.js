import React from 'react';
import styles from './progress.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Progress';
        this.state = {
            percent:this.props.percent
        }
    }
    onSuccess(){
        if(this.props.onSuccess){
            this.props.onSuccess()
        }
    }
    progress(progress){
        progress((p)=>{
            if(this.state.percent<100){
                this.setState({percent:p})
                if(p>=100){
                    this.onSuccess()
                    return true
                }
            }
        })
    }
    componentDidMount(){
        if(this.props.progress)this.progress(this.props.progress)
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.progress)this.state.percent = nextProps.percent
        else if(this.props.progress!=nextProps.progress)this.progress(nextProps.progress)
    }
    getStyle(w,rest){
        var style = {}
        if(rest){
            style[w] = 100-this.state.percent+"%"
            if(rest===true)style.background = "rgba(0,0,0,.4)"
            else style.background = this.props.rest
        }else{
            style[w] = this.state.percent+"%"
            style.background = this.props.color
        }
        return style
    }
    renderChild(){
        if(this.props.children)return React.cloneElement(this.props.children,{percent:this.state.percent})
        if(this.state.percent)return Math.floor(this.state.percent*100)/100+"%"
    }
    render() {
        var className = "inu-progress"
        if(this.props.vertical)className+=" vertical"
        if(this.props.className)className+=" "+this.props.className
        var w = this.props.vertical?"height":"width"
        return <div {...this.props} className={className}>
            <div className={cx("progress")} style={this.getStyle(w,false)}></div>
            {this.props.rest?<div className={cx("progress","rest")} style={this.getStyle(w,true)}></div>:null}
            {this.renderChild()}
        </div>
    }
}

Progress.defaultProps = {
    percent:0,
}
Progress.propTypes = {
    percent:React.PropTypes.number,
    onSuccess:React.PropTypes.func,
    progress:React.PropTypes.func,
}
// 模拟进度函数
Progress.random = function(time,avg){
    time = Math.abs(Math.floor(time||1))*10
    var gone
    function step(n,call){
        var p=n()
        if(gone>=100)return
        if(p>=100?call(gone = 100):call(p))return
        setTimeout(function(){
            step(n,call)
        },100)
    }
    return function(call){
        var p = 0,begin = new Date().getTime()
        if(typeof avg=="function");
        else if(avg)avg = function(){
            return p+=100/time
        }
        else avg = function(){
            var t = time-(new Date().getTime()-begin)/100
            if(t<=0)return 100
            return p+=Math.random()*(100-p)/t
        }
        step(avg,call)
    }
}

export default Progress
