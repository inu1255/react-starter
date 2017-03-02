function Mask(drawer,createNewPen){
    var that = this
    this.bind = function(component){
        component.update = function(data){
            if(typeof data!="undefined")that.data = data
            drawer.update()
        }
        component.finish = function(){
            createNewPen()
        }
        component.painting = function(){
            return that==drawer.getMask()
        }
        component.drawer = drawer
        that.pen = component
        that.penClass = component.constructor
    }
}

export default Mask
