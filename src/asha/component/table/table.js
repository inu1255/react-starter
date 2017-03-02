import React from 'react';
import formdata from './formdata.js'
import styles from './table.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)
// head数组元素为object或string
// [
//     {
//         title:"全选",
//         renderItem:(row)=>{
//             return <input type="checkbox"/>
//         }
//     },"编号","姓名","用户名","密码",
//     {
//         title:"类型",
//         convert:(item,row)=>{
//             return "Teacher"==item?"老师":"学生"
//         },
//         order:(av,bv,a,v)=>{return av-bv}
//     },
//     {
//         title:"操作",
//         renderItem:(row)=>{
//             return "编辑"
//         },
//         onClick:(item,row)=>{
//             console.log(row)
//         },
//         order:"origin"
//     }
// ]
class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {
            head:[],
            body:[],
            order:props.order||[],
            orderlist:[]
        }
        this.readData(props)
    }
    componentWillReceiveProps(nextProps){
        this.readData(nextProps)
    }
    readData(props){
        Object.assign(this.state,new formdata(props.head,props.body))
    }
    nextOrder(i){
        var o = this.state.order
        o[i] = o[i]||0
        switch(o[i]){
            case 0:o[i]=1;break;
            case 1:o[i]=-1;break;
            default:o[i]=0;
        }
        return o[i]
    }
    changeOrder(i){
        var o = this.state.order
        var ol = this.state.orderlist
        this.nextOrder(i)
        if(o[i]){
            ol.remove(i)
            ol.splice(0,0,i)
        }else{
            ol.remove(i)
        }
        this.doOrder()
    }
    doOrder(){
        var o = this.state.order
        var ol = this.state.orderlist
        var h = this.state.head
        if(ol.length>0){
            var defaultSort = (k,a,b)=>{
                a = typeof a=="object"?a[k]:a
                b = typeof b=="object"?b[k]:b
                return a>b?1:a==b?0:-1
            }
            this.state.body.sort((a,b)=>{
                for (var i = 0; i < ol.length; i++) {
                    var n = ol[i]
                    var order = h[n].order
                    var res 
                    if(typeof order=="function")res = o[n]*order(a[n],b[n],a,b)
                    else res = o[n]*defaultSort(order||"value",a[n],b[n])
                    if(res)return res
                };
                return 0
            })
        }else{
            this.initBody(this.props.body)
        }
        this.setState({})
    }
    render() {
        return <div className={"inu-table "+(this.props.className||"")}>
            <table>
                <thead>{this.renderHead()}</thead>
                <tbody>{this.renderBody()}</tbody> 
            </table>
        </div>
    }
    renderHead(){
        var head = this.state.head
        var o = this.state.order
        if(head instanceof Array)return <tr>{
            head.map((item,i)=>{
                var prop = {}
                prop.className = "ion-arrow-up-b"
                if(o[i]!==false){
                    if(typeof item.onOrder=="function")prop.onClick = ()=>item.onOrder()
                    else prop.onClick = this.changeOrder.bind(this,i)
                    prop.className+=" order"
                    if(o[i]<0)prop.className+=" dec"
                    if(o[i]>0)prop.className+=" inc"
                }
                return <th key={i} {...prop}>{item.title}</th>
            })
        }</tr>
    }
    renderBody(){
        var k = this.props.primary
        var body = this.state.body
        if(body instanceof Array)return body.map((row,i)=>{
            return <tr key={i}>{this.renderTr(row,i)}</tr>
        })
    }
    renderTr(row,line){
        var head = this.state.head
        if(head instanceof Array)return row.map((column,i)=>{
            return <td key={i} onClick={column.onClick} className={(column.onClick?"click":"")+(false?" change":"")}>{column.value}</td>
        })
    }
}

export default App
