(function() {
    if (/\.swf$/.test(ad.toLowerCase())) {	
    	(function(flash_ad, flash_a, flash_w, flash_h, flash_isActive){
    		var id = "flash_click_" + Math.ceil(Math.random() * 1000000);
			var fvars = "";
			if(flash_isActive){		
				flash_a = encodeURIComponent(flash_a);
				fvars = 'clickTag=' + flash_a ;
			}
    		var flash_nad = '<embed  width="'+flash_w+'px" height="'+flash_h+'px" wmode="opaque" src="'+flash_ad+'" allowScriptAccess="always" flashvars="' + fvars + '" type="application/x-shockwave-flash"></embed>';
    		if (/msie/.test(navigator.userAgent.toLowerCase())) {
    		    flash_nad = '<object  width="'+flash_w+'px" height="'+flash_h+'px" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
    		        +'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" id="flash_swf_'+id+'">'
    		        +'<param name="wmode" value="opaque"/><param name="allowScriptAccess" value="always"><param name="movie" value="'+flash_ad+'"><param name="flashvars" value="' + fvars + '">'+flash_nad+'</object>';
    		}
    		document.write('<div style="clear: both; margin: 0 auto; width:'+flash_w+'px;height:'+flash_h+'px;" id="flash_outer_2_'+id+'">'
    		    +'<div style="width:'+flash_w+'px;height:'+flash_h+'px;position:relative;" id="flash_outer_1_'+id+'">'
				+'<a href="javascript:void(0)" style="width: 35px;height: 15px;overflow: hidden;position: absolute;left: 0;bottom: 0;z-index: 10;background: url(http://y2.ifengimg.com/ifengimcp/pic/20150902/3677f2773fd79f12b079_size1_w35_h15.png) no-repeat;"></a>'
				+flash_nad);
    		if(!flash_isActive) {
    			document.write('<div style="width:' + flash_w +'px;position:absolute; top:0px; left:0px;z-index:3;">'
    			    +'<a href="'+flash_a+'" target="_blank"><img style="width:'+flash_w+'px;height:'+flash_h+'px;border:0px" '
    			    +'src="http://c1.ifengimg.com/mappa1x1/2017/07/27/1x1.gif"></a></div>');
    		}
    		document.write('</div></div><div class="clear"></div>');
    	})(ad, a, w, h, isActive);
    }else{
    	(function(img_ad, img_a, img_w, img_h){
    		document.write('<div style="clear:both;position:relative;margin:0 auto;width:' + img_w + 'px;height:' + img_h+ 'px;"><a href="javascript:void(0)" style="width: 35px;height: 15px;overflow: hidden;position: absolute;left: 0;bottom: 0;z-index: 10;background: url(http://y2.ifengimg.com/ifengimcp/pic/20150902/3677f2773fd79f12b079_size1_w35_h15.png) no-repeat;"></a><a target="_blank" href="' + img_a + '"><img src="' + img_ad + '" style="width:' + img_w + 'px;height:' + img_h+ 'px;border:none;"/></a></div>');
    	})(ad, a, w, h);
    }
})();