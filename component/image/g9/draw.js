import React from 'react';
import ReactDOM from 'react-dom'
import g9 from 'g9'
import canvg from './canvg.js'
import './libs/equilateral_triangle.js'

function bind(aim){
    aim.toCanvas = function(){
        var canvas = document.createElement("canvas")
        canvg(canvas,aim.node.outerHTML)
        return canvas
    }

    aim.toDataURL = function(type){
        return aim.toCanvas().toDataURL(type||"image/jpeg")
    }
}

class Draw extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Draw';
        this.state = {}
    }
    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this)
        var g = g9(this.props.initialData,this.props.render,this.props.onRender)
            .align('center', 'center')
            .insertInto(dom)
        bind(g)
        if(typeof this.props.onLoad=="function")this.props.onLoad(g)
    }
    render() {
        return <div {...this.props} className={"inu-draw "+(this.props.className||"")}></div>
    }
}

Draw.setShape = function(k,v){
    g9.shapes[k] = v
}

export default Draw
