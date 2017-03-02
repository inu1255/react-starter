import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {
            style:{
                width:props.width
            }
        }
    }
    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this)
        if(this.props.height){
            var h = this.props.height
            if(h.charAt(h.length-1)=="%"){
                h = dom.offsetWidth*parseFloat(h.substring(0,h.length-1))/100+"px"
            }
            dom.style.height = h
            this.setState({style:Object.assign({},this.state.style,{height:h})})
        }
        if(this.props.vertical){
            var vertical = this.props.vertical
            if(vertical=="top"){
                this.setState({style:Object.assign({},this.state.style,{marginTop:0})})
            }else{
                var ph = dom.parentElement.offsetHeight
                var h = window.getComputedStyle(dom).height
                h = parseFloat(h)
                h = ph-h
                if(vertical=="fill"){
                    h = h/2+"px"
                    this.setState({style:Object.assign({},this.state.style,{paddingTop:h,paddingBottom:h})})
                }else if(vertical=="bottom"){
                    this.setState({style:Object.assign({},this.state.style,{marginTop:h+"px"})})
                }else{
                    this.setState({style:Object.assign({},this.state.style,{marginTop:h/2+"px"})})
                }
            }
        }
    }
    render() {
        return <div {...this.props} style={this.state.style}>{this.props.children}</div>
    }
}

export default App
