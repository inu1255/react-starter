import g9 from 'g9'

function equilateral_triangle(get_args, minimize_args){
    this.minimize_args = minimize_args
    this.get_args = get_args
}

equilateral_triangle.argNames = ['x', 'y', 'size', 'affects']

equilateral_triangle.prototype.mount = function(container){
    this.container = container
    this.el = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
    this.container.appendChild(this.el)
    this.el.setAttributeNS(null, 'fill', 'red')

    var startex, startey;

    var self = this

    function onmove(e){
        var dx = e.clientX - startex
        var dy = e.clientY - startey

        var current_affects = self.get_args().affects

        self.minimize_args(function(args){
            var ddx = (args.x) - dx
            var ddy = (args.y) - dy

            return ddx*ddx + ddy*ddy
        }, current_affects)
    }

    function onstart(e){

        var start_args = self.get_args()

        e.preventDefault()

        startex = e.clientX
        startey = e.clientY

        var onend = function(e){
            document.removeEventListener('mousemove', onmove)
            document.removeEventListener('mouseup', onend)
        }

        document.addEventListener('mousemove', onmove)
        document.addEventListener('mouseup', onend)
    }

    this.el.addEventListener('mousedown', onstart)
}

equilateral_triangle.prototype.unmount = function() {
    this.container.removeChild(this.el)
}

equilateral_triangle.prototype.update = function() {
    var obj = this.get_args()
    for(var k in obj){
        this.el.setAttribute[k] = obj[k]
    }
    var x = obj.x
    var y = obj.y
    var size = obj.size

    var points = [x+Math.cos(0)*size, y+Math.sin(0)*size,
                  x+Math.cos(2*Math.PI/3)*size, y+Math.sin(2*Math.PI/3)*size,
                  x+Math.cos(2*Math.PI*2/3)*size, y+Math.sin(2*Math.PI*2/3)*size]
    this.el.setAttributeNS(null, 'points', points.join(' '))
}

g9.shapes.equilateral_triangle = equilateral_triangle

export default equilateral_triangle
