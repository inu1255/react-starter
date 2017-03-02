function arr2csv(table,spli){
    var s = ""
    for (var i = 0; i < table.length; i++) {
        var row = table[i]
        if(i>0)s+="\n"
        for (var j = 0; j < row.length; j++) {
            if(j<1)s+=row[j]
            else s+=(spli||",")+row[j]
        };
    };
    return s
}
var csv = function(table,spli){
    this.head = table[0]
    this.body = table.slice(1)
    this.toString = function(){
        if(table instanceof Array)return arr2csv([this.head].concat(this.body),(spli||","))
    }
    this.sum = function(i,fix=2){
        var v = 0
        if(this.head[i]!==undefined){
            v = this.body.reduce(function(a,b){
                return a+parseFloat(b)
            },0)
        }
        var m =Math.pow(10,fix)
        return Math.floor(v*m)/m
    }
}

csv.prototype.download = function(name,ext){
    name = name||"downlaod"
    var aLink = document.createElement('a')
    aLink.download=name+(ext||".csv")
    aLink.href = "data:text/csv;charset=utf-8,\ufeff"+encodeURIComponent(this.toString()); 
    console.log(aLink.href) 
    aLink.click();
    return this
}
csv.prototype.sort = function(i,desc){
    if(this.head[i]!==undefined){
        var o = desc?-1:1
        this.body.sort(function(a,b){
            return o*(a[i]>b[i]?1:a[i]<b[i]?-1:0)
        })
    }
    return this
}

export default csv