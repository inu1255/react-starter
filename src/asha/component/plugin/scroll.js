import React from 'react';
import ReactDOM from 'react-dom'

class Scroll extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Scroll';
        this.state = {
            scrollY:-1
        }
    }
    // import ReactDOM from 'react-dom'
    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this)
        if(this.props.auto)dom.style.position = "absolute"
        this.state.top = dom.style.top
        this.scroll = (e)=>{
            if(this.state.scrollY<0){
                var dom = ReactDOM.findDOMNode(this)
                var top = dom.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop - window.scrollY
                if(top<=this.props.top){
                    this.state.scrollY = window.scrollY
                    if(this.props.auto){
                        dom.style.position = "fixed"
                        dom.style.top = this.props.top+"px"
                    }
                    if(this.props.onChange){
                        this.props.onChange(true)
                    }
                    if(this.props.once){
                        this.unbind()
                    }
                    this.setState({})
                }
            }else if(window.scrollY<this.state.scrollY){
                var dom = ReactDOM.findDOMNode(this)
                this.state.scrollY = -1
                if(this.props.auto){
                    dom.style.position = "absolute"
                    dom.style.top = this.state.top
                }
                if(this.props.onChange){
                    this.props.onChange(false)
                }
                this.setState({})
            }
        }
        this.scroll()
        window.addEventListener('scroll',this.scroll)
    }
    unbind(){
        window.removeEventListener('scroll',this.scroll)
    }
    componentWillUnmount(){
        this.unbind()
    }
    render() {
        var elem = this.props.children
        if(this.state.scrollY<0)return elem
        return React.cloneElement(elem,{className:elem.props.className+" "+this.props.fixClass})
    }
}

Scroll.defaultProps = {
    top:0,
    fixClass:"fix"
}

export default Scroll
