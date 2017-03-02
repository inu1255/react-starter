import Event from './libs/Event.js'
import Mask from './libs/Mask.js'
import PPAP from './pens.js'
import scroll from 'asha/libs/scroll.js'
var defaultPen = PPAP(0)

function newConfig(config){
    if(typeof config!="object")config = {}
    return {
        size:config.size,
        background:config.background,
        history:config.history||[],
        redo:config.redo||[],
        mask:[],
        penClass:config.penClass||defaultPen,
    }
}

// function createMaskCanvas(w,h){
//     var canvas_mask = document.createElement('canvas')
//     canvas_mask.style.position = "absolute"
//     canvas_mask.style.top = 0
//     canvas_mask.style.left = 0
// }

function resizeCanvas(canvas,config,defaultWidth,defaultHeight){
    return new Promise(function(resolve,reject){
        var size =config.size
        if(size instanceof Promise){
            size.then((data)=>{
                canvas.width = data.w||defaultWidth
                canvas.height = data.h||defaultHeight
                resolve(canvas)
            })
        }else if(size=="object"){
            canvas.width = size.w||defaultWidth
            canvas.height = size.h||defaultHeight
            resolve(canvas)
        }else if(config.background instanceof Image){
            var img = config.background
            if(img.width){
                canvas.width = defaultWidth
                canvas.height = defaultWidth/img.width*img.height
                resolve(canvas)
            }else{
                img.onload = function(){
                    canvas.width = defaultWidth
                    canvas.height = defaultWidth/img.width*img.height
                    resolve(canvas)
                }
            }
        }else{
            canvas.width = defaultWidth
            canvas.height = defaultHeight
            resolve(canvas)
        }
    })
}
const styles = ["fillStyle","filter","font","globalAlpha","globalCompositeOperation","imageSmoothingEnabled","imageSmoothingQuality","lineCap","lineDashOffset","lineJoin","lineWidth","miterLimit","shadowBlur","shadowColor","shadowOffsetX","shadowOffsetY","strokeStyle","textAlign","textBaseline",]

CanvasRenderingContext2D.prototype.getStyle = function(){
    var style = {}
    styles.forEach((k)=>{
        if(this[k]!=this.initStyle[k])style[k] = this[k]
    })
    return style
}
CanvasRenderingContext2D.prototype.setStyle = function(style){
    if(typeof style!="object")return this
    styles.forEach((k)=>{
        if(typeof style[k]!="undefined")this[k] = style[k]
    })
    return this
}

function paintItem(ctx,item){
    if(typeof item!="object")return;
    var pen = PPAP(item.key)
    if(pen){
        ctx.save()
        pen.render(ctx.setStyle(item.style),item.data,item.style)
        ctx.restore()
    }
}

function paintMask(ctx,item){
    if(typeof item=="object"&&typeof item.penClass=="function"){
        ctx.save()
        item.penClass.render(ctx.setStyle(item.style),item.data,item.style)
        ctx.restore()
    }
}

function normalizeEvent(e){
    if(e instanceof TouchEvent){
        var off = scroll.offset(e.target)
        var offsetX = e.touches[0].pageX-off.top
        var offsetY = e.touches[0].pageY-off.left
        return {offsetX,offsetY}
    }else{
        return e
    }
}

function drawer(config){
    Event.call(this)
    var that = this
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext("2d")
    ctx.fillStyle = "#f00"
    ctx.strokeStyle = "#f00"
    ctx.initStyle = {}
    ctx.initStyle = ctx.getStyle()
    // 读取配置
    config = newConfig(config)

    // 画笔和蒙版实例
    var pen,mask;
    // 鼠标按下位置
    var beginPoint = false
    // 鼠标out位置
    var outPoint = false
    function getPen(){
        if(typeof mask=="object"&&typeof mask.pen=="object")return mask.pen
        return pen
    }
    function mousedown(e){
        e = normalizeEvent(e)
        var ppap = getPen()
        if(!beginPoint)beginPoint = {x:e.offsetX,y:e.offsetY}
        if(typeof ppap.begin=="function"){
            that.setData(ppap.begin(beginPoint))
        }
        e.preventDefault()
    }
    function mousemove(e){
        e = normalizeEvent(e)
        var ppap = getPen()
        // 在画图状态下，当鼠标按下时move事件也可以设置begin坐标
        if(!beginPoint&&e.buttons==1&&config.penClass.moveBegin&&!mask)beginPoint = {x:e.offsetX,y:e.offsetY,moveBegin:true}
        if(typeof ppap.move=="function"){
            that.setData(ppap.move(beginPoint,{x:e.offsetX,y:e.offsetY}))
        }
        e.preventDefault()
    }
    function end(point,callBy){
        var ppap = getPen()
        if(typeof ppap.end=="function"){
            that.setData(ppap.end(beginPoint,point,callBy))
        }
        beginPoint = false
    }
    function mouseup(e){
        e = normalizeEvent(e)
        end({x:e.offsetX,y:e.offsetY})
        e.preventDefault()
    }
    function mouseover(e){
        if(config.penClass.outEnd){
            // 在out时已经end了
        }else if(e.buttons!=1){
            end(outPoint,"mouseover")
        }
        outPoint = false
    }
    function mouseout(e){
        outPoint = {x:e.offsetX,y:e.offsetY}
        if(config.penClass.outEnd){
            end(outPoint,"mouseout")
        }else if(e.buttons==1){
            mousemove(e)
        }
    }
    canvas.addEventListener("mousedown",mousedown)
    canvas.addEventListener("mousemove",mousemove)
    canvas.addEventListener("mouseup",mouseup)
    canvas.addEventListener("touchstart",mousedown)
    canvas.addEventListener("touchmove",mousemove)
    canvas.addEventListener("touchend",mouseup)
    canvas.addEventListener("mouseover",mouseover)
    canvas.addEventListener("mouseout",mouseout)

    function createNewPen(){
        // 设置画笔鼠标指针样式
        canvas.style.cursor = config.penClass.cursor||'auto'
        pen = new config.penClass(penSuccess)
        mask = false
    }
    // 画笔绘制结束回调
    function penSuccess(data){
        console.log(data)
        createNewPen()
        if(typeof data!="undefined"){
            config.history.push({key:PPAP.key(config.penClass),data,style:ctx.getStyle()})
            config.penData = undefined
            config.redo.length = 0
            that.update()
        }
    }
    createNewPen()

    this.setPen = function(penClass){
        // 模拟mouseup
        end(outPoint,"setPen")
        if(penClass instanceof Mask){
            canvas.style.cursor = 'auto'
            mask = penClass
            return
        }
        // 设置为默认画笔
        if(typeof penClass=="undefined")penClass = defaultPen
        var tmp = PPAP(penClass)
        if(tmp){
            // 清除没有完成的画笔数据
            if(config.penClass!=tmp){
                config.penClass = tmp
                config.penData = undefined
            }
            // 创建画笔
            createNewPen()
        }else{
            console.log("不能识别的画笔")
            console.log(penClass)
        }
    }
    this.update = function(){
        // 清除画布
        ctx.clearRect(0,0,canvas.width,canvas.height)
        this.dispatchEvent('beforeupdate',ctx)
        // 画背景
        if(config.background)ctx.drawImage(config.background,0,0,canvas.width,canvas.height)
        // 画历史数据
        config.history.forEach((item,i)=>{
            paintItem(ctx,item)
        })
        // 画蒙版
        config.mask.forEach((item,i)=>{
            paintMask(ctx,item)
        })
        // 画当前画笔数据
        if(typeof config.penData!="undefined"){
            ctx.save()
            config.penClass.render(ctx,config.penData)
            ctx.restore()
        }
        this.dispatchEvent('update',ctx)
    }
    this.setData = function(data){
        if(typeof data=="undefined")return;
        if(typeof data!="object"||typeof config.penData!="object")config.penData = data
        else Object.assign(config.penData,data)
        this.update()
    }
    this.insertInto = function(dom){
        dom.appendChild(canvas)
        resizeCanvas(canvas,config,dom.offsetWidth,dom.offsetHeight).then((data)=>{
            this.update()
        })
        return this
    }
    this.history = function(){
        return config.history
    }
    this.undo = function(test){
        if(config.history.length>0){
            if(test)return true
            config.redo.push(config.history.pop())
            this.update()
        }
    }
    this.redo = function(test){
        if(config.redo.length>0){
            if(test)return true
            config.history.push(config.redo.pop())
            this.update()
        }
    }
    this.renderPen = function(){
        if(pen&&pen.render)return pen.render(this,config.penData)
        return null
    }
    this.setFillStyle = function(color){
        ctx.font = "30px"
        ctx.fillStyle = color
        ctx.strokeStyle = color
    }
    this.getMask = function(){
        return mask
    }
    // 创建/获取 mask
    this.newMask = function(n){
        if(typeof n!="number")n = config.mask.length
        return config.mask[n] = config.mask[n]||new Mask(this,createNewPen)
    }
    this.getSize = function(){
        return {w:canvas.width,h:canvas.height}
    }
    this.toDataURL = function(){
        return canvas.toDataURL()
    }
    this.getCtx = function(){
        return ctx
    }
    this.offset = function(){
        var box = canvas.getBoundingClientRect()
        return {
            top: box.top + window.pageYOffset - document.documentElement.clientTop,
            left: box.left + window.pageXOffset - document.documentElement.clientLeft,
            right: box.right,
            bottom: box.bottom
        }
    }
}

export default drawer
