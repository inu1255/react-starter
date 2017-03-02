import pick from './picker.js'
/**
 * FormData转query字条串,"a=1&b=2"
 */
if(XMLHttpRequest&&!XMLHttpRequest.setRequestHeaders)XMLHttpRequest.prototype.setRequestHeaders = function(headers){
    if(typeof headers=="object")for(var k in headers){
        var v = headers[k]
        this.setRequestHeader(k,v)
    }
}
if(File&&!File.last)File.prototype.last = function(){
    if(this.lastModified)return this.lastModified
    if(this.lastModifiedDate)return this.lastModifiedDate.getTime()
    return 0
}


var app = function(cfg){
    cfg = cfg||{}
    var that = this
    var sliceSize = 1000000||cfg.size
    var headers = cfg.headers||{}
    var seg = cfg.seg||1000 // 每多少毫秒计算一次速度
    that.success = cfg.success||function(e){
        console.log('success')
    }
    that.progress = cfg.progress
    var retry = function(e){
        if(!e)return false;
        var res
        if(typeof cfg.retry=="function")res = cfg.retry(e)
        if(typeof res!="undefined")return res
        if(e.code==233)return true;// 网络错误，启动重传
        if(e.code==23)return true;// 获取续传点失败,重新获取
        if(e.code==1)return true;// 文件不存在,续传点为0
        //1255  用户需要登录
        //33    中断上传
    }
    /**
     * 创建FormData
     * @param  {[file]}     file    [文件]
     * @param  {[int/null]} begin   [上传开始位置/获取开始位置]
     * @return {[FormData]}         [FormData]
     */
    var makeForm = (file,begin)=>{
        var form = new FormData()
        if(!file){
            console.log(file)
        }
        form.append('last',file.last())
        form.append('filename',file.name)
        form.append('size',file.size)
        if(typeof begin!='undefined'){
            var end = begin+sliceSize
            form.append('file',file.slice(begin,end<file.size?end:file.size))
            form.append('begin',begin)
        }
        return form;
    }
    /**
     * 从begin位置开始上传
     */
    var upload = (file,begin)=>{
        var form = makeForm(file,begin)

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress",function(e){
            var data = {}
            data.total = file.size
            data.loaded = begin+e.loaded
            var cur = new Date().getTime()
            if(cur-file.update_at>=seg||typeof file.speed=='undefined'){
                file.speed = (data.loaded-file.loaded)/(cur-file.update_at)*1000
                file.update_at = cur
                file.loaded = data.loaded
                file.avg_speed = data.loaded/(cur-file.begin_at)*1000
            }
            data.speed = file.speed
            data.avg_speed = file.avg_speed
            data.percent = (data.loaded/data.total).toFixed(4);
            data.rest_time = (data.total-data.loaded)/data.speed
            if(typeof that.progress=="function")that.progress(data)
        });
        xhr.addEventListener("load",function(e){
            var res = JSON.parse(e.target.responseText)
            if(res&&res.code==0){
                var size = res.data
                if(typeof size=="object"){
                    if(typeof that.success=='function')that.success(file,size)
                }
                else if(size<file.size)
                    upload(file,size)
                else if(size==file.size)
                    if(typeof that.success=='function')that.success(file)
                else
                    new Error("超出范围")
            }else{
                // 失败重传
                if(retry(res))setTimeout(upload.bind(null,file,begin),1500)
            }
        });
        xhr.addEventListener("error",function(e){
            // 失败重传
            if(retry({code:233,msg:"网络错误"}))setTimeout(upload.bind(null,file,begin),1500)
        });
        xhr.addEventListener("abort",function(e){
            retry({code:33,msg:"中断上传",data:upload.bind(null,file,begin)})
        });
        
        xhr.open("POST",cfg.url);
        xhr.setRequestHeaders(headers)
        xhr.send(form);
    }
    /**
     * 获取续传点
     */
    var getStartPos = (file)=>{
        return new Promise((resolve,reject)=>{
            var s
            s = 'last='+file.last()
            s+='&filename='+file.name
            s+='&size='+file.size
            fetch(cfg.url+"?"+s,{
                method:'POST',
                headers:headers
            }).then((data)=>{
                return data.json()
            }).then((res)=>{
                if(res.code==0){
                    resolve(res.data)
                }else if(retry(res)){
                    resolve(0)
                }
            }).catch((e)=>{
                if(retry({code:23,msg:"获取续传点失败"}))setTimeout(getStartPos.bind(null,file),1500)
            })
        })
    }
    /**
     * 上传文件
     * @param file File/input的onchange事件
     */
    this.upload = (file)=>{
        if(file.target)file = file.target.files.item(0);
        if(!file)return;
        getStartPos(file).then((pos)=>{
            file.loaded = 0
            file.update_at = file.begin_at = new Date().getTime()
            upload(file,pos)
        })
        if(typeof cfg.onSelect=="function")cfg.onSelect({
            name:file.name,
            size:file.size,
            url:window.URL.createObjectURL(file),
        })
    }
    /**
     * 选择并上传文件
     */
    this.pick = (type)=>{
        pick(type).then(this.upload)
    }
}


app.calcSpeed = function(s){
    var res
    if(s>1048576)res = (s/1048576).toFixed(2)+"Mb/s"
    else if(s>1024)res = (s/1024).toFixed(2)+"Kb/s"
    else res = s.toFixed(2)+"b/s"
    return res
}

app.calcSize = function(s){
    var res
    if(s>1048576)res = (s/1048576).toFixed(1)+"Mb"
    else if(s>1024)res = (s/1024).toFixed(1)+"Kb"
    else res = s.toFixed(1)+"b"
    return res
}

app.calcRest = function(s){
    if(s<0)return "上传成功";
    if(s<60)return Math.floor(s)+"秒"
    if(s<3600)return Math.floor(s/60)+"分"+Math.floor(s)%60+"秒"
    return Math.floor(s/3600)+"小时"+Math.floor(s%3600/60)+"分"+Math.floor(s)%60+"秒"
}


module.exports = app