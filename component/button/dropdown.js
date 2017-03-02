import React from 'react';
import './dropdown.less'
import ReactDOM from 'react-dom'

class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DropDown';
        this.state = {}
    }
    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this)
        this.bind = (e)=>{
            var me = false
            var p = e.target
            while(p){
                if(p==dom){
                    me=true;
                    break;
                }
                p=p.parentElement
            }
            if(me){
                this.setState({open:!this.state.open})
            }else if(this.state.open){
                this.setState({open:false})
            }
        }
        window.addEventListener('click',this.bind)
    }
    componentWillUnmount(){
        window.removeEventListener('click',this.bind)
    }
    render() {
        var t,l
        if(this.props.children instanceof Array){
            t = this.props.children[0]
            l = this.props.children[1]
        }else{
            t = <div className={cx(title)}>下拉</div>
            l = this.props.children
        }
        if(this.props.auto&&!this.state.open)l=null
        return <div {...this.props} className={(this.props.className||"")+" inu-dropdown"+((this.state.open&&!this.props.disabled)?" open":"")}>
            {t}
            {l}
        </div>
    }
}

export default DropDown
