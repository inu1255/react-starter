import React from 'react';
import Table from 'asha/component/table/table.js'
import sql from 'asha/component/table/libs/sql.js'
import Form from 'asha/component/form/form.js'
import Input from 'asha/component/input/input-outline.js'
import Select from 'asha/component/input/input-select.js'
import Category from 'asha/component/input/category.js'
import api from 'asha/libs/api.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.state = {
            head:[
                {
                    title:"全选",
                    renderItem:(row)=>{
                        return <input type="checkbox"/>
                    }
                },
                {
                    title:"编号",
                    renderInput:false
                },"姓名","用户名","密码",
                {
                    title:"类型",
                    convert:(item,row)=>{
                        return "Teacher"==item?"老师":"学生"
                    },
                    renderInput:(row,key,title)=>{
                        return <Input title={title} value={row[key]} onChange={(v)=>row[key]=v} select={[["Teacher","老师"],["User","学生"]]}></Input>
                    }
                },
                {
                    title:"分类",
                    convert:(item,row)=>{
                        return <Category disabled value={item} getValue={(id)=>api.getJson("/category/info/"+id)()} getJson={(v)=>api.callJson("/category/child")(v)}></Category>
                    },
                    renderInput:(row,key,title)=>{
                        return <Category value={row[key]} onChange={(v)=>row[key]=v.id} getValue={(id)=>api.getJson("/category/info/"+id)()} getJson={(v)=>api.callJson("/category/child")(v)}></Category>
                    }
                },
                {
                    title:"头像",
                    convert:(item,row)=>{
                        return <Select storage="resource" disabled value={item} getJson={sql.find.bind(this,'resource',['id','filename'])}></Select>
                    },
                    renderInput:(row,key,title)=>{
                        return <Select storage="resource" title={title} value={row[key]} onChange={(v)=>row[key]=v} getJson={sql.find.bind(this,'resource',['id','filename'])}></Select>
                    }
                },
                {
                    title:"操作",
                    renderItem:(row)=>{
                        return "编辑"
                    },
                    onClick:(item,row)=>{
                        this.setState({update:row,edit:Object.assign({},row)})
                    }
                }
            ]
        }
        this.sql = new sql("user",["id","nickname","username","password","type","category_id","head_image_id"])
        this.sql.find().then((data)=>{
            this.setState({body:data})
        })
    }
    onSubmit(edit){
        this.sql.update(edit).then((data)=>{
            Object.assign(this.state.update,edit)
            this.setState({edit:false})
        })
    }
    render() {
        return <div className={cx("inu-table-test")}>
            <Table className={cx("full")} head={this.state.head} body={this.state.body}></Table>
            {this.state.edit?<Form className={cx("mask")} inputs={this.state.head} data={this.state.edit} onSubmit={this.onSubmit.bind(this)} onCancel={()=>this.setState({edit:false})}></Form>:null}
        </div>
    }
}

export default App
