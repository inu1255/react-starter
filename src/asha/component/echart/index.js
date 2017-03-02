import React from 'react';
import echarts from 'echarts';
import ReactDOM from 'react-dom';
import formdata from '../table/formdata.js'
import styles from './index.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

const OPTION = {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:[]
    },
    dataZoom: [
        {
            show: true,
            start:0,
        }
    ],
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true},
            dataZoom:{show:true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : []
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel : {
                formatter: '{value}'
            }
        },
        {
            type : 'value',
            axisLabel : {
                formatter: '{value}'
            }
        }
    ],
    series : [{
        name:"a",
        type:'line',
        data:[],
        yAxisIndex:0
    }]
};

class Echart extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Echart';
        this.state = new formdata(props.head,props.data)
    }
    setOption(props){
        if (props.option) {
            this.chart.setOption(props.option)
        }
        if (props.data) {
            var option = Echart.makeOption(this.state.head,this.state.body)
            this.chart.setOption(option)
        } 
    }
    componentDidMount(){
        var dom = ReactDOM.findDOMNode(this)
        this.chart = echarts.init(dom)
        this.chart.setOption(OPTION,true)
        this.setOption(this.props)
        // this.chart.on("legendselectchanged",(e)=>{
        // })
        if(this.props.onClick)this.chart.on("click",(e)=>{
            this.props.onClick(e)
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.data){
            this.state.initBody(nextProps.data)
        }
        this.setOption(nextProps)
    }
    render() {
        return <div className={cx("inu-chart")}></div>
    }
}

function makeSerie(title,data,yAxisIndex){
    return {
        name:title,
        type:'line',
        data:data||[],
        yAxisIndex:yAxisIndex||0
    }
}

Echart.makeOption = function(head,data){
    var legend = []
    var series = []
    for (var i = 1; i < head.length; i++) {
        legend.push(head[i].title)
        series.push(makeSerie(head[i].title))
    }
    var label = []
    data.forEach((item)=>{
        label.push(item[0].value)
        for (var i = 1; i < head.length; i++) {
            series[i-1].data.push(item[i].value)
        }
    })
    return {
        legend: {data:legend },
        xAxis : [{data : label }],
        series : series
    }
}

export default Echart
