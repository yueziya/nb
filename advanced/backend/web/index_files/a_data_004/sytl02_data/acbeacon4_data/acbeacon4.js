/*!2016-08-23 17:28 */var sSrc=location.search.split("?")[1],aSw=("undefined"==typeof sSrc?"":sSrc).toLowerCase().split("&"),i=0,oSw={},tmp,udp={},_f=Math.floor(999*Math.random()),requrl="//log.mmstat.com/t.gif",cc,ls,loop=6,looptime=500,hourms=36e5,cui,lui;window.onload=function(){function e(e,t,n){var o=udp.udSet(e,t,n),i=udp.lsSet(e,t,n),a=udp.gsSet(e,t,n);return o||i||a}function t(e){var t=udp.lsGet(e);return r(t)||(t=udp.udGet(e),r(t)||(t=udp.gsGet(e))),r(t)?t:!1}function n(e){return"undefined"!=typeof udp.udObj&&(udp.udObj.removeAttribute(e),udp.udObj.save(udp.udPath)),udp.lsObj!==!1&&window.localStorage&&udp.lsObj.removeItem(e),"undefined"!=typeof udp.gsObj&&delete udp.gsObj[location.hostname][e],!0}function o(e,t){return(new Date).getTime()+(null===t?1:t)*hourms}function a(e,t){var o=parseInt(t,10),i=(new Date).getTime();return t?!/\d+/.test(t)||i>o?void n(e):o:void 0}function r(e){return(e||"").length>23||/\d+/.test(e||"")}function s(e){for(var t=document.cookie.split("; "),n=0,o="";n<t.length;n++)if(o=t[n].split("="),o[0]===e)return r(o[1])?o[1]:!1}function c(e){udp.log("create acookie start");var t=new Image;t.id=(1e3*Math.random()).toString()+(new Date).getTime().toString(),window[t.id]=t,t.src=e,udp.log("create "+e)}for(oSw.ls=!0,oSw.ud=!0,oSw.gs=!0;i<aSw.length;i++)tmp=aSw[i].split("="),oSw[tmp[0]]="1"==tmp[1];udp.debug=0,udp.log=function(e,t,n){udp.debug&&(n||(n="JS"),t||(t="info"),e="["+(new Date).getTime()+"] ::: "+e,window.console&&console.log&&console.log(e),udp.logger&&(udp.logger.innerHTML+=e+"<br/>"))};var u=location.pathname.split("/");u[u.length-1]="",udp.path=u.join("/"),window.attachEvent&&!window.opera&&oSw.ud&&(udp.ud=!0,udp.udObj=document.getElementById("ieudp"),udp.udObj.addBehavior("#default#userData"),udp.udPath=encodeURIComponent(udp.path));try{oSw.ls=window.localStorage}catch(l){oSw.ls=!1}if(udp.lsObj=oSw.ls?window.localStorage:!1,udp.gsObj=oSw.gs?window.globalStorage:!1,udp.udSet=function(e,t,n){if(udp.ud){var i=o(t,n);try{udp.udObj.load(udp.udPath),udp.udObj.setAttribute(e,i),udp.udObj.save(udp.udPath)}catch(a){return!1}return!0}},udp.udGet=function(e){if(udp.ud){try{udp.udObj.load(udp.udPath)}catch(t){return}return a(e,udp.udObj.getAttribute(e))}return!1},udp.lsSet=function(e,t,n){if(udp.lsObj){var i=o(t,n);try{udp.lsObj.setItem(e,i)}catch(a){return!1}return!0}return!1},udp.lsGet=function(e){if(udp.lsObj)try{return a(e,udp.lsObj.getItem(e))}catch(t){return}},udp.gsSet=function(e,t,n){if(udp.gsObj){var i=o(t,n);try{udp.gsObj[location.hostname][e]=i}catch(a){return!1}return!0}return!1},udp.gsGet=function(e){if(udp.gsObj)try{return a(e,udp.gsObj[e])}catch(t){return}return!1},cc=s("cna"),cui=s("cnaui"),ls=t("cna"),lui=t("cnaui"),!cc||!ls){cc&&(requrl=requrl+"?cna="+cc+"&cache="+_f,cui&&(requrl=requrl+"&cnaui="+cui)),c(requrl),tmp=1;var d="",h=setInterval(function(){if(udp.log("start loop :"+tmp),cc=s("cna"),cui=s("cnaui"),tmp+=1,tmp==loop||cc){clearInterval(h),cc&&(d={__tanx__vms__:cc});try{-1!==location.hash.indexOf("vms")&&window.parent.postMessage(d,"*")}catch(t){}e("cna",cc,null),e("cnaui",cui,null),udp.log("loop endl ,set ls = "+cc),udp.log("loop endl ,set lui = "+cui)}},looptime);udp.debug&&setTimeout(function(){udp.log("cna="+s("cna")),udp.log("cnaui="+s("cnaui"))},2e3)}},function(e,t,n,o){function i(){var t=(new Date).getTime();t-v.times<8e3&&(m.getCookie("cna")||m.getCookie("nickname")?(v.acookie=m.getCookie("cna"),v.nickname=m.getCookie("nickname"),f(u)):e.setTimeout(function(){i()},100))}var a,r=[21870899,21144488,10265774,25892845,25898691,25900674,23848159,27414956,27424855,27058292,23840899,23848160,23850118,16030519,31254312,30150716,30126848,9437801,10549920,13730400,13726439,13714240,13724607,13728396,13702456,9173923,9040029,9437794,14446779,28352118,28342152,14492830,9965881,22468799,20902271,20906157,9529716,9529709,9529712,11256666,6742002,8869193,14612080,8869216,13168572,13504569,9366691,9020420,8779942,23566734,23576615,25140151,8779946,8374317,8374326,8372209,14730638,14734625,31428961,31428959,31434258,8968536,9951228,9951223,31438056,31428966,31438054,21852971,21852970,14644865,14670292,20878037,20876047,23244275,23498706,21216982,17862372,13162842,13262206,13164914,47176543];if(o.hash)for(var s=0,c=r.length;c>s;s++)if(a=new RegExp(r[s]+"$","ig"),a.test(o.hash))return;if("https:"!==location.protocol&&!/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec|baofeng|pptv/i.test(navigator.userAgent.toLowerCase())){var u=["acookie","nickname","token","lastTime","tokenLastTime","request","hash","first_cna"],l={aid:"",aid_tanx:"http://a.tanx.com/tanx/img",aid_cnzz:"http://aid.cnzz.com/cnzz/img",reportToken:"http://jsonp.aid.alibaba.com/Umid/getDeviceInfo",umservice:"https://ynuf.alipay.com/service/um.json",umjs:"https://assets.alicdn.com/g/security/umscript/2.1.4/um.js"},d=36e5,h={aid:12*d,aidSecond:4e3,tokenInverseTime:336*d,token:360*d,reportDelay:500,reportDelaySecond:3e3},p=["1688.com","alibaba.com","alimama.com","aliloan.com","alipay.com","aliyun.com","cnzz.com","etao.com","hichina.com","hitao.com","juhuasuan.com","net.cn","phpwind.com","tao123.com","taobao.com","tmall.com","tmall.hk","taohua.com"],m=function(o){var i,a=n.cookieEnabled,r=/msie (\d+\.\d)/i.test(n.userAgent),s="localStorage"in e&&null!==e.localStorage&&"object"==typeof e.localStorage;if(r)try{i=t.createElement("INPUT"),i.type="hidden",i.style.display="none",i.addBehavior("#default#userData"),t.body.appendChild(i)}catch(c){r=!1}return{get:function(e){return this.getStorage(e)||this.getCookie(e)||this.getUserData(e)||null},set:function(e,t){var n,o=!1;return a&&(n=new Date,n.setTime(n.getTime()+8760*d),this.setCookie(e,t,{expires:n}),a=o=this.getCookie(e)==t),s&&(this.setStorage(e,t),s=o=this.getStorage(e)==t),!o&&r&&(this.setUserData(e,t),r=o=this.getUserData(e)==t),o},clear:function(t){t=t||"_lastvisited",a&&this.setCookie(t,"",{expires:new Date(1)}),s&&e.localStorage.removeItem(t)},getCookie:function(e){var n=new RegExp("(^| )"+e+"=([^;]*)(;|$)"),o=t.cookie.match(n);return o?decodeURIComponent(o[2])||null:null},setCookie:function(e,n,o){t.cookie=e+"="+encodeURIComponent(n)+("; path="+((o=o||{}).path||"/"))+(o.expires?"; expires="+o.expires.toGMTString():"")+(o.domain?"; domain="+o.domain:"")+(o.secure?"; secure":"")},getStorage:function(t){var n=null;return s&&(n=e.localStorage.getItem(t)),n},setStorage:function(t,n){s&&e.localStorage.setItem(t,n)},getUserData:function(e){if(r)try{return i.load(o.host),i.getAttribute(e)||null}catch(t){r=!1}},setUserData:function(e,t){if(r)try{i.load(o.host),i.setAttribute(e,t),i.save(o.host)}catch(n){r=!1}}}}(u),g=function(o,i){var a={};return a.toHexStr=function(e){for(var t,n="",o=7;o>=0;o--)t=e>>>4*o&15,n+=t.toString(16);return n},a.hashCode=function(e){var t=0;if(0===e.length)return a.toHexStr(t);for(var n=0;n<e.length;n++){var o=e.charCodeAt(n);t=(t<<5)-t+o,t&=t}return a.toHexStr(t)},a.encrypt=function(e,t){for(var n="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",o=9==e.length?Number(e.substr(8,1)):0,i=e.substr(0,8),r=o;t>r;r++)i=a.hashCode(i+n.substr(r));return i+t},{nuh:a,hash:a.hashCode,guid:function(e){for(var t=[],n="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",o=(e||32)-1;o>-1;o--)t[o]=n.charAt(Math.random()*n.length);return t.join("")},token:function(){var e=v.acookie?v.acookie.replace(/[^\da-z]/gi,""):"";return(e+this.guid()).substr(0,32)},requestImg:function(t,n){var o=[],i=e["img_"+this.guid(8)]=new Image;if(n&&"object"==typeof n)for(var a in n)n.hasOwnProperty(a)&&(o[o.length]=a+"="+encodeURIComponent(n[a]));o.length&&(t+=(t.indexOf("?")>-1?"&":"?")+o.join("&")),i.src=t},jsonp:function(n,o,i){var a="fn_"+this.guid(8);e[a]=function(n){"function"==typeof i&&i(n);var o,r;e[a]=null,(o=c||t.getElementById("id_"+a))&&(r=o.parentNode,r&&11!=r.nodeType&&r.removeChild(o)),c=null};var r=["_cbFunction="+a];o=o||{};for(var s in o)o.hasOwnProperty(s)&&(r[r.length]=s+"="+encodeURIComponent(o[s]));var c=t.createElement("SCRIPT");c.type="text/javascript",c.id="id_"+a,n+=-1===n.indexOf("?")?"?":"&",c.src=n+r.join("&");var u=t.getElementsByTagName("HEAD");u&&u[0]&&u[0].appendChild(c)},stringify:function(e){for(var t=new Array(i.length),n=0;n<i.length;n++)t[n]=e[i[n]];return t.join(",")},parse:function(e){for(var t={},n=e.split(","),o=0;o<i.length;o++)t[i[o]]=n[o];return t},getHostFromURL:function(e){if(/https?:\/\/([^:\/]+)(:|\/)/.test(e)){e=RegExp.$1;var t=e.split(".");return t.length<=2?t.join("."):t.slice(1).join(".")}return""},reportUM:function(e,n){if(!t.getElementById("_umfp")){var a=t.createElement("DIV");a.id="_umfp",a.style.width="1px",a.style.height="1px",a.style.overflow="hidden",t.body.appendChild(a);var r=t.createElement("SCRIPT");r.type="text/javascript",r.charset="utf-8",r.onload=r.onreadystatechange=function(){if(!this.readyState||"loaded"==this.readyState||"complete"==this.readyState){if(!r)return;r.onload=r.onreadystatechange=null;var s=t.getElementById("_umfp");window&&window.um&&um.init({appName:"aliyun_aid",enableMod:null===n||""===n?!1:p.join("").indexOf(n)>-1,serviceUrl:o.umservice,token:e,timeout:1500,timestamp:(new Date).getTime(),containers:{flash:s,dcp:s},callback:function(){i.tokenLastTime=i.times.toString(36),m.set("_lastvisited",g.stringify(i)),g.jsonp(o.reportToken,{tokenid:e,acookie:i.acookie,n:"callback"})}});var c={tokenid:e,acookie:i.acookie,n:"first"};i.hasFlash&&(c.f="1"),i.hasPdf&&(c.p="1");var u=g.getPluginsHash().join("");c.p1=u.substr(0,144),c.p2=u.substr(144,144),g.jsonp(o.reportToken,c),a=null,r=null}},r.src=o.umjs,t.getElementsByTagName("HEAD")[0].appendChild(r)}},getPlugins:function(){var e=n.plugins||[];if(e.length){for(var t=[],o=0;o<e.length;o++)this.fuckHint(e[o],t);return t}return this.getPluginsIE()},fuckHint:function(e,t){try{if(e){for(var n=[],o=0;o<e.length;o++)e.item(o)&&n.push(e.item(o).type);var i=e.name+";";e.version&&(i+=e.version+";"),i+=e.filename+";",i+=n.join(";"),t.push(i)}}catch(a){}},getPluginsIE:function(){for(var e=[],t=function(t){if(window&&t&&window.ActiveXObject){for(var n=0,o=null;null===o&&n<t.ids.length;){try{o=new window.ActiveXObject(t.ids[n])}catch(i){}n++}if(o)try{e.push(t.name+"=="+t.getVersion(o,t.ids[n]))}catch(i){}}},n=[{name:"Quicktime",ids:["QuickTimeCheckObject.QuickTimeCheck.1","QuickTime.QuickTime"],getVersion:function(e){return e.QuickTimeVersion.toString(16).replace(/^(.)(.)(.).*/,"$1.$2.$3")}},{name:"Acrobat",ids:["PDF.PdfCtrl.7","PDF.PdfCtrl.6","PDF.PdfCtrl.5","PDF.PdfCtrl.4","PDF.PdfCtrl.3","AcroPDF.PDF.1"],getVersion:function(e,t){return t.replace(/^[a-zA-Z.]+\.([0-9][0-9.]*)/,"$1")}},{name:"RealPlayer",ids:["RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)","RealVideo.RealVideo(tm) ActiveX Control (32-bit)","rmocx.RealPlayer G2 Control"],getVersion:function(e){return e.GetVersionInfo()}},{name:"Flash",ids:["ShockwaveFlash.ShockwaveFlash.9","ShockwaveFlash.ShockwaveFlash.8.5","ShockwaveFlash.ShockwaveFlash.8","ShockwaveFlash.ShockwaveFlash.7","ShockwaveFlash.ShockwaveFlash.6","ShockwaveFlash.ShockwaveFlash.5","ShockwaveFlash.ShockwaveFlash.4"],getVersion:function(e){return e.GetVariable("$version").replace(/[a-zA-Z ]*([0-9,]+)/,"$1").replace(/,/g,".")}},{name:"Adobe SVG",ids:["Adobe.SVGCtl"],getVersion:function(e){return e.getSVGViewerVersion().replace(/[a-zA-Z; ]*([0-9.]+)/,"$1")}},{name:"Windows Media Player",ids:["WMPlayer.OCX","MediaPlayer.MediaPlayer.1"],getVersion:function(e){return e.versionInfo}},{name:"DivX",ids:["npdivx.DivXBrowserPlugin.1","npdivx.DivXBrowserPlugin"],getVersion:function(e){return e.GetVersion()}},{name:"WPFe (Silverlight)",ids:["AgControl.AgControl"],getVersion:function(e){for(var t="1",n="0",o="0";e.IsVersionSupported(t+"."+n+"."+o);)t++;for(t--;e.IsVersionSupported(t+"."+n+"."+o);)n++;for(n--;e.IsVersionSupported(t+"."+n+"."+o);)o++;return o--,t+"."+n+"."+o}},{name:"MSXML",ids:["MSXML2.DOMDocument.6.0","MSXML2.DOMDocument.5.0","MSXML2.DOMDocument.4.0","MSXML2.DOMDocument.3.0"],getVersion:function(e,t){return t.replace(/^[a-zA-Z.2]+\.([0-9]+\.[0-9.]+)/,"$1")}}],o=0;o<n.length;o++)t(n[o]);return e},getPluginsHash:function(){for(var e=this.getPlugins(),t=0;t<e.length;t++)e[t]=a.hashCode(e[t]),e[t]=a.encrypt(e[t],Math.round(5*Math.random()));return e},getClientInfoHash:function(){var t=this.getPlugins(),o=t.length?t.join(","):"",r=e.screen.width,s=e.screen.height,c=e.screen.availWidth,u=e.screen.availHeight,l=n.userAgent;return this.hasPdfAndFlash(o),i.ua=l,i.screenWidth=r,i.screenHeight=s,i.screenAWidth=c,i.screenAHeight=u,t=[o,r,s,c,u,l],a.hashCode(t.join("@"))},hasPdfAndFlash:function(e){i.hasPdf=/pdf/i.test(e),i.hasFlash=/flash/i.test(e)}}}(l,u),f=function(e){var t=e.nickname?"taobao_nick":e.acookie?"acookie_id":"";if(t){var n=0,o=m.get("_lastvisited"),i=g.parse(o||"");if(e.request|="nickname"==t?4:1,e.first_cna=i.first_cna||e.acookie,i.token&&i.lastTime&&i.tokenLastTime){var a=i.request||0,r=!1,s=!1;e.token=i.token,e.lastTime=i.lastTime,e.tokenLastTime=i.tokenLastTime;var c=parseInt(i.tokenLastTime||0,36);(e.times-c>=h.token||e.hash!=i.hash)&&(e.token=g.token(),e.lastTime=e.times.toString(36),e.tokenLastTime=(e.times-h.tokenInverseTime).toString(36),r=!0,g.reportUM(e.token,e.domain));var u=parseInt(i.lastTime||0,36);e.times-u>=h.aid&&(e.lastTime=e.times.toString(36),s=!0),e.times-u>=h.aidSecond&&(r||s||1&a&&i.acookie!=e.acookie||2&a&&i.token!=e.token||4&a&&i.nickname!=e.nickname||2!=(2&a))&&(e.request|=2,m.set("_lastvisited",g.stringify(e)),n|=1)}else e.token=g.token(),e.lastTime=e.times.toString(36),e.tokenLastTime=(e.times-h.tokenInverseTime).toString(36),n|=3,g.reportUM(e.token,e.domain),m.set("_lastvisited",g.stringify(e));if(1==(1&n)){var d={};d.type=t,d.id="taobao_nick"==t?e.nickname:e.acookie,2!=(2&n)&&(d.type_add="tokenid",d.id_add=e.token),d._ts="3"+g.guid(4),d.cad=m.getCookie("cad"),d.cap=m.getCookie("cap"),d.cna=m.getCookie("cna"),d._lastvisited=m.get("_lastvisited"),g.requestImg(l.aid,d)}}};if(e.aid={util:g,storage:m,currentData:u},"https:"!==e.location.protocol){var v=u;v.now=new Date,v.times=v.now.getTime(),v.request=0,v.host=g.getHostFromURL(e.location.href),v.domain=g.getHostFromURL(t.referrer||""),v.hash=g.getClientInfoHash(),l.aid=l.aid_tanx,"cnzz.com"==v.host.toLowerCase()&&(l.aid=l.aid_cnzz),i()}}}(window,document,navigator,location);