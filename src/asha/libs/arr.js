// //获取指定元素在数组中的位置
// Array.prototype.indexOf = function(val) {
//     for (var i = 0; i < this.length; i++) {
//         if (this[i] == val) return i;
//     }
//     return -1;
// };

//删除数组中的指定元素
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};