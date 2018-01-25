//requirejs config

var host = location.host;

var version = new Date().getTime();

//if(host.indexOf("beta1.fn") !== -1 || host.indexOf("dev1.fn") !== -1 || location.hash === "#debugopen"){

	var jsBasePath = static_domain + "/product/js/";
//
//}else{
//
//	var jsBasePath = static_domain + "/product/js_build/";
//
//}

//会有部分充值对话框地方没有这些变量
var time_stamp = typeof time_stamp === "undefined" ? (Date.now()+"") : time_stamp;
var front_domain = typeof front_domain === "undefined" ? "" : front_domain;
var source_domain = typeof source_domain === "undefined" ? "feiniu.com" : source_domain;

var pathsJson = null,
	shimJson = null;

var merge = function() {
	if (arguments.length > 0) {
		var re = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			var o = arguments[i];
			for (var p in o) {
				if (o[p] != undefined) {
					re[p] = o[p];
				}
			}
		}
		return re;
	}
	return undefined;
};

shimJson = {
	"base64": {
		deps: ["jquery"],
		exports: 'BASE'
	},
	'underscore':{
	    exports: '_'
	},
	'backbone': {
	    deps: ['underscore', 'jquery'],
	    exports: 'Backbone'
	},
    "ckeditor":["lib/ckeditor/4.5.9_full/ckeditor"],
    
    "jqueryform":["lib/jquery/form/jquery.form.min"],
    
    "jqueryloadmask":["lib/jquery/jquery-loadmask/jquery.loadmask.min"],
    
	"datePicker": ["lib/DatePicker/WdatePicker"],

	"fingerprint2": ["controller/member/fingerprint2"],
	
	"imembed": {
		deps:['jquery']
	}
	

};

pathsJson = {

	css: "../css",

	idigger: "lib/idigger",

	upLogger: "lib/upLogger",

	jquery: "lib/jquery/1.11.1/jquery-1.11.1",
	
	jqueryform: "lib/jquery/form/jquery.form.min",
	
    jqueryloadmask:"lib/jquery/jquery-loadmask/jquery.loadmask.min",
	
	datePicker: "lib/DatePicker/WdatePicker",

	fingerprint2: "controller/member/fingerprint2",
	
	imembed: "//webim." + source_domain + "/webim/static/js/modules/init/im-embed",

	artdialog: "lib/artdialog/jquery.artDialog",
	
	ckeditor : "lib/ckeditor/4.5.9_full/ckeditor",

	underscore: "lib/underscore/1.8.3/underscore",

	backbone: "lib/backbone/1.2.3/backbone",

	base64: "lib/jquery/base64/jquery.base64",

	index_rush: front_domain + '/js/tpl/index_rush.tpl',

	index_floor: front_domain + '/js/tpl/index_floor.tpl',

	index_floor_tab: front_domain + '/js/tpl/index_floor_tab.tpl',

	index_recommend: front_domain + '/js/tpl/index_recommend.tpl',

	index_channel: front_domain + '/js/tpl/index_channel.tpl',

	index_brand: front_domain + '/js/tpl/index_brand.tpl',

	index_ad: front_domain + '/js/tpl/index_ad.tpl',

	pub_dist_list: front_domain + '/js/tpl/pub_dist_list.tpl',

	pub_search_autolist: front_domain + '/js/tpl/pub_search_autolist.tpl',

	pub_category: front_domain + '/js/tpl/pub_category.tpl'
};

require.config({

	waitSeconds: 2000,

	baseUrl: jsBasePath, //所有模块的查找根路径   当加载纯.js文件(依赖字串以/开头，或者以.js结尾，或者含有协议)

	paths: pathsJson,

	urlArgs: 'version=' + (host.indexOf("beta2.fn") !== -1 ? (new Date().getTime()):time_stamp), //time_stamp

	shim: shimJson
});