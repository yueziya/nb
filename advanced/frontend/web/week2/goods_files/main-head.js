/*
 * author  : HQY
 * date    : 2016-07-14
 * email   : hqy321@gmail.com
*/

!function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){n(4)},function(t,e){!function(t){var e=t.FNX||(t.FNX={});e.__clz__||(e.__clz__={}),e.__loader__=function(){var t={},e=this.using=function(n){var i=t[n],s="exports";return"object"==typeof i?i:(i[s]||(i[s]={},i[s]=i.call(i[s],e,i[s],i)||i[s]),i[s])};this.namespace=function(e,n){t[e]=n}},e.include=function(t){return e.__clz__[t]}}(window),function(t){var e=new FNX.__loader__,n=e.using,i=e.namespace,e=FNX.__clz__;i("$",function(t,e,n){n.exports=$}),FNX.__clz__["fnx/cmp/$"]=n("$")}(window),function(t){var e=new FNX.__loader__,n=e.using,i=e.namespace,e=FNX.__clz__;i("class/class",function(t,e,n){function i(t){return this instanceof i||!h(t)?void 0:r(t)}function s(t){var e,n;for(e in t)n=t[e],i.Mutators.hasOwnProperty(e)?i.Mutators[e].call(this,n):this.prototype[e]=n}function r(t){return t.extend=i.extend,t.implement=s,t}function a(){}function o(t,e,n){for(var i in e)if(e.hasOwnProperty(i)){if(n&&-1===f(n,i))continue;"prototype"!==i&&(t[i]=e[i])}}n.exports=i,i.create=function(t,e){function n(){t.apply(this,arguments),this.constructor===n&&this.initialize&&this.initialize.apply(this,arguments)}return h(t)||(e=t,t=null),e||(e={}),t||(t=e.Extends||i),e.Extends=t,t!==i&&o(n,t,t.StaticsWhiteList),s.call(n,e),r(n)},i.extend=function(t){return t||(t={}),t.Extends=this,i.create(t)},i.Mutators={Extends:function(t){var e=this.prototype,n=c(t.prototype);o(n,e),n.constructor=this,this.prototype=n,this.superclass=t.prototype},Implements:function(t){u(t)||(t=[t]);for(var e,n=this.prototype;e=t.shift();)o(n,e.prototype||e)},Statics:function(t){o(this,t)}};var c=Object.__proto__?function(t){return{__proto__:t}}:function(t){return a.prototype=t,new a},l=Object.prototype.toString,u=Array.isArray||function(t){return"[object Array]"===l.call(t)},h=function(t){return"[object Function]"===l.call(t)},f=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var n=0,i=t.length;i>n;n++)if(t[n]===e)return n;return-1}}),FNX.__clz__["fnx/cmp/class/class"]=n("class/class")}(window),function(t){var e=new FNX.__loader__,n=e.using,i=e.namespace,e=FNX.__clz__;i("events/events",function(t,e,n){function i(){}function s(t,e){for(var n=0;n<t.length;n++)e(t[n])}function r(t,e,n){var i=!0;if(t){var s=0,r=t.length,a=e[0],o=e[1],c=e[2];switch(e.length){case 0:for(;r>s;s+=2)i=t[s].call(t[s+1]||n)!==!1&&i;break;case 1:for(;r>s;s+=2)i=t[s].call(t[s+1]||n,a)!==!1&&i;break;case 2:for(;r>s;s+=2)i=t[s].call(t[s+1]||n,a,o)!==!1&&i;break;case 3:for(;r>s;s+=2)i=t[s].call(t[s+1]||n,a,o,c)!==!1&&i;break;default:for(;r>s;s+=2)i=t[s].apply(t[s+1]||n,e)!==!1&&i}}return i}function a(t){return"[object Function]"===Object.prototype.toString.call(t)}var o=/\s+/;i.prototype.on=function(t,e,n){var i,s,r;if(!e)return this;for(i=this.__events||(this.__events={}),t=t.split(o);s=t.shift();)r=i[s]||(i[s]=[]),r.push(e,n);return this},i.prototype.once=function(t,e,n){var i=this,s=function(){i.off(t,s),e.apply(n||i,arguments)};return this.on(t,s,n)},i.prototype.off=function(t,e,n){var i,s,r,a;if(!(i=this.__events))return this;if(!(t||e||n))return delete this.__events,this;for(t=t?t.split(o):c(i);s=t.shift();)if(r=i[s])if(e||n)for(a=r.length-2;a>=0;a-=2)e&&r[a]!==e||n&&r[a+1]!==n||r.splice(a,2);else delete i[s];return this},i.prototype.trigger=function(t){var e,n,i,s,a,c,l=[],u=!0;if(!(e=this.__events))return this;for(t=t.split(o),a=1,c=arguments.length;c>a;a++)l[a-1]=arguments[a];for(;n=t.shift();)(i=e.all)&&(i=i.slice()),(s=e[n])&&(s=s.slice()),"all"!==n&&(u=r(s,l,this)&&u),u=r(i,[n].concat(l),this)&&u;return u},i.prototype.emit=i.prototype.trigger;var c=Object.keys;c||(c=function(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);return e}),i.mixTo=function(t){function e(e){t[e]=function(){return n[e].apply(o,Array.prototype.slice.call(arguments)),this}}var n=i.prototype;if(a(t)){for(var r in n)n.hasOwnProperty(r)&&(t.prototype[r]=n[r]);s(c(n),function(e){t.prototype[e]=n[e]})}else{var o=new i;for(var r in n)n.hasOwnProperty(r)&&e(r)}},n.exports=i}),FNX.__clz__["fnx/cmp/events/events"]=n("events/events")}(window),function(t){var e=new FNX.__loader__,n=e.using,i=e.namespace,e=FNX.__clz__,s={};i("base/aspect",function(t,e,n){function i(t,e,n,i){for(var o,c,l=e.split(a);o=l.shift();)c=s(this,o),c.__isAspected||r.call(this,o),this.on(t+":"+o,n,i);return this}function s(t,e){var n=t[e];if(!n)throw new Error("Invalid method name: "+e);return n}function r(t){var e=this[t];this[t]=function(){var n=Array.prototype.slice.call(arguments),i=["before:"+t].concat(n);if(this.trigger.apply(this,i)!==!1){var s=e.apply(this,arguments),r=["after:"+t,s].concat(n);return this.trigger.apply(this,r),s}},this[t].__isAspected=!0}e.before=function(t,e,n){return i.call(this,"before",t,e,n)},e.after=function(t,e,n){return i.call(this,"after",t,e,n)};var a=/\s+/}),i("base/attribute",function(t,e,n){function i(t){return"[object String]"===b.call(t)}function s(t){return"[object Function]"===b.call(t)}function r(t){return null!=t&&t==t.window}function a(t){if(!t||"[object Object]"!==b.call(t)||t.nodeType||r(t))return!1;try{if(t.constructor&&!C.call(t,"constructor")&&!C.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(e){return!1}var n;if(y)for(n in t)return C.call(t,n);for(n in t);return void 0===n||C.call(t,n)}function o(t){if(!t||"[object Object]"!==b.call(t)||t.nodeType||r(t)||!t.hasOwnProperty)return!1;for(var e in t)if(t.hasOwnProperty(e))return!1;return!0}function c(t,e){var n;for(n in e)e.hasOwnProperty(n)&&(t[n]=l(e[n],t[n]));return t}function l(t,e){return T(t)?t=t.slice():a(t)&&(a(e)||(e={}),t=c(e,t)),t}function u(t,e,n){for(var i=[],s=e.constructor.prototype;s;)s.hasOwnProperty("attrs")||(s.attrs={}),f(n,s.attrs,s),o(s.attrs)||i.unshift(s.attrs),s=s.constructor.superclass;for(var r=0,a=i.length;a>r;r++)_(t,d(i[r]))}function h(t,e){_(t,d(e,!0),!0)}function f(t,e,n,i){for(var s=0,r=t.length;r>s;s++){var a=t[s];n.hasOwnProperty(a)&&(e[a]=i?e.get(a):n[a])}}function p(t,e){for(var n in e)if(e.hasOwnProperty(n)){var i,r=e[n].value;s(r)&&(i=n.match(P))&&(t[i[1]](v(i[2]),r),delete e[n])}}function v(t){var e=t.match(O),n=e[1]?"change:":"";return n+=e[2].toLowerCase()+e[3]}function g(t,e,n){var i={silent:!0};t.__initializingAttrs=!0;for(var s in n)n.hasOwnProperty(s)&&e[s].setter&&t.set(s,n[s],i);delete t.__initializingAttrs}function d(t,e){var n={};for(var i in t){var s=t[i];!e&&a(s)&&m(s,S)?n[i]=s:n[i]={value:s}}return n}function _(t,e,n){var i,s,r;for(i in e)if(e.hasOwnProperty(i)){if(s=e[i],r=t[i],r||(r=t[i]={}),void 0!==s.value&&(r.value=l(s.value,r.value)),n)continue;for(var a in z){var o=z[a];void 0!==s[o]&&(r[o]=s[o])}}return t}function m(t,e){for(var n=0,i=e.length;i>n;n++)if(t.hasOwnProperty(e[n]))return!0;return!1}function w(t){return null==t||(i(t)||T(t))&&0===t.length||o(t)}function x(t,e){if(t===e)return!0;if(w(t)&&w(e))return!0;var n=b.call(t);if(n!=b.call(e))return!1;switch(n){case"[object String]":return t==String(e);case"[object Number]":return t!=+t?e!=+e:0==t?1/t==1/e:t==+e;case"[object Date]":case"[object Boolean]":return+t==+e;case"[object RegExp]":return t.source==e.source&&t.global==e.global&&t.multiline==e.multiline&&t.ignoreCase==e.ignoreCase;case"[object Array]":var i=t.toString(),s=e.toString();return-1===i.indexOf("[object")&&-1===s.indexOf("[object")&&i===s}if("object"!=typeof t||"object"!=typeof e)return!1;if(a(t)&&a(e)){if(!x(N(t),N(e)))return!1;for(var r in t)if(t[r]!==e[r])return!1;return!0}return!1}e.initAttrs=function(t){var e=this.attrs={},n=this.propsInAttrs||[];u(e,this,n),t&&h(e,t),g(this,e,t),p(this,e),f(n,this,e,!0)},e.get=function(t){var e=this.attrs[t]||{},n=e.value;return e.getter?e.getter.call(this,n,t):n},e.set=function(t,e,n){var s={};i(t)?s[t]=e:(s=t,n=e),n||(n={});var r=n.silent,o=n.override,l=this.attrs,u=this.__changedAttrs||(this.__changedAttrs={});for(t in s)if(s.hasOwnProperty(t)){var h=l[t]||(l[t]={});if(e=s[t],h.readOnly)throw new Error("This attribute is readOnly: "+t);h.setter&&(e=h.setter.call(this,e,t));var f=this.get(t);!o&&a(f)&&a(e)&&(e=c(c({},f),e)),l[t].value=e,this.__initializingAttrs||x(f,e)||(r?u[t]=[e,f]:this.trigger("change:"+t,e,f,t))}return this},e.change=function(){var t=this.__changedAttrs;if(t){for(var e in t)if(t.hasOwnProperty(e)){var n=t[e];this.trigger("change:"+e,n[0],n[1],e)}delete this.__changedAttrs}return this},e._isPlainObject=a;var y,b=Object.prototype.toString,C=Object.prototype.hasOwnProperty;!function(){function t(){this.x=1}var e=[];t.prototype={valueOf:1,y:1};for(var n in new t)e.push(n);y="x"!==e[0]}();var T=Array.isArray||function(t){return"[object Array]"===b.call(t)},N=Object.keys;N||(N=function(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);return e});var P=/^(on|before|after)([A-Z].*)$/,O=/^(Change)?([A-Z])(.*)/,S=["value","getter","setter","readOnly"],z=["setter","getter","readOnly"]}),i("base/base",function(t,e,n){function i(t,e){for(var n in e)if(e.hasOwnProperty(n)){var i="_onChange"+r(n);t[i]&&t.on("change:"+n,t[i])}}function r(t){return t.charAt(0).toUpperCase()+t.substring(1)}var a=s["class/class"],o=s["events/events"],c=t("base/aspect"),l=t("base/attribute");n.exports=a.create({Implements:[o,c,l],initialize:function(t){this.initAttrs(t),i(this,this.attrs)},destroy:function(){this.off();for(var t in this)this.hasOwnProperty(t)&&delete this[t];this.destroy=function(){}}})}),s["class/class"]=FNX.__clz__["fnx/cmp/class/class"],s["events/events"]=FNX.__clz__["fnx/cmp/events/events"],FNX.__clz__["fnx/cmp/base/base"]=n("base/base")}(window),function(t){var e=new FNX.__loader__,n=e.using,i=e.namespace,e=FNX.__clz__,s={};i("widget/daparser",function(t,e,n){function i(t){return t.toLowerCase().replace(c,function(t,e){return(e+"").toUpperCase()})}function r(t){for(var e in t)if(t.hasOwnProperty(e)){var n=t[e];if("string"!=typeof n)continue;l.test(n)?(n=n.replace(/'/g,'"'),t[e]=r(u(n))):t[e]=a(n)}return t}function a(t){if("false"===t.toLowerCase())t=!1;else if("true"===t.toLowerCase())t=!0;else if(/\d/.test(t)&&/[^a-z]/i.test(t)){var e=parseFloat(t);e+""===t&&(t=e)}return t}var o=s.$;e.parseElement=function(t,e){var n={},s={},a={},c=o.trim(t.attr("widget-options"));if(c&&("{"!=c.substring(0,1)&&(c="{"+c+"}"),a=new Function("return "+c)()),t=o(t)[0],t.dataset)n=o.extend({},t.dataset);else for(var l=t.attributes,u=0,h=l.length;h>u;u++){var f=l[u],p=f.name;0===p.indexOf("data-")&&(p=i(p.substring(5)),n[p]=f.value)}return s=e===!0?n:r(n),o.extend(s,a),s};var c=/-([a-z])/g,l=/^\s*[\[{].*[\]}]\s*$/,u=this.JSON?JSON.parse:o.parseJSON}),i("widget/auto-render",function(t,e,n){function i(t,e){for(var n=0;n<t.length;n++)e(n,t[n])}function r(t){return FNX.include(t)}function a(t,e){if(!e.attr(c)){var n={initElement:e,renderType:"auto"},i=e.attr("data-widget-role");n[i?i:"element"]=e,t.autoRender&&t.autoRender(n),e.attr(c,"true")}}var o=s.$,c="data-widget-auto-rendered",l="clz:";e.autoRender=function(t){return new this(t).render()},e.autoRenderAll=function(t,n){"function"==typeof t&&(n=t,t=null),t=o(t||"body");var s=[];t.find("[data-widget]").each(function(t,n){if(!e.isDataApiOff(n)){var i=n.getAttribute("data-widget")||"";0===i.indexOf(l)&&(i=i.substring(l.length)),s.push({clz:r(i),emt:o(n)})}}),i(s,function(t,e){a(e.clz,e.emt)}),n&&n()};var u="off"===o("body").attr("data-api");e.isDataApiOff=function(t){var e=o(t).attr("data-api");return"off"===e||"on"!==e&&u}}),i("widget/widget",function(e,n,i){function r(){function t(){return(65536*(1+Math.random())|0).toString(16).substring(1)}return"widget-"+t()+t()+t()+t()+t()+t()+t()+t()}function a(t){return"[object String]"===T.call(t)}function o(t){return"[object Function]"===T.call(t)}function c(t){return N(document.documentElement,t)}function l(t){return t.charAt(0).toUpperCase()+t.substring(1)}function u(t){return o(t.events)&&(t.events=t.events()),t.events}function h(t,e){var n=t.match(P),i=n[1]+w+e.cid,s=n[2]||void 0;return s&&s.indexOf("{{")>-1&&(s=f(s,e)),{type:i,selector:s}}function f(t,e){return t.replace(O,function(t,n){for(var i,s=n.split("."),r=e;i=s.shift();)r=r===e.attrs?e.get(i):r[i];return a(r)?r:S})}function p(t){return null==t||void 0===t}function v(t){for(var e=t.length-1;e>=0&&void 0===t[e];e--)t.pop();return t}var g=s["base/base"],d=s.$,_=e("widget/daparser"),m=e("widget/auto-render"),w=".delegate-events-",x="_onRender",y="data-widget-cid",b={},C=g.extend({propsInAttrs:["initElement","element","events"],element:null,events:null,attrs:{id:null,className:null,style:null,locale:"zh-cn",template:"<div></div>",model:null,parentNode:"body"},initialize:function(t){this.cid=r();var e=this._parseDataAttrsConfig(t);C.superclass.initialize.call(this,t?d.extend(e,t):e),this.parseElement(),this.initProps(),this.delegateEvents(),this.setup(),this._stamp(),this._isTemplate=!(t&&t.element)},_parseDataAttrsConfig:function(t){var e,n;return t&&(e=d(t.initElement?t.initElement:t.element)),e&&e[0]&&!m.isDataApiOff(e)&&(n=_.parseElement(e)),n},parseElement:function(){var t=this.element;if(t?this.element=d(t):this.get("template")&&this.parseElementFromTemplate(),!this.element||!this.element[0])throw new Error("element is invalid")},parseElementFromTemplate:function(){this.element=d(this.get("template"))},initProps:function(){},delegateEvents:function(t,e,n){var i=v(Array.prototype.slice.call(arguments));if(0===i.length?(e=u(this),t=this.element):1===i.length?(e=t,t=this.element):2===i.length?(n=e,e=t,t=this.element):(t||(t=this.element),this._delegateElements||(this._delegateElements=[]),this._delegateElements.push(d(t))),a(e)&&o(n)){var s={};s[e]=n,e=s}for(var r in e)if(e.hasOwnProperty(r)){var c=h(r,this),l=c.type,f=c.selector;!function(e,n){var i=function(t){o(e)?e.call(n,t):n[e](t)};f?d(t).on(l,f,i):d(t).on(l,i)}(e[r],this)}return this},undelegateEvents:function(t,e){var n=v(Array.prototype.slice.call(arguments));if(e||(e=t,t=null),0===n.length){var i=w+this.cid;if(this.element&&this.element.off(i),this._delegateElements)for(var s in this._delegateElements)this._delegateElements.hasOwnProperty(s)&&this._delegateElements[s].off(i)}else{var r=h(e,this);t?d(t).off(r.type,r.selector):this.element&&this.element.off(r.type,r.selector)}return this},setup:function(){},render:function(){this.rendered||(this._renderAndBindAttrs(),this.rendered=!0);var t=this.get("parentNode");if(t&&!c(this.element[0])){var e=this.constructor.outerBoxClass;if(e){var n=this._outerBox=d("<div></div>").addClass(e);n.append(this.element).appendTo(t)}else this.element.appendTo(t)}return this},_renderAndBindAttrs:function(){var t=this,e=t.attrs;for(var n in e)if(e.hasOwnProperty(n)){var i=x+l(n);if(this[i]){var s=this.get(n);p(s)||this[i](s,void 0,n),function(e){t.on("change:"+n,function(n,i,s){t[e](n,i,s)})}(i)}}},_onRenderId:function(t){this.element.attr("id",t)},_onRenderClassName:function(t){this.element.addClass(t)},_onRenderStyle:function(t){this.element.css(t)},_stamp:function(){var t=this.cid;(this.initElement||this.element).attr(y,t),b[t]=this},$:function(t){return this.element.find(t)},destroy:function(){this.undelegateEvents(),delete b[this.cid],this.element&&this._isTemplate&&(this.element.off(),this._outerBox?this._outerBox.remove():this.element.remove()),this.element=null,C.superclass.destroy.call(this)}});d(t).unload(function(){for(var t in b)b[t].destroy()}),C.query=function(t){var e,n=d(t).eq(0);return n&&(e=n.attr(y)),b[e]},C.switchLocale=function(t){for(var e in b)b[e].set("locale",t)},C.autoRender=m.autoRender,C.autoRenderAll=m.autoRenderAll,C.StaticsWhiteList=["autoRender"],i.exports=C;var T=Object.prototype.toString,N=d.contains||function(t,e){return!!(16&t.compareDocumentPosition(e))},P=/^(\S+)\s*(.*)$/,O=/{{([^}]+)}}/g,S="INVALID_SELECTOR"}),s["base/base"]=FNX.__clz__["fnx/cmp/base/base"],s.$=FNX.__clz__["fnx/cmp/$"],FNX.__clz__["fnx/cmp/widget/widget"]=n("widget/widget")}(window),function(t){var e=new FNX.__loader__,n=e.using,i=e.namespace,e=FNX.__clz__,s={};i("easing/easing",function(t,e,n){var i=Math.PI,r=Math.pow,a=Math.sin,o=1.70158,c={easeNone:function(t){return t},easeIn:function(t){return t*t},easeOut:function(t){return(2-t)*t},easeBoth:function(t){return(t*=2)<1?.5*t*t:.5*(1- --t*(t-2))},easeInStrong:function(t){return t*t*t*t},easeOutStrong:function(t){return 1- --t*t*t*t},easeBothStrong:function(t){return(t*=2)<1?.5*t*t*t*t:.5*(2-(t-=2)*t*t*t)},backIn:function(t){return 1===t&&(t-=.001),t*t*((o+1)*t-o)},backOut:function(t){return(t-=1)*t*((o+1)*t+o)+1},backBoth:function(t){var e=o,n=(e*=1.525)+1;return(t*=2)<1?.5*(t*t*(n*t-e)):.5*((t-=2)*t*(n*t+e)+2)},elasticIn:function(t){var e=.3,n=e/4;return 0===t||1===t?t:-(r(2,10*(t-=1))*a((t-n)*(2*i)/e))},elasticOut:function(t){var e=.3,n=e/4;return 0===t||1===t?t:r(2,-10*t)*a((t-n)*(2*i)/e)+1},elasticBoth:function(t){var e=.45,n=e/4;return 0===t||2===(t*=2)?t:1>t?-.5*(r(2,10*(t-=1))*a((t-n)*(2*i)/e)):r(2,-10*(t-=1))*a((t-n)*(2*i)/e)*.5+1},bounceIn:function(t){return 1-c.bounceOut(1-t)},bounceOut:function(t){var e,n=7.5625;return e=1/2.75>t?n*t*t:2/2.75>t?n*(t-=1.5/2.75)*t+.75:2.5/2.75>t?n*(t-=2.25/2.75)*t+.9375:n*(t-=2.625/2.75)*t+.984375},bounceBoth:function(t){return.5>t?.5*c.bounceIn(2*t):.5*c.bounceOut(2*t-1)+.5}};n.exports=c;var l=s.$;l.extend(l.easing,c)}),s.$=FNX.__clz__["fnx/cmp/$"],FNX.__clz__["fnx/cmp/easing/easing"]=n("easing/easing")}(window),function(t){var e=new FNX.__loader__,n=e.using,i=e.namespace,e=FNX.__clz__,s={};i("switchable/basic/switchable-basic",function(t,e,n){function i(t,e,n,i){for(var s=a("<ul>"),r=0;t>r;r++){var o=r===e?n:"";a("<li>",{"class":o,html:"<span>"+(r+1)+"</span>"}).appendTo(s)}return i?s.children():s}function r(t){return{UI_SWITCHABLE:t||"",NAV_CLASS:t?t+"-nav":"",CONTENT_CLASS:t?t+"-content":"",TRIGGER_CLASS:t?t+"-trigger":"",PANEL_CLASS:t?t+"-panel":""}}var a=s.$,o=s["widget/widget"],c=o.extend({attrs:{triggers:{value:null,getter:function(t){return a(t)}},panels:{value:null,getter:function(t){return a(t)}},classPrefix:"ui-switchable",hasTriggers:!0,autoHideTrigger:!0,triggerType:"hover",delay:100,activeIndex:{value:0,setter:function(t){return parseInt(t)||0}},step:1,length:{readOnly:!0,getter:function(){var t=this.get("panels");return t.length?Math.ceil(t.length/this.get("step")):0}},viewSize:null,activeTriggerClass:{getter:function(t){return t?t:this.get("classPrefix")+"-active"}}},setup:function(){c.superclass.setup.call(this),this._initConstClass(),this._initElement();var t=this._getDatasetRole();this._initPanels(t),this._initTriggers(t),this._bindTriggers(),this._initEffect()},_initConstClass:function(){this.CONST=r(this.get("classPrefix"))},_initElement:function(){this.element.addClass(this.CONST.UI_SWITCHABLE)},_parseDatasetRole:function(t){for(var e=this,n={},i=0;i<t.length;i++){var s=t[i],r=e.$("[data-role="+s+"]");r.length&&(n[s]=r)}return n},_getDatasetRole:function(){return this._parseDatasetRole(["trigger","panel","nav","content"])},_initPanels:function(t){var e=this.get("panels");e.length>0||(t.panel?this.set("panels",e=t.panel):t.content&&(this.set("panels",e=t.content.find("> *")),this.content=t.content)),this.content||(this.content=e.parent()),this.content.addClass(this.CONST.CONTENT_CLASS)},_initTriggers:function(t){var e=this.get("triggers"),n=this.get("length");e.length>0||(t.trigger?this.set("triggers",e=t.trigger):t.nav?(e=t.nav.find("> *"),0===e.length&&(e=i(n,this.get("activeIndex"),this.get("activeTriggerClass"),!0).appendTo(t.nav)),this.set("triggers",e),this.nav=t.nav):this.get("hasTriggers")&&(this.nav=i(n,this.get("activeIndex"),this.get("activeTriggerClass")).appendTo(this.element),this.set("triggers",e=this.nav.children()))),!this.nav&&e.length&&(this.nav=e.parent()),this.nav&&this.nav.addClass(this.CONST.NAV_CLASS),e.addClass(this.CONST.TRIGGER_CLASS).each(function(t,e){a(e).data("value",t)}),1>=n&&this.get("autoHideTrigger")&&e.hide()},_bindTriggers:function(){var t=this,e=this.get("triggers"),n=this.get("triggerType").switchTimer=null;"click"===n?e.click(function(){t.switchTo(a(this).data("value"))}):e.hover(function(){var e=this;switchTimer=setTimeout(function(){t.switchTo(a(e).data("value"))},t.get("delay"))},function(){clearTimeout(switchTimer)})},_initEffect:function(){this.get("panels").hide()},_onRenderActiveIndex:function(t,e){this._switchTo(t,e)},_switchTo:function(t,e){this.trigger("switch",t,e),this._switchTrigger(t,e),this._switchPanel(t,e)},_switchTrigger:function(t,e){var n=this.get("triggers");n.length<1||(n.eq(e).removeClass(this.get("activeTriggerClass")),n.eq(t).addClass(this.get("activeTriggerClass")))},_switchPanel:function(t,e){var n=this._getPanelInfo(t,e);n.fromPanels.hide(),n.toPanels.show()},_getPanelInfo:function(t,e){var n,i,s=this.get("panels").get(),r=this.get("step");return e>-1&&(n=s.slice(e*r,(e+1)*r)),i=s.slice(t*r,(t+1)*r),{toIndex:t,fromIndex:e,toPanels:a(i),fromPanels:a(n)}},switchTo:function(t){this.set("activeIndex",t)},prev:function(){var t=this.get("activeIndex"),e=(t-1+this.get("length"))%this.get("length");this.switchTo(e)},next:function(){var t=this.get("activeIndex"),e=(t+1)%this.get("length");this.switchTo(e)}});n.exports=c}),i("switchable/basic/effects",function(t,e,n){function i(t,e,n){var i={};if(i[e?"left":"top"]=-(n*t.toIndex*this.get("step"))+"px",t.fromIndex>-1){var s=this;this.anim=this.content.animate(i,this.get("duration"),this.get("easing"),function(){s.anim=null,s.trigger("switched",t.toIndex,t.fromIndex)})}else this.content.css(i),this.trigger("switched",t.toIndex,t.fromIndex)}function r(t,e,n){var i=e?"left":"top",s=this.get("step"),r=t.toIndex,o=t.fromIndex,c=this.get("length"),l=(this.get("panels"),{});if(l[i]=-(n*r*s)+"px",o>-1){var u=this,h=0===o&&r===c-1&&this._forcePrev,f=o===c-1&&0===r&&this._forceNext;h||f?a.call(this,t,f,i,n):this.anim=this.content.animate(l,this.get("duration"),this.get("easing"),function(){u.anim=null,u.trigger("switched",r,o)})}else this.content.css(l),this.trigger("switched",r,o)}function a(t,e,n,i){var s=this,r=t.toPanels,a=this.get("step"),o=this.get("size"),c=this.get("panels"),l=c.length,u={},h=0,f=o==a&&l%a==0,p=i*l;if(e)f&&r.css("position","relative").css(n,p+"px"),u[n]=-p+"px",h="0px";else{var v=(l-(l%a||a))*i;f?(r.css("position","relative").css(n,-p+"px"),u[n]=a*i+"px",h=-v+"px"):(this.content.css(n,-p+"px"),u[n]=-v+"px")}this.anim=this.content.animate(u,this.get("duration"),this.get("easing"),function(){f&&r.css(n,"0px"),h&&s.content.css(n,h),s.anim=null,s.trigger("switched",t.toIndex,t.fromIndex)})}var o=(s.$,s["easing/easing"],"scrollx"),c="scrolly",l=n.exports={};l.none={initEffect:function(){var t=this.get("panels");return t.length>this.get("step")?void t.hide():!1},switchPanel:function(t){t.fromPanels.hide(),t.toPanels.show()}},l.fade={initEffect:function(){var t=this.get("panels"),e=this.get("step");return e>1||t.length<=e?!1:void t.css({position:"absolute",opacity:0,zIndex:1}).show()},switchPanel:function(t){var e=t.fromPanels.eq(0),n=t.toPanels.eq(0),i=this;this.anim&&this.anim.stop(!1,!0),n.css("opacity",1),n.show(),t.fromIndex>-1?this.anim=e.animate({opacity:0},this.get("duration"),this.get("easing"),function(){i.anim=null,n.css("zIndex",9),e.css("zIndex",1),e.css("display","none"),i.trigger("switched",t.toIndex,t.fromIndex)}):(n.css("zIndex",9),this.trigger("switched",t.toIndex,t.fromIndex))}},l.__scroll={initPanels:function(){this.before("next",function(){this._forceNext=!0}),this.before("prev",function(){this._forcePrev=!0}),this.after("_switchTo",function(){this._forceNext=this._forcePrev=void 0});var t=this.get("panels"),e=this.get("step"),n=this.get("size"),i=this.get("circular"),s=t.length;n>=s||e>=s||!i||e==n&&s%e==0||(this._clonePanels=t.slice(0,n+1).clone(!0).addClass(this.get("classPrefix")+"-clone"),t.last().after(this._clonePanels))},initEffect:function(){var t=this.get("panels"),e=this.get("step"),n=this.get("size"),i=this.get("effect"),s=this.content,r=t.eq(0);if(t.length<=n||t.length<=e)return!1;s.css("position","relative"),"static"===s.parent().css("position")&&s.parent().css("position","relative"),i===o&&(t.css("float","left"),this._clonePanels&&this._clonePanels.css("float","left"),s.width("35791197px"));var a=this.get("viewSize");if(a||(a=[],a[0]=r.outerWidth(),a[1]=r.outerHeight(),this.set("viewSize",a)),!a)throw new Error("Please specify viewSize manually")},switchPanel:function(t){var e=this.get("effect")===o,n=this.get("viewSize")[e?0:1],s=null;this.anim&&this.anim.stop(!1,!0),s=this.get("circular")?r:i,s.call(this,t,e,n)}},l[o]=l[c]=l.__scroll}),i("switchable/switchable",function(t,e,n){var i=s.$,r=t("switchable/basic/switchable-basic"),a=t("switchable/basic/effects"),o=r.extend({attrs:{autoplay:!1,interval:5e3,circular:!1,effect:{value:"none",setter:function(t){return a[t]?t.toLowerCase():"none"}},easing:"linear",duration:500,viewSize:null,size:1,step:{value:1,getter:function(t){var e=this.get("size");return t>e?e:t}}},events:{mouseenter:function(){this.get("autoplay")&&(this.stop(),this._mouseEnterStop=!0)},mouseleave:function(){this._mouseEnterStop&&(this._mouseEnterStop=!1,this.start())}},_initPanels:function(t){o.superclass._initPanels.call(this,t);var e=this._effectFunction("initPanels").call(this,this.get("panels"));e&&this.set("panels",e)},_initEffect:function(){this._effectFunction("initEffect").call(this)===!1&&(this._ineffective=!0)},_effectFunction:function(t){var e=a[this.get("effect")];return e&&e[t]?e[t]:i.noop},_switchPanel:function(t,e){if(!this._ineffective){var n=this._getPanelInfo(t,e);this._effectFunction("switchPanel").call(this,n)}},_onRenderAutoplay:function(t){function e(){n._autoplayTimer&&(clearInterval(n._autoplayTimer),n._autoplayTimer=null)}var n=this,i=this.get("interval");t?(e(),n._autoplayTimer=setInterval(function(){n._autoplayTimer&&n.next()},i)):e()},start:function(){this.set("autoplay",!0)},stop:function(){this.set("autoplay",!1)},destroy:function(){this._effectFunction("destroy").call(this)}});n.exports=o}),s.$=FNX.__clz__["fnx/cmp/$"],s["widget/widget"]=FNX.__clz__["fnx/cmp/widget/widget"],s["easing/easing"]=FNX.__clz__["fnx/cmp/easing/easing"],FNX.__clz__["fnx/cmp/switchable/switchable"]=n("switchable/switchable")}(window),function(t){var e=new FNX.__loader__,n=e.using,i=e.namespace,e=FNX.__clz__,s={};i("switchable/carousel",function(t,e,n){function i(t){return{PREV_BTN_CLASS:t?t+"-prev-btn":"",NEXT_BTN_CLASS:t?t+"-next-btn":""}}var r=s["switchable/switchable"],a=s.$,o=r.extend({attrs:{circular:!0,autoplay:!1,prevBtn:{getter:function(t){return a(t).eq(0)}},nextBtn:{getter:function(t){return a(t).eq(0)}},disabledBtnClass:{getter:function(t){return t?t:this.get("classPrefix")+"-disabled-btn"}}},setup:function(){o.superclass.setup.call(this),this.render()},_initConstClass:function(){o.superclass._initConstClass.call(this),a.extend(this.CONST,i(this.get("classPrefix")))},_initTriggers:function(t){o.superclass._initTriggers.call(this,t);var e=this.get("prevBtn"),n=this.get("nextBtn");!e[0]&&t.prev&&(e=t.prev,this.set("prevBtn",e)),!n[0]&&t.next&&(n=t.next,this.set("nextBtn",n)),e.addClass(this.CONST.PREV_BTN_CLASS),n.addClass(this.CONST.NEXT_BTN_CLASS)},_bindTriggers:function(){o.superclass._bindTriggers.call(this);var t=this,e=this.get("circular");this.get("prevBtn").click(function(n){n.preventDefault(),(e||t.get("activeIndex")>0)&&t.prev()}),this.get("nextBtn").click(function(n){n.preventDefault();var i=t.get("length")-1;(e||t.get("activeIndex")<i)&&t.next()}),e||this.on("switch",function(e){t._updateButtonStatus(e)})},_getDatasetRole:function(){var t=o.superclass._getDatasetRole.call(this),e=o.superclass._parseDatasetRole.call(this,["next","prev"]);return a.extend(t,e),t},_updateButtonStatus:function(t){var e=this.get("prevBtn"),n=this.get("nextBtn"),i=this.get("disabledBtnClass");e.removeClass(i),n.removeClass(i),0===t?e.addClass(i):t===this.get("length")-1&&n.addClass(i)}});n.exports=o}),s["switchable/switchable"]=FNX.__clz__["fnx/cmp/switchable/switchable"],s.$=FNX.__clz__["fnx/cmp/$"],FNX.__clz__["fnx/cmp/switchable/carousel"]=n("switchable/carousel")}(window),function(t){var e=new FNX.__loader__,n=e.using,i=e.namespace,e=FNX.__clz__,s={};i("switchable/slide",function(t,e,n){var i=s["switchable/switchable"],r=i.extend({attrs:{autoplay:!0,circular:!0},setup:function(){r.superclass.setup.call(this),this.render()}});n.exports=r}),s["switchable/switchable"]=FNX.__clz__["fnx/cmp/switchable/switchable"],FNX.__clz__["fnx/cmp/switchable/slide"]=n("switchable/slide")}(window)},function(t,e){function n(){}n.prototype.init=function(t){this.nav=t.nav,this.floors=t.floors,this.offset=t.offset,this.items=this.nav.find(".item-tigger"),this.showing=!1;return this.bindItemClick(),this},n.prototype.bindItemClick=function(){var t=this,e=$("html,body");this.items.on("click",function(){var n=$(t.floors.get($(this).index()));return n.length&&e.animate({scrollTop:n.offset().top+t.offset},500),!1})},n.prototype.show=function(){if(!this.showing){this.showing=!0;var t=this;this.nav.stop().show().animate({opacity:.95},150,function(){t.nav.addClass("mall-side-nav-show")})}},n.prototype.hide=function(){if(this.showing){this.showing=!1;var t=this;this.nav.stop().removeClass("mall-side-nav-show").animate({opacity:0},300,function(){t.nav.hide()})}},n.prototype.activeFloor=function(t){if(this.showing){this.items.removeClass("item-active");for(var e=this.floors.length-1;e>=0;e--){var n=$(this.floors.get(e));if(n.length&&t>=n.offset().top-300)return void $(this.items[e]).addClass("item-active")}}},t.exports=n},function(t,e){!function(t){function e(e){var n=t(this),i=null,s=[],r=null,a=null,o=!1,c=t.extend({rowSelector:"> li",submenuSelector:"*",submenuDirection:"right",subPanel:null,tolerance:75,enter:t.noop,exit:t.noop,activate:t.noop,deactivate:t.noop,exitMenu:t.noop},e),l=3,u=300,h=function(t){s.push({x:t.pageX,y:t.pageY}),s.length>l&&s.shift()},f=function(){a&&clearTimeout(a),c.exitMenu(this)&&(i&&c.deactivate(i),i=null)},p=function(){a&&clearTimeout(a),c.enter(this),_(this)},v=function(){c.exit(this)},g=function(){d(this)},d=function(t){t!=i&&(o||(i&&c.deactivate(i),c.activate(t),i=t))},_=function(t){var e=m();e?a=setTimeout(function(){_(t)},e):d(t)},m=function(){function e(t,e){return(e.y-t.y)/(e.x-t.x)}if(!i||!t(i).is(c.submenuSelector))return 0;var a=n.offset(),o={x:a.left,y:a.top-c.tolerance},l={x:a.left+n.outerWidth(),y:o.y},h={x:a.left,y:a.top+n.outerHeight()+c.tolerance},f={x:a.left+n.outerWidth(),y:h.y},p=s[s.length-1],v=s[0];if(!p)return 0;if(v||(v=p),v.x<a.left||v.x>f.x||v.y<a.top||v.y>f.y)return 0;if(r&&p.x==r.x&&p.y==r.y)return 0;var g=l,d=f;"left"==c.submenuDirection?(g=h,d=o):"below"==c.submenuDirection?(g=f,d=h):"above"==c.submenuDirection&&(g=o,d=l);var _=e(p,g),m=e(p,d),w=e(v,g),x=e(v,d);return w>_&&m>x?(r=p,u):(r=null,0)};n.mouseleave(f).find(c.rowSelector).mouseenter(p).mouseleave(v).click(g),c.subPanel&&t(c.subPanel).each(function(){t(this).mouseenter(function(){o=!0}).mouseleave(function(){o=!1})}),t(document).mousemove(h)}t.fn.menuAim=function(t){return this.each(function(){e.call(this,t)}),this}}(jQuery)},function(t,e,n){n(1),n(3);var i=n(2),s=FNX.include("fnx/cmp/switchable/carousel"),r=FNCMS.listeners;r.once("plugin:side-nav:init",function(){var t=(new i).init({nav:$(".J_side_nav"),floors:$("[data-floor]"),offset:-200});r.on("plugin:nav-trigger:active",function(e){e.active?(t.show(),t.activeFloor(e.top)):t.hide()})}),r.on("pluin:init:nav-list",function(t){var e=$(t),n=[];e.find('[data-role="menu-sub"]').each(function(){var t=$(this),e=parseInt(t.attr("index"));isNaN(e)||(n[e]=t)}),e.menuAim({rowSelector:'[data-role="nav-item"]',subPanel:n,activate:function(t){var e=$active=$(t),i=n[e.index()];e.addClass("nav-item-hover"),i&&i.stop().addClass("menu-sub-show").animate({left:190,opacity:.95},200)},deactivate:function(t){if(t){var e=$(t),i=n[e.index()];e.removeClass("nav-item-hover"),i&&i.stop().animate({left:180,opacity:.7},200,function(){i.removeClass("menu-sub-show")})}},exitMenu:function(){return!0}})}),r.on("pluin:init:tab-switch",function(t){
var e=$(t),n=e.find('[data-role="tabs"] > *'),i=e.find('[data-role="panels"]');n.on("click",function(){var t=$(this),e=$(this).index(),s=i.find("> *");n.removeClass("item-active"),t.addClass("item-active"),s.hide(),$(s.get(e)).show()})}),r.on("pluin:init:main-slide",function(t){var e=$(t);new s({interval:5e3,element:e,effect:"fade",autoplay:!0,onSwitched:function(t,e){var n=this.get("panels");null!=e&&$(n.get(e)).removeClass("zoom-out"),$(n.get(t)).addClass("zoom-out")}})})}]);