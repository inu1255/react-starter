import pencil from '../libs/pencil32x32.png'

function defaultPen(resolve){
    var li = []
    this.move = function(b,e){
        if(b){
            li.push(e)
            return li
        }
    }
    this.end = function(b,e){
        if(b){
            li.push(e)
            resolve(li)
        }
    }
}
// 鼠标out时触发this.end
defaultPen.moveBegin = true
defaultPen.outEnd = true
defaultPen.cursor = 'url('+pencil+'),pointer'
defaultPen.render = function(ctx,data){
    if(data instanceof Array&&data.length>0){
        ctx.beginPath();
        ctx.moveTo(data[0].x,data[0].y);
        data.forEach((item,i)=>{
            ctx.lineTo(item.x,item.y);
        })
        ctx.stroke();
    }
}

export default defaultPen
