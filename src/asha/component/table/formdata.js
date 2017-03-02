function renderValue(k,row,convert){
    if(typeof convert==="function")return convert(row[k],row)
    return row[k]+""
}
function formdata(head,body,onClick){
    this.head = []
    this.body = []
    this.initHead(head,body)
    this.initBody(body,onClick)
}
formdata.prototype.initHead = function(head,body){
    var row = body&&body[0]
    if(head instanceof Array){
        var n = 0
        this.head = head.map((column,j)=>{
            var col = {}
            var key
            if(typeof column==="object"){
                // Object.assign(col,column)
                if(!column.renderItem){
                    key = column.key?column.key:n++
                    if(column.convert)col.renderItem = (r)=>renderValue(key,r,column.convert)
                    else col.renderItem = renderValue.bind(this,key)
                }
                col.key = key
                col.title = column.title||column.value
                col = Object.assign({},column,col)
            }else if(typeof row==="object"&&!(row instanceof Array)&&typeof column==="string"){
                col.key = column
                col.renderItem = renderValue.bind(this,column)
                col.title = column
            }
            else {
                key = n++
                col.key = key
                col.renderItem = renderValue.bind(this,key)
                col.title = column
            }
            return col
        })
    }
    else if(body instanceof Array){
        if(row instanceof Array)
            this.head = row.map((item,i)=>{
                return {key:i,renderItem:renderValue.bind(this,i),title:i}
            })
        else if(typeof row==="object"){
            this.head = []
            for(var k in row){
                this.head.push({key:k,renderItem:renderValue.bind(this,k),title:k})
            }
        }
    }
}
formdata.prototype.initBody = function(body,onClick){
    var head = this.head
    if(body instanceof Array){
        if(head instanceof Array){
            this.body = body.map((row,i)=>{
                return head.map((column,j)=>{
                    var value = column.renderItem(row,i)
                    var click = column.onClick||onClick
                    var res = {value}
                    if(typeof column.key!=="undefined")res.origin = row[column.key]
                    if(click)res.onClick = ()=>click(res.origin,row,column.title)
                    return res
                })
            })
        }
    }
}
export default formdata
