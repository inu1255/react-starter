import React from 'react';
import stream from "asha/libs/file/stream.js"
import ReactDOM from 'react-dom'
import styles from './index.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {}
    }
    onChange(file,data){
        var v = Object.assign({},file,data)
        this.setState({uploading:false})
        if(this.props.onChange){
            this.props.onChange(v)
        }
    }
    componentDidMount(){
        var div = ReactDOM.findDOMNode(this)
        var url = this.props.apiUrl||'http://api.tederen.com/file/upload'
        this.stream = new stream({
            url,
            headers:{
                'X-AUTH-TOKEN':this.props.apiToken||'BEB135B9F875A225D8C0F7D1BC360A24'
            },
            progress:(e)=>{
                this.state.speed = stream.calcSpeed(e.speed)
                this.state.percent = e.percent * 100
                this.state.rest_time = stream.calcRest(e.rest_time)
                this.setState({})
            },
            onSelect:(e)=>{
                e.size = stream.calcSize(e.size)
                this.state.uploading = true
                this.setState(e)
            },
            success:this.onChange.bind(this),
            retry:(e)=>{
                if(!e)return false;
                if(e.code==23)return false;
                if(e.code==233)return true;// 网络错误，启动重传
                if(e.code==33){// 中断上传
                    this.resume = e.data //继续上传函数,e.data()可继续上传
                    this.setState({fail:true})
                }
            }
        })
    }
    onClick(){
        if(!this.state.uploading){
            this.stream.pick(this.props.accept)
        }
    }
    renderFile(){
        if(this.state.name)return <div className={cx("file")}>{this.state.name}</div>
        return <div onClick={this.onClick.bind(this)} className={cx("file")}>
            <div className={cx("upload")}>{this.props.title}</div>
        </div>
    }
    render() {
        return <div className={cx("inu-stream")}>
            <div className={cx("progress")} style={{width:this.state.percent+"%"}}></div>
            {this.renderFile()}
            <div className={cx("filesize")}>{this.state.size}</div>
            <div className={cx("speed")}>{this.state.speed}</div>
            <div className={cx("rest-time")}>{this.state.rest_time}</div>
        </div>
    }
}

App.defaultProps = {
    title:"上传"
}

export default App

