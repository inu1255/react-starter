import React from 'react';
import Index from './index.js';
import api from 'asha/libs/api.js'
import storage from 'asha/libs/storage.js'
import Input from 'asha/component/input/input-outline.js'

function makeOption(title,label,series){
    if(!series||!series[0])return;
    if(typeof title=="string"){
        title = {text:title}
    }
    var legend = series.map((item)=>item.name)
    return {
        title : title,
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:legend
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : label
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} °C'
                }
            }
        ],
        series : series
    };
}

const select = [["count(id)","场次"],["sum(used)","观影量"],["sum(total)","排片量"]]

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {
            option:{},
            data:storage('echart.day.params',{
                day:"2016-08-08",
                params:[{}]
            }),
            edit:{}
        }
        api.getJson("/movie/list")().then((data)=>{
            this.setState({movies:data.map((item,i)=>{
                return [item.id,item.title]
            })})
        })
        api.getJson("/company/list")().then((data)=>{
            this.setState({companys:data.map((item,i)=>{
                return [item.cid,item.name]
            })})
        })
        this.load()
    }
    load(){
        api.callJson("/chart/test")(this.state.data).then((data)=>{
            this.state.data.saveStorage()
            this.setState({option:makeOption(data.title,data.label,data.series)})
        })
    }
    addLine(item,i){
        if(item.name!=""){
            if(i<0) {
                this.state.data.params.splice(0,0,item)
            }
        }else if(i>=0&&this.state.params.length>1){
            this.state.data.params.splice(i,1)
        }
        this.load()
    }
    render() {
        var edit = this.state.edit
        return <div className={cx("inu-example")}>
            <Input title="日期" value={this.state.data.day} onChange={(v)=>this.state.data.day=v} onClick={this.load.bind(this)}></Input>
            <Index option={this.state.option}></Index>
            <div className={cx("inputs")}>
                <div className={cx("row")}>
                    <div className={cx("col")}> <Input title="类型" select={select} value={edit.what} onChange={(v)=>edit.what=v}></Input> </div>
                    <div className={cx("col")}> <Input title="电影" select={this.state.movies} value={edit.mid} onChange={(v)=>edit.mid=v}></Input> </div>
                    <div className={cx("col")}> <Input title="公司" select={this.state.companys} value={edit.cid} onChange={(v)=>edit.cid=v}></Input> </div>
                    <div className={cx("col")}> <Input title="名称" value={edit.name} onChange={(v)=>edit.name=v} onClick={this.addLine.bind(this,edit,-1)}></Input> </div>
                </div>{
                this.state.data.params.map((item,i)=>{
                    return <div className={cx("row")}>
                        <div className={cx("col")}> <Input title="类型" select={select} value={item.what} onChange={(v)=>item.what=v}></Input> </div>
                        <div className={cx("col")}> <Input title="电影" select={this.state.movies} value={item.mid} onChange={(v)=>item.mid=v}></Input> </div>
                        <div className={cx("col")}> <Input title="公司" select={this.state.companys} value={item.cid} onChange={(v)=>item.cid=v}></Input> </div>
                        <div className={cx("col")}> <Input title="名称" value={item.name} onChange={(v)=>item.name=v} onClick={this.addLine.bind(this,item,i)}></Input> </div>
                    </div>
                })
            }</div>
        </div>
    }
}

export default App
