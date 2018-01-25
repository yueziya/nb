//bind方法兼容
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply(this instanceof fNOP ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
};
//对外抛出的埋点对象
var idigger = (function(_w) {

    //"use strict";
    var protocol = "https:" == document.location.protocol ? "https://" : "http://";
    var url_list = [];
    var config_list = [];
    var contains_page = "www.feiniu.com";

    //第三方埋点配置
    var trackConfig = {
        /**百度基础JS**/
        "baidu_h": {
            url: protocolUrl("hm.baidu.com/h.js?7f78a821324600a0f059acdb24cf0937")
        },
        /**百度推送JS**/
        "baidu_push": {
            url: protocolUrl("push.zhanzhang.baidu.com/push.js")
        },
        /**百度再营销**/
        "baidu_rt": {
            normal: function() {
                var bd_cpro_rtid = "rHcvPW0";
                addGlobalParam("bd_cpro_rtid", bd_cpro_rtid);
            },
            url: protocolUrl("cpro.baidu.com/cpro/ui/rt.js")
        },
        /**百度DSP**/
        "baidu_hm": {
            normal: function(data) {
                var baidu_id = "7f78a821324600a0f059acdb24cf0937";
                var _hmt = _hmt || [];
                _hmt.push(["_setAccount", baidu_id]);
                _hmt.push(["_trackRTEvent", data]);

                addGlobalParam("_hmt", _hmt);
            },
            url: protocolUrl("hm.baidu.com/hm.js?7f78a821324600a0f059acdb24cf0937")
        },
        /**华扬UniclickTracking**/
        "utaq": {
            normal: function() {
                var _utaq = _utaq || [];
                var utu = "https://sit.gentags.net/";
                _utaq.push(["trackPageView"]);
                _utaq.push(["enableLinkTracking"]);
                _utaq.push(["setTrackerUrl", utu + "site/unids.gif"]);
                _utaq.push(["setSiteId", "633"]);

                addGlobalParam("_utaq", _utaq);
            },
            product: function(param) {
                var _utaq = _utaq || [];
                var utu = "https://sit.gentags.net/";
                _utaq.push(["trackPageView", [param.pro_name, getCityName(), param.pro_id, param.cate_id].join("&")]);
                _utaq.push(["enableLinkTracking"]);
                _utaq.push(["setTrackerUrl", utu + "site/unids.gif"]);
                _utaq.push(["setSiteId", "633"]);

                addGlobalParam("_utaq", _utaq);
            },
            pay_offline: function(param) {
                var _utaq = _utaq || [];
                var utu = "https://sit.gentags.net/";
                _utaq.push(["trackPageView"]);
                _utaq.push(["enableLinkTracking"]);
                _utaq.push(["setCustomVariable", 1, "order_complete", [param.order_id, param.order_price, param.pro_total].join("&"), "page"]);
                _utaq.push(["setTrackerUrl", utu + "site/unids.gif"]);
                _utaq.push(["setSiteId", "633"]);

                addGlobalParam("_utaq", _utaq);
            },
            order_complete: function(param) {
                var _utaq = _utaq || [];
                var utu = "https://sit.gentags.net/";
                _utaq.push(["trackPageView"]);
                _utaq.push(["enableLinkTracking"]);
                _utaq.push(["setCustomVariable", 1, "order_complete", [param.order_id, param.order_price, param.pro_total].join("&"), "page"]);
                _utaq.push(["setTrackerUrl", utu + "site/unids.gif"]);
                _utaq.push(["setSiteId", "633"]);

                addGlobalParam("_utaq", _utaq);
            },
            url: "https://sit.gentags.net/adagent/js/uta.js"
        },
        /**华扬UniclickSearch**/
        "utaq_search": {
            register_accomplish: function() {
                var _zp_conversion_query = _zp_conversion_query || [];
                _zp_conversion_query.push(["a", "2209-043"]);
                _zp_conversion_query.push(["c", "466"]);
                _zp_conversion_query.push(["type", "6"]);
                _zp_conversion_query.push(["info", getUserName()]);

                addGlobalParam("_zp_conversion_query", _zp_conversion_query);
            },
            cart: function() {
                var _zp_conversion_query = _zp_conversion_query || [];
                _zp_conversion_query.push(["a", "2209-043"]);
                _zp_conversion_query.push(["c", "467"]);
                _zp_conversion_query.push(["type", "6"]);

                addGlobalParam("_zp_conversion_query", _zp_conversion_query);
            },
            order: function() {
                var _zp_conversion_query = _zp_conversion_query || [];
                _zp_conversion_query.push(["a", "2209-043"]);
                _zp_conversion_query.push(["c", "468"]);
                _zp_conversion_query.push(["type", "6"]);

                addGlobalParam("_zp_conversion_query", _zp_conversion_query);
            },
            pay_offline: function() {
                var _zp_conversion_query = _zp_conversion_query || [];
                _zp_conversion_query.push(["a", "2209-043"]);
                _zp_conversion_query.push(["c", "469"]);
                _zp_conversion_query.push(["type", "6"]);
                _zp_conversion_query.push(["info", getUserName()]);

                addGlobalParam("_zp_conversion_query", _zp_conversion_query);
            },
            order_complete: function() {
                var _zp_conversion_query = _zp_conversion_query || [];
                _zp_conversion_query.push(["a", "2209-043"]);
                _zp_conversion_query.push(["c", "469"]);
                _zp_conversion_query.push(["type", "6"]);
                _zp_conversion_query.push(["info", getUserName()]);

                addGlobalParam("_zp_conversion_query", _zp_conversion_query);
            },
            url: protocolUrl("cdn.zamplink.net/code/conversion.js")
        },
        /**media_V DSP埋点**/
        "mvq": {
            normal: function() {
                var _mvq = _mvq || [];
                _mvq.push(['$setAccount', 'm-239578-0']);
                _mvq.push(['$logConversion']);
                _mvq.push(['$setGeneral', '', '', getUserName(), getUserName()]); //如果不传用户名、用户id，此句可以删掉

                addGlobalParam('_mvq', _mvq);
            },
            product: function(param) {
                var _mvq = _mvq || [];
                _mvq.push(['$setAccount', 'm-239578-0']);
                _mvq.push(['$setGeneral', 'goodsdetail', '', getUserName(), getUserName()]);
                _mvq.push(['$logConversion']);
                _mvq.push(['setPageUrl', /*单品着陆页url*/ param.pro_url]); //如果不需要特意指定单品着陆页url请将此语句删掉
                _mvq.push(['$addGoods', /*分类id*/ param.cate_id, /*品牌id*/ param.brand_id, /*商品名称*/ param.pro_name, /*商品ID*/ param.pro_id, /*商品售价*/ param.pro_price, /*商品图片url*/ param.pro_img_url, /*分类名*/ param.cate_name, /*品牌名*/ param.brand_name, /*商品库存状态1或是0*/ param.pro_num, /*网络价*/ param.pro_net_price, /*收藏人数*/ param.pro_col_num, /*商品下架时间*/ param.pro_off_time]);
                _mvq.push(['$addPricing', /*价格描述*/ param.pro_desc]);
                _mvq.push(['$logData']);

                addGlobalParam('_mvq', _mvq);
            },
            register: function() {
                var _mvq = _mvq || [];
                _mvq.push(['$setAccount', 'm-239578-0']);
                _mvq.push(['$setGeneral', 'register', '', getUserName(), getUserName()]);
                _mvq.push(['$logConversion']);

                addGlobalParam('_mvq', _mvq);
            },
            register_accomplish: function() {
                var _mvq = _mvq || [];
                _mvq.push(['$setAccount', 'm-239578-0']);
                _mvq.push(['$setGeneral', 'registered', '', getUserName(), getUserName()]);
                _mvq.push(['$logConversion']);

                addGlobalParam('_mvq', _mvq);
            },
            cart: function(param) {
                var _mvq = _mvq || [];
                _mvq.push(['$setAccount', 'm-239578-0']);
                _mvq.push(['$setGeneral', 'cartview', '', getUserName(), getUserName()]);
                _mvq.push(['$logConversion']);
                _mvq.push(['$addItem', /*商品id*/ param.pro_idlist.join()]);
                _mvq.push(['$logData']);

                addGlobalParam('_mvq', _mvq);
            },
            order: function(param) {
                var _mvq = _mvq || [];
                _mvq.push(['$setAccount', 'm-239578-0']);
                _mvq.push(['$setGeneral', 'checkout', '', getUserName(), getUserName()]);
                _mvq.push(['$logConversion']);
                _mvq.push(['$addCartGoods', /*商品id*/ param.pro_idlist.join(), /*商品名称*/ param.pro_namelist.join(), /*商品价格*/ param.pro_pricelist.join(), /*商品数量*/ param.pro_numlist.join()]);
                _mvq.push(['$logData']);

                addGlobalParam('_mvq', _mvq);
            },
            pay_offline: function(param) {
                var _mvq = _mvq || [];
                _mvq.push(['$setAccount', 'm-239578-0']);
                _mvq.push(['$setGeneral', 'ordercreate', '', getUserName(), getUserName()]);
                _mvq.push(['$logConversion']);
                _mvq.push(['$addOrder', /*订单号*/ param.order_id, /*订单金额*/ param.order_price]);
                _mvq.push(['$addItem', /*订单号*/ param.order_id, /*商品id*/ param.pro_idlist.join(), /*商品名称*/ param.pro_namelist.join(), /*商品价格*/ param.pro_pricelist.join(), /*商品数量*/ param.pro_numlist.join(), /*商品页url*/ param.pro_urllist.join(), /*商品页图片url*/ param.pro_img_urllist.join()]);
                _mvq.push(['$logData']);

                addGlobalParam('_mvq', _mvq);
            },
            order_complete: function(param) {
                var _mvq = _mvq || [];
                _mvq.push(['$setAccount', 'm-239578-0']);
                _mvq.push(['$setGeneral', 'ordercreate', '', getUserName(), getUserName()]);
                _mvq.push(['$logConversion']);
                _mvq.push(['$addOrder', /*订单号*/ param.order_id, /*订单金额*/ param.order_price]);
                _mvq.push(['$addItem', /*订单号*/ param.order_id, /*商品id*/ param.pro_idlist.join(), /*商品名称*/ param.pro_namelist.join(), /*商品价格*/ param.pro_pricelist.join(), /*商品数量*/ param.pro_numlist.join(), /*商品页url*/ param.pro_urllist.join(), /*商品页图片url*/ param.pro_img_urllist.join()]);
                _mvq.push(['$logData']);

                addGlobalParam('_mvq', _mvq);
            },
            url: "https:" == document.location.protocol ? 'https://static-ssl.mediav.com/mvl.js' : 'http://static.mediav.com/mvl.js'
        },
        /**360分析代码埋点**/
        "analysis_360": {
            normal: function() {
                (function(w, n) {
                    w[n] = function() {
                        (w[n].c = w[n].c || []).push(arguments);
                    }
                })(window, '_qha');
            },
            product: function(param) {
                (function(w, n) {
                    w[n] = function() {
                        (w[n].c = w[n].c || []).push(arguments);
                    }
                    _qha('send', {
                        et: 30,
                        id: param.pro_id,
                        /*商品id, 必填项*/
                        vendorId: param.spu_id,
                        /*供应商id*/
                        name: param.pro_name,
                        /* 商品名称*/
                        price: param.pro_price,
                        /*商品现价*/
                        url: param.pro_url,
                        /*商品页面url*/
                        img: param.pro_img_url,
                        /*商品图片url*/
                        thumb: param.pro_img_url,
                        /*商品缩略图url*/
                        brand: param.brand_name,
                        /*品牌名*/
                        brandID: param.brand_id,
                        /*品牌id*/
                        category: param.one_cate + '>' + param.two_cate + '>' + param.three_cate + '>' + param.four_cate,
                        /*分类信息（共四级）*/
                        shelve: '',
                        /*商品上架时间*/
                        unshelve: param.pro_off_time,
                        /*商品下架时间*/
                        originalPrice: param.pro_net_price,
                        /*商品原价*/
                        stock: param.pro_num,
                        /*库存数量*/
                        wishlist: param.pro_col_num,
                        /*收藏人数*/
                        merchant: '',
                        /*商家名称*/
                        merchantId: '',
                        /*商家id*/
                        site: '',
                        /*站点url*/
                        logo: '',
                        /*商家Logo url*/
                        des: '',
                        /*产品描述*/
                        discount: '',
                        /*产品折扣*/
                        isDiscount: '',
                        /*是否打折*/
                        purchased: '',
                        /*已购买人数*/
                        code: '',
                        /*货币代码*/
                        region: '',
                        /*销售区域*/
                        limitPrice: '',
                        /*限时价格*/
                        limitStart: '',
                        /*限时开始时间*/
                        limitEnd: '',
                        /*限时结束时间*/
                        aDeep: '',
                        /*安卓 Deeplinkurl*/
                        iDeep: '',
                        /*IOS Deeplinkurl*/
                        mobieUrl: '' /*移动端落地页链接*/
                    });
                })(window, '_qha');
            },
            pay_offline: function(param) {
                (function(w, n) {
                    w[n] = function() {
                        (w[n].c = w[n].c || []).push(arguments);
                    }
                    _qha('send', {
                        et: 31,
                        order: [{
                            id: param.order_id,
                            /* 订单号, 必填项*/
                            itemId: param.pro_idlist.join(),
                            /*商品订单，商品ID为必填项*/
                            vendorId: '',
                            /*供应商id*/
                            orderType: 0,
                            /*订单类型,必填项*/
                            price: param.order_price,
                            /* 订单总价*/
                            com: '',
                            /* 订单佣金*/
                            state: '',
                            /* 订单状态*/
                            url: '',
                            /* 用户访问url*/
                            postage: '',
                            /* 订单邮费*/
                            address: '' /* 订单配送地址*/
                        }]
                    });
                })(window, '_qha');
            },
            order_complete: function(param) {
                (function(w, n) {
                    w[n] = function() {
                        (w[n].c = w[n].c || []).push(arguments);
                    }
                    _qha('send', {
                        et: 31,
                        order: [{
                            id: param.order_id,
                            /* 订单号, 必填项*/
                            itemId: param.pro_idlist.join(),
                            /*商品订单，商品ID为必填项*/
                            vendorId: '',
                            /*供应商id*/
                            orderType: 0,
                            /*订单类型,必填项*/
                            price: param.order_price,
                            /* 订单总价*/
                            com: '',
                            /* 订单佣金*/
                            state: '',
                            /* 订单状态*/
                            url: '',
                            /* 用户访问url*/
                            postage: '',
                            /* 订单邮费*/
                            address: '' /* 订单配送地址*/
                        }]
                    });
                })(window, '_qha');
            },
            cart: function(param) {
                (function(w, n) {
                    w[n] = function() {
                        (w[n].c = w[n].c || []).push(arguments);
                    }
                    _qha('send', {
                        et: 32,
                        goods: [{
                            id: param.pro_idlist.join(),
                            /*商品ID,必填项*/
                            vendorId: '',
                            /*供应商id*/
                            name: '',
                            /*商品名称*/
                            price: param.pro_pricelist.join(),
                            /*商品价格*/
                            quantity: param.pro_numlist.join(),
                            /*商品数量*/
                            stock: '',
                            /*商品库存*/
                            com: '',
                            /*商品佣金*/
                            img: '',
                            /*商品图片url*/
                            brand: '',
                            /*品牌名*/
                            brandID: '',
                            /*品牌id*/
                            category: '',
                            /*分类信息（共四级）*/
                            des: '' /*产品描述*/
                        }]
                    });
                })(window, '_qha');
            },
            url: protocolUrl("s.union.360.cn/73574.js")
        },
        /**晶赞DSP**/
        "zpq": {
            normal: function() {
                var _zampq = _zampq || [];
                _zampq.push(["_setAccount", "116"]);

                addGlobalParam("_zampq", _zampq);
            },
            home: function(param) {
                var _zpq = _zpq || [];
                _zpq.push(['_setPageID', '181']);
                _zpq.push(['_setPageType', 'home']);
                _zpq.push(['_setParams', getCityName()]);
                _zpq.push(['_setAccount', '116']);

                addGlobalParam('_zpq', _zpq);
            },
            channel: function(param) {
                var _zpq = _zpq || [];
                _zpq.push(['_setPageID', '384']);
                _zpq.push(['_setPageType', 'channel']);
                _zpq.push(['_setParams', getCityName(), param.one_cate_id]);
                _zpq.push(['_setAccount', '116']);

                addGlobalParam('_zpq', _zpq);
            },
            category: function(param) {
                var _zpq = _zpq || [];
                _zpq.push(['_setPageID', '183']);
                _zpq.push(['_setPageType', 'category']);
                _zpq.push(['_setParams', getCityName(), param.cate_id, param.pro_idlist.join()]);
                _zpq.push(['_setAccount', '116']);

                addGlobalParam('_zpq', _zpq);
            },
            product: function(param) {
                var _zpq = _zpq || [];
                _zpq.push(['_setPageID', '182']);
                _zpq.push(['_setPageType', 'product']);
                _zpq.push(['_setParams', getCityName(), param.pro_id, param.cate_id]);
                _zpq.push(['_setAccount', '116']);

                addGlobalParam('_zpq', _zpq);
            },
            search: function(param) {
                var _zpq = _zpq || [];
                _zpq.push(['_setPageID', '184']);
                _zpq.push(['_setPageType', 'search']);
                _zpq.push(['_setParams', getCityName(), param.key_words, param.pro_idlist.join()]);
                _zpq.push(['_setAccount', '116']);

                addGlobalParam('_zpq', _zpq);
            },
            register: function(param) {
                var _zpq = _zpq || [];
                _zpq.push(['_setPageID', '235']);
                _zpq.push(['_setPageType', 'register']);
                _zpq.push(['_setParams', getCityName()]);
                _zpq.push(['_setAccount', '116']);

                addGlobalParam('_zpq', _zpq);
            },
            register_accomplish: function(param) {
                var _zpq = _zpq || [];
                _zpq.push(['_setPageID', '236']);
                _zpq.push(['_setPageType', 'register_accomplish']);
                _zpq.push(['_setParams', getCityName()]);
                _zpq.push(['_setAccount', '116']);

                addGlobalParam('_zpq', _zpq);
            },
            cart: function(param) {
                var _zpq = _zpq || [];
                _zpq.push(['_setPageID', '186']);
                _zpq.push(['_setPageType', 'cart']);
                _zpq.push(['_setParams', getCityName(), param.pro_idlist.join()]);
                _zpq.push(['_setAccount', '116']);

                addGlobalParam('_zpq', _zpq);
            },
            order: function(param) {
                var _zpq = _zpq || [];
                _zpq.push(['_setPageID', '187']);
                _zpq.push(['_setPageType', 'order']);
                _zpq.push(['_setParams', getCityName(), param.pro_idlist.join()]);
                _zpq.push(['_setAccount', '116']);

                addGlobalParam('_zpq', _zpq);
            },
            pay_offline: function(param) {
                var _zpq = _zpq || [];
                _zpq.push(['_setPageID', '187']);
                _zpq.push(['_setPageType', 'order_complete']);
                _zpq.push(['_setParams', getCityName(), param.order_id, param.pro_idlist.join()]);
                _zpq.push(['_setAccount', '116']);

                addGlobalParam('_zpq', _zpq);
            },
            order_complete: function(param) {
                var _zpq = _zpq || [];
                _zpq.push(['_setPageID', '187']);
                _zpq.push(['_setPageType', 'order_complete']);
                _zpq.push(['_setParams', getCityName(), param.order_id, param.pro_idlist.join()]);
                _zpq.push(['_setAccount', '116']);

                addGlobalParam('_zpq', _zpq);
            },
            url: protocolUrl('cdn.zampda.net/s.js')
        },
        /**晶赞转化**/
        "zpq_con": {
            register_accomplish: function() {
                var _zp_conversion_query = _zp_conversion_query || [];
                _zp_conversion_query.push(["a", 116]);
                _zp_conversion_query.push(["c", "6f9e8ad2ca6325a6eb51dc782573092d"]);
                _zp_conversion_query.push(["type", 5]);
                _zp_conversion_query.push(["info", getUserName()]); //预留接口方便用户传递自定义信息(订单号等)

                addGlobalParam('_zp_conversion_query', _zp_conversion_query);
            },
            url: protocolUrl('cdn.zampda.net/conv.js')
        },
        /**Axis品众**/
        "axis_pz": {
            normal: function() {
                var _fxcmd = _fxcmd || [];
                _fxcmd.sid = '45bb440b881fff70f4d7f948b5eaad2a';
                _fxcmd.trackAll = false;
                addGlobalParam('_fxcmd', _fxcmd);
            },
            pay_offline: function(param) {
                var _fxcmd = _fxcmd || [];
                _fxcmd.sid = '45bb440b881fff70f4d7f948b5eaad2a';
                _fxcmd.trackAll = false;
                _fxcmd.push(['trackOrder', { oid: param.order_id, otp: '1', u_info: '', u_type: '' },
                    []
                ]);
                addGlobalParam('_fxcmd', _fxcmd);
            },
            order_complete: function(param) {
                var _fxcmd = _fxcmd || [];
                _fxcmd.sid = '45bb440b881fff70f4d7f948b5eaad2a';
                _fxcmd.trackAll = false;
                _fxcmd.push(['trackOrder', { oid: param.order_id, otp: '1', u_info: '', u_type: '' },
                    []
                ]);
                addGlobalParam('_fxcmd', _fxcmd);
            },
            url: protocolUrl("static.w3t.cn/fx/1/1/fx.js")
        },
        /**艾德思奇adsage**/
        "adsage": {
            normal: function() {
                var pubsage_conv_id = 47211;
                var pubsage_conv = pubsage_conv || [];

                addGlobalParam("pubsage_conv_id", pubsage_conv_id);
                addGlobalParam("pubsage_conv", pubsage_conv);
            },
            pay_offline: function(param) {
                // var noscript = document.createElement('noscript');
                // noscript.innerHTML = '<img src="http://t1.sagetrc.com/trc/atac/conv.gif?id=47211" width="0px" style="display:none !important;"/>';
                // document.body.appendChild(noscript);

                var pubsage_conv_id = 47211;
                var pubsage_conv = pubsage_conv || [];

                pubsage_conv.push(['setOrderInfo', [
                    [ /*订单号*/ param.order_id, /*商品号*/ "", /*商品名称*/ "", /*商品金额*/ param.order_price]
                ]]);

                addGlobalParam("pubsage_conv_id", pubsage_conv_id);
                addGlobalParam("pubsage_conv", pubsage_conv);
            },
            order_complete: function(param) {
                var pubsage_conv_id = 47211;
                var pubsage_conv = pubsage_conv || [];

                pubsage_conv.push(['setOrderInfo', [
                    [ /*订单号*/ param.order_id, /*商品号*/ "", /*商品名称*/ "", /*商品金额*/ param.order_price]
                ]]);

                addGlobalParam("pubsage_conv_id", pubsage_conv_id);
                addGlobalParam("pubsage_conv", pubsage_conv);
            },
            url: protocolUrl(pubsage_url() + "/trc/atac/conv_x.js?id=47211")
        },
        /**google GTM 统计和再营销以及再转化**/
        "ga_con": {
            normal: function() {
                var dataLayer = "";

                addGlobalParam("dataLayer", dataLayer);
            },
            "home": function() {
                var dataLayer = [{
                    "google_tag_params": {
                        ecomm_pagetype: ["home"]
                    },
                    "conversion_value": null
                }];

                addGlobalParam("dataLayer", dataLayer);
            },
            "product": function(param) {
                var dataLayer = [{
                    "google_tag_params": {
                        ecomm_pagetype: ["product"],
                        ecomm_prodid: [param.pro_id],
                        ecomm_totalvalue: [param.pro_price]
                    },
                    "conversion_value": null
                }];

                addGlobalParam("dataLayer", dataLayer);
            },
            "search": function() {
                var dataLayer = [{
                    "google_tag_params": {
                        ecomm_pagetype: ["search"]
                    },
                    "conversion_value": null
                }];

                addGlobalParam("dataLayer", dataLayer);
            },
            "cart": function() {
                var dataLayer = [{
                    "google_tag_params": {
                        ecomm_pagetype: ["shopping"]
                    },
                    "conversion_value": null
                }];

                addGlobalParam("dataLayer", dataLayer);
            },
            "pay_offline": function(param) {
                var dataLayer = [{
                    "google_tag_params": {
                        ecomm_pagetype: ["purchase"],
                        ecomm_prodid: [param.order_id],
                        ecomm_totalvalue: [param.order_price]
                    },
                    "conversion_value": null
                }];
                var google_conversion_id = 972799902;
                var google_conversion_language = "en";
                var google_conversion_format = "2";
                var google_conversion_color = "ffffff";
                var google_conversion_label = "LtadCLqB1AgQnv_uzwM";
                var google_conversion_value = param.order_price;
                var google_conversion_currency = "CNY";
                var google_remarketing_only = false;

                addGlobalParam("dataLayer", dataLayer);
                addGlobalParam("google_conversion_id", google_conversion_id);
                addGlobalParam("google_conversion_language", google_conversion_language);
                addGlobalParam("google_conversion_format", google_conversion_format);
                addGlobalParam("google_conversion_color", google_conversion_color);
                addGlobalParam("google_conversion_label", google_conversion_label);
                addGlobalParam("google_conversion_value", google_conversion_value);
                addGlobalParam("google_conversion_currency", google_conversion_currency);
                addGlobalParam("google_remarketing_only", google_remarketing_only);
            },
            "order_complete": function(param) {
                var dataLayer = [{
                    "google_tag_params": {
                        ecomm_pagetype: ["purchase"],
                        ecomm_prodid: [param.order_id],
                        ecomm_totalvalue: [param.order_price]
                    },
                    "conversion_value": null
                }];
                var google_conversion_id = 972799902;
                var google_conversion_language = "en";
                var google_conversion_format = "2";
                var google_conversion_color = "ffffff";
                var google_conversion_label = "LtadCLqB1AgQnv_uzwM";
                var google_conversion_value = param.order_price;
                var google_conversion_currency = "CNY";
                var google_remarketing_only = false;

                addGlobalParam("dataLayer", dataLayer);
                addGlobalParam("google_conversion_id", google_conversion_id);
                addGlobalParam("google_conversion_language", google_conversion_language);
                addGlobalParam("google_conversion_format", google_conversion_format);
                addGlobalParam("google_conversion_color", google_conversion_color);
                addGlobalParam("google_conversion_label", google_conversion_label);
                addGlobalParam("google_conversion_value", google_conversion_value);
                addGlobalParam("google_conversion_currency", google_conversion_currency);
                addGlobalParam("google_remarketing_only", google_remarketing_only);
            }
        }
    };

    //页面配置不同的埋点
    var pageConfig = {
        /*首页*/
        "home": function(_p) {
            var rtTag = {
                "data": {
                    "ecom_page": {
                        "page_type": "home", //页面类型
                        "p_brand": "", //品牌名称，多个品牌以|分隔
                        "p_class1": "", //一级品类
                        "p_class2": "", //二级品类
                        "p_class3": "", //三级品类
                        "p_class4": "" //四级品类
                    }
                }
            };
            trackConfig.baidu_hm["normal"] = trackConfig.baidu_hm["normal"].bind(null, rtTag);
            //trackConfig.zpq["home"] = trackConfig.zpq["home"].bind(null, _p);
        },
        /*频道页*/
        "channel": function(_p) {
            var rtTag = {
                "data": {
                    "ecom_page": {
                        "page_type": "channel", //页面类型
                        "p_brand": "", //品牌名称，多个品牌以|分隔
                        "p_class1": _p.one_cate, //一级品类
                        "p_class2": "", //二级品类
                        "p_class3": "", //三级品类
                        "p_class4": "" //四级品类
                    }
                }
            };
            trackConfig.baidu_hm["normal"] = trackConfig.baidu_hm["normal"].bind(null, rtTag);
            //trackConfig.zpq["channel"] = trackConfig.zpq["channel"].bind(null, _p);
        },
        /*馆页,品类页*/
        "category": function(_p) {
            var rtTag = {
                "data": {
                    "ecom_page": {
                        "page_type": "category", //页面类型
                        "p_brand": _p.brand_name.join("|"), //品牌名称，多个品牌以|分隔
                        "p_class1": _p.one_cate, //一级品类
                        "p_class2": _p.two_cate, //二级品类
                        "p_class3": _p.three_cate, //三级品类
                        "p_class4": _p.four_cate //四级品类
                    }
                }
            };
            trackConfig.baidu_hm["normal"] = trackConfig.baidu_hm["normal"].bind(null, rtTag);
            //trackConfig.zpq["category"] = trackConfig.zpq["category"].bind(null, _p);
        },
        /*商详页*/
        "product": function(_p) {
            var rtTag = {
                "data": {
                    "ecom_view": {
                        "prod": [{
                            "p_id": _p.pro_id,
                            "p_name": _p.pro_name,
                            "p_brand": _p.brand_name,
                            "p_price": _p.pro_price,
                            "p_class1": _p.one_cate, //一级品类
                            "p_class2": _p.two_cate, //二级品类
                            "p_class3": _p.three_cate, //三级品类
                            "p_class4": _p.four_cate, //四级品类
                            "p_stock": _p.pro_num,
                            "p_img_url": _p.pro_img_url,
                            "p_url": _p.pro_url
                        }]
                    }
                }
            };
            trackConfig.baidu_hm["normal"] = trackConfig.baidu_hm["normal"].bind(null, rtTag);
            //trackConfig.utaq["product"] = trackConfig.utaq["product"].bind(null, _p);
            //trackConfig.mvq["product"] = trackConfig.mvq["product"].bind(null, _p);
            trackConfig.analysis_360["product"] = trackConfig.analysis_360["product"].bind(null, _p);
            //trackConfig.zpq["product"] = trackConfig.zpq["product"].bind(null, _p);
            trackConfig.ga_con["product"] = trackConfig.ga_con["product"].bind(null, _p);
        },
        /*搜索页*/
        "search": function(_p) {
            var rtTag = {
                "data": {
                    "ecom_search": {
                        "word": _p.key_words,
                        "p_brand": _p.brand_name.join("|"), //品牌名称，多个品牌以|分隔
                        "p_class1": "", //一级品类
                        "p_class2": "", //二级品类
                        "p_class3": "", //三级品类
                        "p_class4": "" //四级品类

                    }
                }
            };
            trackConfig.baidu_hm["normal"] = trackConfig.baidu_hm["normal"].bind(null, rtTag);
            //trackConfig.zpq["search"] = trackConfig.zpq["search"].bind(null, _p);
        },
        /*注册页*/
        "register": function(_p) {
            //trackConfig.zpq["register"] = trackConfig.zpq["register"].bind(null, _p);
        },
        /*注册成功页*/
        "register_accomplish": function(_p) {
            var rtTag = {
                "data": {
                    "ecom_reg": {
                        "phone": _p.phone_number
                    }
                }
            };
            trackConfig.baidu_hm["normal"] = trackConfig.baidu_hm["normal"].bind(null, rtTag);
            //trackConfig.zpq["register_accomplish"] = trackConfig.zpq["register_accomplish"].bind(null, _p);
            //config_list.push(trackConfig.utaq_search);
            //config_list.push(trackConfig.zpq_con);
        },
        /*收藏页面*/
        "collect": function(_p) {
            var rtTag = {
                "data": {
                    "ecom_favor": {
                        "prod": getJsonFmt(_p.pro_idlist, _p.pro_pricelist, _p.pro_numlist)
                    }
                }
            };
            trackConfig.baidu_hm["normal"] = trackConfig.baidu_hm["normal"].bind(null, rtTag);
        },
        /*购物车*/
        "cart": function(_p) {
            var rtTag = {
                "data": {
                    "ecom_cart": {
                        "prod": getJsonFmt(_p.pro_idlist, _p.pro_pricelist, _p.pro_numlist)
                    }
                }
            };
            trackConfig.baidu_hm["normal"] = trackConfig.baidu_hm["normal"].bind(null, rtTag);
            //trackConfig.mvq["cart"] = trackConfig.mvq["cart"].bind(null, _p);
            trackConfig.analysis_360["cart"] = trackConfig.analysis_360["cart"].bind(null, _p);
            //trackConfig.zpq["cart"] = trackConfig.zpq["cart"].bind(null, _p);
            //config_list.push(trackConfig.utaq_search);
        },
        /*订单确认页*/
        "order": function(_p) {
            var rtTag = {
                "data": {
                    "ecom_order": {
                        "prod": getJsonFmt(_p.pro_idlist, _p.pro_pricelist, _p.pro_numlist)
                    }
                }
            };
            trackConfig.baidu_hm["normal"] = trackConfig.baidu_hm["normal"].bind(null, rtTag);
            //trackConfig.mvq["order"] = trackConfig.mvq["order"].bind(null, _p);
            //trackConfig.zpq["order"] = trackConfig.zpq["order"].bind(null, _p);
            //config_list.push(trackConfig.utaq_search);
        },
        /*货到付款成功页*/
        "pay_offline": function(_p) {
            var rtTag = {
                "data": {
                    "ecom_pay_offline": {
                        "order_id": _p.order_id,
                        "order_sum": _p.order_price,
                        "prod": getJsonFmt(_p.pro_idlist, _p.pro_pricelist, _p.pro_numlist)
                    }
                }
            };
            trackConfig.baidu_hm["normal"] = trackConfig.baidu_hm["normal"].bind(null, rtTag);
            //trackConfig.utaq["pay_offline"] = trackConfig.utaq["pay_offline"].bind(null, _p);
            //trackConfig.mvq["pay_offline"] = trackConfig.mvq["pay_offline"].bind(null, _p);
            trackConfig.analysis_360["pay_offline"] = trackConfig.analysis_360["pay_offline"].bind(null, _p);
            //trackConfig.zpq["pay_offline"] = trackConfig.zpq["pay_offline"].bind(null, _p);
            //trackConfig.axis_pz["pay_offline"] = trackConfig.axis_pz["pay_offline"].bind(null, _p);
            trackConfig.adsage["pay_offline"] = trackConfig.adsage["pay_offline"].bind(null, _p);
            trackConfig.ga_con["pay_offline"] = trackConfig.ga_con["pay_offline"].bind(null, _p);
            //config_list.push(trackConfig.utaq_search);
            // imgSendReq(_p.order_id, _p.order_price);
        },
        /*在线支付订单提交成功页*/
        "order_complete": function(_p) {
            var rtTag = {
                "data": {
                    "ecom_pay_submit": {
                        "order_id": _p.order_id,
                        "order_sum": _p.order_price,
                        "prod": getJsonFmt(_p.pro_idlist, _p.pro_pricelist, _p.pro_numlist)
                    }
                }
            };
            trackConfig.baidu_hm["normal"] = trackConfig.baidu_hm["normal"].bind(null, rtTag);
            //trackConfig.utaq["order_complete"] = trackConfig.utaq["order_complete"].bind(null, _p);
            //trackConfig.mvq["order_complete"] = trackConfig.mvq["order_complete"].bind(null, _p);
            trackConfig.analysis_360["order_complete"] = trackConfig.analysis_360["order_complete"].bind(null, _p);
            //trackConfig.zpq["order_complete"] = trackConfig.zpq["order_complete"].bind(null, _p);
            //trackConfig.axis_pz["order_complete"] = trackConfig.axis_pz["order_complete"].bind(null, _p);
            trackConfig.adsage["order_complete"] = trackConfig.adsage["order_complete"].bind(null, _p);
            trackConfig.ga_con["order_complete"] = trackConfig.ga_con["order_complete"].bind(null, _p);
            //config_list.push(trackConfig.utaq_search);
            // imgSendReq(_p.order_id, _p.order_price);
        },
        /*在线支付成功页*/
        "pay_online": function(_p) {
            var rtTag = {
                "data": {
                    "ecom_pay_online": {
                        "order_id": _p.order_id,
                        "order_sum": _p.order_price,
                        "prod": getJsonFmt(_p.pro_idlist, _p.pro_pricelist, _p.pro_numlist)
                    }
                }
            };
            trackConfig.baidu_hm["normal"] = trackConfig.baidu_hm["normal"].bind(null, rtTag);
        }
    };

    //PV 第三方埋点上报
    var init = function(param) {

        /*所有页面的公共埋点 走normal*/
        //config_list.push(trackConfig.baidu_h);
        (window.location.href.indexOf(contains_page) != -1) && config_list.push(trackConfig.baidu_push); //只限www二级域名才执行
        //config_list.push(trackConfig.baidu_rt);
        //config_list.push(trackConfig.baidu_hm);
        //config_list.push(trackConfig.utaq);
        //config_list.push(trackConfig.mvq);
        config_list.push(trackConfig.analysis_360);
        //config_list.push(trackConfig.zpq);
        //config_list.push(trackConfig.axis_pz);
        config_list.push(trackConfig.adsage);
        //config_list.push(trackConfig.ga_con);

        var page = param && param.type;

        pageConfig[page] && pageConfig[page](param);

        for (var i = 0, len = config_list.length, item; i < len; i++) {

            item = config_list[i];

            item[page] ? item[page]() : (item["normal"] && item["normal"]());

            item.url && url_list.push(item.url);

        }

        (function load() {

            url_list.length && loadScript(url_list.shift(), load);

        })();

        //gtmFun();
    };

    //EVENT 第三方埋点触发动作
    var fire = function(param) {
        var eventConfig = {
            /*点击加入购物车*/
            "add_cart": function(_p) {
                var rtTag = {
                    "data": {
                        "ecom_cart": {
                            "prod": [{
                                "p_id": _p.pro_id,
                                "p_price": _p.pro_price
                            }]
                        }
                    }
                };
                //_hmt.push(["_trackRTEvent", rtTag]);
            },
            /*点击收藏商品*/
            "add_collect": function(_p) {
                var rtTag = {
                    "data": {
                        "ecom_favor": {
                            "prod": [{
                                "p_id": _p.pro_id,
                                "p_price": _p.pro_price
                            }]
                        }
                    }
                };
                //_hmt.push(["_trackRTEvent", rtTag]);
            },
            /*点击注册完成*/
            "register_accomplish": function() {
                //_utaq.push(["trackEvent", "redBtn"]);
            }
        };

        param.type && eventConfig[param.type] && eventConfig[param.type](param);
    };

    //异步逐一加载js文件
    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) { //若为uninitialized 为IE版本浏览器
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback && callback();
                }
            };
        } else { //若为undefined 为非IE版本浏览器
            script.onload = function() {
                callback && callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    //给url添加协议头部
    function protocolUrl(url) {
        return protocol + url;
    }

    //获取cookie中的值
    function getCookie(sName) {
        var regRes = document.cookie.match(new RegExp("(^| )" + sName + "=([^;]*)(;|$)"));
        return (regRes != null) ? unescape(regRes[2]) : '';
    }

    //获取用户名
    function getUserName() {
        return getCookie("fn_username_for_js") != null ? getCookie("fn_username_for_js") : "";
    }

    //获取城市地区
    function getCityName() {
        return getCookie("C_dist") != null ? getCookie("C_dist").split("_")[1] : "CS000016";
    }

    //遍历输出json格式
    function getJsonFmt(ids, prices, nums) {
        var list = [];
        for (var i = 0; i < ids.length; i++) {
            list.push({ "p_id": ids[i], "p_price": prices[i], "p_num": nums[i] });
        }
        return list;
    }

    //GTM代码 函数
    function gtmFun() {
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-TP5WBG');
    }

    //img形式发请求
    function imgSendReq(id, price) {
        (function() {
            var url = "http://ut.gtags.net/imp/conv?allow=0&a=116&c=6dab3808cea6aef9e5da398af7b8e76e&type=23&info=" + [id, price].join();
            var img = document.createElement("img");
            img.src = url;
            img.onload = img.onerror = function() {
                document.body.removeChild(this);
            }
            document.body.appendChild(img);
        })();
    }

    //艾德思奇adsage pubsage_url
    function pubsage_url() {
        var pubsage_sign = "";
        var pubsage_url = "";
        var url = window.location.href;
        var domain = document.domain;
        var mat = url.match(/adtiid=([^&#]*)/);
        var iid = mat ? mat[1] : "";
        if (iid == "" || typeof(iid) == "undefined") {
            var uid = function(cookiekey) {
                var strCookie = document.cookie;
                var arrCookie = strCookie.split(";");
                var value = "";
                for (var i = 0; i < arrCookie.length; i++) {
                    var arr = arrCookie[i].split("=");
                    if (cookiekey == arr[0].replace(/(^\s*)|(\s*$)/g, "")) {
                        value = arr[1];
                        break;
                    }
                }
                return value;
            }("_ws_uid");
            if (uid == "" || typeof(uid) == "undefined") {
                pubsage_url = "tca.sagetrc.com";
            } else {
                var strAry = domain.split(".");
                var host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
                var pf = uid.split(".");
                if (pf[0] == "tqh") {
                    pubsage_url = "tqh_" + pubsage_sign + "." + host;
                }
                if (pf[0] == "tgg") {
                    pubsage_url = "tgg_" + pubsage_sign + "." + host;
                }
                if (pf[0] == "tsg") {
                    pubsage_url = "tsg_" + pubsage_sign + "." + host;
                }
                if (pf[0] == "tdsp") {
                    pubsage_url = "tdsp_" + pubsage_sign + "." + host;
                }
                if (pf[0] != "tsg" && pf[0] != "tgg" && pf[0] != "tqh" && pf[0] != "tdsp") {
                    pubsage_url = "trc_" + pubsage_sign + "." + host;
                }
            }
        } else {
            if (iid.match("^g") != null) {
                pubsage_url = "tgg.sagetrc.com";
            }
            if (iid.match("^q") != null) {
                pubsage_url = "tqh.sagetrc.com";
            }
            if (iid.match("^s") != null) {
                pubsage_url = "tsg.sagetrc.com";
            }
            if (iid.match("^d") != null) {
                pubsage_url = "tdsp.sagetrc.com";
            }
            if (iid.match("^g|^q|^s|^d") == null) {
                pubsage_url = "t1.sagetrc.com";
            }
        }
        return pubsage_url;
    }

    //添加参数到window对象
    function addGlobalParam(key, value) {
        !_w[key] && (_w[key] = value);
    }

    return {
        init: init,
        fire: fire
    };

})(window);
