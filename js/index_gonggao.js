// JavaScript Document
var inr_Speed = 10; //速度(毫秒)
var inr_Space = 10; //每次移动(px)
var inr_PageWidth = 300; //翻页宽度
var inr_fill = 0; //整体移位
var inr_MoveLock = false;
var MoveTimeObj;
var Comp = 0;
var AutoPlayObj = null;
GetObj("List2").innerHTML = GetObj("List1").innerHTML;
GetObj('ISL_Cont').scrollLeft = inr_fill;
GetObj("ISL_Cont").onmouseover = function(){clearInterval(AutoPlayObj);}
GetObj("ISL_Cont").onmouseout = function(){AutoPlay();}
AutoPlay();
function GetObj(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval

('document.all.'+objName)}}
function AutoPlay(){ //自动滚动
clearInterval(AutoPlayObj);
AutoPlayObj = setInterval('ISL_GoDown();ISL_StopDown();',3000); //间隔时间
}
function ISL_GoUp(){ //上翻开始
if(inr_MoveLock) return;
clearInterval(AutoPlayObj);
inr_MoveLock = true;
MoveTimeObj = setInterval('ISL_ScrUp();',inr_Speed);
}
function ISL_StopUp(){ //上翻停止
clearInterval(MoveTimeObj);
if(GetObj('ISL_Cont').scrollLeft % inr_PageWidth - inr_fill != 0){
Comp = inr_fill - (GetObj('ISL_Cont').scrollLeft % inr_PageWidth);
CompScr();
}else{
inr_MoveLock = false;
}
AutoPlay();
}
function ISL_ScrUp(){ //上翻动作
if(GetObj('ISL_Cont').scrollLeft <= 0){GetObj('ISL_Cont').scrollLeft = GetObj

('ISL_Cont').scrollLeft + GetObj('List1').offsetWidth}
GetObj('ISL_Cont').scrollLeft -= inr_Space ;
}
function ISL_GoDown(){ //下翻
clearInterval(MoveTimeObj);
if(inr_MoveLock) return;
clearInterval(AutoPlayObj);
inr_MoveLock = true;
ISL_ScrDown();
MoveTimeObj = setInterval('ISL_ScrDown()',inr_Speed);
}
function ISL_StopDown(){ //下翻停止
clearInterval(MoveTimeObj);
if(GetObj('ISL_Cont').scrollLeft % inr_PageWidth - inr_fill != 0 ){
Comp = inr_PageWidth - GetObj('ISL_Cont').scrollLeft % inr_PageWidth + inr_fill;
CompScr();
}else{
inr_MoveLock = false;
}
AutoPlay();
}
function ISL_ScrDown(){ //下翻动作
if(GetObj('ISL_Cont').scrollLeft >= GetObj('List1').scrollWidth){GetObj('ISL_Cont').scrollLeft =

GetObj('ISL_Cont').scrollLeft - GetObj('List1').scrollWidth;}
GetObj('ISL_Cont').scrollLeft += inr_Space ;
}
function CompScr(){
var num;
if(Comp == 0){inr_MoveLock = false;return;}
if(Comp < 0){ //上翻
if(Comp < -inr_Space){
   Comp += inr_Space;
   num = inr_Space;
}else{
   num = -Comp;
   Comp = 0;
}
GetObj('ISL_Cont').scrollLeft -= num;
setTimeout('CompScr()',inr_Speed);
}else{ //下翻
if(Comp > inr_Space){
   Comp -= inr_Space;
   num = inr_Space;
}else{
   num = Comp;
   Comp = 0;
}
GetObj('ISL_Cont').scrollLeft += num;
setTimeout('CompScr()',inr_Speed);
}
}
