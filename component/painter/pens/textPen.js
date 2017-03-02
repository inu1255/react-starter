import React from 'react'
import ReactDOM from 'react-dom'

class Pen extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Pen';
        this.state = {}
    }
    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this)
        dom.focus()
    }
    render() {
        return <input type="text" className={cx("pen")} onKeyDown={(e)=>{if(e.keyCode==13)this.props.onClick()}} onChange={this.props.onChange} style={this.props.style} value={this.props.value}/>
    }
}

function textPen(resolve){
    var data = {}
    this.begin = function(b){
        if(b){
            data.x = b.x
            data.y = b.y
            return data
        }
    }
    this.move = function(b,e){
        if(b){
            data.x = e.x
            data.y = e.y
            return data
        }
    }
    this.end = function(b,e,callBy){
        if(callBy=="setPen"&&data.text)resolve(data)
    }
    this.render = function(draw,data){
        if(!data)return null
        var x = data.x
        if(draw.getSize().w-350<x)x = draw.getSize().w-350
        if(data&&data.y)return <Pen value={data.text||""} onClick={()=>resolve(data)} onChange={(e)=>{data.text=e.target.value;draw.setData(data)}} style={{top:data.y+"px",left:x+"px"}}></Pen>
        if(data&&data.y)return <input type="text" className={cx("pen")} value={data.text||""}  onKeyDown={(e)=>{if(e.keyCode==13)resolve(data)}} onChange={(e)=>{data.text=e.target.value;draw.setData(data)}} style={{top:data.y+"px",left:x+"px"}}></input>
        return null
    }
}
textPen.cursor = 'text'
textPen.render = function(ctx,data){
    if(data&&data.x){
        ctx.font = "28px serif"
        ctx.fillText(data.text||"",data.x-2,data.y+18)
    }
}

export default textPen
