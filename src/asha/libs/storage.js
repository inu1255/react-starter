var map = {}

var storage = function(app,Defualt){
    if(map[app])return map[app]
    var _data = Defualt||{}
    // 保存有本地数据时恢复
    if(localStorage[app]){
        _data = JSON.parse(localStorage[app])
    }
    map[app] = _data
    _data.saveStorage = function(){
        localStorage[app] = JSON.stringify(_data)
    }
    return _data
}

var component = {}

var ComponentStorage = function(app,Defualt){
    if(!(this instanceof ComponentStorage))return storage(app,Defualt)
    var _data = storage(app,Defualt)
    // 初始化组件表
    if(!component[app])component[app] = []
    // 当前storage绑定的组件
    var _component = component[app]
    // 缓存在cache中
    _data.getStorage = ()=>{
        return this
    }
    // 添加序列化数据接口
    this.saveStorage = function(){
        this.update()
        _data.saveStorage()
    }
    // 添加绑定组件接口
    this.bind = function(component){
        if(component&&typeof component.setState==="function"){
            if(_component.indexOf(component)<0){
                _component.push(component)
                component.state.data = _data
                component.storage = this
                var parent = component.componentWillUnmount
                component.componentWillUnmount = ()=>{
                    this.unbind(component)
                    if(typeof parent==="function")parent()
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