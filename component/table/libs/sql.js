import api from 'asha/libs/api.js'

var App = function(table,what){
    this.find = function(where){
        return App.find(table,what,where)
    }
    this.update = function(data,origin){
        return App.update(table,what,data,origin)
    }
}
App.find = function(table,what,where){
    where = where||""
    return new Promise(function(resolve,reject){
        var w = ""
        what.forEach(function(item){
            if(!w)w = ""+item+""
            else w+=","+item+""
        })
        var sql = `select ${w} from ${table} ${where}`
        api.callJson("/test/query")({sql}).then((data)=>{
            resolve(data)
        })
    })
},
App.update = function(table,what,data,origin){
    origin = origin||{}
    var key = what[0]
    if(data[0])return new Promise(function(resolve,reject){
        if(!data[0])return reject("没有主键");
        var s = ""
        what.forEach(function(item,i){
            if(i>0&&data[i]&&data[i]!=origin[i]){
                if(data[i].replace&&data[i].length>16)data[i]=data[i].replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'\\"')
                if(!s)s = ""+item+"='"+data[i]+"'"
                else s+=","+item+"='"+data[i]+"'"
            }
        })
        if(!s)return reject("没有任何改变");
        var sql = `update ${table} set ${s} where ${key}=${data[0]}`
        api.callJson("/test/update")({sql}).then((data)=>{
            resolve(data)
        })
    })
    return new Promise(function(resolve,reject){
        if(!data[key])return reject("没有主键");
        var s = ""
        what.forEach(function(item){
            if(key!=item&&data[item]&&data[item]!=origin[item]){
                if(data[item].replace&&data[item].length>16)data[item]=data[item].replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'\\"')
                if(!s)s = ""+item+"='"+data[item]+"'"
                else s+=","+item+"='"+data[item]+"'"
            }
        })
        if(!s)return reject("没有任何改变");
        var sql = `update ${table} set ${s} where ${key}=${data[key]}`
        api.callJson("/test/update")({sql}).then((data)=>{
            resolve(data)
        })
    })
}
module.exports = App
