 /* 
对联广告调用 
第一个参数为ID,第二个参数图片,第三个参数广告距离顶部的距离, 
第四个参数表示左右(true代表左,false代表右),第五个参数对联广告的宽度 
*/ 
//new float_ad("ad_l","<img src='/System/uploads/allimg/090504/2346400.gif' />",50,true,64); 
//new float_ad("ad_r","<img src='/System/uploads/allimg/090504/2346400.gif' />",50,false,64); 

/* 
漂浮广告调用 
第一个参数中的url代表漂浮广告的图片URL地址(必选项),link链接到页面网址,alt图片提示文字,width图片的宽度(可选项,默认120),heihgt图片的高度(可选项,默认120) 
第二个参数中的代表漂浮广告的初始位置,由参数left和top指定 
第三个参数代表浮动速度，0为静止，越小浮动速度越快 
*/ 
//new move_ad({url:"/System/uploads/allimg/090504/2346400.gif",link:"http://www.jb51.net",alt:"关于招募“2009中国·大连国际樱桃节”志愿者的通知",width:200,height:200},{left:40,top:160},20); 
//核心代码 

function $OBJ(element){ 
if(arguments.length>1){ 
for(var i=0,elements=[],length=arguments.length;i<length;i++) 
elements.push($OBJ(arguments[i])); 
return elements; 
} 
if(typeof element=="string") 
return document.getElementById(element); 
else 
return element; 
} 
Function.prototype.bind=function(object){ 
var method=this; 
return function(){ 
method.apply(object,arguments); 
} 
} 
var Class={ 
create:function(){ 
return function(){ 
this.initialize.apply(this,arguments); 
} 
} 
} 
Object.extend=function(destination,resource){ 
for(var property in resource){ 
destination[property]=resource[property]; 
} 
return destination; 
} 
//对联广告类 
var float_ad=Class.create(); 
float_ad.prototype={ 
initialize:function(id,content,top,left,width){ 
document.write('<div id='+id+' style="position:absolute;">'+content+'</div>'); 
this.id=$OBJ(id); 
this.top=top; 
if(!!left){ 
this.id.style.left="8px"; 
}else{ 
this.id.style.left=(document.documentElement.clientWidth-width-8)+"px"; 
window.onresize=function(){ 
this.id.style.left=(document.documentElement.clientWidth-width-8)+"px"; 
}.bind(this); 
} 
this.id.style.top=top+"px"; 

this.interId=setInterval(this.scroll.bind(this),20); 
}, 
scroll:function(){ 
this.stmnStartPoint = parseInt(this.id.style.top, 10); 
this.stmnEndPoint =document.documentElement.scrollTop+ this.top; 
if(navigator.userAgent.indexOf("Chrome")>0){ 
this.stmnEndPoint=document.body.scrollTop+this.top; 
} 
if ( this.stmnStartPoint != this.stmnEndPoint ) { 
this.stmnScrollAmount = Math.ceil( Math.abs( this.stmnEndPoint - this.stmnStartPoint ) / 15 ); 
this.id.style.top = parseInt(this.id.style.top, 10) + ( ( this.stmnEndPoint<this.stmnStartPoint ) ? -this.stmnScrollAmount : this.stmnScrollAmount )+"px"; 
} 
} 
} 
//漂浮广告类 
var move_ad=Class.create(); 
move_ad.prototype={ 
initialize:function(imgOption,initPosition,delay){ 
//this.imgOptions=Object.extend({url:"",link:"",alt:"",width:120,height:120},imgOption||{}); 
this.adPosition=Object.extend({left:40,top:120},initPosition||{}); 
this.delay =delay; 
this.step = 1; 
this.herizonFlag=true; 
this.verticleFlag=true; 
this.id="ad_move_sg"; 
var vHtmlString="<div id='"+this.id+"' style='position:absolute; left:"+this.adPosition.left+"px; top:"+this.adPosition.top+"px; "; 
vHtmlString+=" z-index:10;'>"+imgOption+"</div>"; 
document.write(vHtmlString); 
this.id=$OBJ(this.id); 
this.intervalId=setInterval(this.scroll.bind(this),this.delay); 
this.id.onmouseover=this.stop.bind(this); 
this.id.onmouseout=this.start.bind(this); 
}, 
scroll:function(){ 
var L=T=0; 
var B=document.documentElement.clientHeight-this.id.offsetHeight; 
var R=document.documentElement.clientWidth-this.id.offsetWidth; 
this.id.style.left=this.adPosition.left+document.documentElement.scrollLeft+"px"; 
this.id.style.top=this.adPosition.top+document.documentElement.scrollTop+"px"; 
this.adPosition.left =this.adPosition.left + this.step*(this.herizonFlag?1:-1); 
if (this.adPosition.left < L) { this.herizonFlag = true; this.adPosition.left = L;} 
if (this.adPosition.left > R){ this.herizonFlag = false; this.adPosition.left = R;} 
this.adPosition.top =this.adPosition.top + this.step*(this.verticleFlag?1:-1); 
if(this.adPosition.top <= T){ this.verticleFlag=true; this.adPosition.top=T;} 
if(this.adPosition.top >= B){ this.verticleFlag=false; this.adPosition.top=B; } 
}, 
stop:function(){ 
clearInterval(this.intervalId); 
}, 
start:function(){ 
this.intervalId=setInterval(this.scroll.bind(this),this.delay); 
} 
} 
