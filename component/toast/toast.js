import React from 'react';
import ReactDOM from 'react-dom'
import styles from './toast.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

var num = 0
var instance

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {
            messages:[]
        }
        App.toast = this.toast.bind(this);
        App.primary = this.toast.bind(this,"primary");
        App.success = this.toast.bind(this,"success");
        App.info = this.toast.bind(this,"info");
        App.warning = this.toast.bind(this,"warning");
        App.error = this.toast.bind(this,"error");
        instance = this
    }
    componentWillUnmount(){
        instance = false
    }
    disappear(item,time){
        setTimeout(()=>{
            item.show = false;
            this.setState({});
        },time);
        setTimeout(()=>{
            var i = this.state.messages.indexOf(item);
            if(i>=0)this.state.messages.splice(i,1);     //删除数组元素
            this.setState({});
        },time+500);
    }
    toast(style,msg,time){
        if(typeof time=="undefined")time = 3000
        var item = {msg,style,num:num++};
        this.state.messages.push(item)
        setTimeout(()=>{
            item.show=true ; 
            this.setState({});
        },100);
        if(time>0){
            this.disappear(item,time);
        }
        this.setState({});
    }
    close(item,i){
        this.disappear(item,0);
    }
    render() {
        if(instance!=this)return null;
        return <div className={cx("inu-toast")}>{
            this.state.messages.map((item,i)=>{
                return <div key={item.num} className={"item "+(item.style||"info")+(item.show?" show":"")}>{item.msg}
                    <i className={cx("iconfont","icon-cha")} onClick={this.close.bind(this,item,i)}></i>
                </div>
            })
        }</div>
    }
}

module.exports = App
