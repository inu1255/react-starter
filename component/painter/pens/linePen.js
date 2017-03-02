
function linePen(resolve){
    this.move = function(b,e){
        if(b)return {b,e}
    }
    this.end = function(b,e){
        if(b)resolve({b,e})
    }
}
linePen.moveBegin = true
linePen.render = function(ctx,data){
    if(data&&data.b&&data.e){
        ctx.beginPath();
        ctx.moveTo(data.b.x,data.b.y);
        ctx.lineTo(data.e.x,data.e.y);
        ctx.stroke();
    }
}

export default linePen
