import React from 'react';
import ReactDOM from 'react-dom'
import Color from '../libs/Color.js'
import styles from './swatches.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

const colors = ["#fc3746","#fd6096","#d05ace","#21aad4","#17a249","#fece5b","#fc673b","#999999","#000000","#ffffff",]

class Swatches extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Swatches';
        this.state = {
            color:props.color||"#F00",
            c:new Color([0,1,0.5])
        }
        if(props.ctx)props.ctx.fillStyle = props.ctx.strokeStyle = this.state.color
    }
    H(){
        var x=10,y=10,w=40,h=200
        var c = new Color([0,1,0.5])
        var ctx = this.ctx
        // ctx.strokeStyle="#000"
        // ctx.strokeRect(x-1,y-1,w+2,h+2)
        for (var i = 0; i < h; i++) {
            c.h = i/(h-1)
            ctx.beginPath()
            ctx.strokeStyle = c.toRgb()
            ctx.moveTo(x,y+i)
            ctx.lineTo(x+w,y+i)
            ctx.stroke()
        };
    }
    SL(){
        var x=70,y=10,w=200,h=200
        var c = new Color(this.state.color)
        var ctx = this.ctx
        // ctx.strokeStyle="#000"
        // ctx.strokeRect(x-1,y-1,w+2,h+2)
        for (var i = 0; i < w; i++) {
            c.s = i/(w-1) 
            for (var j = 0; j < h; j++) {
                c.l = j/(h-1)
                ctx.beginPath()
                ctx.strokeStyle = c.toRgb()
                ctx.moveTo(x+i,y+j)
                ctx.lineTo(x+i,y+j+1)
                ctx.stroke()
            };
        };
    }
    HSL(){
        var ctx = this.ctx
        ctx.fillStyle="#ccc"
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)
        this.H()
        this.SL()
    }
    Preview(){
        var x=70,y=10,w=200,h=200
        var ctx = this.ctx
        ctx.fillStyle = this.state.preview||this.state.color
        ctx.fillRect(10,220,260,40)
    }
    handle(e){
        if(e.offsetX<((10+40+70)/2)){
            var x=10,y=10,w=40,h=200
            var i = e.offsetX-x
            var j = e.offsetY-y
            if(i<0|| j<0|| i>w|| j>h){
                if(this.state.preview){
                    this.state.preview = false
                    this.Preview()
                }
            }else{
                var c = new Color([0,1,0.5])
                c.h = j/(h-1)
                this.state.preview = c.toRgb()
                if(e.type=="mousedown"){
                    this.changeColor(this.state.preview)
                    this.SL()
                }
                this.Preview()
            }
        }else{
            var x=70,y=10,w=200,h=200
            var i = e.offsetX-x
            var j = e.offsetY-y
            if(i<0|| j<0|| i>w|| j>h){
                if(this.state.preview){
                    this.state.preview = false
                    this.Preview()
                }
            }else{
                var c = new Color(this.state.color)
                c.s = i/(w-1)
                c.l = j/(h-1)
                this.state.preview = c.toRgb()
                if(e.type=="mousedown"){
                    this.changeColor(this.state.preview)
                }
                this.Preview()
            }
        }
    }   
    bindHSL(canvas){
        canvas.addEventListener('mousemove',this.handle.bind(this))
        canvas.addEventListener('mousedown',this.handle.bind(this))
    }
    changeColor(c){
        this.setState({color:c})
        if(this.props.ctx)this.props.ctx.fillStyle = this.props.ctx.strokeStyle = c
        if(this.props.onChange)this.props.onChange(c)
    }
    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this)
        var canvas = document.createElement('canvas')
        canvas.width = 280
        canvas.height = 270
        dom.appendChild(canvas)
        var ctx = canvas.getContext('2d')
        // ctx.translate(200,200)
        this.ctx = ctx
        this.HSL()
        this.Preview()
        this.bindHSL(canvas)
    }
    render() {
        var className = ""
        if(this.state.open)className+=" open"
        if(this.state.canvas)className+=" canvas"
        return <div className={"inu-swatches"+className}>
            {this.renderButton()}
            <div className={cx("select")}>
            {colors.map((item,i)=>{
                return <div className={cx("item")} onClick={this.changeColor.bind(this,item)} style={{background:item}}></div>
            })}
            </div>
        </div>
    }
    renderButton(){
        if(this.props.children)React.Children.map((item,i)=>{
            return React.cloneElement(item,{color:this.state.color})
        })
        return <button style={{background:this.state.color}}></button>
    }
}

export default Swatches
