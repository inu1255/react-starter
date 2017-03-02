var map = {}
var component = {}

var ComponentStorage = function(app){
    // 初始化组件表
    if(!component[app])component[app] = []
    // 当前storage绑定的组件
    var _component = component[app]
    var App = Bmob.Object.extend(app)
    var _data
    if(map[app])_data = map[app]
    else{
        _data = map[app] = {bmob:[],list:[]}
        var query = new Bmob.Query(App);
        // 查询所有数据
        query.find({
            success: (results)=>{
                results.forEach((item,i)=>{
                    _data.bmob.push(item._serverData)
                    _data.list.push(item._serverData)
                })
                this.update()
            }
        })
    }
    // 添加序列化数据接口
    this.saveStorage = function(){
        _data.list.forEach((item,i)=>{
            if(_data.bmob.indexOf(item)<0){
                var nn = new App()
                for(var k in item){
                    nn.set(k,item[k])
                }
                nn.save(null,{
                    success(){
                        _data.bmob.push(item)
                    }
                })
                _data.list[i] = item
            }
        })
        this.update()
    }
    // 添加绑定组件接口
    this.bind = function(component){
        if(component&&typeof component.setState=="function"){
            if(_component.indexOf(component)<0){
                _component.push(component)
                component.state.data = _data
                component.storage = this
                var parent = component.componentWillUnmount
                component.componentWillUnmount = ()=>{
                    this.unbind(component)
                    if(typeof parent=="function")parent()
                }
            }
        }
    }
    // 添加取消绑定接口
    this.unbind = function(component){
        var i = _component.indexOf(component)
        if(i>=0)_component.splice(i,1)
    }
    // 添加更新组件接口
    this.update = function(){
        _component.forEach(function(item){
            item.setState({})
        })
    }
    this.getData = function(){
        return _data
    }
}

module.exports = ComponentStorage