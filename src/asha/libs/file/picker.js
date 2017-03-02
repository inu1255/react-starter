var f = document.createElement('input')
var fchange = function(e){}
f.type = 'file';
f.accept = "*"
f.style.display = "none"
f.addEventListener('change', function(e) {
    fchange(e)
})
var pick = function(type,multiple) {
    return new Promise((resolve,reject)=>{
        f.accept = type||"*"
        if(multiple)f.multiple = 'multiple'
        fchange = function(e) {
            if(multiple)resolve(e.target.files)
            else resolve(e.target.files.item(0))
            //console.log(window.URL.createObjectURL(file))
        }
        f.click();
    })
}

pick.toBase64 = function(url,size){
    return new Promise(function(resolve,reject){
        var img = new Image()
        img.src = url
        img.onload = function(){
            var canvas = document.createElement("canvas")
            //canvas.style.display = "none"
            //document.body.appendChild(canvas)
            if(typeof size=="function"){
                size = size(img.width,img.height)
                canvas.width = size.w
                canvas.height = size.h
            }else if(typeof size=="object"){
                canvas.width = size.w
                canvas.height = size.h
            }else{
                canvas.width = img.width
                canvas.height = img.height
            }
            var ctx = canvas.getContext("2d")
            ctx.drawImage(img,0,0,canvas.width,canvas.height)
            resolve(canvas.toDataURL())
            // document.body.removeChild(canvas)
        }
        img.onerror = function(){
            reject()
        }
    })
}

module.exports = pick