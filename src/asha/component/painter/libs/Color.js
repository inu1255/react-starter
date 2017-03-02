function hslToRgb(hsl){
    var h = hsl[0],s = hsl[1],l = hsl[2]
    var r, g, b;
    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function rgbToHsl(rgb){
    var r=rgb[0],g=rgb[1],b=rgb[2]
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    var hsl = [h, s, l]
    return [h, s, l];
}
function hexColor(c){
    if(!c)return 255;
    if(c.length==1)return parseInt(c+c,16)
    if(c.length==2)return parseInt(c,16)
    return parseInt(c.substring(0,2),16)
}
function Color(c){
    var rgb = [255,255,255],hsl
    if(c instanceof Array&&c.length>2){
        hsl = [c[0],c[1],c[2]]
    }
    else if(typeof c=="string"){
        if(/^#[\da-fA-F]{3}$/.test(c)){
            rgb[0] = hexColor(c.substring(1,2))
            rgb[1] = hexColor(c.substring(2,3))
            rgb[2] = hexColor(c.substring(3))
        }else if(/^#[\da-fA-F]{6}$/.test(c)){
            rgb[0] = hexColor(c.substring(1,3))
            rgb[1] = hexColor(c.substring(3,5))
            rgb[2] = hexColor(c.substring(5))
        }
    }
    if(!hsl)hsl = rgbToHsl(rgb)
    this.hsl = hsl
    this.fromRgb = function(r){
        this.hsl = hsl = rgbToHsl(r)
    }
    this.toRgb = function(){
        rgb = hslToRgb(hsl)
        var v = "",s="#"
        v = rgb[0].toString(16)
        s += v.length==1?"0"+v:v
        v = rgb[1].toString(16)
        s += v.length==1?"0"+v:v
        v = rgb[2].toString(16)
        s += v.length==1?"0"+v:v
        return s;
    }
    Object.defineProperties(this,{
        h:{
            get:function(){
                return hsl[0]
            },
            set:function(v){
                hsl[0] = v
            }
        },
        s:{
            get:function(){
                return hsl[1]
            },
            set:function(v){
                hsl[1] = v
            }
        },
        l:{
            get:function(){
                return hsl[2]
            },
            set:function(v){
                hsl[2] = v
            }
        }
    })
}

module.exports = Color
