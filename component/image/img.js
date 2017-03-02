import React from 'react';
import ReactDOM from 'react-dom'
import styles from './img.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)
import Mask from './mask.js'

var cache = {}

class Img extends React.Component {
    // preview 启用预览, 如果是字符串 则代表缓存名，可以分组预览
    // onClick 禁止预览并触发onClick
    // src 图片地址
    constructor(props) {
        super(props);
        this.displayName = 'Img';
        this.state = {
            src:this.props.src
        }
        // 启用预览
        if(typeof this.props.preview=="string"){
            if(!cache[this.props.name])cache[this.props.name] = []
            this.previewer = cache[this.props.name]
            this.previewer.push(this)
        }
    }
    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this)
        var img = dom.children[0]
        this.imageLoad(img)
    }
    componentWillUnmount(){
        if(typeof this.props.preview!="string")return
        this.previewer.remove(this)
    }
    componentWillReceiveProps(nextProps){
        this.state.src = nextProps.src
    }
    next(go){
        if(typeof this.props.preview!="string")return
        var n = this.previewer.indexOf(this)+this.previewer.length+go;
        n %= this.previewer.length
        var next = this.previewer[n]
        this.setState({show:false})
        next.setState({show:true})
    }
    isPreview(){
        return this.props.preview&&typeof this.props.onClick!="function"
    }
    imageClick(){
        if(typeof this.props.onClick=="function")
            this.props.onClick()
        else if(this.props.preview)
            this.setState({show:true})
    }
    // 错误图片替换
    imageError(){
        this.setState({src:this.props.err||Img.err})
    }
    imageLoad(e){
        var img = e.target||e
        this.state.style = {
            top:img.offsetTop,
            left:img.offsetLeft,
            width:img.offsetWidth,
            height:img.offsetHeight,
        }
        this.setState({})
    }
    render() {
        return <div className={cx("inu-img",this.props.className)}>
            <img onLoad={this.imageLoad.bind(this)} {...this.props} children={undefined} src={this.state.src||""} onError={this.imageError.bind(this)} onClick={this.imageClick.bind(this)}/>
            {this.renderInfo()}
            {this.renderChildren()}
            {this.renderPreviewer()}
        </div>
    }
    // 标题、简介。。
    renderInfo(){
        if(!this.props.title&&!this.props.desc)return null
        return <div className={cx("info")}>
            <div className={cx("title")}>{this.props.title}</div>
            <div className={cx("desc")}>{this.props.desc}</div>
        </div>
    }
    renderChildren(){
        var c = this.props.children
        if(c instanceof Array)c = c[0]
        if(!c)return null
        return React.cloneElement(c,{className:(c.props.className||"")+" child",style:this.state.style})
    }
    // 预览
    renderPreviewer(){
        if(this.state.show){
            if(typeof this.props.preview!="string")return <Mask onClick={()=>this.setState({show:false})}>
                <img onError={this.imageError.bind(this)} src={this.state.src||""}/>
            </Mask>
            return <Mask onClick={()=>this.setState({show:false})}>
                <div onClick={this.next.bind(this,-1)} className={cx("prev","ion-arrow-left-a")}></div>
                <img onError={this.imageError.bind(this)} src={this.state.src||""}/>
                <div onClick={this.next.bind(this,1)} className={cx("next","ion-arrow-right-a")}></div>
            </Mask>
        }
    }
}

Img.err = ""

export default Img
