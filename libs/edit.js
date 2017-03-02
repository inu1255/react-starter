var api = {}
api.edit = function(comp,row,keys){
    if(!(keys instanceof Array)){
        keys = [keys]
    }
    return {
        value:row[keys[0]],
        onChange:function(e){
            if(e&&e.preventDefault){
                e = e.target.value
            }
            for (var i = 0; i < keys.length; i++) {
                row[keys[i]] = e
            }
            if(typeof comp=="object"&&typeof comp.setState=="function")comp.setState({})
        }
    }
}
api.check = function(comp,check,a,b){
    return {
        checked:check,
        onClick:function(){
            if(check){
                a()
            }else{
                b()
            }
            if(typeof comp=="object"&&typeof comp.setState=="function")comp.setState({})
        }
    }
}

export default api