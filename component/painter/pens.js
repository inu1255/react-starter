var map = {
    defaultPen:require('./pens/defaultPen.js').default,
    linePen:require('./pens/linePen.js').default,
    ellipsePen:require('./pens/ellipsePen.js').default,
    textPen:require('./pens/textPen.js').default,
}
var arr = [
    require('./pens/defaultPen.js').default,
    require('./pens/linePen.js').default,
    require('./pens/ellipsePen.js').default,
    require('./pens/textPen.js').default,
]
function getPen(pen){
    if(typeof pen=="string"){
        return map[pen]||map["defaultPen"]
    }
    if(typeof pen=="number"){
        if(pen<0||pen>=arr.length)return arr[0]
        return arr[pen]
    }
    if(typeof pen=="object")pen = object.constuctor
    if(typeof pen=="function"&&typeof pen.render=="function"){
        var i = arr.indexOf(pen)
        if(i<0)arr.push(pen)
        return pen
    }
}
var api = function(pen){
    pen = getPen(pen)
    return pen&&pen.default||pen
}

api.key = function(pen){
    return arr.indexOf(api(pen))
}

export default api
