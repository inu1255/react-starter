Object.clone = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            Object.clone(obj[i]) : obj[i]; 
        }
    }
    return newobj;
}

Array.prototype.sizeTo = function(n,v){
    console.log(v)
    if(this.length<n)for(var i=this.length;i<n;i++){
        if(typeof v==="function")this[i] = v(i)
        else this[i] = v
    }else{
        this.length = n
    }
    return this
}

Array.prototype.fillWith = function(v,b,e){
    b = b>0?b:0
    e = e||this.length
    for (var i = b; i < e; i++) {
        if(typeof v==="function")this[i] = v(i)
        else this[i] = v
    }
    return this
}

Array.prototype.remove = function(v){
    var i = this.indexOf(v)
    if(i<0)return false
    for(;i<this.length-1;i++){
        this[i] = this[i+1]
    }
    this.length = this.length - 1
    return true
}

Array.prototype.exists = function(c){
    if(typeof c!=="function")throw "exists需要函数";
    for (var i = this.length - 1; i >= 0; i--) {
        if(c(this[i]))return true;
    };
    return false
}

Array.prototype.index = function(c){
    if(typeof c!=="function")throw "index需要函数";
    var i=0
    for (;i<this.length;i++) {
        if(c(this[i]))return i;
    };
    return -1
}
Array.prototype.last = function(){
    if(this.length>0)return this[this.length-1]
}