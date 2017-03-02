var body = document.body||document.documentElement
const MIN = 5
const MAX = 50
const TIME = 10
var app = {
    getTop(){
        return body.scrollHeight - window.innerHeight
    },
    scrollY(pos){
        var max = this.getTop()
        pos=pos<0?max+pos+1:pos;
        pos=pos>max?max:pos;
        var cur = body.scrollTop
        function begin(){
            var x = pos-cur
            var c = x/TIME;
            if(Math.abs(c)<=MIN)c=c>0?MIN:-MIN;
            else if(Math.abs(c)>MAX)c=c>0?MAX:-MAX;
            cur += c
            if(Math.abs(x)<=MIN)
                window.scrollTo(0,pos);
            else{
                window.scrollTo(0,cur);
                setTimeout(begin,15);
            }
        }
        begin()
    },
    offset(who){
        var box = who.getBoundingClientRect()
        return {
            top: box.top + window.pageYOffset - document.documentElement.clientTop,
            left: box.left + window.pageXOffset - document.documentElement.clientLeft
        }
    }
}
module.exports = app
