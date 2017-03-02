function Event(){
    var _listeners= {}
    // 添加
    this.addEventListener = function(type, fn) {
        if (typeof _listeners[type] === "undefined") {
            _listeners[type] = [];
        }
        if (typeof fn === "function") {
            _listeners[type].push(fn);
        }    
        return this;
    }
    // 触发
    this.dispatchEvent = function(type,data) {
        var arrayEvent = _listeners[type];
        if (arrayEvent instanceof Array) {
            for (var i=0, length=arrayEvent.length; i<length; i+=1) {
                if (typeof arrayEvent[i] === "function") {
                    arrayEvent[i](data);    
                }
            }
        }    
        return this;
    }
    // 删除
    this.removeEventListener = function(type, fn) {
        var arrayEvent = _listeners[type];
        if (typeof type === "string" && arrayEvent instanceof Array) {
            if (typeof fn === "function") {
                // 清除当前type类型事件下对应fn方法
                for (var i=0, length=arrayEvent.length; i<length; i+=1){
                    if (arrayEvent[i] === fn){
                        _listeners[type].splice(i, 1);
                        break;
                    }
                }
            } else if(typeof fn==="undefined") {
                // 如果仅仅参数type，则所有type类型事件清除
                delete _listeners[type];
            }
        }
        return this;
    }
}

export default Event
