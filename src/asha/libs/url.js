function decode(u,split="&"){
    var res = {}
    if (typeof u == "string") {
        u = u.split(split);
        if(u.length>1)for (var i in u) {
            if (typeof u[i]==="string") {
                var j = u[i].split("=");
                if(j.length==2)res[j[0]] = decodeURIComponent(j[1]);
            }
        }
    }
    return res
}
function encode(u,split="&"){
    var res = "";
    for(var key in u){
        if(!res)res=encodeURIComponent(key)+"="+encodeURIComponent(u[key]);
        else res+="&"+encodeURIComponent(key)+"="+encodeURIComponent(u[key]);
    }
    return res
}
var res = {
    go(url){
        if(url.get)Object.assign(res.get,url.get);
        if(url.query)Object.assign(res.query,url.query)
        var href = url.location||res.location
        res._get = encode(res.get)
        res._query = encode(res.query)
        if(res._get)href+="?"+res._get
        href+="#"+(url.pathname||res.pathname)
        if(res._query)href+="?"+res._query
        location.href = href
    }
}
var prev= false
function getLoc(){
    var url = window.document.location.href.toString();
    if(prev&&prev==url)return res;
    prev = url;
    var regex = /^([^\?#]+)(\?([^\?#]*))?(#([^\?]*))?(\?([\s\S]+))?/
    var match = regex.exec(url)
    res.location = match[1]
    res._get = match[3]||""
    res.get = decode(res._get)//?a=b
    res.pathname = match[5]||""//#/foo/bar
    res._query = match[7]||""
    res.query = decode(res._query)//#/?a=b
    return res
}
// location                        get  pathname  query
// http://www.baidu.com/index.html?id=1#/a/b?c=2
// {
//     location:http://www.baidu.com/index.html,
//     get:{id:1},
//     pathname:/a/b,
//     query:{c:2}
// }
module.exports = getLoc
