// JavaScript Document
$(function(){
$(".market .s_cs ,.downlist1 .s_cs").hover(function(){
	 var $this =$(this);
	 $this.addClass("s_sel");
	 $this.siblings("ul").slideDown(100);
	},function(){
	
})
$(".market").bind("mouseleave",function(){
	 var $this =$(this);
	 $this.children(".s_cs").removeClass("s_sel");
	 $this.children("ul").hide();	
})
$(".downlist1").bind("mouseleave",function(){
	 var $this =$(this);
	 $this.children(".s_cs").removeClass("s_sel");
	 $this.children("ul").hide();	
})
$(".market ul li ,.downlist1 ul li").hover(function(){
	 var $this =$(this);
	 $this.css("background","#f4f4f4");
	},function(){
	 var $this =$(this);
	 $this.css("background","#fff");	
})
$("#nav .hd ul li").hover(function(){
	$(this).css("background","#f4f4f4")
	},function(){
	$(this).css("background","#fff")
})
$(".hd").hover(function(){
	var $this =$(this);
	$this.addClass("bghd").children("ul").slideDown(100);
	},function(){
	var $this =$(this);
	$this.removeClass("bghd").children("ul").hide();
})
$("#search ul li").click(function(){
	var $this = $(this);
	$("#search ul li").removeClass("sel");
	$this.addClass("sel");
	$(".schdiv").hide();
	$("#"+$this.attr("id")+"_cell").show();
})
$(".rela").hover(function(){
	var $this = $(this);
	$(this).children("dl").height("auto");
	},function(){
	$(this).children("dl").height(30);
})
$(".downlists dl dd").click(function(){
	var $this = $(this);
	$this.insertAfter($this.siblings("dt"));
	$this.parent().height(30);
	$(".downlists dl dd").css("color","#383838");
})
$(".downlists dl dd").hover(function(){
	$(this).css("color","#fa7018");
	},function(){
	$(this).css("color","#383838");
})
$(".navli").hover(function(){
	$(this).addClass("bghd");
	},function(){
	$(this).removeClass("bghd");
})
$(".words").each(function(){
	var $this = $(this);
	$this.html($this.html().replace(/[|]/g,""));
});
})
function inputFouce(obj){
	var $this=$(obj);
	$this.css({"background":"#fff","color":"#000"})
	if($this.val().indexOf("请输入")!= -1 || $this.val().indexOf("查找多个型号")!= -1){
		$this.val("")
	}
}
function inputBlur(obj){
	var $this=$(obj);
	$this.css("background","#fff")
	if($.trim($this.val())==""){
			$("#Text1").val('查找多个型号？搜"易配"试试!');
			$("#Text2").val('查找多个型号？搜"易配"试试!');
			$("#Text3").val('请输入您要查找的关键词');
			$("#Text4").val("请输入您要查找的关键词");
			$("#keys").val("请输入您要查找的关键词");
			$(".s_c input").css("color","#bbb");
			$(".s_c2 input").css("color","#bbb");
	}
	else{
		if($this.val().indexOf("请输入")== -1){
			for(var i=1;i<=4;i++){
			$("#Text"+i).val($this.val()).css("color","#000")
			}
			$("#keys").val($this.val()).css("color","#000")
		}
	}
}
function checkform1() {
	var search = $.trim($("#Text1").val());
	if(search=='易配'){
		window.open("http://www.cecb2b.com/order");
		return false;
	}
	else{
		if (search == '查找多个型号？搜"易配"试试!') {
			window.open("http://www.cecb2b.com/order");
			return false;
		}
		else if (search.length < 2) {
			alert("型号至少2个字符。");
			return false;
		}
		else{
			return true;
		}
			
	}
}
function checkform2() {
	var search = $.trim($("#Text2").val());
	if(search=='易配'){
		window.open("http://www.cecb2b.com/order");
		return false;
	}
	else{
		if (search == '查找多个型号？搜"易配"试试!') {
			if (search != '') {
				alert('请输入您要查找的非IC产品名称');
			}
			return false;
		}
		if (search.length < 3) {
			if (search.length < 2 || (!isChinese(search))) {
				alert("非IC检索时，输入必须大于2个字符!");
				return false;
			}
		}
		return true;
	}
}
function checkform3() {
	var search = $.trim($("#Text3").val());
	if(search=='易配'){
		window.open("http://www.cecb2b.com/order");
		return false;
	}
	else{
		if (search == '请输入您要查找的关键词') {
			if (search != '') {
				alert('请输入您要查找的关键词');
			}
			return false;
		}
		var tflag = parseInt($($("#icBuySearchForm dd").get(0)).attr("name"));
		$("#stss").val(""+tflag)
		if(tflag == 0){
			$("#icBuySearchForm").attr("action", "http://www.cecb2b.com/search/ibuySearch.do");	
		}else{
			$("#icBuySearchForm").attr("action", "http://www.cecb2b.com/search/nbuySearch.do");
		}
		if (tflag == 0 && $.trim($("#Text3").val()).length < 2) {
			alert("型号至少2个字符。");

			return false;
		}
		if (tflag == 1 && $.trim($("#Text3").val()).length < 3) {
			if ($.trim($("#Text3").val()).length < 2 || (!isChinese($("#Text3").val()))) {
				alert("非IC检索时，输入必须大于2个字符!");
				return false;
			}
		}
		return true;
	}
}
function checkform4() {
        var search = $.trim($("#Text4").val());
        if (search.indexOf("请输入您要查找的关键词")!=-1) {
            if (search != '') {
                alert(search);
            }
            return false;
        }
        if (search.length < 2) {
            alert("PDF信息至少2个字符。");
            return false;
        }
		var key = encodeURI($("#Text4").val());
		var tflag = parseInt($($("#qpdfForm dd").get(0)).attr("name"));
		
      	
		if(tflag == 0)	
		{
			location="http://pdf.cecb2b.com/search/qpdf.do?name="+key+"&pdf_key=0";
		}
		else if(tflag == 1)	
		{
			location="http://pdf.cecb2b.com/search/qpdf.do?name="+key+"&pdf_key=1";
		}
		else
		{
			location="http://pdf.cecb2b.com/search/qpdf.do?name="+key+"&pdf_key=2";
		}
		
	  	return false;
}
function search_list() {
    var keys = $("#keys").val();
    keys = (keys=='请输入您要查找的关键词') ? '' : keys;
    keys = keys.replace(/(^\s*)|(\s*$)/g, '');
    if (keys=='' || keys==null) {
        alert('请输入搜索关键词！');
        $("#keys").focus();
    } else {
        if (keys=='\'' || keys=='\\' || keys=='\"') {
            alert('您输入的关键词为非法字符，请重新输入！');
            $("#keys").val('');
            $("#keys").focus();
        } else {
            location = "http://app.news.cecb2b.com/?app=search&controller=index&action=search&type=all&wd="+keys+"";
        }
    }
	return false;
}