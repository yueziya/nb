define("header",["F","public_login"],function(e){var t=window,n={maxWidth:100,myUrl:"http://my.ifeng.com/?_c=index&_a=my",exitUrl:"http://my.ifeng.com/?_c=index&_a=logout&backurl="+t.location.href},r={init:function(){this.more=e.query("#f-more")[0],this.moreBox=e.query("#f-more-box")[0],this.loginNone=e.query("#f-login-none")[0],this.loginDetail=e.query("#f-login-detail")[0],t.REG_LOGIN_CALLBACK(1,r.loginCallback),t.IS_LOGIN()&&t.GLOBAL_LOGIN&&t.GLOBAL_LOGIN(),this.initFixBrowser(),this.bindEvent()},bindEvent:function(){e.on(e.query("#f-header")[0],"click",function(e){var n=e.target||t.event.srcElement,r=n.getAttribute("data-role");switch(r){case"f-login":t.GLOBAL_LOGIN&&t.GLOBAL_LOGIN();break;default:}}),e.on(this.more,"mouseenter",function(){r.disMoreBox("block")}),e.on(this.more,"mouseleave",function(){r.disMoreBox("none")})},disMoreBox:function(e){this.moreBox.style.display=e,this.ifr&&(this.ifr.style.height=this.moreBox.offsetHeight+"px")},getIfr:function(e){return'<iframe src="about:blank" frameborder="0" width="'+e+'" height="0"></iframe>'},initFixBrowser:function(){/msie/g.test(t.navigator.userAgent.toLocaleLowerCase())&&(e.append(this.moreBox,this.getIfr(48)),this.ifr=e.query("iframe",this.moreBox)[0])},loginCallback:function(t){var i="string"==typeof t?t:t.uname;r.loginDetail.innerHTML='<span class="cRed"><span class="user"><a href="'+n.myUrl+'" target="_blank">'+i+'</a></span><span><a href="'+n.myUrl+'" target="_blank">...</a></span></span><a data-role="f-login-out" href="'+n.exitUrl+'" class="cGray">退出</a>',r.loginDetail.style.display="inline",r.loginNone.style.display="none";var s=e.query(".user",this.loginDetail)[0],o=s.offsetWidth>n.maxWidth?n.maxWidth:n.maxWidth+20;s.style.width=o+"px"}};return r.options=n,r}),define("search",["F","keywords"],function(e){var t=window,n=document,r={id:null,defType:0,types:[{text:"站内",name:"q",subUrl:"http://search.ifeng.com/sofeng/search.action",placeHolder:"",isShowTips:!1,tips:null,extData:{c:1}},{text:"站外",name:"q",subUrl:"http://sou.ifeng.com/bsearch/bsearch.do",placeHolder:"",isShowTips:!1,tips:null,extData:null},{text:"证券",name:"keyword",subUrl:"http://app.finance.ifeng.com/hq/search.php",placeHolder:"上证指数",isShowTips:!0,tips:{url:"http://app.finance.ifeng.com/hq/suggest_v2.php",ui:function(e,t,n,r){function s(e,t){return e.replace(t,"<strong>"+t+"</strong>")}var i={stock:"股票",fund:"基金",hkstock:"港股",forex:"外汇",bond:"债券"};return'<tr data-index="'+e+'"'+n+"><td>"+s(t.s,r.toUpperCase())+"</td><td>"+s(t.n,r)+"</td><td>"+s(t.p,r.toUpperCase())+"</td><td>"+i[t.t]+"</td></tr>"},key:"q",cb:"cb",openUrl:function(e){return"http://finance.ifeng.com/app/hq/"+e.t+"/"+(e.t==="forex"?e.s:e.c)}},extData:null},{text:"汽车",name:"keyword",subUrl:"http://car.auto.ifeng.com/lib/car/suggest_go.php",placeHolder:"输入品牌或车系",isShowTips:!0,tips:{url:"http://car.auto.ifeng.com/lib/car/suggest_jsonp.php",ui:function(e,t,n){return'<tr data-index="'+e+'"'+n+"><td>"+t[2]+"</td></tr>"},key:"keyword",cb:"callback",openUrl:function(e){return"http://car.auto.ifeng.com/lib/car/suggest_go.php?bname="+escape(e[0])+"&sname="+escape(e[1])},extData:function(e){return[e[0],e[1]]}},extData:{bname:"",sname:""}},{text:"视频",name:"q",subUrl:"http://search.ifeng.com/sofeng/search.action",placeHolder:"",isShowTips:!1,tips:null,extData:{c:5}}]},i={init:function(t){r=e.extend(r,t);var n=e.query("#"+r.id);if(n.length<1)return;this.bs=this.getBrowser();var i=n[0];this.compatible(),this.type=r.types[r.defType],i.innerHTML=this.createSearchUI(),this.wrap=e.query(".f-search-wrap",i)[0],this.checked=e.query(".checked",i)[0],this.typeWrap=e.query(".type",i)[0],this.typeList=e.query(".type ul",i)[0],this.extWrap=e.query(".ext",i)[0],this.text=e.query(".text input",i)[0],this.form=e.query("form",i)[0],this.tips=e.query(".tips",i)[0],this.button=e.query("button",i)[0],this.initFixBrowser(),this.bindEvent()},bindEvent:function(){e.on(this.form,"keypress",function(e){if(e.keyCode===13)return!1}),e.on(this.text,"keyup",function(e){var t=e.keyCode;switch(!0){case t===38:i.focusChange(i.tipsIndex-1);break;case t===40:i.focusChange(i.tipsIndex+1);break;case t===13:i.openResult();break;case t===8||t>=46&&t<=111||t>=186&&t<=222:i.textChange();break;default:}}),e.on(this.text,"focus",function(e){i.textFocus()}),e.on(this.text,"blur",function(e){i.textBlur()}),e.on(this.tips,"mouseenter",function(e){i.focusChange(parseInt(this.getAttribute("data-index")))},{delegate:"tr"}),e.on(this.tips,"mouseleave",function(e){i.disTips("none")}),e.on(this.tips,"click",function(e){i.openResult()},{delegate:"tr"}),e.on(this.typeWrap,"mouseleave",function(e){i.disTypeList("none")}),e.on(this.checked,"mouseenter",function(t){e.addClass(t.target,"hover")}),e.on(this.checked,"mouseleave",function(t){e.removeClass(t.target,"hover")}),e.on(this.button,"mouseenter",function(t){e.addClass(t.target,"hover")}),e.on(this.button,"mouseleave",function(t){e.removeClass(t.target,"hover")}),e.on(this.wrap,"click",function(e){var t=e.target,n=t.getAttribute("data-role");switch(n){case"checked":i.disTypeList("");break;case"type":i.typeChange(parseInt(t.getAttribute("data-index")));break;default:}})},compatible:function(){if(t.PH_HOTWORDS)for(var e=0,n=r.types.length;e<n;e++)e===0||e===1||e===4?r.types[e].placeHolder=t.PH_HOTWORDS[1]:e===2&&(r.types[e].placeHolder=t.PH_HOTWORDS[0])},createExtUI:function(){var e=this.type,t="";for(var n in e.extData)typeof e.extData[n]!="undefined"&&(t+='<input type="hidden" name="'+n+'" value="'+e.extData[n]+'" />');return t},createSearchUI:function(){var e=this.type,t='<div class="text"><input type="text" name="'+e.name+'" value="'+e.placeHolder+'" data-role="text" autocomplete="off" /></div>',n="";for(var i=0,s=r.types.length;i<s;i++)n+='<li><a href="javascript:void(0);" data-role="type" data-index="'+i+'">'+r.types[i].text+"</a></li>";var o='<div class="type"><div class="checked" data-role="checked">'+e.text+'</div><ul style="display: none;">'+n+"</ul></div>",u='<div class="btn"><button type="submit"></button></div>',a='<div class="tips" style="display: none;"></div>',f='<div class="ext">'+this.createExtUI()+"</div>";return'<div class="f-search-wrap"><form method="get" action="'+e.subUrl+'" target="_blank">'+o+t+u+a+f+"</form></div>"},createTipsUI:function(){var t=this.type,n='<table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>';for(var r=0,i=this.data.length;r<i;r++){var s=r%2===0?"":' class="bg"';n+=t.tips.ui(r,this.data[r],s,this.text.value)}if(t.tips.extData){var o=t.tips.extData(this.data[0]);e.each(e.query("input",this.extWrap),function(e){this.value=o[e]})}return n+"</tbody></table>"},disTips:function(e){this.tipsIndex=0,this.tips.style.display=e,this.ifr&&(this.ifr.style.display=e)},disTypeList:function(t){this.typeList.style.display=t,this.typeList.nextSibling&&(this.typeList.nextSibling.style.display=t),t==="none"?e.removeClass(this.checked,"up"):e.addClass(this.checked,"up")},focusChange:function(t){var n=e.query("tr",this.tips);t=t===n.length?0:t===-1?n.length-1:t,e.each(e.query("tr",this.tips),function(n){n===t?e.addClass(this,"focus"):e.removeClass(this,"focus")}),this.tipsIndex=t},getBrowser:function(){var e={},n=t.navigator.userAgent.toLocaleLowerCase(),r=/se 2.x metasr 1.0/,i=/(qqbrowser)\/([\d.]+)/,s=/(msie) ([\d.]+)/,o=/(chrome)\/([\d.]+)/,u=/(firefox)\/([\d.]+)/,a=/(safari)\/([\d.]+)/,f=/(opera)\/([\d.]+)/,l=n.match(r)||n.match(i)||n.match(s)||n.match(o)||n.match(u)||n.match(a)||n.match(f)||[0,0,0];return l[1]==="opera"&&(l[2]=n.match(/(version)\/([\d.]+)/)[2]),n.match(r)&&(l=[],l[1]="sougo",l[2]="msie7.0"),e[l[1]]=l[2],e.name=l[1],e.version=l[2],e},getIfr:function(e,t){var r=n.createElement("iframe");return r.src="about:blank",r.setAttribute("frameborder","0"),r.style.display="none",r.width=e,r.height=t,r},initFixBrowser:function(){this.bs.name==="msie"&&(this.typeList.parentNode.appendChild(this.getIfr(62,142)),this.ifr=this.getIfr(302,"100%"),this.ifr.style.top="28px",this.wrap.appendChild(this.ifr))},loadTips:function(e,r){var i=this.type.tips,s=n.createElement("script"),o=n.getElementsByTagName("head")[0];s.type="text/javascript";var u="jsonp_"+Math.floor(Math.random()*1e11)+"_"+(new Date).getTime();t[u]=function(){r&&r(),o.removeChild(s)},o.appendChild(s),s.src=i.url+"?"+i.cb+"="+u+"();&"+i.key+"="+encodeURIComponent(e)},openResult:function(){this.data&&this.data.length>0?t.open(this.type.tips.openUrl(this.data[this.tipsIndex])):this.form.submit()},textBlur:function(){this.text.value===""&&(this.text.value=this.type.placeHolder)},textChange:function(){this.type.isShowTips&&this.loadTips(this.text.value,function(){i.data=t.suggest_json||[],i.data.length>0?(i.tips.innerHTML=i.createTipsUI(),i.disTips(""),i.ifr&&(i.ifr.style.height=i.tips.offsetHeight+"px")):i.disTips("none")})},textFocus:function(){this.text.value===this.type.placeHolder&&(this.text.value="")},typeChange:function(e){var t=this.text.value===this.type.placeHolder,n=this.type=r.types[e];this.disTypeList("none"),this.checked.innerHTML=n.text,this.extWrap.innerHTML=this.createExtUI(),this.text.name=n.name,this.text.value=this.text.value!==n.placeHolder&&!t?this.text.value:n.placeHolder,this.form.action=n.subUrl}};return i.options=r,i});