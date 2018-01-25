<?php
   use yii\helpers\Html;
   use yii\widgets\LinkPager;
?>

		<div id="container">
			
			<div class="sidebar">
				<div id="options" class="greybg">
					<dl >
						<dt>月薪范围 <em ></em></dt>
						<dd >
							<div>2k以下</div>
							<div>2k-5k</div>
							<div>5k-10k</div>
							<div>10k-15k</div>
							<div>15k-25k</div>
							<div>25k-50k</div>
							<div>50k以上</div>
						</dd> 
					</dl>
					<dl >
						<dt>工作经验 <em ></em></dt>
						<dd >
							<div>不限</div>
							<div>应届毕业生</div>
							<div>1年以下</div>
							<div>1-3年</div>
							<div>3-5年</div>
							<div>5-10年</div>
							<div>10年以上</div>
						</dd> 
					</dl>
					<dl >
						<dt>最低学历 <em ></em></dt>
						<dd >
							<div>不限</div>
							<div>大专</div>
							<div>本科</div>
							<div>硕士</div>
							<div>博士</div>
						</dd> 
					</dl>
					<dl >
						<dt>工作性质 <em ></em></dt>
						<dd >
							<div>全职</div>
							<div>兼职</div>
							<div>实习</div>
						</dd> 
					</dl>
					<dl >
						<dt>发布时间 <em ></em></dt>
						<dd >
							<div>今天</div>
							<div>3天内</div>
							<div>一周内</div>
							<div>一月内</div>
						</dd> 
					</dl>
				</div>
				
				<!-- QQ群 -->
				<div class="qq_group">
					加入<span>前端</span>QQ群
					<div class="f18">跟同行聊聊</div>
					<p>160541839</p>
				</div>
				
				<!-- 对外合作广告位  -->
				<a href="http://www.w3cplus.com/" target="_blank" class="partnersAd">
					<img src="style/images/w3cplus.png" width="230" height="80" alt="w3cplus" />
				</a>
				<a href="" target="_blank" class="partnersAd">
					<img src="style/images/jquery_school.jpg" width="230" height="80" alt="JQ学校" />
				</a>
				<a href="http://linux.cn/" target="_blank" class="partnersAd">
					<img src="style/images/linuxcn.png" width="230" height="80" alt="Linux中文社区"  />
				</a>
				<a href="http://zt.zhubajie.com/zt/makesite? utm_source=lagou.com&utm_medium=referral&utm_campaign=BD-yl" target="_blank" class="partnersAd">
					<img src="style/images/zhubajie.jpg" width="230" height="80" alt="猪八戒" />
				</a>
				<a href="http://www.imooc.com" target="_blank" class="partnersAd">
					<img src="style/images/muke.jpg" width="230" height="80" alt="幕课网" />
				</a>
	        	       	<!-- 	            <a href="http://www.osforce.cn/" target="_blank" class="partnersAd">
	            	<img src="style/images/osf-lg.jpg" width="230" height="80" alt="开源力量"  />
	            </a>
	        -->
	    </div>
	    
	   <div class="content">
	    	<div id="search_box">
	    		<form id="searchForm" name="searchForm" action="?r=index/search" method="get">
	    			<ul id="searchType">
	    				<li data-searchtype="1" class="type_selected">职位</li>
	    				<li data-searchtype="4">公司</li>
	    			</ul>
	    			<div class="searchtype_arrow"></div>
	    			<input type="text" id="search_input" name = "keyword"  tabindex="1" value="<?=$keyword?>"  placeholder="请输入职位名称，如：产品经理"  />
	    			<input type="hidden" name="spc" id="spcInput" value="1"/>	    			
	    			<input type="hidden" name="city" id="cityInput" value=""/>
	    			<input type="button" id="search_button" value="搜索" />
	    		</form>
	    	</div>
	    	<script>
					$(function(){
						$('#search_button').click(function(){
							var a = $("#search_input").val();
							var c = $("#cityInput").val();
							window.location.href = "?r=index/search&keyword=" + a+"&city="+c;
							 // $(this).attr("action", "?r=index/search&keyword=" + a);
						})
					});
			</script>
		<style>
			.ui-autocomplete{width:488px;background:#fafafa !important;position: relative;z-index:10;border: 2px solid #91cebe;}
			.ui-autocomplete-category{font-size:16px;color:#999;width:50px;position: absolute;z-index:11; right: 0px;/*top: 6px; */text-align:center;border-top: 1px dashed #e5e5e5;padding:5px 0;}
			.ui-menu-item{ *width:439px;vertical-align: middle;position: relative;margin: 0px;margin-right: 50px !important;background:#fff;border-right: 1px dashed #ededed;}
			.ui-menu-item a{display:block;overflow:hidden;}
		</style>
		<!-- <script type="text/javascript" src="style/js/search.min.js"></script> -->
	    	<dl class="hotSearch">
	    		<dt>热门搜索：</dt>
	    		<dd><a href="list.htmlJava?labelWords=label&city=全国">Java</a></dd>
	    		<dd><a href="list.htmlPHP?labelWords=label&city=全国">PHP</a></dd>
	    		<dd><a href="list.htmlAndroid?labelWords=label&city=全国">Android</a></dd>
	    		<dd><a href="list.htmliOS?labelWords=label&city=全国">iOS</a></dd>
	    		<dd><a href="list.html前端?labelWords=label&city=全国">前端</a></dd>
	    		<dd><a href="list.html产品经理?labelWords=label&city=全国">产品经理</a></dd>
	    		<dd><a href="list.htmlUI?labelWords=label&city=全国">UI</a></dd>
	    		<dd><a href="list.html运营?labelWords=label&city=全国">运营</a></dd>
	    		<dd><a href="list.htmlBD?labelWords=label&city=全国">BD</a></dd>
	    		<dd><a href="list.html?gx=实习&city=全国">实习</a></dd>
	    	</dl>			<div class="breakline"></div>
	    	<dl class="workplace" id="workplaceSelect">
	    		<dt class="fl">工作地点：</dt>
	    		<dd >
	    			<a href="javascript:;" class="current">全国</a> 
	    			|
	    		</dd>
	    		<dd >
	    			<a href="javascript:;" >北京</a> 
	    			|
	    		</dd>
	    		<dd >
	    			<a href="javascript:;" >上海</a> 
	    			|
	    		</dd>
	    		<dd >
	    			<a href="javascript:;" >广州</a> 
	    			|
	    		</dd>
	    		<dd >
	    			<a href="javascript:;" >深圳</a> 
	    			|
	    		</dd>
	    		<dd >
	    			<a href="javascript:;" >成都</a> 
	    			|
	    		</dd>
	    		<dd >
	    			<a href="javascript:;" >杭州</a> 
	    			|
	    		</dd>
	    		<dd >
	    			<a href="javascript:;" >武汉</a> 
	    			|
	    		</dd>
	    		<dd >
	    			<a href="javascript:;" >南京</a> 
	    			|
	    		</dd>
	    		<dd  class="more" >
	    			<a href="javascript:;" >其他</a> 
	    			<div class="triangle citymore_arrow"></div>
	    		</dd>
	    		<dd id="box_expectCity" class="searchlist_expectCity dn">
	    			<span class="bot"></span>
	    			<span class="top"></span>
	    			<dl>
	    				<dt>ABCDEF</dt>
	    				<dd>
	    					<span>北京</span>
	    					<span>长春</span>
	    					<span>成都</span>
	    					<span>重庆</span>
	    					<span>长沙</span>
	    					<span>常州</span>
	    					<span>东莞</span>
	    					<span>大连</span>
	    					<span>佛山</span>
	    					<span>福州</span>
	    				</dd>
	    			</dl>
	    			<dl>
	    				<dt>GHIJ</dt>
	    				<dd>
	    					<span>贵阳</span>
	    					<span>广州</span>
	    					<span>哈尔滨</span>
	    					<span>合肥</span>
	    					<span>海口</span>
	    					<span>杭州</span>
	    					<span>惠州</span>
	    					<span>金华</span>
	    					<span>济南</span>
	    					<span>嘉兴</span>
	    				</dd>
	    			</dl>
	    			<dl>
	    				<dt>KLMN</dt>
	    				<dd>
	    					<span>昆明</span>
	    					<span>廊坊</span>
	    					<span>宁波</span>
	    					<span>南昌</span>
	    					<span>南京</span>
	    					<span>南宁</span>
	    					<span>南通</span>
	    				</dd>
	    			</dl>
	    			<dl>
	    				<dt>OPQR</dt>
	    				<dd>
	    					<span>青岛</span>
	    					<span>泉州</span>
	    				</dd>
	    			</dl>
	    			<dl>
	    				<dt>STUV</dt>
	    				<dd>
	    					<span>上海</span>
	    					<span>石家庄</span>
	    					<span>绍兴</span>
	    					<span>沈阳</span>
	    					<span>深圳</span>
	    					<span>苏州</span>
	    					<span>天津</span>
	    					<span>太原</span>
	    					<span>台州</span>
	    				</dd>
	    			</dl>
	    			<dl>
	    				<dt>WXYZ</dt>
	    				<dd>
	    					<span>武汉</span>
	    					<span>无锡</span>
	    					<span>温州</span>
	    					<span>西安</span>
	    					<span>厦门</span>
	    					<span>烟台</span>
	    					<span>珠海</span>
	    					<span>中山</span>
	    					<span>郑州</span>
	    				</dd>
	    			</dl>
	    		</dd>  
	    	</dl>
	    	
	    	<div id="tip_didi" class="dn">
	    		<span>亲，“嘀嘀打车”已更名为“滴滴打车”了哦，我们已帮您自动跳转~</span>
	    		<a href="javascript:;">我知道了</a>
	    	</div>
	    	
	    	<ul class="hot_pos reset">
	    	<?php if(!empty($list)):?>

	    	<?php foreach($list as $v){?>
	    		<li class="odd clearfix">
	    			<div class="hot_pos_l">
	    				<div class="mb10">
	    					<a href="?r=index/look&id=<?=$v['id']?>" title="前端开发" target="_blank"><?=$v['post']?></a> 
	    					&nbsp;
	    					<span class="c9"><?=$v['site']?></span>
	    				</div>
	    				<span><em class="c7">月薪：</em><?=$v['money']?></span>
	    				<span><em class="c7">经验：</em> <?=$v['year']?></span>
	    				<span><em class="c7">最低学历： </em><?=$v['study']?></span>
	    				<br />
	    				<span><em class="c7">职位诱惑：</em><?=$v['develop']?></span>
	    				<br />
	    				<span>1天前发布</span>
	    			</div> 
	    			<div class="hot_pos_r">
	    				<div class="apply">
	    					<a href="?r=index/look&id=<?=$v['id']?>" target="_blank">投个简历</a>
	    				</div>
	    				<div class="mb10"><a href="h/c/1712.html" title="紫色医疗" target="_blank"><?=$v['firm']?></a></div>
	    				<span><em class="c7">领域： </em><?=$v['genre']?></span>
	    				<span><em class="c7">创始人：</em> <?=$v['ceo']?></span>
	    				<br />
	    				<span><em class="c7">阶段： </em><?=$v['stage']?></span>
	    				<span><em class="c7">规模： </em><?=$v['scale']?></span>
	    				<ul class="companyTags reset">
	    					<li><?=$v['favorable1']?></li>
							<li><?=$v['favorable2']?></li>
							<li><?=$v['favorable3']?></li>
	    				</ul>
	    			</div>
	    		</li>	
	    		<?php } ?>
	    		<?php else:?>
	    		<li>对不起，目前还没有这个职位</li> 
	    		<?php endif; ?>   		
	    	</ul>
	    	<div class="Pagination"><?= LinkPager::widget(['pagination'=>$pages]) ?></div>
           
	    </div>	

	    <script>
	    	$(function(){
	/***************************
 	 * 分页
 	 */
 	 // $('.Pagination').pager({
 	 // 	currPage: 1,
 	 // 	pageNOName: "pn",
 	 // 	form: "searchForm",
 	 // 	pageCount: 30,
 	 // 	pageSize:  5 
 	 // });
 	 
 	 $(".workplace dd").not('.more').children('a').click(function(){
 	 	$('#lc').val(1);
 	 	editForm("cityInput" , $(this).html());
 	 });
 	 
 	 $("#box_expectCity dd span").click(function(){
 	 	$('#lc').val(1);
 	 	editForm("cityInput" , $(this).html());
 	 });
 	 
 	 $('#options dd div').click(function(){
 	 	var firstName = $(this).parents('dl').children('dt').text();
 	 	var fn = $.trim(firstName);
 	 	if (fn=="月薪范围"){
 	 		editForm("yxInput" , $(this).html());
 	 	}
 	 	else if(fn=="工作经验"){
 	 		editForm("gjInput" , $(this).html());
 	 	}
 	 	else if(fn=="最低学历"){
 	 		editForm("xlInput" , $(this).html());
 	 	}
 	 	else if(fn=="工作性质"){
 	 		editForm("gxInput" , $(this).html());
 	 	}
 	 	else if(fn=="发布时间"){
 	 		editForm("stInput" , $(this).html());
 	 	}
 	 });
 	 
 	 $('#selected ul').delegate('li span.select_remove','click',function(event){
 	 	var firstName = $(this).parent('li').find('strong').text();
 	 	var fn = $.trim(firstName);
 	 	if (fn=="月薪范围")
 	 		editForm("yxInput" , "");
 	 	else if(fn=="工作经验")
 	 		editForm("gjInput" , "");
 	 	else if(fn=="最低学历")
 	 		editForm("xlInput" , "");
 	 	else if(fn=="工作性质")
 	 		editForm("gxInput" , "");
 	 	else if(fn=="发布时间")
 	 		editForm("stInput" , "");
 	 });
 	 
 	 // /* search结果飘绿	*/
 	 // (function($) {
 	 // 	var searchVal = $('#search_input').val();
 	 // 	var reg = /\s/g;     
 	 // 	searchVal = searchVal.replace(reg, "").split(""); 
 	 	
 	 // 	var resultL = '';
 	 // 	var resultR = '';
 	 // 	$('.hot_pos li').each(function(){
 	 // 		resultL = $('.hot_pos_l a',this).text().split("");
 	 // 		$.each(resultL,function(i,v){
 	 // 			if($.inArray(v.toLowerCase(),searchVal) != -1 || $.inArray(v.toUpperCase(),searchVal) != -1){
 	 // 				resultL[i] = '<span>'+ v +'</span>';
 	 // 			}
 	 // 		});
 	 // 		$('.hot_pos_l a',this).html(resultL.join(''));
 	 		
 	 // 		resultR = $('.hot_pos_r .mb10 a',this).text().split("");
 	 // 		$.each(resultR,function(i,v){
 	 // 			if($.inArray(v.toLowerCase(),searchVal) != -1 || $.inArray(v.toUpperCase(),searchVal) != -1){
 	 // 				resultR[i] = '<span>'+ v +'</span>';
 	 // 			}
 	 // 		});
 	 // 		$('.hot_pos_r .mb10 a',this).html(resultR.join(''));
 	 // 	});
 	 	
 	 // })(jQuery);
 	 
	//didi tip
	if($.cookie('didiTip') != 1 && false){
		$('#tip_didi').show();
	}
	$('#tip_didi a').click(function(){
		$(this).parent().remove();
		$.cookie('didiTip',1,{ expires: 30, path: '/'});
	});
	
});

	    	function editForm(inputId,inputValue){
	    		$("#"+inputId).val(inputValue);
	    		var keyword = $.trim($('#search_input').val());
	    		var reg =  /[`~!@\$%\^\&\*\(\)_<>\?:"\{\},\\\/;'\[\]]/ig;
	    		var re = /#/g;
	    		var r = /\./g;
	    		var kw = keyword.replace(reg," ");
                var a = $("#search_input").val();
				var c = $("#cityInput").val();
	    		if(kw == ''){
	    			$('#searchForm').attr('action','22').submit();	
	    		}else{
	    			kw = kw.replace(re,'井');
	    			kw = kw.replace(r,'。');
	    			window.location.href = "?r=index/search&keyword=" + kw+"&city="+c;
	    		}
	// $("#searchForm").submit();
}
</script>

<div class="clear"></div>
<input type="hidden" id="resubmitToken" value="" />
<a id="backtop" title="回到顶部" rel="nofollow"></a>
</div><!-- end #container -->
</div><!-- end #body -->
<div id="footer">
	<div class="wrapper">
		<a href="h/about.html" target="_blank" rel="nofollow">联系我们</a>
		<a href="h/af/zhaopin.html" target="_blank">互联网公司导航</a>
		<a href="http://e.weibo.com/lagou720" target="_blank" rel="nofollow">拉勾微博</a>
		<a class="footer_qr" href="javascript:void(0)" rel="nofollow">拉勾微信<i></i></a>
		<div class="copyright">&copy;2013-2014 Lagou <a target="_blank" href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action">京ICP备14023790号-2</a></div>
	</div>
</div>

<script type="text/javascript" src="style/js/core.min.js"></script>
<script type="text/javascript" src="style/js/popup.min.js"></script>

<!--  -->

