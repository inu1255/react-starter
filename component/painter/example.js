import React from 'react';
import ReactDOM from 'react-dom'
import Scroll from 'asha/component/plugin/scroll.js'
import drawer from './drawer.js'
import './example.less'
import Swatches from './component/swatches.js'
import ScoreMask from'./component/scoreMask.js'
import big from 'asha/data/num-words.js'
import s from '../../../data/paper.js'

class Draw extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Draw';
        this.state = {
            select:0
        }
    }
    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this)
        this.drawer = new drawer(this.props.config).insertInto(dom)
        // this.drawer.setFillStyle("#ff0000")
        this.mask = this.drawer.newMask()
        this.drawer.setPen(this.mask)
        if(typeof this.props.onLoad=="function")this.props.onLoad(this.drawer)
        this.drawer.addEventListener('update',()=>{
            this.setState({})
        })
    }
    save(){
        if(this.props.onFinish){
            this.props.onFinish(this.drawer.toDataURL())
        }
    }
    totalScore(){
        return s.totalScore(this.props.dist)
    }
    partScore(p){
        var paper = this.props.paper
        var dist = this.props.dist
        return s.partScore(paper,dist,p)
    }
    renderParts(parts){
        var li = [],n=1
        var dist = this.props.dist
        for (var i = 0; i < parts.length; i++) {
            var q = parts[i].questions
            var qs = "",rc = []
            for (var j = 0; j < q.length; j++) {
                qs+=n+"题"+q[j]+"分,"
                var s = dist.scoreList[n-1]
                rc.push(<ul key={n}><li>{n}</li><li>{s?s.score||0:"未评"}</li></ul>)
                n++
            };
            if(parts[i].type=="均分题")li.push(<div key={"t"+n} className={cx(r_c_title)}>第 <em>{big(i+1)}</em> 题<span className={cx(r_c_t_num)}>（每题<em>{q[0]}</em>分，共<em>{q.reduce((a,b)=>a+parseFloat(b),0)}</em>分）</span></div>)
            else {
                qs+="共"+q.reduce((a,b)=>a+parseFloat(b),0)+"分"
                li.push(<div key={"t"+n} className={cx(r_c_title)}>第 <em>{big(i+1)}</em> 题<span className={cx(r_c_t_num)}>（{qs}）</span></div>)
            }
            li.push(<div key={"c"+n} className={cx(r_c_topic)}>{rc}</div>)
        };
        return li
    }
    render() {
        var paper = this.props.paper
        var dist = this.props.dist
        var s = this.state.score
        return <div {...this.props} className={"inu-draw "+(this.props.className||"")}>
                <div className={cx(s_m_c_right)}>
                    <div className={cx("right"_scoring)}>
                        <div className={cx(r_s_title)}><i className={cx("iconfont","icon-pingjiajilu")}></i>计分卡</div>
                        <table width="100%" className={cx(r_s_table)}>
                            <colgroup><col width="25%" /><col width="75%" /></colgroup>
                            <thead><tr><th>学号</th><th>{dist.code}</th></tr></thead> 
                            <thead><tr><th>姓名</th><th>{dist.title}</th></tr></thead> 
                            <tbody><tr><td>得分</td><td><em>{this.totalScore()}</em>分</td></tr></tbody>
                        </table>
                        <table width="100%" className={cx(r_s_tablefen)}>
                            <thead><tr>{paper.parts.map((item,i)=>{return <th key={i}>{big(i+1)}</th>          })}</tr></thead>
                            <tbody><tr>{paper.parts.map((item,i)=>{return <td key={i}>{this.partScore(i)}</td> })}</tr></tbody> 
                        </table>
                    </div>
                    <div className={cx("right"_content)}>
                        {this.renderParts(paper.parts)}
                    </div>
                </div>
            {this.drawer?<Scroll auto top={80}><div className={cx(tools)}>
                <button className={(this.state.select==0?"active ":"")+"calc"} onClick={()=>(this.setState({select:0}),this.drawer.setPen(this.mask))}><img src={require('./calc.png')} alt=""/></button>
                <button className={(this.state.select==1?"active ":"")+"iconfont icon-jiantou-copy"} onClick={()=>(this.setState({select:1}),this.drawer.setPen("linePen"))}></button>
                <button className={(this.state.select==2?"active ":"")+"iconfont icon-yuan"} onClick={()=>(this.setState({select:2}),this.drawer.setPen("ellipsePen"))}></button>
                <button className={(this.state.select==3?"active ":"")+"iconfont icon-bi"} onClick={()=>(this.setState({select:3}),this.drawer.setPen())}></button>
                <button className={(this.state.select==4?"active ":"")+"iconfont icon-A"} onClick={()=>(this.setState({select:4}),this.drawer.setPen("textPen"))}></button>
                <button className={cx("ion-reply")} disabled={!this.drawer.undo(true)} onClick={()=>this.drawer.undo()}></button>
                <button className={cx("ion-forward")} disabled={!this.drawer.redo(true)} onClick={()=>this.drawer.redo()}></button>
                <Swatches ctx={this.drawer.getCtx()}></Swatches>
                <button className={cx("right","ion-close-round")} onClick={this.props.onCancel}>返回</button>
                <button className={cx("right","ion-checkmark-round")} onClick={this.save.bind(this)}>完成</button>
            </div></Scroll>:null}
            {this.mask?<ScoreMask paper={this.props.paper} dist={this.props.dist} mask={this.mask}></ScoreMask>:null}
            {this.drawer?this.drawer.renderPen():null}
        </div>
    }
}

export default Draw
