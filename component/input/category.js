import React from 'react';
import storage from 'asha/libs/storage.js'
import styles from './category.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

var cache = {}

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Category';
        cache[props.storage] = cache[props.storage]||{}
        this.cache = cache[this.props.storage]
        this.state = {
            value:[],
            data:this.props.data instanceof Array?{children:this.props.data}:this.props.data||storage("category."+props.storage)
        }
        this.getValue(props)
        if(!this.state.data.children)this.onClick(this.state.data,0,true)
    }
    componentWillReceiveProps(props,prevProps){
        this.getValue(props)
    }
    setValue(v,l){
        this.state.value[l] = v.value
        if(v.getParent)this.setValue(v.getParent(),l-1)
    }
    onClick(v,level,fackClick){
        if(!fackClick&&this.props.onChange)this.props.onChange(v)
        var value = this.state.value
        if(value[level] == v.value)v.open = !v.open
        else if(!fackClick){
            this.setValue(v,level)
            v.open = true
            value.splice(level+1)
        }
        if(typeof v.children=="undefined" && this.props.getJson){
            this.props.getJson(v).then((data)=>{
                v.children = data
                this.state.data.saveStorage()
                this.setState({})
                if(fackClick){
                    var nextLevel = level+1
                    if(value[nextLevel])for (var i = data.length - 1; i >= 0; i--) {
                        if(data[i].value == value[nextLevel]){
                            this.onClick(data[i],nextLevel,true)
                            break
                        }
                    }
                }
            })
        }
        this.setState({})
    }
    getValue(props){
        if(props.value instanceof Array)this.state.value = props.value
        else if(this.cache[props.value])this.state.value = this.cache[props.value].slice(0)
        else if(props.value&&props.getValue){
            props.getValue(props.value).then((res)=>{
                var data = []
                for (var i = 1;i<9;i++) {
                    if(!res["c"+i])break;
                    data[i] = res["c"+i]
                };
                this.state.value = data
                if(data instanceof Array) this.cache[props.value] = data.slice(0)
                this.setState({})
            })
        }
    }
    render() {
        if(this.props.disabled){
            var s = ""
            this.state.value.forEach((item)=>{
                if(!item)return
                if(!s)s = item
                else s+=","+item
            })
            return <div className={cx("inu-category")}>{s}</div>
        }
        return <div className={cx("inu-category")}>
            {this.renderTree(this.state.data.children,0)}
        </div>
    }
    renderTree(list,level,parent){
        if(!list||!list.length)return null;
        var v = this.state.value[level+1]
        return <div className={cx(tree)}>{
            list.map((item,i)=>{
                // 绑定父亲
                if(parent&&!item.getParent){
                    item.getParent = ()=>parent
                }
                var c = "item"
                // 如果有孩子 显示三角
                if(item.children&&item.children.length>0)c+=" children"
                // 三角向下 && 高亮
                if(v==item.value)c+=" active"
                item.open = v==item.value&&item.children&&item.children.length>0
                if(item.open)c += " open"
                return <div key={i} className={c}>
                    <div onClick={this.onClick.bind(this,item,level+1,false)} className={cx(title)}>
                        <icon className={cx("icon","ion-arrow-right-b")}></icon>
                        {item.value}
                    </div>
                    {item.open?this.renderTree(item.children,level+1,item):null}
                </div>
            })
        }</div>
    }
}

export default Category
