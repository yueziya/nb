(function(_iframe, _pudi, _a, _w, _h,e_iframe,e_pudi, _isActive,delay,click_imp_arr){		
	function _MaterialsLoad(_s,_w,_h,_a,_eps,_isActive){
		if(undefined != typeof(_eps) && _eps !="" && _eps != null){
			var materials_img = document.createElement('img');
			materials_img.src = _eps;
			materials_img.style.width = "1px";
			materials_img.style.height = "1px";
			ifaDiv.appendChild(materials_img);
		}
			
		if (/\.swf$/.test(_s.toLowerCase())) {	
				var id = "flash_click_" + Math.ceil(Math.random() * 1000000);
				var fvars = "";
				if(_isActive){		
					flash_a = encodeURIComponent(_a);
					fvars = 'clickTag=' + flash_a ;
				}
				var flash_nad = '<embed  width="'+_w+'px" height="'+_h+'px" wmode="opaque" src="'+_s+'" allowScriptAccess="always" flashvars="' + fvars + '" type="application/x-shockwave-flash"></embed>';
				if (/msie/.test(navigator.userAgent.toLowerCase())) {
					flash_nad = '<object  width="'+_w+'px" height="'+_h+'px" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
						+'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" id="flash_swf_'+id+'">'
						+'<param name="wmode" value="opaque"/><param name="allowScriptAccess" value="always"><param name="movie" value="'+_s+'"><param name="flashvars" value="' + fvars + '">'+flash_nad+'</object>';
				}
				
				ifaDiv.innerHTML+=('<div style="clear: both; margin: 0 auto; width:'+_w+'px;height:'+_h+'px;" id="flash_outer_2_'+id+'">'
					+'<div style="width:'+_w+'px;height:'+_h+'px;position:relative;" id="flash_outer_1_'+id+'"><a style="width: 35px;height: 15px;overflow: hidden;position: absolute;left: 0;bottom: 0;z-index: 10;background: url(http://y2.ifengimg.com/ifengimcp/pic/20150902/3677f2773fd79f12b079_size1_w35_h15.png) no-repeat;"></a>'+flash_nad);
				if(!_isActive) {
					ifaDiv.innerHTML+=('<div style="width:' + _w +'px;position:absolute; top:0px; left:0px;z-index:3;">'
						+'<a href="'+_a+'" target="_blank"><img style="width:'+_w+'px;height:'+_h+'px;border:0px" '
						+'src="http://y0.ifengimg.com/34c4a1d78882290c/2012/0528/1x1.gif"></a></div>');
				}
				ifaDiv.innerHTML+=('</div></div><div class="clear"></div>');
		}else{
				ifaDiv.innerHTML='<a style="width: 35px;height: 15px;overflow: hidden;position: absolute;left: 0;bottom: 0;z-index: 10;background: url(http://y2.ifengimg.com/ifengimcp/pic/20150902/3677f2773fd79f12b079_size1_w35_h15.png) no-repeat;"></a><a target="_blank" href="' + _a + '"><img src="' + _s + '" style="width:' + _w + 'px;height:' + _h+ 'px;border:none;"/></a>';
		}

	}
	
	var div_name = "ifaDiv"+Math.ceil(Math.random() * 1000000);
	document.write('<div id="'+div_name+'" style="width:'+ _w +'px; height:'+ _h +'px"></div>');
	var ifaDiv = document.getElementById(div_name);
	ifaDiv.style.position = "relative";
	var adImg = document.createElement('a');
	adImg.style.cssText = 'width: 35px;height: 15px;overflow: hidden;position: absolute;left: 0;bottom: 0;z-index: 10;background: url(http://y2.ifengimg.com/ifengimcp/pic/20150902/3677f2773fd79f12b079_size1_w35_h15.png) no-repeat;'	
	var timeOutHaddler = null;
	var iframe = document.createElement('iframe');
	iframe.src = _iframe;
	iframe.width = _w;
	iframe.height = 0;
	iframe.frameBorder = 0;
	iframe.scrolling = "no";
	iframe.onload = iframe.onreadystatechange = function(){
		Iframeload();
	}
	ifaDiv.appendChild(iframe);
	ifaDiv.appendChild(adImg);
	delay = isNaN(parseInt(delay)) ? 3 : parseInt(delay);

	timeOutHaddler = setTimeout(function(){
			_MaterialsLoad(_pudi,_w,_h,_a,e_pudi,_isActive);
		}, delay * 1000);


	function impHandel(imp){
		var impressionSource = document.createElement('div');
		impressionSource.style.display = "none";
		impressionSource.innerHTML = "<img src='" + imp + "' style='width:1px;height:1px;border:none;' />";
		document.body.insertBefore(impressionSource , document.body.childNodes[0]);
	}

	if("undefined" != typeof imp_arr && imp_arr != ''){
		for(var j = 0;j < imp_arr.length; j++){
			impHandel(imp_arr[j]);
		}
	}

	function Iframeload() 
	{ 
		if (!iframe.readyState || iframe.readyState == "complete") {
			clearTimeout(timeOutHaddler);
			timeOutHaddler = null;
			iframe.height = _h;
			if(undefined != typeof(e_iframe) && e_iframe !="" && e_iframe != null){
				var iframe_img = document.createElement('img');
				iframe_img.src = e_iframe;
				iframe_img.style.width = "1px";
				iframe_img.style.height = "1px";
				ifaDiv.appendChild(iframe_img);
			}
		}
	}
})(ad_iframe, ad_pudi,a_pudi, w_pudi, h_pudi,eps_iframe,eps_pudi, isActive , third_safemode_delayTime,click_imp_arr);