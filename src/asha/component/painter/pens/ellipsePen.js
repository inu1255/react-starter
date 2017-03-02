
function ellipsePen(resolve){
    this.move = function(b,e){
        return {b,e}
    }
    this.end = function(b,e){
        if(b)resolve({b,e})
    }
}
ellipsePen.moveBegin = true
ellipsePen.render = function(ctx,data){
    if(data&&data.b&&data.e){
        var x = (data.b.x+data.e.x)/2
        var y = (data.b.y+data.e.y)/2
        var a = (data.e.x-data.b.x)/2
        var b = (data.e.y-data.b.y)/2
        var ox = 0.5 * a,
            oy = 0.6 * b;
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.moveTo(0, b);
        ctx.bezierCurveTo(ox, b, a, oy, a, 0);
        ctx.bezierCurveTo(a, -oy, ox, -b, 0, -b);
        ctx.bezierCurveTo(-ox, -b, -a, -oy, -a, 0);
        ctx.bezierCurveTo(-a, oy, -ox, b, 0, b);
        ctx.closePath();
        ctx.stroke();
    }
}

export default ellipsePen
