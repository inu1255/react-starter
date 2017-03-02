import storage from './storage.js'
import stream from './file/stream.js'
import pick from './file/picker.js'

var api = {}
var API = "http://api.tederen.com"//"http://localhost:8090"//
var token = storage("api.storage",{},true)

api.callJson = function(uri){
    return function(data){
        return new Promise(function(resolve,reject){
            fetch(API+uri,{credentials: 'include',body:JSON.stringify(data),method: "POST",headers:{'content-type':'application/json','WHOSYOURDADDY':'inu1255','X-Auth-Token':token.token}}).then(function(res){
                if(res.ok)return res.json();
            }).then(function(res){
                if(!res) reject(404)
                if(typeof res.code=="undefined")resolve(res)
                if(res.code==0)resolve(res.data)
                else reject(res.msg)
            }).catch(function(){
                reject()
            })
        })
    }
}
api.getJson = function(uri){
    return function(){
        return new Promise(function(resolve,reject){
            fetch(API+uri,{credentials: 'include',headers:{'content-type':'application/json','WHOSYOURDADDY':'inu1255','X-Auth-Token':token.token}}).then(function(res){
                if(res.ok)return res.json();
            }).then(function(res){
                if(!res) reject(404)
                if(typeof res.code=="undefined")resolve(res)
                if(res.code==0)resolve(res.data)
                else reject(res.msg)
            }).catch(function(e){
                reject(e)
            })
        })
    }
}
api.upload = function(file,progress,url){
    return new Promise(function(resolve,reject){
        new stream({
            url:API+(url||"/file/upload"),
            headers:{
                'X-AUTH-TOKEN':token.token,
            },
            progress:(e)=>{
                if(progress)progress(e.percent * 100)
            },
            success:(file,data)=>{
                resolve(Object.assign(file,data))
            },
            retry:(e)=>{
                if(!e)return false;
                if(e.code==23)return false;
                if(e.code==233)return true;// 网络错误，启动重传
                // if(e.code==33){// 中断上传
                //     reject(e) //继续上传函数,e.data()可继续上传
                // }
                if (e.code==1) {
                    reject(e)
                }
            }
        }).upload(file)
    })
}
api.pick = pick
api.setUrl = function(url){
    API = url
    return api
}
api.getHost = function(){
    return API
}
api.setToken = function(t){
    token.token = t
    token.saveStorage()
}
api.getToken = function(){
    return token.token
}
api.edit = function(comp,row,keys){
    if(!(keys instanceof Array)){
        keys = [keys]
    }
    return {
        value:row[keys[0]],
        onChange:function(e){
            if(e&&e.preventDefault){
                e = e.target.value
            }
            for (var i = 0; i < keys.length; i++) {
                row[keys[i]] = e
            }
            if(typeof comp=="object"&&typeof comp.setState=="function")comp.setState({})
        }
    }
}
api.check = function(comp,check,a,b){
    return {
        checked:check,
        onClick:function(){
            if(check){
                a()
            }else{
                b()
            }
            if(typeof comp=="object"&&typeof comp.setState=="function")comp.setState({})
        }
    }
}
module.exports = api
