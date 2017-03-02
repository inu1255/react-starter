var prettify = {}

prettify.timeFormat = function(date,fmt){
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds(), //毫秒
        "w+": date.getDay(),
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
    return fmt;
}

prettify.time = function(t,fmt){
    if(typeof t=="string")t = new Date(t.substring(0,19).replace(/-/g,'/'))
    else if(!(t instanceof Date))t = new Date(t)
    if(typeof fmt=="string")return prettify.timeFormat(t,fmt)
    var now = new Date()
    var today = new Date(now.toDateString())
    var seconds = (now.getTime() - t.getTime())/1000
    if(seconds<60)return "刚刚";
    if(seconds<3600)return parseInt(seconds/60)+"分钟前"
    var tday = new Date(t.toDateString())
    var days = (today.getTime()-tday.getTime())/86400000
    var time = t.toTimeString().substr(0,5)
    if(days<1)return "今天 "+time
    if(days<2)return "昨天 "+time
    if(today.getYear()==t.getYear())return (t.getMonth()+1)+"-"+t.getDate()+" "+time
    return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+time
}

prettify.chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
prettify.chnUnitSection = ["","万","亿","万亿","亿亿"];
prettify.chnUnitChar = ["","十","百","千"];

prettify.money = function(m){   //转换成元，原先是以分为单位
    return parseFloat((m/100).toFixed(2))
}

prettify.SectionToChinese=function(section){
  var strIns = '', chnStr = '';
  var unitPos = 0;
  var zero = true;
  while(section > 0){
    var v = section % 10;
    if(v === 0){
      if(!zero){
        zero = true;
        chnStr = this.chnNumChar[v] + chnStr;
      }
    }else{
      zero = false;
      strIns = this.chnNumChar[v];
      strIns += this.chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}
prettify.NumberToChinese=function(num){
  var unitPos = 0;
  var strIns = '', chnStr = '';
  var needZero = false;
 
  if(num === 0){
    return this.chnNumChar[0];
  }
 
  while(num > 0){
    var section = num % 10000;    //取余，剩下千及千以后  
    if(needZero){
      chnStr = this.chnNumChar[0] + chnStr;
    }
    strIns = this.SectionToChinese(section);
    strIns += (section !== 0) ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = (section < 1000) && (section > 0);
    num = Math.floor(num / 10000);
    unitPos++;
  }
 
  return chnStr;
}

module.exports = prettify
