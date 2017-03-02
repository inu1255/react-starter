import React from 'react'
import Stream from './stream/index.js'
import './input-outline.less'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {
            value:props.value||""
        }
        this.bindAim(props)
    }
    componentWillReceiveProps(nextProps){
        this.state.value = nextProps.value
        this.bindAim(nextProps)
    }
    bindAim(props){
        if(props.data instanceof Array){
            this.state.aim = props.data[0]
            this.state.key = props.data[1]
            this.state.value = this.state.aim[this.state.key]
        }
    }
    change(e){
        var value = e.target.value
        if(this.props.regex){
            if(!this.props.regex.test(value))return;
        }
        this.setState({
            value
        })
        if(this.props.onChange)this.props.onChange(value)
        if(this.state.aim)this.state.aim[this.state.key] = value
    }
    clear(e){
        e.target.value = ""
        this.change(e)
    }
    select(e){
        e.target.nextElementSibling.focus()
    }
    keyup(e){
        if(e.keyCode==13&&this.props.onClick)this.props.onClick(this.state.value)
    }
    renderInput(){
        if(this.props.select){
            var value = this.state.value
            return <div className={cx("input")}>
                <select disabled={this.props.disabled} value={this.state.value} onChange={this.change.bind(this)}>{
                    this.props.select.map((item,i)=>{
                        if(item instanceof Array){
                            if(item[0]==value)value=item[1];
                            return <option key={i} value={item[0]}>{item[1]}</option>
                        }
                        return <option key={i} value={item}>{item}</option>
                    })
                }</select>
                <icon className={cx("ion-chevron-right")}></icon>
                <div className={cx("show")}>{value}</div>
            </div>
        }
        if(this.props.type=="textarea")
            return <textarea onChange={this.change.bind(this)} value={this.state.value} placeholder={this.props.placeholder} cols="30" rows="10"></textarea>
        return <input onKeyUp={this.keyup.bind(this)} disabled={this.props.disabled} onChange={this.change.bind(this)} value={this.state.value} type={this.props.type} placeholder={this.props.placeholder}/>
    }
    render() {
        if(this.props.type=="file")
            return <Stream {...this.props}></Stream>
        return (
            <div onFocus={this.props.onFocus} onBlur={this.props.onBlur} className={"inu-input-outline "+this.props.className+" "+this.props.type}>
                {this.props.title?<div className={cx(title)}>{this.props.title}</div>:null}
                {this.renderInput()}
                {this.state.value?<div onClick={this.clear.bind(this)} className={cx("clear","ion-ios-close-empty")}></div>:null}
                {this.props.tail&&this.state.value?<div className={cx(tail)}>
                    <span className={cx("value")}>{this.state.value}</span>
                    <span className={cx(tail)}>{this.props.tail}</span>
                </div>:null}
            </div>
        );
    }
}

App.defaultProps = {
    className:"",
    type:"text"
}

export default App
