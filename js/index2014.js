// JavaScript Document
$("#nav_index").addClass("sel");

var Cookies = {
	init: function () {
		var allCookies = document.cookie.split('; ');
		for (var i=0;i<allCookies.length;i++) {
			var cookiePair = allCookies[i].split('=');
			this[cookiePair[0]] = cookiePair[1];
		}
	},
	create: function (name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
		this[name] = value;
		//后台交互
		$.post("search/index_execTop.do",{floorNum:value});
	},
	erase: function (name) {
		this.create(name,'',-1);
		this[name] = undefined;
		//后台交互
		$.post("search/index_cancelTop.do");
	}
};
Cookies.init();
function resetFloorNum(){
	$(".floorflag").each(function(){
		var $this = $(this);
		var $thisfnum = $this.attr("floornums");
		$this.children(".tits").children("h2").children("i").text($thisfnum+"F");
		$this.children(".tits").children(".settop").show();
		$this.children(".tits").children(".canseltop").hide();
	})
	$(".mnfloor li").each(function(){
		var $this = $(this);
		var $thisfnum = $this.attr("floornums");
		$this.children("i").text($thisfnum+"F")
	})
}
function restore(c_x){
    if(c_x){
		var numc_x = parseInt(c_x);
		var $par = $(".floorflag[floornums='"+numc_x+"']");
		$par.insertAfter($("#topsflags"));
		$par.children(".tits").children(".settop").hide();
		$par.children(".tits").children(".canseltop").show();
		$par.children(".tits").children("h2").children("i").text("TOP");
		$(".mnfloor li[floornums='"+(numc_x)+"']").addClass("sel").insertAfter("#mntops").children("i").text("TOP");
	}else{
		$($(".mnfloor li").get(0)).addClass("sel");	
	}
}
$(function(){
	var c_x = '';
	$.post("search/index_topLog.do",function(data){	//先从后台获取
	    c_x = data;
	});
	if(!c_x){
	    c_x = Cookies['cecb2b_setfloor'];
	}
	restore(c_x);
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
	$("#tc1 li").mouseover(function(){
		var $this = $(this);
		$("#tc1 li").removeClass("sel");
		$this.addClass("sel");
		$("#tc1 .cells").hide();
		$("#"+$this.attr("id")+"_cell").show();
	})
	$("#tc2 .titcell li").mouseover(function(){
		var $this = $(this);
		$("#tc2 li").removeClass("sel");
		$this.addClass("sel");
		$("#tc2 .cells").hide();
		$("#"+$this.attr("id")+"_cell").show();
	})
	$(".brand-list a").live("mouseover",function(){
		var $this = $(this);
		$this.css({"z-index":"2"}).children("img").css({"border":"2px solid #4186cb","width":"54px","height":"54px"}).siblings("p").show();
		if($this.attr("class").indexOf("turnleft") != -1){
				$this.children("p").css({"left":"-129px"})
		}
		
		})
	$(".brand-list a").live("mouseleave",function(){
		var $this = $(this);
		$this.css({"z-index":"1"}).children("img").css({"border":"1px solid #ddd","width":"56px","height":"56px"}).siblings("p").hide();
		if($this.attr("class").indexOf("turnleft") != -1){
				$this.children("p").css({"left":"-129px"})
		}
	})
	$(".settop").hover(function(){
		var $this = $(this);
		$this.children("i").addClass("sel");
		$this.children("span").text("置顶");
		},function(){
		var $this = $(this);
		$this.children("span").stop();
		$this.children("i").removeClass("sel");
		$this.children("span").text("置顶").width(64)
	})
	// $(".otherlist").mouseover(function(){
	// 	 var $this = $(this);
	// 	 var cid = $this.attr("cid");
	// 	 $(".otherlist_detail_"+cid).load("static/nicindex_2014/"+cid+".html",function(){
	// 		$this.css("background","url(http://images.cecb2b.com/images/index_2014/index.gif) 0 -363px")
	// 		if($this.parents(".leftc2").attr("class").indexOf("m2") > 0 ){
	// 			$this.siblings(".pops").show().css({"left":$this.offset().left-$this.parents(".floor").offset().left-364,"top":$this.offset().top-$this.parents(".floor").offset().top+18})
	// 			$this.siblings(".pops").children(".popcell").children(".arrow").css("left","352px")
	// 		}else{
	// 	 	$this.siblings(".pops").show().css({"left":$this.offset().left-$this.parents(".floor").offset().left-64,"top":$this.offset().top-$this.parents(".floor").offset().top+18})
	// 	 	}	 
	// 	});
		 
	// })
	$(".leftc2 .tit").bind("mouseleave",function(){
		var $this = $(this);
		$this.children(".pops").hide();	
		$this.children(".otherlist").css("background","url(http://images.cecb2b.com/images/index_2014/index.gif) 0 -376px")
	})
	// $(".rightbar").css("left",$(".wrap").offset().left+$(".wrap").width()+16);
	// $(".r_top").css("left",$(".wrap").offset().left+$(".wrap").width()+38);
	
	if($("body").width() < 1100){
		$(".mnfloor ul").hide();
		$(".rightbar").css("left",$(".wrap").width()-88);
		$(".r_top").css("left",$(".wrap").width()-66);
	}
})
$(function() {
	$('#marquee1').marquee({
		auto: true,
		interval: 3000,
		showNum: 6,
		stepLen: 1,
		type: 'vertical'
	});
	// 50强认证
	$('#marquee2').marquee({
		auto: true,
		interval: 3000,
		showNum: 5,
		stepLen: 1,
		type: 'vertical'
	});
	// 采购动态
	$('#marquee3').marquee({
		auto: true,
		interval: 3000,
		showNum: 2,
		stepLen: 1,
		type: 'vertical'
	});
	// 优质供应商
	$('#marquee4').marquee({
		auto: true,
		interval: 3000,
		showNum: 2,
		stepLen: 1,
		type: 'vertical'
	});
	// 实力商家
	$('#marquee5').marquee({
		auto: true,
		interval: 3000,
		showNum: 4,
		stepLen: 1,
		type: 'vertical'
	});
	$("#slider1").Xslider({
		affect:'fade',
		ctag: 'div',
		space: 5000, //时间间隔
		speed:400,
		rand:true
	});
	$("#slider2").Xslider({
		affect:'fade',
		ctag: 'div',
		space: 5000, //时间间隔
		speed:400
	});
	$("#slider3").Xslider({
		affect:'fade',
		ctag: 'div',
		space: 5000, //时间间隔
		speed:400
	});
	$("#slider4").Xslider({
		affect:'fade',
		ctag: 'div',
		space: 5000, //时间间隔
		speed:400
	});
	$("#slider5").Xslider({
		affect:'fade',
		ctag: 'div',
		space: 5000, //时间间隔
		speed:400
	});
	$("#slider6").Xslider({
		affect:'fade',
		ctag: 'div',
		space: 5000, //时间间隔
		speed:400
	});
	$(".mnfloor .bt").click(function(){
		var $this = $(this);
		$this.siblings("ul").slideToggle(300,function(){
			if($this.siblings("ul").is(":visible")){
				$this.css("background","url(http://images.cecb2b.com/images/index_2014/index.gif) 0 -429px")
			}else{
				$this.css("background","url(http://images.cecb2b.com/images/index_2014/index.gif) 0 -658px")	
			}
		})
	})
	$(".r_top").click(function(){
		$("html,body").animate({ scrollTop : 0},300)	
	})
	$(".words").each(function(){
	    var $this = $(this);
	    $this.html($this.html().replace(/[|]/g,""));
	});
	var floorSet = new Array();
	
	function jsfloor(){
		for(var i=0;i<8;i++){
			floorSet[i]=$($(".floorflag").get(i)).offset().top-50;
		}
		
	}
	jsfloor();
	$(window).scroll(function(){
		var Top=$(window).scrollTop();
		if(Top == 0){
			$(".rightbar").fadeOut(200);
			$(".r_top").fadeOut(200);
		}else{
			$(".rightbar").fadeIn(200);	
			$(".r_top").fadeIn(200);
		}
		if(Top<floorSet[1]){
			$(".mnfloor li").removeClass("sel");
			$($(".mnfloor li").get(0)).addClass("sel");
		}else if(Top>=floorSet[1] && Top<floorSet[2]){
			$(".mnfloor li").removeClass("sel");
			$($(".mnfloor li").get(1)).addClass("sel");
		}else if(Top>=floorSet[2] && Top<floorSet[3]){
			$(".mnfloor li").removeClass("sel");
			$($(".mnfloor li").get(2)).addClass("sel");
		}
		else if(Top>=floorSet[3] && Top<floorSet[4]){
			$(".mnfloor li").removeClass("sel");
			$($(".mnfloor li").get(3)).addClass("sel");
		}
		else if(Top>=floorSet[4] && Top<floorSet[5]){
			$(".mnfloor li").removeClass("sel");
			$($(".mnfloor li").get(4)).addClass("sel");
		}
		else if(Top>=floorSet[5] && Top<floorSet[6]){
			$(".mnfloor li").removeClass("sel");
			$($(".mnfloor li").get(5)).addClass("sel");
		}else if(Top>=floorSet[6] && Top<floorSet[7]){
			$(".mnfloor li").removeClass("sel");
			$($(".mnfloor li").get(6)).addClass("sel");
		}else{
			$(".mnfloor li").removeClass("sel");
			$($(".mnfloor li").get(7)).addClass("sel");
		}
	})
	$(".settop").click(function(){
		resetFloorNum();
		$(".settop").hide();
		var $par = $(this).parents(".floorflag");
		var $partit = $par.children(".tits");
		var $parnums = parseInt($par.attr("floornums"));
		if($par.index(".floorflag")!=0){
			$par.animate({
				left : "-1000px",
				opacity: 0	
			},800,function(){
				
			/*if($(".floorflag[istop='1']").length>0){
				var isfloor=parseInt($(".floorflag[istop='1']").attr("floornums"));
				if(isfloor!=1){
					$(".floorflag[istop='1']").insertBefore($($(".floorflag").get(isfloor))).attr("istop","0");
				}
			}*/
			$($(".floorflag").get(0)).children(".tits").children(".canseltop").trigger("click");
			
		$(".mnfloor li[floornums='"+($parnums)+"']").insertAfter("#mntops").children("i").text("TOP");
			$par.attr("istop","1");
				$par.children(".tits").children("h2").children("i").text("TOP")
				$('html,body').animate({scrollTop: $("#topsflags").offset().top}, 200,function(){
					$par.insertAfter('#topsflags'); 
						$par.animate({
							left : 0,
							opacity: 1	
						},800,function(){
							$(".settop").show();
							$partit.children(".settop").hide();
							$partit.children(".canseltop").show();
							Cookies.create('cecb2b_setfloor',$parnums,365); 
							});
					})	
			})
		}else{
			$par.attr("istop","1");
			$partit.children("h2").children("i").text("TOP");
			$partit.children(".settop").hide();
			$partit.children(".canseltop").show();
			$(".settop").show();
			$(".mnfloor li[floornums='"+($parnums)+"']").children("i").text("TOP");
			Cookies.create('cecb2b_setfloor',$parnums,365); 
		}
		$(".mnfloor li[floornums='"+($parnums)+"']").attr("istop","1");
		
		
			
	})	
	$(".canseltop").click(function(){
		Cookies.erase('cecb2b_setfloor');
		resetFloorNum();
		var $par = $(this).parents(".floorflag");
		$par.attr("istop","0");
		var $partit = $par.children(".tits");
		var $parnums = parseInt($par.attr("floornums"));
		$partit.children(".settop").show();
		$partit.children(".canseltop").hide();
		if($parnums != 1 && $parnums != 8){
			$par.insertAfter($(".floorflag[floornums='"+($parnums-1)+"']")); 
			$(".mnfloor li[floornums='"+($parnums)+"']").insertAfter($(".mnfloor li[floornums='"+($parnums-1)+"']"));
			
		}
		if($parnums == 8){
			$par.insertAfter($(".floorflag[floornums='"+(7)+"']"));
			$(".mnfloor li[floornums='8']").insertAfter($(".mnfloor li[floornums='"+(7)+"']"));
		}
		$(".mnfloor li").removeClass("sel");
			$($(".mnfloor li").get(0)).addClass("sel");
			$partit.children("h2").children("i").text($parnums+"F");
	})
	$(".mnfloor li").click(function(){
		var $this = $(this);
		var $thisfnum = $this.attr("floornums");
		$('html,body').animate({scrollTop: $(".floorflag[floornums='"+$thisfnum+"']").offset().top}, 200)
	})
	$(".r_top").hover(function(){
		$(this).css({"background":"#4185c9","text-indent":0})
		},function(){
		$(this).css({"background":"url(http://images.cecb2b.com/images/index_2014/index.gif) 0 -460px","text-indent":"-999em"})
	})
	/*$(".mnfloor li").hover(function(){
		var $this = $(this);
		if($this.attr("class").indexOf("sel")<0){
			$this.a	
		}
		},function(){
		
	})*/
	$(".navli").hover(function(){
		$(this).addClass("bghd");
		},function(){
		$(this).removeClass("bghd");
	})
	
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