import React from 'react';
import styles from './scoreMask.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)
import scroll from 'asha/libs/scroll.js'

class ScoreMask extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ScoreMask';
        this.props.mask.bind(this)
        var paper = this.props.paper
        this.state = {
            total : 0,
            total_score : 0,
            index : this.props.paper.check?this.props.paper.check.length:0,
            show:true,
            lasttime:0
        }
        this.state.index_max = this.getMax(this.state.index)
        this.props.dist.scoreList = this.props.dist.scoreList
        var scoreList = this.props.dist.scoreList
        this.update(scoreList)
        scoreList.sum = function(){
            return scoreList.reduce((a,b)=>(a+parseFloat(b&&b.score||0)),0)
        }
        for (var i = paper.parts.length - 1; i >= 0; i--) {
            for (var j = paper.parts[i].questions.length - 1; j >= 0; j--) {
                this.state.total_score += paper.parts[i].questions[j]
                this.state.total++
            }
        }
        this.btn = []
        for (var i = 0; i < 10; i++) {
            this.btn.push(<button key={i} className={cx("item")} onClick={this.add.bind(this,(i+1)%10)}>{(i+1)%10}</button>)
        }
    }
    getMax(n){
        var paper = this.props.paper
        for (var i = 0; i < paper.parts.length; i++) {
            for (var j = 0,length=paper.parts[i].questions.length; j < length; j++) {
                if(!n--)return paper.parts[i].questions[j]
            }
        }
        return 0
    }
    setValue(v){
        var scoreList = this.props.dist.scoreList
        var data = scoreList[this.state.index]
        if(v>this.state.index_max)data.score = this.state.index_max
        else if(v<0)data.score = 0
        else data.score=v
        this.update(scoreList)
        this.setState({})
    }
    add(i){
        var scoreList = this.props.dist.scoreList
        var data = scoreList[this.state.index]
        if(i<1&&i>0){
            var tmp = (data.score||0)+0.5
            if(tmp<=this.state.index_max)data.score = tmp
            else return
        }else{
            var tmp = Math.floor(data.score||0)
            var five = data.score&&tmp!=data.score
            tmp = tmp*10+i
            if(five){
                tmp+=0.5
                i+=0.5
            }
            if(tmp<=this.state.index_max)data.score = tmp
            else if(i<=this.state.index_max)data.score = i
            else data.score =  this.state.index_max
        }
        this.update(scoreList)
        this.setState({})
    }
    scroll(yy){
        var top = this.drawer.offset().top||0
        var y = yy+top
        if(y-350<window.scrollY)scroll.scrollY(y-350)
        else if(y>(window.scrollY+window.innerHeight-383)) scroll.scrollY(y+383-window.innerHeight)
    }
    prev(){
        if(this.state.index>this.props.paper.check.length){
            var scoreList = this.props.dist.scoreList
            this.state.index--
            this.state.index_max = this.getMax(this.state.index)
            if(!scoreList[this.state.index])scoreList[this.state.index]={}
            else this.scroll(scoreList[this.state.index].y)
            this.setState({})
        }
    }
    next(close){
        if(close===true)this.state.show = false
        var scoreList = this.props.dist.scoreList
        if(this.state.index+1<this.state.total){
            this.state.index++
            this.state.index_max = this.getMax(this.state.index)
            if(!scoreList[this.state.index])scoreList[this.state.index]={}
            else this.scroll(scoreList[this.state.index].y)
            this.setState({})
        }else{
            if(this.props.onChange&&!this.props.onChange(scoreList))return;
            // this.finish()
            this.state.show = false
            this.setState({})
        }
    }
    begin(b){
        var scoreList = this.props.dist.scoreList
        if(!scoreList[this.state.index])scoreList[this.state.index]={}
        var data = scoreList[this.state.index]
        data.x = b.x
        data.y = b.y
        this.state.show = false
        this.update(scoreList)
    }
    move(b,e){
        if(b){
            var scoreList = this.props.dist.scoreList
            if(!scoreList[this.state.index])scoreList[this.state.index]={}
            var data = scoreList[this.state.index]
            data.x = e.x
            data.y = e.y
            this.update(scoreList)
        }
    }
    end(b,e,callBy){
        this.state.show = true
        if(callBy=="setPen"){
            this.finish()
        }
        this.setState({})
    }
    render() {
        if(!this.state.show)return null
        var scoreList = this.props.dist.scoreList
        var data = scoreList[this.state.index]
        if(!data)return null
        var x = data.x-14
        // 禁止出drawer右边界
        if(this.drawer.getSize().w-350<x)x = this.drawer.getSize().w-350
        if(this.painting()&&data&&data.y) return <div style={{left:x+"px",top:data.y+18+"px"}} className={cx("inu-scoreMask")}>
            <div className={cx(title)}>师说365智能阅卷</div>
            <div className={cx("card")}>
                <div className={cx("info")}>
                    <div className={cx("left")}>第<em>{this.state.index+1}</em>/{this.state.total}题</div>
                    <div className={cx("left")}>满分：{this.state.index_max}分</div>
                    <div className={cx("right")}>得分{scoreList.sum()}/{this.state.total_score}</div>
                </div>
                <div className={cx("control")}>
                    <input value={data.score} onChange={(e)=>this.setValue(e.target.value)} type="number"/>
                    <button onClick={()=>this.prev()}>上一题</button>
                    <button onClick={()=>this.next()}>下一题</button>
                </div>
                <div className={cx("btn-group")}>
                    {this.btn}
                    <button className={cx("item")} onClick={this.add.bind(this,0.5)}>{".5"}</button>
                    <button className={cx("item")} onClick={()=>this.setValue(this.state.index_max)}>满分</button>
                    <button className={cx("item","green")} onClick={()=>this.next(true)}>确定</button>
                </div>
            </div>
        </div>
        return null
    }
}

ScoreMask.render = function(ctx,list){
    if(list instanceof Array){
        list.forEach(function(data){
            ctx.font = "44px serif"
            ctx.fillStyle = "#f00"
            ctx.fillText('+'+(data.score||"0"),data.x-14,data.y+18)
        })
    }
}

export default ScoreMask
