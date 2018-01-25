<!DOCTYPE HTML>
<html xmlns:wb="http://open.weibo.com/wb"><!-- end #header -->
    <div id="container">
                	<div class="sidebar">
            	<a class="btn_create" href="create.html">发布新职位</a>
                <dl class="company_center_aside">
		<dt>我收到的简历</dt>
 
    					<dd>
    						<a href="?r=company/caninter">待定简历</a>
    					</dd>
    					<dd>
    						<a href="?r=company/caninterone">已通知面试简历</a>
    					</dd>
    					<dd>
    						<a href="?r=company/canintertwo">不合适简历</a>
    					</dd>
</dl>
<dl class="company_center_aside">
		<dt>我发布的职位</dt>
			<dd class="current">
		<a href="?r=company/positions">有效职位</a>
	</dd>
	<dd>
		<a href="?r=company/positionstwo">已下线职位</a>
	</dd>
	<dd>
		<a href="?r=company/positionsthree">我发布过的职位</a>
	</dd>
	</dl>
            </div><!-- end .sidebar -->
            <div class="content">
            	<dl class="company_center_content">
                    <dt>
                        <h1>
                            <em></em>
                           有效职位 <span><i style="color:#fff;font-style:normal" id="positionNumber"></i></span>                        </h1>
                    </dt>
                    <dd>
                  <form id="searchForm">
	                <input type="hidden" value="Publish" name="type">
			                	<ul class="reset my_jobs">
			                	<?php foreach($job as $key =>$val) {?>
				                		<li class='li<?=$val['id']?>' data-id="<?=$val['id']?>">
		                                    <h3>
		                                        <a target="_blank" title="<?=$val['post']?>" href="http://www.lagou.com/jobs/149594.html"><?=$val['post']?></a> 
		                                        <span><?=$val['site']?></span>	    </h3>		                            <!-- <span class="receivedResumeNo"><a href="unHandleResumes.html?positionId=149594">应聘简历（1）</a></span> -->                            	<div><?=$val['work_nature']?> / <?=$val['money']?> / <?=$val['year']?> / <?=$val['study']?></div>                                 		                                    	<div class="c9">发布时间： <?=$val['releases']?></div>                                 		                                    		                        <div class="links">		                                    			                        	<a class="job_refresh" href="javascript:void(0)">刷新<span>每个职位7天内只能刷新一次</span></a>		                                       			                                       	<a target="_blank" class="job_edit" href="create.html?positionId=149594">编辑</a>
		                                       	<a name='status' where='<?=$val["id"]?>' status='1' href="javascript:void(0)">下线</a>         
		                                        <a name='del' where='<?=$val["id"]?>' href="javascript:void(0)">删除</a>
		                                    </div>		                                    		          </li>
		                                    <?php }?>
	                                	                           	</ul>
			                    			                </form>
		                                    </dd>
                </dl>
            </div><!-- end .content -->
            <script>
            	$("a[name='status']").click(function(){
            		var id =$(this).attr('where');
            		var status=$(this).attr('status')
            		$.ajax({
            			url:"?r=company/updastatus",
            			data:{id:id,status:status},
                        type:'post',
                        success:function(e){
                        	if(e==1){
                            $(".li"+id).remove();
                           }else{
                           	alert('出错了哎')
                           }

                        }
            		})
            	})
            	$("a[name='del']").click(function(){
            		var id =$(this).attr('where');
            		$.ajax({
            			url:"?r=company/delstatus",
            			data:{id:id},
                        type:'post',
                        success:function(e){
                            if(e==1){
                            $(".li"+id).remove();
                           }else{
                           	alert('出错了哎')
                           }

                        }
            		})
            	})

            </script>
<script src="style/js/job_list.min.js" type="text/javascript"></script> 
			<div class="clear"></div>
			<input type="hidden" value="74fb1ce14ebf4e2495270b0fbad64704" id="resubmitToken">
	    	<a rel="nofollow" title="回到顶部" id="backtop"></a>
	    </div><!-- end #container -->
	</div><!-- end #body -->
	<div id="footer">
		<div class="wrapper">
			<a rel="nofollow" target="_blank" href="about.html">联系我们</a>
		    <a target="_blank" href="http://www.lagou.com/af/zhaopin.html">互联网公司导航</a>
		    <a rel="nofollow" target="_blank" href="http://e.weibo.com/lagou720">拉勾微博</a>
		    <a rel="nofollow" href="javascript:void(0)" class="footer_qr">拉勾微信<i></i></a>
			<div class="copyright">&copy;2013-2014 Lagou <a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action" target="_blank">京ICP备14023790号-2</a></div>
		</div>
	</div>

<script src="style/js/core.min.js" type="text/javascript"></script>
<script src="style/js/popup.min.js" type="text/javascript"></script>
<script src="style/js/tongji.js" type="text/javascript"></script>
<!--  -->
<script src="style/js/analytics01.js" type="text/javascript"></script><script type="text/javascript" src="style/js/h.js"></script>
<script type="text/javascript">
$(function(){
	$('#noticeDot-1').hide();
	$('#noticeTip a.closeNT').click(function(){
		$(this).parent().hide();
	});
});
var index = Math.floor(Math.random() * 2);
var ipArray = new Array('42.62.79.226','42.62.79.227');
var url = "ws://" + ipArray[index] + ":18080/wsServlet?code=314873";
var CallCenter = {
		init:function(url){
			var _websocket = new WebSocket(url);
			_websocket.onopen = function(evt) {
				console.log("Connected to WebSocket server.");
			};
			_websocket.onclose = function(evt) {
				console.log("Disconnected");
			};
			_websocket.onmessage = function(evt) {
				//alert(evt.data);
				var notice = jQuery.parseJSON(evt.data);
				if(notice.status[0] == 0){
					$('#noticeDot-0').hide();
					$('#noticeTip').hide();
					$('#noticeNo').text('').show().parent('a').attr('href',ctx+'/mycenter/delivery.html');
					$('#noticeNoPage').text('').show().parent('a').attr('href',ctx+'/mycenter/delivery.html');
				}else{
					$('#noticeDot-0').show();
					$('#noticeTip strong').text(notice.status[0]);
					$('#noticeTip').show();
					$('#noticeNo').text('('+notice.status[0]+')').show().parent('a').attr('href',ctx+'/mycenter/delivery.html');
					$('#noticeNoPage').text(' ('+notice.status[0]+')').show().parent('a').attr('href',ctx+'/mycenter/delivery.html');
				}
				$('#noticeDot-1').hide();
			};
			_websocket.onerror = function(evt) {
				console.log('Error occured: ' + evt);
			};
		}
};
CallCenter.init(url);
</script>

<div id="cboxOverlay" style="display: none;"></div><div id="colorbox" class="" role="dialog" tabindex="-1" style="display: none;"><div id="cboxWrapper"><div><div id="cboxTopLeft" style="float: left;"></div><div id="cboxTopCenter" style="float: left;"></div><div id="cboxTopRight" style="float: left;"></div></div><div style="clear: left;"><div id="cboxMiddleLeft" style="float: left;"></div><div id="cboxContent" style="float: left;"><div id="cboxTitle" style="float: left;"></div><div id="cboxCurrent" style="float: left;"></div><button type="button" id="cboxPrevious"></button><button type="button" id="cboxNext"></button><button id="cboxSlideshow"></button><div id="cboxLoadingOverlay" style="float: left;"></div><div id="cboxLoadingGraphic" style="float: left;"></div></div><div id="cboxMiddleRight" style="float: left;"></div></div><div style="clear: left;"><div id="cboxBottomLeft" style="float: left;"></div><div id="cboxBottomCenter" style="float: left;"></div><div id="cboxBottomRight" style="float: left;"></div></div></div><div style="position: absolute; width: 9999px; visibility: hidden; display: none;"></div></div></body></html>