// JavaScript Document

/*===========================
 *
 *create by Damon.dai
 *time on 2014-11-06 11:54:10
 *contact by 361904805@qq.com
===========================*/


var Mall_details_page={

	init:function(){

		//放大镜效果
		this.toMagnifierModule();

		//圆形进度条
		//parameter[好评，中评，差评]
		// this.toCircularProgressBar(0,66,4);

		//商品介绍
		this.toPositionNav();

		//初始化计算第一个优惠套装的宽度
		this.init_Favourable_width();


	},
	//后台回调
	changePackageSelectBox:function(){},

	toMagnifierModule:function(){
		var tempLength = 0, //临时变量,当前移动的长度
			viewNum = 5,//设置每次显示图片的个数
			moveNum = 2, //每次移动的数量
			scrollContainer=$(".small-pic-content ul"),//进行移动动画的容器
			scrollItems = $(".small-pic-content ul li"), //移动容器里的元素集合
			moveLength = scrollItems.eq(0).outerWidth(true) * moveNum, //计算每次移动的长度
			maxMoveLength = (scrollItems.length - viewNum) * scrollItems.eq(0).outerWidth(true); //计算最大移动长度
			//alert(maxMoveLength)
			thumbnail = $(".small-pic-content .items img"),
			preImgArea=$('.jqzoom img'),
			scrollLi=$('.small-pic-content li');

		//下一张
		$(".moveSpan .next").on("click",function(){
			if(tempLength < maxMoveLength){
				if((maxMoveLength - tempLength) > moveLength){
					$(".moveSpan .next").addClass("ableNext");
					$(".moveSpan .pre").addClass("ablePre");
					scrollContainer.animate({left:"-="+moveLength+'px'},300);
					tempLength += moveLength;
					if(tempLength==maxMoveLength)
					{
						$(".moveSpan .next").removeClass("ableNext");
					}
				}else{
					$(".moveSpan .next").removeClass("ableNext");
					$(".moveSpan .pre").addClass("ablePre");
					scrollContainer.animate({left:"-=" + (maxMoveLength - tempLength) + "px"}, 300);
					tempLength += (maxMoveLength - tempLength);
					if(tempLength==maxMoveLength)
					{
						$(".moveSpan .next").removeClass("ablePre");
					}
				}
			}
		});

		//上一张
		$(".moveSpan .pre").on("click",function(){
			if(tempLength > 0){
				if(tempLength > moveLength){
					$(".moveSpan .pre").addClass("ablePre");
					$(".moveSpan .next").addClass("ableNext");
					scrollContainer.animate({left: "+=" + moveLength + "px"}, 300);
					tempLength -= moveLength;

				}else{
					$(".moveSpan .pre").removeClass("ablePre");
					$(".moveSpan .next").addClass("ableNext");
					scrollContainer.animate({left: "+=" + tempLength + "px"}, 300);
					tempLength = 0;
				}
			}
		});


		//放大图片
		$(".jqzoom").jqueryzoom({xzoom:500,yzoom:500});

		//缩略图预览
		thumbnail.on('mouseenter',function(){

			preImgArea.attr("src",$(this).attr("src"));
			preImgArea.attr("jqimg",$(this).attr("bimg"));

		});


		//鼠标事件
		scrollLi.on({mouseenter:function(){
			$(this).addClass('selected').siblings().removeClass('selected');
			$(this).parent().find('a').removeClass('selected');
			$(this).children().addClass('selected');
		}})

	},

	toCircularProgressBar: function (iGood,iGeneral,iPoor) {

            var roundBox = $("#JS_CircularProgressBar"),
                roundNum = $('.roundNum');

            var timer = null;
            var i = -1;

            clearInterval(timer);
            timer=setInterval(function(){

            	i++;

            	if( i >= iGood) {
                    clearInterval(timer);
                }

                var imgSite = -(100*94-(i+1)*94)+'px';

                if(i==100){
                	roundBox.css("background-position",'0px 0px');
                }else{
                	roundBox.css("background-position",'0px'+'\t'+imgSite);
                }

                roundNum.text(i);

            },30)

            function setBar($objBar,data) {
               var progressBar=$objBar;

               //设置显示的数字
               progressBar.find('.iNum').html('('+data+'%'+')');
               //设置进度条宽度
               progressBar.find('.bar').css("width",0);
               progressBar.find('.bar').css({"width" : data});

            }

            setBar($('.goodReputation'),iGood);
            setBar($('.generalReputation'),iGeneral);
            setBar($('.poorReputation'),iPoor);


	},

	toPositionNav:function(){
		var $target = $('#dp-pro-infotabs').children("ul");
		$(window).scroll(function(){

			var t=$("[fn-role=middleContent]").offset().top;
			var $tz = $(".dp-tabsContent");
			var $addShopCarBtn=$('.addshop-tab');//加入购物车按钮
			if($tz.length){//判断套装节点存在情况
				t+=$tz.outerHeight(true);
			}
			if ($(window).scrollTop() > t){
				$target.addClass('fixed');
				$addShopCarBtn.show();
			}else{
				$target.removeClass('fixed');
				$addShopCarBtn.hide();
			}
		});
	},
	adjustNavTop : function(){

		var t=$("[fn-role=middleContent]").offset().top;
		var $tz = $(".dp-tabsContent");
		var fix_bar = $(".fix-bar").height();
		if($tz.length){//判断套装节点存在情况
			t+=$tz.outerHeight(true);
		}

		$("html,body").animate({
                        scrollTop: t
                    }, 300);
	},

	init_Favourable_width : function(){
		var div_count=$(".groupsBox-max:first .groups-mainPro").length;
		var max_width=div_count*120+49*(div_count-1);
		$(".groupsBox-max").css("width",max_width);
		if(max_width<460){
			$(".groupsBox:first").css("overflow-x","hidden");
		}
		else{
			$(".groupsBox:first").css("overflow-x","scroll");
		}
	}




}


/*==
----------------------------------------------------------------------------------------------------------*/

//详情页面左侧分类收缩
$(function () {
	$(".dp-middleContentLeft").on('click','.pro-classContent .a-title i',function(){
		$(this).closest('li').toggleClass('open')
	})
});

//颜色,尺码,套餐的选择
$(function () {
	$(".pro-color").click(function(){
		var thisSelect=$(this);
		if(!thisSelect.is(".no-product-style")){
			$(".pro-color b").css("display","none");
			$(".color .no-product-style b").css("display","block");
			thisSelect.parents("div.pro-value").find(".pro-color").removeClass("selected");
			thisSelect.addClass("selected");
			$("b",thisSelect).css("display","block");
			$("#pro-select-color").text('"'+thisSelect.attr("title")+'"');
		}

	})
	$(".pro-norms").click(function(){
		var thisSelect=$(this);
		if(!thisSelect.is(".no-product-style")){
			$(".pro-norms b").css("display","none");
			thisSelect.parents("div.pro-value").find(".pro-norms").removeClass("selected");
			thisSelect.addClass("selected");
			$("b",thisSelect).css("display","block");
			$("#pro-select-norms").text('"'+thisSelect.attr("title")+'"');
		}
	})

	$(".detail-ul").off("click",".packageSelectBox").on("click",".packageSelectBox",function(){
		var thisSelect=$(this);
		$(".packageSelectBox b").css("display","none");
		thisSelect.parents("div.pro-value").find(".packageSelectBox").removeClass("selected");
		thisSelect.addClass("selected");
		$("b",thisSelect).css("display","block");

		Mall_details_page.changePackageSelectBox(thisSelect);
	})

	// //选择套餐
	// function changePackageSelectBox(thisSelect){
	// 	var num = thisSelect.find(".down").find(".ta").html(); //件数
	// 	var countPrice = thisSelect.attr("combineProductPrice"); //总价
	// 	countPrice = parseFloat(countPrice).toFixed(2);

	// 	var promotionEndDate = $("#promotionEndDate");
	// 	var day =promotionEndDate.parent().find('.info-tzjj').eq(0).find("i").eq(0).html();
	// 	var second =promotionEndDate.parent().find('.info-djs b').eq(2).html();
	// 	if(num==1){ //显示限时促销和促销信息
	// 		$(".salesInfo").show();
	// 		if(day>0){ //显示剩余天
	// 			$("#remainHour").hide();
	// 			$("#remainDay").show();
	// 		}else if(second>0){ //显示剩余时分秒
	// 			$("#remainHour").show();
	// 			$("#remainDay").hide();
	// 		}
	// 	}else{ //隐藏限时促销和促销信息
	// 		$(".salesInfo").hide();
	// 		$("#remainHour").hide();
	// 		$("#remainDay").hide();
	// 	}
	// 	$(".yellow-priceInfo").find(".li-yh").find(".info-price").html('<em>￥</em><b class="JS-control-price">'+countPrice+'</b>'); //显示套餐总价
	// }


	//优惠套餐中规格选择dialog-content
	$("body").off("click", ".dp-red-dialog .colorBox").on("click", ".dp-red-dialog .colorBox", function(){
		var thisSelect=$(this);
		if(!thisSelect.is(".no-product-style")){
			var thisSelect=$(this);
			$(".colorBox b").css("display","none");
			$(".color .no-product-style b").css("display","block");
			thisSelect.parents("div.dt").find(".colorBox").removeClass("selected");
			thisSelect.addClass("selected");
			$("b",thisSelect).css("display","block");
		}
	})
	$("body").off("click", ".dp-red-dialog .sizeBox").on("click", ".dp-red-dialog .sizeBox", function(){
		var thisSelect=$(this);
		if(!thisSelect.is(".no-product-style")){
			$(".sizeBox b").css("display","none");
			thisSelect.parents("div.dt").find(".sizeBox").removeClass("selected");
			thisSelect.addClass("selected");
			$("b",thisSelect).css("display","block");
		}
	})
});

//数量的加减
$(function () {
	$("[fn-role=middleContent]").off("click", ".btn-reduce").on("click", ".btn-reduce", function(){
		var thisBtn=$(this);
		var value=thisBtn.parents("div.wrap-input").find(".text").val();
		if(value>1){
			value--;
			if(value==1){
				thisBtn.css("color","#cccccc");
			}
		}
		if(value<20){
			thisBtn.next('a').css("color","#3c3c3c");
		}

		thisBtn.parents("div.wrap-input").find(".text").val(value);
	})
	$("[fn-role=middleContent]").off("click", ".btn-add").on("click", ".btn-add", function(){
		var thisBtn=$(this);
		var value=thisBtn.parents("div.wrap-input").find(".text").val();
		if(value<20){
			value++;
			if(value==20){
				thisBtn.css("color","#cccccc");
			}
		}
		if(value>1){
			thisBtn.prev('a').css("color","#3c3c3c");
		}
		thisBtn.parents("div.wrap-input").find(".text").val(value);
	})
});

//优惠套餐与任意搭配切换
$(function(){


	$("[fn-role=middleContent]").off('click', '.dp-pro-tabs a').on('click', '.dp-pro-tabs a', function(){

		var thisA=$(this);
		thisA.parents("div.dp-pro-tabs ul").children("li").find("a").addClass("top2").removeClass("selected");
		thisA.addClass("selected").removeClass("top2");
		var index=$(".dp-pro-tabs a").index(this);

		var div_count=$(".tabsContent:eq("+index+") .groupsBox-max:first .groups-mainPro").length;
		var max_width=div_count*120+49*(div_count-1);
		$(".tabsContent:eq("+index+") .groupsBox-max:first").css("width",max_width);
		if(max_width<460){
		$(".tabsContent:eq("+index+") .groupsBox:first").css("overflow-x","hidden");
		}
		else{
			$(".tabsContent:eq("+index+") .groupsBox:first").css("overflow-x","scroll");
		}
		$(".tabsContent").hide().eq(index).show();

	})

});



//产品详细信息tab切换
$(function(){
	$(".dp-pro-infotabs a:not(.btn-addshop)").click(function(){
		var thisA=$(this);
		// $(window).scrollTop($(document.body).outerHeight(true)-$('.proIntroContent').offset().top);
		thisA.parents("div.dp-pro-infotabs ul").children("li").find("a:not(.no-btn-addshop)").addClass("top2").removeClass("selected");
		thisA.addClass("selected").removeClass("top2");
		var index=$(".dp-pro-infotabs a").index(this);
		$(".pro-tabs-box").hide();
		$("#pro-tabs-box_"+index).show();

		Mall_details_page.adjustNavTop();

	})
});


//套餐选择tab切换
$(function(){
	$("[fn-role=middleContent]").off('click', '.yhtz-group .select-groups a').on('click','.yhtz-group .select-groups a',function(e){
		var thisA=$(this);
		thisA.parents(".select-groups").children("li").find("a").removeClass("selected");
		thisA.addClass("selected");
		var index=$(".yhtz-group .select-groups a").index(this);
		var div_count=$(".yhtz-group .tc-content:eq("+index+") .groupsBox-max .groups-mainPro").length;
		var max_width=div_count*120+49*(div_count-1);
		$(".yhtz-group .groupsBox-max:eq("+index+")").css("width",max_width);
		if(max_width<460){
		$(".yhtz-group .groupsBox:eq("+index+")").css("overflow-x","hidden");
		}
		else{
			$(".yhtz-group .groupsBox:eq("+index+")").css("overflow-x","scroll");
		}

		$(".yhtz-group .tc-content").eq(index).show().siblings(".tc-content").hide();

	})
});
//自由搭配套餐选择tab切换
$(function(){
	$("[fn-role=middleContent]").off('click', '.rydp-group .select-groups a').on('click','.rydp-group .select-groups a',function(e){
		var thisA=$(this);
		thisA.parents(".select-groups").children("li").find("a").removeClass("selected");
		thisA.addClass("selected");
		var index=$(".rydp-group .select-groups a").index(this);
		var div_count=$(".rydp-group .tc-content:eq("+index+") .groupsBox-max .groups-mainPro").length;
		var max_width=div_count*120+49*(div_count-1);
		$(".rydp-group .groupsBox-max:eq("+index+")").css("width",max_width);
		if(max_width<460){
		$(".rydp-group .groupsBox:eq("+index+")").css("overflow-x","hidden");
		}
		else{
			$(".rydp-group .groupsBox:eq("+index+")").css("overflow-x","scroll");
		}

		$(".rydp-group .tc-content").eq(index).show().siblings(".tc-content").hide();

	})
});


// 满减收缩展开效果
// $(function(){
// 	 $(".show-s-mj a").click(function(){
//      $(".show-li-mj").stop().animate({height: 'toggle', opacity: 'toggle'}, "slow");
//    });

// });

// // 领券收缩展开效果
// $(function(){
// 	 $(".show-s-lj a").click(function(){

// 	 	if($(".show-s-lj a").attr("class")){
// 	 		$(".show-s-lj a").text("收起");

// 	 	}else{
// 	 		$(".show-s-lj a").text("展开");

// 	 	}
// 	 	$(".show-s-lj a").toggleClass("a-zk");
//      $(".show-li-lj").stop().animate({height: 'toggle', opacity: 'toggle'}, "slow");
//    });

// });


// 商家信息收缩展开效果
$(function(){
	$('.dp-buinessInfo').off('click','.seller-name~i').on('click','.seller-name~i',function(e){

	 	var that=$(this),
            target=$(".show-seller-box"),
            $service=$('.shop-info .line'),
            holder=$service,
            $p=$('.shop-info').children('p');

        $service.remove();
		that.toggleClass("down");

        if(target.is(":visible")){
            /*面板显示*/
            target.hide();
            $p.after(holder);
            $service.css('border-bottom','1px dotted #ddd');
        }else{
            /*面板隐藏*/
            target.show();
            target.append(holder);
            $service.css('border','none');
        }




     	 e.stopPropagation();
   });

});











/*弹层
$(function(){

	$('.enter-Shop').click(function(){
		myPopup({
			"elem": "#dp-dialog-1",
			"close": ".dialog-TJBtn,.dp-dialog-close"
		})

	})
})*/

var CrossEffect={
    init:function(){
        this.eventBind();
    },
    //-----------------------事件绑定处理开始--------------------------
    eventBind:function(){
    	//选择商品规格
        $("[fn-role=middleContent]").off('click', '.js_chooseProducts').on('click','.js_chooseProducts',function(e){window.detail.eventCallbackList.clicChooseProduct(e);});
        //修改商品规格
        $("[fn-role=middleContent]").off('click','.js_modificateProducts').on('click','.js_modificateProducts',function(e){window.detail.eventCallbackList.clickModificateProducts(e);});
    }

}

//-------------------------事件绑定方法集合-----------------------------
window.detail = window.detail || {};
window.detail.eventCallbackList={
    clicChooseProduct:function(e){

    	var $this=$(e.currentTarget);
    	var $confirmBtn=$('.dp-red-dialog .confirmBtn');
    	var $chooseProducts=$this.parent();
    	myPopup({
			"elem": ".dp-red-dialog",
			"popHtml" : "<div class=\"dp-red-dialog\" style=\"display:none;\"><em class=\"close\"></em><div class=\"dialog-content\"><ul><li class=\"t-color\"><div class=\"dd\">颜色：</div><div class=\"dt\"><div class=\"colorBox selected\"><img data_color=\"天蓝色\"src=\"http://10.211.64.68:8080/imgweb/image/1.jpg_80x80.jpg\"alt=\"\"><b></b></div><div class=\"colorBox \"><img data_color=\"军绿色\"src=\"http://10.211.64.68:8080/imgweb/image/3.jpg_80x80.jpg\"alt=\"\"><b style=\"display:none;\"></b></div><div class=\"colorBox \"><img data_color=\"粉色\"src=\"http://10.211.64.68:8080/imgweb/image/2.jpg_80x80.jpg\"alt=\"\"><b style=\"display:none;\"></b></div></div></li><li class=\"t-size\"><div class=\"dd\">尺寸：</div><div class=\"dt\"><div data_size=\"\"class=\"sizeBox selected\"><b></b></div><div data_size=\"\"class=\"sizeBox no-product-style\"><b style=\"display:none;\"></b></div><div data_size=\"\"class=\"sizeBox no-product-style\"><b style=\"display:none;\"></b></div></div></li></ul><input type=\"button\"class=\"confirmBtn\"value=\"确认\"></div></div>",
			"confirm":".confirmBtn",
			"close": ".dp-red-dialog .confirmBtn,.dp-red-dialog .close",
			"position" : {y:$this.offset().top, x : $this.offset().left,fixed:false},
			"callback":function(e){

                alert('选择商品');

			},
			"noMask":true
		});







    },

    clickModificateProducts:function(e){
    	var $this=$(e.currentTarget);
    	var $confirmBtn=$('.dp-red-dialog .confirmBtn');
    	myPopup({
			//"elem": ".dp-red-dialog",
			"popHtml" : "<div class=\"dp-red-dialog\" style=\"display:none;\"><em class=\"close\"></em><div class=\"dialog-content\"><ul><li class=\"t-color\"><div class=\"dd\">颜色：</div><div class=\"dt\"><div class=\"colorBox selected\"><img data_color=\"天蓝色\"src=\"http://10.211.64.68:8080/imgweb/image/1.jpg_80x80.jpg\"alt=\"\"><b></b></div><div class=\"colorBox \"><img data_color=\"军绿色\"src=\"http://10.211.64.68:8080/imgweb/image/3.jpg_80x80.jpg\"alt=\"\"><b style=\"display:none;\"></b></div><div class=\"colorBox \"><img data_color=\"粉色\"src=\"http://10.211.64.68:8080/imgweb/image/2.jpg_80x80.jpg\"alt=\"\"><b style=\"display:none;\"></b></div></div></li><li class=\"t-size\"><div class=\"dd\">尺寸：</div><div class=\"dt\"><div data_size=\"\"class=\"sizeBox selected\"><b></b></div><div data_size=\"\"class=\"sizeBox no-product-style\"><b style=\"display:none;\"></b></div><div data_size=\"\"class=\"sizeBox no-product-style\"><b style=\"display:none;\"></b></div></div></li></ul><input type=\"button\"class=\"confirmBtn\"value=\"确认\"></div></div>",
			"confirm":".confirmBtn",
			"close": ".dp-red-dialog .confirmBtn,.dp-red-dialog .close",
			"callback":function(e){

				var $valueColor=$('.t-color .selected img',this).attr("data_color");

                 var $valueSize=$('.t-size .selected',this).attr("data_size");

                 	var sHTml=$('<div class="select-format">已选择：'
                    	+$valueColor+
                        	'、'
                        +$valueSize+
                        '<a class="js_modificateProducts">修改</a></div>');
                $chooseProducts.replaceWith(sHTml);

			}


		});



    }
}

$(function(){
	CrossEffect.init();
})


$(function(){

	$('.detail-ul-saleinfo').off('click','.zk').on('click','.zk',function(e){
		var tar = $(this),
			parents = tar.parents('.TextLengthSty'),
			hidebox = parents.next();
			if(hidebox.attr("data-obj")){
				i = tar.find('i');
				i.toggleClass('Rotate');
				hidebox.toggle();

				 if(tar.text() == '展开查看'){tar.html('收起<i class="Rotate"></i>');}else{tar.html('展开查看<i class=""></i>');}

			}

	})

})

$(window).scroll(function(event){
	// 返回顶部
	var top = $(window).scrollTop();
	if(top!= 0){
		$('.J_goTop').addClass('topNav-show');

	}else{
		$('.J_goTop').removeClass('topNav-show');
	}
	// 返回顶部
});

$('.J_topBtn').on('click',function(){
	$(window).scrollTop(0);
	return false;
});

$('[fnp="toggle-switch"]').each(function(){
		var $tar = $(this),
			$btn = $tar.find('[data-role="switch"]'),
			$panel = $tar.find('[data-role="panel"]');

		$btn.on('click',function(){
			$tar.toggleClass('detail-content-hide');
		});


});

