! function(e) {
    e.fn.extend({
        hqTabs: function(t, n) {
            var r = t,
                i = n || !1,
                o = e(this).find(".tab-content"),
                a = e(this).find(".tab-content > .tab-c");
            e(this).find(".tab-t").each(function(t) {
                e(this).on(r, function() {
                        e(this).addClass("active").siblings().removeClass("active"),
                            o.addClass("active"),
                            a.removeClass("active").eq(t).addClass("active")
                    }),
                    i && e(".category-menu").on("mouseleave", function() {
                        e(".category-menu .tab-t").removeClass("active"),
                            o.removeClass("active"),
                            a.removeClass("active")
                    })
            })
        }
    })
}(jQuery);
$(function() {
    $(".category1").hover(function(event) {
        var $this = $(event.currentTarget);
        $this.find(".category-title").show();
    }, function(event) {
        var $this = $(event.currentTarget);
        $this.find(".category-title").hide();
    });
});

$('div[html]').each(function(index, item) { $(item).load($(item).attr('html')) });
// 搜索弹出提示
$('.btn-search').click(function(event) {
        var search1 = $(event.currentTarget).parent().find('.input-search').val()
        if (!search1) {
            alert('请输入搜索内容');
            event.stopPropagation();
            event.preventDefault();
        }
    })
    // 放假通知、顶部广告关闭
$('#topNotice_close').click(function() {
    $('#topNotice').hide()
})
$('#J_topBanner .close').click(function(event) {
        event.preventDefault()
        event.stopPropagation()
        $('#J_topBanner').hide();
    })
    //弹窗
var _btn = $("#webimclosebutton");
_btn.click(function() {
    var _fixed = document.getElementById("webim");
    _fixed.style.display = "none";
})

// $("#J_categoryTab").hqTabs("mouseover", !0)
// $("#J_inquirySuperBuyer").hqTabs("click")
// $("#WisdomCity").hqTabs("click")
// $("#J_serviceTab").hqTabs("mouseover")
// $("#search").hqTabs("click")
$(function() {
    // var uislider = $('.uislider').unslider({
    //     speed: 500, //  The speed to animate each slide (in milliseconds)
    //     delay: 3000, //  The delay between slide animations (in milliseconds)
    //     complete: function() {}, //  A function that gets called after every slide animation
    //     keys: true, //  Enable keyboard (left, right) arrow shortcuts
    //     dots: true, //  Display dot navigation
    //     fluid: false //  Support responsive design. May break non-responsive designs
    // });
    // 首页焦点图轮播
    $(".uislider").slide({
        mainCell: ".uislider-content",
        effect: "leftLoop",
        autoPlay: true,
        interTime: 4000,
        trigger: "click",
        delayTime: 700,
        titOnClassName: 'active',
        titCell: '.dots .dot'
    });
    // 楼层广告轮播主动器件
    $("#adv-silder").slide({
        mainCell: ".slide-content",
        // effect: "leftLoop",
        autoPlay: true,
        interTime: 3000,
        trigger: "click",
        delayTime: 700,
        titOnClassName: 'on',
        titCell: '.hd1 li'
    });
    // 分立器件
    $("#adv-silder1").slide({
        mainCell: ".slide-content",
        // effect: "leftLoop",
        autoPlay: true,
        interTime: 4000,
        trigger: "click",
        delayTime: 700,
        titOnClassName: 'on',
        titCell: '.hd1 li'
    });
    // 开发工具
    $("#adv-silder2").slide({
        mainCell: ".slide-content",
        // effect: "leftLoop",
        autoPlay: true,
        interTime: 4000,
        trigger: "click",
        delayTime: 700,
        titOnClassName: 'on',
        titCell: '.hd1 li'
    });
    // 被动原件
    $("#adv-silder3").slide({
        mainCell: ".slide-content",
        // effect: "leftLoop",
        autoPlay: true,
        interTime: 4000,
        trigger: "click",
        delayTime: 700,
        titOnClassName: 'on',
        titCell: '.hd1 li'
    });
    // 互连产品
    $("#adv-silder4").slide({
        mainCell: ".slide-content",
        // effect: "leftLoop",
        autoPlay: true,
        interTime: 4000,
        trigger: "click",
        delayTime: 700,
        titOnClassName: 'on',
        titCell: '.hd1 li'
    });
    // 安防/消防
    $("#adv-silder5").slide({
        mainCell: ".slide-content",
        // effect: "leftLoop",
        autoPlay: true,
        interTime: 4000,
        trigger: "click",
        delayTime: 700,
        titOnClassName: 'on',
        titCell: '.hd1 li'
    });
    // 耗材设备
    $("#adv-silder6").slide({
        mainCell: ".slide-content",
        // effect: "leftLoop",
        autoPlay: true,
        interTime: 4000,
        trigger: "click",
        delayTime: 700,
        titOnClassName: 'on',
        titCell: '.hd1 li'
    });
    // 行业资讯
    // 头部搜索切换
    $("#search").hqTabs("click")
    // 50强切换
    $("#provider-tab").hqTabs("mouseover")
    // 采购服务切换
    $("#service-tab").hqTabs("mouseover")
    // 产品分类展开
    $("#sort").hqTabs("mouseover", 1)
    // 好商好货轮播
    var distributFun = function() {
        var option = {
            el: $('.good-silder').parent(),
            item: '.good-wrap li',
            iconl: '.lt',
            iconr: '.gt',
            num: '5',
            // gray: 'gray',
            // left: 'margin-left',
            count: 1
        }
        var distributTT = new tt.carouselLR(option);
    }();
    $(".otherlist").mouseover(function() {
        setTimeout(function(event) {

            var $this = $(this);
              $this.next().show();
            var left = $this.offset().left;
            var arrowleft = $this.next().find('.arrow').offset().left;
            var arrowleft1 = left - arrowleft;
            if( arrowleft1 > 0) {
                $this.next().find('.arrow').css('left', arrowleft1);
            }
            $this.addClass('active');
        }.bind(this), 1)

        //  var cid = $this.attr("cid");
        //  $this.next().load("http://www.cecb2b.com/static/nicindex_2014/"+cid+".html",function(){
        //     $this.css("background","background: url(../images/yqj.png) -86px -224px;")
        //     if($this.parents(".device-r").length > 0 ){
        //         $this.siblings(".pops").show().css({"left":$this.offset().left-$this.parents(".floor").offset().left-364,"top":$this.offset().top-$this.parents(".floor").offset().top+18})
        //         $this.siblings(".pops").find(".arrow").css("left","352px")
        //     }else{
        //         $this.siblings(".other-detil").show().css({"left":$this.offset().left-$this.parents(".floor").offset().left-64,"top":$this.offset().top-$this.parents(".floor").offset().top+18})
        //     }    
        // });

    })
    $(".device-tit").mouseleave(function(event){
       that =  $(event.currentTarget);
       that.find('.other-detil').hide();
       that.find('.otherlist').removeClass('active');
    })
    $(".other-detil").mouseleave(function(event){
        that =  $(event.currentTarget);
        that.hide(); 
        that.parent().find('.otherlist').removeClass('active');
    })
})
