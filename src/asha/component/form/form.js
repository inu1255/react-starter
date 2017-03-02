import React from 'react';
import Input from 'asha/component/input/input-outline.js'
import Button from 'asha/component/button/'
import styles from './form.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {}
    }
    onSubmit(){
        if(this.props.onSubmit)this.props.onSubmit(this.props.data)
    }
    onCancel(){
        if(this.props.onCancel)this.props.onCancel()
    }
    render(){
        return <div className={"inu-form "+(this.props.className||"")}>
            <div className={cx("form")}>
                {this.renderInputs()}
                <div className={cx(tools)}>
                    <Button title="确定" className={cx("success")} onClick={this.onSubmit.bind(this)}></Button>
                    <Button title="取消" className={cx("error")} onClick={this.onCancel.bind(this)}></Button>
                </div>
            </div>
        </div>
    }
    renderInputs() {
        var inputs = this.props.inputs
        var data = this.props.data
        var n = 0
        if(inputs instanceof Array)return inputs.map((item,i)=>{
            var title = (item&&item.title)?item.title:item
            if(item.renderItem){
                if(item.renderInput)return <div key={-1}>{typeof item.renderInput=="function"?item.renderInput(data,-1,title):null}</div>
                return null;
            }
            var key = item.key||n++
            if(item.renderInput)return <div key={key}>{typeof item.renderInput=="function"?item.renderInput(data,key,title):null}</div>
            if(typeof item.renderInput=="undefined")return <div key={key}><Input title={title} value={data[key]} onChange={(v)=>data[key]=v}></Input></div>
            return null
        })
        return data.map((item,i)=>{
            return <Input key={i} title={i+1} value={item} onChange={(v)=>data[i]=v}></Input>
        })
    }
}

export default App
