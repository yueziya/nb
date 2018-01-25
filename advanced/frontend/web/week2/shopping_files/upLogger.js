/*************************************************
 *  name frontEnd   采集用户局部数据post发送服务器进行用户转化率分析！
 *  Copyright frontEnd
 *  Designed and built by frontEnd  @japin.pan
 *  date 2014/11/03
 *  update 2016/04/26
 ************************************************/
;
(function(window, document, body, $, undefined) {

    if (window.upLogger) {

        return;

    }

    //日志记录类
    var upLoggerUtil = {

        //新版首页event事件标识
        indexEvent: ['data-ttLog', 'data-ttReg', 'data-ttCity', 'data-ttMyfn', 'data-ttCard', 'data-ttMbcb', 'data-ttPhfn', 'data-ttHpct', 'data-tcbicon', 'data-ttPmall'],

        //页面内容ID获取 判断页面所属所用
        pageID: ['list.', '/item', '/edm', '/market', 'campaign.', 'shop.', 'member.', 'search.', 'pay.', 'buy.', '/mpage_clothing', '/mpage/1', '/mpage/2', '/acts', '/cbrand', '/brand', '/sitemap'],
        //页面源文件大小
        page_byte_length: (typeof current_page_length !== "undefined") ? current_page_length : 0,

        //获取域名
        fnDomain: document.domain,
        //获取协议头
        serverAddHost: document.location.protocol,
        //preview环境
        isPreview: (typeof isPreviewSite !== "undefined") ? isPreviewSite : 0,
        //控制开关
        isUplogger: (typeof IS_UPLOGGER_NO !== "undefined" && IS_UPLOGGER_NO === true) ? false : true,

        GUID: "guid", //全站唯一标识 用于统计
        FLT: "first_login_time", //第一次访问着陆时间 供BI使用
        ACCESS: "access", //在某一会话中访问次数 供BI使用
        EXPIRES: 365, //365为一年
        PATH: "/", //当前路径
        DOMAIN: (typeof www_domain_sub !== "undefined") ? www_domain_sub : ".feiniu.com", //全站域名
        //初始化事件
        init: function() {
            if(!(this.getCookie(this.GUID) && this.getCookie(this.FLT) && this.getCookie(this.ACCESS))) {
                this.tk_guid_cookie();
                this.tk_flt_cookie();
                this.tk_access_cookie();
            }
        },

        //获取服务器地址10.200.42.1:8089/10.201.193.157:8080/track01.feiniu.com
        serverAdd: function() {
            var serverAddUrl = '';
            if (upLoggerUtil.fnDomain.indexOf('feiniu.com') != -1) { //track01.feiniu.com(preview和online)
                // if (upLoggerUtil.isPreview) {
                //     serverAddUrl = upLoggerUtil.serverAddHost + '//10.201.193.157:8080/CollectLogs/AddLog';
                // }else {
                    serverAddUrl = upLoggerUtil.serverAddHost + '//track01.feiniu.com/CollectLogs/AddLog';
                // }
            } else { //cloud1.beta2.fn(beta2)或track01.beta2.fn(beta2) track01.beta1.fn(beta1)
                serverAddUrl = upLoggerUtil.serverAddHost + '//track01.' + location.host.substr(0, location.host.lastIndexOf(".")).substr(location.host.substr(0, location.host.lastIndexOf(".")).lastIndexOf(".")+1) + '.fn/CollectLogs/AddLog';
            }
            return serverAddUrl;
        },

        //第一次访问着陆时间方法
        tk_flt_return: function() {
            return (new Date()).getTime();
        },
        //在某一会话中访问初始次数方法
        tk_access_return: function() {
            return 1;
        },
        //存储guid
        tk_guid_cookie: function() {
            this.setCookie(this.GUID, tk_guid_return(), this.EXPIRES, this.PATH, this.DOMAIN);
        },
        //存储FIRSTLOGINTIME
        tk_flt_cookie: function() {
            this.setCookie(this.FLT, this.tk_flt_return(), this.EXPIRES, this.PATH, this.DOMAIN);
        },
        //存储ACCESS
        tk_access_cookie: function() {
            this.setCookie(this.ACCESS, this.tk_access_return(), this.EXPIRES, this.PATH, this.DOMAIN);
        },

        //当前36位格式时间戳+4位快照ID
        timeSP_kzID: (+new Date()) + tk_guid_return(4, 62),
        //半自动打点（目前首页可通用其他页）
        autoUplogger: function() {
            var self = this,
                attrMark = {
                    page_type: $.trim($('meta[name="tp-pagetype"]').attr("content")), //获取页面类型
                    page_id: $.trim($('meta[name="tp-pageid"]').attr("content")), //获取页面id 没有id 就为0
                    tp_area: "tp-area", //目前挂件（或手写）区块自定义属性
                    tp_childarea: "tp-childarea", //手写子级区块自定义属性
                    tp_area_a : "tp-area-a", //生成当前mousedown对象 资源位信息
                    tp_area_a_len : "tp-area-a-len", //生成当前子级区域 a数量
                    url_key: "tp", //url拼接key值
                    ck_obj: "a:visible, area, button.J_btn_search, i.J_close_distpop, input#btnSearchResult, span.J-price-btn", //当前mousedown对象 可扩展
                    ck_href: "href", //当前mousedown对象 属性href
                    tm_kz_id: self.timeSP_kzID //当前36位格式时间戳+快照ID
                };

            //如果页面未定义页面类型 返回不做任何动作
            if (!attrMark.page_type && !attrMark.page_id) return;

            //初始化搜索按钮分配位标
            for (var i = 0; i < $("button.J_btn_search").length; i++) {
                getTp($("button.J_btn_search").eq(i));
            }
            //利用委托事件触发当前对象
            $(document).on("mousedown", attrMark.ck_obj, function() {
                getTp($(this));
            });

            //当前操作
            function getTp($obj) {
                var existTp = $obj.attr(attrMark.tp_area_a);
                //如果已经存在属性tp-area-a
                if (existTp && (existTp.indexOf(attrMark.page_type + "." + attrMark.page_id) > -1)) {
                    existTp = $.trim(existTp) + "." + attrMark.tm_kz_id;
                    var existHref = $.trim($obj.attr(attrMark.ck_href)),
                        existUrlTp = self.getUrlParam(existHref, attrMark.url_key);
                    //校验正确性
                    existUrlTp != existTp && $obj.attr(attrMark.ck_href, self.resetHref(existHref, attrMark.url_key, existTp));
                    return;
                }
                var tp = $obj.closest('[' + attrMark.tp_area + ']'),
                    tp_val = $.trim(tp.attr(attrMark.tp_area));
                //如果该区块未定义埋点标记
                if (!tp.length || !tp_val.length) return;
                var tpc = $obj.closest('[' + attrMark.tp_childarea + ']', tp),
                    tpc_val = $.trim(tpc.attr(attrMark.tp_childarea)),
                    ind = {"i": 1}, num = 0;
                //如果存在子节点
                if (tpc.length && tp_val.length) {
                    tp_val += ("-" + tpc_val);
                    var ckObj = tpc.find(attrMark.ck_obj);
                    ckObj.each(function(i, v) {
                        if ($(this).closest('[' + attrMark.tp_childarea + ']')[0] == tpc[0]) {
                            changeHref($(this), tp_val, ind);
                            ++num;
                        }
                    })
                    //子级区域添加a长度
                    tpc.attr(attrMark.tp_area_a_len, num);
                } else {
                    var ckObj = tp.find(attrMark.ck_obj);
                    ckObj.each(function(i, v) {
                        var tpc = $(this).closest('[' + attrMark.tp_childarea + ']', tp),
                            tpc_val = $.trim(tpc.attr(attrMark.tp_childarea));
                        if (($(this).closest('[' + attrMark.tp_area + ']')[0] == tp[0]) && (!tpc.length || !tpc_val.length)) {
                            changeHref($(this), tp_val, ind);
                            ++num;
                        }
                    })
                    //一级区域添加a长度
                    tp.attr(attrMark.tp_area_a_len, num);
                }
            }

            //变更url
            function changeHref($obj, tp_val, ind) {
                var i = ind.i,
                    objHref = $.trim($obj.attr(attrMark.ck_href)),
                    tpa_val = attrMark.page_type + "." + attrMark.page_id + "." + tp_val + "." + i;
                $obj.attr(attrMark.tp_area_a, tpa_val);
                $obj.attr(attrMark.ck_href, self.resetHref(objHref, attrMark.url_key, tpa_val + "." + attrMark.tm_kz_id));
                ind.i = ++i;
            }

        },

        //重置url参数值
        resetHref: function(url, key, value) {
            if (!url || !key || !value) return;
            if ((url.indexOf("javascript:") > -1) || !url.indexOf("#") || !url) return url;
            var curUrl = url.split("#")[0];
            if ((curUrl.lastIndexOf("?") === (curUrl.length - 1)) || (curUrl.lastIndexOf("&") === (curUrl.length - 1))) {
                curUrl = curUrl.substr(0, curUrl.length - 1);
            }
            if (curUrl.indexOf("?") > -1) {
                if (curUrl.indexOf("?" + key + "=") > -1 || curUrl.indexOf("&" + key + "=") > -1) {
                    var val = this.getUrlParam(curUrl, key);
                    curUrl = curUrl.replace(key + "=" + val, key + "=" + value);
                } else {
                    curUrl += "&" + key + "=" + value;
                }
            } else {
                curUrl += "?" + key + "=" + value;
            }
            url.indexOf("#") > -1 ? url = curUrl + url.substr(url.indexOf("#")) : url = curUrl;
            return url;
        },

        //获取url参数值
        getUrlParam: function(url, key) {
            var re = new RegExp(key + '=([^&]*)(?:&)?');
            return url.match(re) && url.match(re)[1];
        },

        //设置cookie信息
        setCookie: function(sName, sValue, oExpires, sPath, sDomain, bSecure) {

            var currDate = new Date(),
                sExpires = typeof oExpires == 'undefined' ? '' : ';expires=' + new Date(currDate.getTime() + (oExpires * 24 * 60 * 60 * 1000)).toUTCString();

            document.cookie = sName + '=' + sValue + sExpires + ((sPath == null) ? '' : (' ;path=' + sPath)) + ((sDomain == null) ? '' : (' ;domain=' + sDomain)) + ((bSecure == true) ? ' ; secure' : '');

        },

        //获取cookie信息
        getCookie: function(sName) {

            var regRes = document.cookie.match(new RegExp("(^| )" + sName + "=([^;]*)(;|$)"));

            return (regRes != null) ? unescape(regRes[2]) : '';

        },

        // 参数转化方法
        getParam: function(obj) {

            //定义变量retVal
            var retVal = null;

            //如果obj参数存在
            if (obj) {

                //如果obj参数为字符串或数字时
                if (upLoggerUtil.isString(obj) || upLoggerUtil.isNumber(obj)) {

                    retVal = obj;

                } else {

                    //如果obj参数为js对象
                    if (upLoggerUtil.isObject(obj)) {

                        //定义临时变量tmpStr
                        var tmpStr = '';

                        //遍历js对象属性
                        for (var key in obj) {

                            //属性值不为空
                            if (obj[key] != null && obj[key] != undefined) {

                                //定义临时数组对象tmpObj
                                var tmpObj = obj[key];

                                //判断是不是数组
                                if (upLoggerUtil.isArray(tmpObj)) {

                                    //将临时数组用\t隔开转化为字符串
                                    tmpObj = tmpObj.join('\t'); //\\x001

                                } else {

                                    //判断是不是日期
                                    if (upLoggerUtil.isDate(tmpObj)) {

                                        //转化为日期字符串
                                        tmpObj = tmpObj.getTime();

                                    }

                                }

                                //将数组转化为字符串
                                tmpStr += tmpObj + '\t';

                            }

                        }

                        //去掉最后一个;符号
                        tmpStr = tmpStr.substring(0, tmpStr.length - 1);

                        //赋给retVal
                        retVal = tmpStr;

                    } else {

                        //判断是不是数组
                        if (upLoggerUtil.isArray(obj)) {

                            //如果存在
                            if (obj.length && obj.length > 0) {

                                //将数组用\t隔开转化为字符串
                                retVal = obj.join('\t');

                            }

                        } else {

                            //其他类型直接转化为字符串
                            retVal = obj.toString();

                        }

                    }

                }

            }

            //如果retVal不为空
            if (!retVal) {

                retVal = '';

            }

            return retVal;

        },

        // 判断是不是String类型
        isString: function(obj) {

            return (obj != null) && (obj != undefined) && (typeof obj == 'string') && (obj.constructor == String);

        },

        // 判断是否是数字
        isNumber: function(obj) {

            return (typeof obj == 'number') && (obj.constructor == Number);

        },

        // 判断是否是日期
        isDate: function(obj) {

            return obj && (typeof obj == 'object') && (obj.constructor == Date);

        },

        //判断是否是数组
        isArray: function(obj) {

            return obj && (typeof obj == 'object') && (obj.constructor == Array);

        },

        //判断是否是对象
        isObject: function(obj) {

            return obj && (typeof obj == 'object') && (obj.constructor == Object);

        },

        // 去除左右两边空格
        trim: function(str) {

            return str.replace(/(^\s*)|(\s*$)/, "");

        },

        //进入飞牛网任何页面 站外的链接
        getInboundRefer: function() {

            var reqRefer = decodeURI(this.trim(document.referrer));

            var returnRefer = '';

            if (reqRefer.indexOf(upLoggerUtil.fnDomain) == -1) {

                if (reqRefer == '') {

                    returnRefer = '-';

                }

                if (reqRefer != '') {

                    returnRefer = reqRefer;

                }

            } else {

                returnRefer = '-';

            }

            return returnRefer;

        },

        // 获取上游页面信息
        getRefer: function() {

            var reqRefer = decodeURI(this.trim(document.referrer));

            if (reqRefer == '') {

                reqRefer = '-';

            } else {

                reqRefer = reqRefer;

            }

            return reqRefer;

        },

        //获取当前请求url
        getRequestUrl: function() {

            return decodeURI(this.trim(document.URL));

        },

        //获取坐标
        getPos: function(e) {

            var e = e || window.event;

            var x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
                y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);

            return x + '|' + y;

        },

        //获取登录后cookie里面的用户ID
        getUserID: function() {

            var sUserId = '';

            if (document.cookie.indexOf('fn_username_for_js=') == -1) {

                sUserId = '';

            } else {

                sUserId = this.getCookie('fn_username_for_js');

            }

            return sUserId;

        },

        //获取各类型页面ID
        getUrlID: function(url) {

            var url = this.trim(url);

            //比如http://www.feiniu.com/category/C12785
            //取出C12785前/的索引值
            if (url.lastIndexOf('?') != -1) {
                var lastwh = url.lastIndexOf('?');
                url = url.substring(0, lastwh);
            }           
            var lastIndex = url.lastIndexOf('/');
            //取出C12785的值
            var idNum = url.substring(lastIndex + 1);

            //特殊情况比如http://www.feiniu.com/category/C12785/ 最后是一个/
            if (idNum == '' || idNum.indexOf("?") != -1) {

                url = url.substring(0, lastIndex);

                lastIndex = url.lastIndexOf('/');

                idNum = url.substring(lastIndex + 1);

            }

            return idNum;

        },

        //获取search左侧分类ID
        getSearchCateID: function(str) {

            var lastIndex = str.lastIndexOf('=');

            var searchCateId = str.substring(lastIndex + 1);

            return searchCateId;

        },

        //获取商品列表页商品ID
        getProID: function(str) {

            var lastIndex = str.lastIndexOf('_');

            var searchCateId = str.substring(lastIndex + 1);

            return searchCateId;

        },

        //性能数据
        performanceTracer: function() {

            var jsonData;

            //判断该浏览器是否支持performance api
            if (!('performance' in window)) {

                jsonData = '';

            } else {

                var wp = window.performance,
                    pt = wp.timing;

                var propItems = ['navigationStart', 'unloadEventStart', 'unloadEventEnd', 'redirectStart', 'redirectEnd', 'fetchStart', 'domainLookupStart', 'domainLookupEnd', 'connectStart', 'connectEnd', 'secureConnectionStart', 'requestStart', 'responseStart', 'responseEnd', 'domLoading', 'domInteractive', 'domContentLoadedEventStart', 'domContentLoadedEventEnd', 'domComplete', 'loadEventStart', 'loadEventEnd'];

                jsonData = "{";

                for (var i = 0; i < propItems.length; i++) {

                    if (pt[propItems[i]] == "undefined" || pt[propItems[i]] == null) {
                        pt[propItems[i]] = 0;
                    }

                    jsonData += "'pt"+(i + 1)+"':"+pt[propItems[i]]+",";

                }

                jsonData = jsonData.substring(0, jsonData.length - 1);
                jsonData += "}";

            }
            //jsonData = JSON.parse(JSON.stringify(jsonData));
            return jsonData;

        }

    };

    //全站唯一标识方法或生成快照ID
    function tk_guid_return(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
            uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
            return uuid.join('');
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 25; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return uuid.join('') + (+new Date()).toString(16);
        }
    }

    //初始化种guid等全局cookie
    upLoggerUtil.init();

    var loggerMethod = {

        sparam: {

            inbRefUrl: upLoggerUtil.getInboundRefer(), //session着陆页的来源url(站外来源)

            curRefUrl: upLoggerUtil.getRefer(), //来源页url

            uId: upLoggerUtil.getUserID(), //获取用户的ID

            pageAreaLabel: '', //页面区域标签

            trackType: '', //Track的行为类别

            trackTagName: '', //Track的栏位码名称，唯一定位资源栏位位置

            funType: '', //栏位资源所属业务类型

            sr: window.screen.width + '|' + window.screen.height, //屏幕分辨率

            xyPos: '', //页面坐标位置

            delayTime: '', //performance一系列时间元数据

            pageContentId: '', //页面内容ID

            forwardUrl: '-', //向前页url

            city: '', //送货地区

            abTest: '', //备用字段

            requestUrl: upLoggerUtil.getRequestUrl(), //当前请求页面url

            field1: upLoggerUtil.timeSP_kzID,

            field2: '',

            file_size: 0 //五大页面源文件大小（字节数单位B）

        },

        // 日志发送方法
        ajaxRequest: function(url, params) {

            //定义url参数变量和日期
            var urlParam = '';

            //如果参数存在
            if (params) {

                //将参数转化为字符串形式 false表示不编码也不加密 反之
                urlParam = upLoggerUtil.getParam(params);

                urlParam = (urlParam == '') ? urlParam : (urlParam);

                urlParam = encodeURI(urlParam);

            }

            //将参数转化为数组
            var typeArr = urlParam.split('%09'); //%09为\t编码值

            //url = url + upLoggerUtil.timeStamp;

            upLoggerUtil.isUplogger && $.ajax({

                type: "get",

                dataType: "jsonp",

                jsonp: "callback",

                contentType: "application/x-www-form-urlencoded; charset=utf-8",

                url: url,

                data: {

                    "type": typeArr[4],

                    "context": decodeURI(urlParam)

                },

                success: function(backdata) {},

                complete: function(xhr, ts) {},

                error: function(err) {}

            });

        },

        //接收LINK参数方法upLoggerUtil.performanceTracer()
        acceptLinkParams: function(track_type, track_tag_name, function_type, delay_time, back_value, fileSize) {

            try {

                //将对应参数赋予变量
                var sparams = loggerMethod.sparam;

                sparams.trackType = track_type;
                sparams.trackTagName = track_tag_name;
                sparams.funType = function_type;
                sparams.forwardUrl = '-';

                var cityName = '';
                if (document.cookie.indexOf('C_dist=') == -1) {

                    cityName = '上海';

                } else {

                    var is_has = $.trim($('body').find('[str=' + upLoggerUtil.getCookie('C_dist') + ']').eq(0).text());

                    if (is_has == "") {

                        cityName = upLoggerUtil.getCookie('C_dist').split("_")[1];

                    } else {

                        cityName = is_has;

                    }

                }
                sparams.city = cityName;

                if (typeof back_value == 'undefined' || back_value == '' || back_value == null) {
                    sparams.pageContentId = '';
                } else {
                    sparams.pageContentId = back_value;
                }
                if (typeof delay_time == 'undefined' || delay_time == '' || delay_time == null) {
                    sparams.delayTime = '';
                } else {
                    sparams.delayTime = delay_time;
                }
                if (typeof fileSize == 'undefined' || fileSize == '' || fileSize == null || fileSize == 0) {
                    sparams.file_size = 0;
                } else {
                    sparams.file_size = fileSize;
                }
                loggerMethod.ajaxRequest(upLoggerUtil.serverAdd(), sparams);

            } catch (error) {

            }

        },

        //接收EVENT参数方法
        acceptEventParams: function(obj_this, page_area_tag, track_type, track_tag_name, function_type, e, back_value) {

            try {

                var that = obj_this,
                thatTarget = $.trim(obj_this.attr('target')),
                thatHref = $.trim(obj_this.attr('href'));

                //将对应参数赋予变量
                var sparams = loggerMethod.sparam;

                sparams.trackType = track_type;
                sparams.trackTagName = track_tag_name;
                sparams.funType = function_type;
                sparams.delayTime = '';

                var cityName = '';
                if (document.cookie.indexOf('C_dist=') == -1) {

                    cityName = '上海';

                } else {

                    var is_has = $.trim($('body').find('[str=' + upLoggerUtil.getCookie('C_dist') + ']').eq(0).text());

                    if (is_has == "") {

                        cityName = upLoggerUtil.getCookie('C_dist').split("_")[1];

                    } else {

                        cityName = is_has;

                    }

                }
                sparams.city = cityName;

                //判断参数e存不存在
                if (typeof e == 'undefined' || e == '' || e == null) {
                    sparams.xyPos = '';
                } else {
                    sparams.xyPos = upLoggerUtil.getPos(e);
                }

                //判断参数back_value存不存在
                if (typeof back_value == 'undefined' || back_value == '' || back_value == null) {
                    sparams.pageContentId = '';
                } else {
                    sparams.pageContentId = back_value;
                }

                //判断参数page_area_tag存不存在
                if (typeof page_area_tag == 'undefined' || page_area_tag == '' || page_area_tag == null) {
                    sparams.pageAreaLabel = '';
                } else {
                    sparams.pageAreaLabel = page_area_tag;
                }

                if (sparams.file_size) {
                    sparams.file_size = 0;
                }

                if (thatHref.indexOf("://") != -1) {
                    sparams.forwardUrl = thatHref;
                    if (thatTarget == '_blank') {
                        loggerMethod.ajaxRequest(upLoggerUtil.serverAdd(), sparams);
                    } else {
                        var urlStr = upLoggerUtil.getParam(sparams);
                        window.name = window.name + '|%' + urlStr;
                    }
                } else {
                    sparams.forwardUrl = "-";
                    loggerMethod.ajaxRequest(upLoggerUtil.serverAdd(), sparams);
                }

            } catch (error) {

            }

        },

        //为了查阅方便主动查询指定url信息
        acceptRequestUrl: function(urlName) {

            //判断该浏览器是否支持performance api
            if (!('performance' in window) || !('getEntriesByType' in window.performance) || !(window.performance.getEntriesByType('resource') instanceof Array)) {

                return;

            } else {

                var pr = window.performance.getEntriesByType('resource');
                var dt = 0,
                    console_url = '';

                if (typeof urlName == 'undefined' || urlName == '' || urlName == null) {

                    for (var i = 0; i < pr.length; i++) {

                        if (pr[i].initiatorType == 'xmlhttprequest') {

                            dt += pr[i].duration;
                            console_url += 'connectEnd:' + pr[i].connectEnd + '\n' +
                                'connectStart:' + pr[i].connectStart + '\n' +
                                'domainLookupEnd:' + pr[i].domainLookupEnd + '\n' +
                                'domainLookupStart:' + pr[i].domainLookupStart + '\n' +
                                'duration:' + pr[i].duration + '\n' +
                                'fetchStart:' + pr[i].fetchStart + '\n' +
                                'name:' + pr[i].name + '\n' +
                                'redirectEnd:' + pr[i].redirectEnd + '\n' +
                                'redirectStart:' + pr[i].redirectStart + '\n' +
                                'requestStart:' + pr[i].requestStart + '\n' +
                                'responseEnd:' + pr[i].responseEnd + '\n' +
                                'responseStart:' + pr[i].responseStart + '\n' +
                                'secureConnectionStart:' + pr[i].secureConnectionStart + '\n' +
                                'startTime:' + pr[i].startTime + '\n';
                            console_url += '--------------------------------------------------------' + '\n';

                        }

                    }

                } else {

                    for (var i = 0; i < pr.length; i++) {

                        if (pr[i].name.indexOf(urlName) != -1) {

                            dt += pr[i].duration;
                            console_url += 'connectEnd:' + pr[i].connectEnd + '\n' +
                                'connectStart:' + pr[i].connectStart + '\n' +
                                'domainLookupEnd:' + pr[i].domainLookupEnd + '\n' +
                                'domainLookupStart:' + pr[i].domainLookupStart + '\n' +
                                'duration:' + pr[i].duration + '\n' +
                                'fetchStart:' + pr[i].fetchStart + '\n' +
                                'name:' + pr[i].name + '\n' +
                                'redirectEnd:' + pr[i].redirectEnd + '\n' +
                                'redirectStart:' + pr[i].redirectStart + '\n' +
                                'requestStart:' + pr[i].requestStart + '\n' +
                                'responseEnd:' + pr[i].responseEnd + '\n' +
                                'responseStart:' + pr[i].responseStart + '\n' +
                                'secureConnectionStart:' + pr[i].secureConnectionStart + '\n' +
                                'startTime:' + pr[i].startTime + '\n';
                            console_url += '--------------------------------------------------------' + '\n';

                        }

                    }

                }

                console.log(console_url);
                console.log(dt);

            }

        }

    };

    //些许页面加载请求相应数据
    $(function() {
        //刷新页面取出window.name 做出相应处理 抛出之前记录数据
        var windowUrl = $.trim(window.name);
        if (windowUrl && (windowUrl.indexOf('|%') != -1)) {
            var urlArray = windowUrl.split('|%'),
                orginName = urlArray[0];
            //为了取到刷新当前页面的地址url
            windowUrl = urlArray[urlArray.length-1].split('\t');
            windowUrl[11] = document.URL + windowUrl[11].substring(windowUrl[11].indexOf('?'));
            //windowUrl[1] = windowUrl[1].substring(0,windowUrl[1].indexOf('?')) + urlArray[2];
            windowUrl = windowUrl.join('\t');
            loggerMethod.ajaxRequest(upLoggerUtil.serverAdd(), windowUrl);
            window.name = orginName;
        }

        // //进入首页
        // if ($('#tracker_index').length) {
        //     setTimeout(function() {
        //         var delayTime = upLoggerUtil.performanceTracer();
        //         loggerMethod.acceptLinkParams('1', '6001', '6', delayTime, '', upLoggerUtil.page_byte_length);
        //     }, 400);
        // }

        // //进入类目页馆页
        // if ($('#tracker_category').length && document.URL.indexOf(upLoggerUtil.pageID[0]) != -1) {
        //     setTimeout(function() {
        //         var delayTime = upLoggerUtil.performanceTracer();
        //         var backVal = '';
        //         if (!$("#pagenavi .all-number span").length) {
        //             backVal = "0";
        //         } else {
        //             backVal = $("#pagenavi .all-number span").html().replace(/[^0-9]/ig,"");
        //         }
        //         loggerMethod.sparam.abTest = "{'abtest':\'"+upLoggerUtil.getCookie('abToken')+"\'}";
        //         loggerMethod.acceptLinkParams('1', '2008', '2', delayTime, backVal, upLoggerUtil.page_byte_length);
        //         loggerMethod.sparam.abTest = "";
        //     }, 400);
        // }

        //进入商品详情页
        if ($('#tracker_item').length && document.URL.indexOf(upLoggerUtil.pageID[1]) != -1) {
            setTimeout(function() {
                var delayTime = upLoggerUtil.performanceTracer();
                var backVal = $.trim($('meta[name="tp-pageid"]').attr("content"));
                loggerMethod.acceptLinkParams('1', '4004', '4', delayTime, backVal, upLoggerUtil.page_byte_length);
            }, 400);
        }

        //进入EDM页
        // if (($('.footer').length || $('#mainall').length) && document.URL.indexOf(upLoggerUtil.pageID[2]) != -1) {
        //     var backVal = upLoggerUtil.getUrlID(decodeURI($.trim(document.URL)));
        //     loggerMethod.acceptLinkParams('1', '4002', '4', '', backVal);
        // }

        //进入卖场页
        // if ($('.tracker_market').length && document.URL.indexOf(upLoggerUtil.pageID[3]) != -1) {
        //     setTimeout(function() {
        //         var delayTime = upLoggerUtil.performanceTracer();
        //         var backVal = upLoggerUtil.getUrlID(decodeURI($.trim(document.URL)));
        //         loggerMethod.acceptLinkParams('1', '4010', '4', delayTime, backVal, upLoggerUtil.page_byte_length);
        //     }, 400);
        // }
        //服装馆-新品
        if ($('.tracker_market_news').length && document.URL.indexOf(upLoggerUtil.pageID[10]) != -1) {
            loggerMethod.acceptLinkParams('1', '4030', '4');
        }
        //服装馆-热销
        if ($('.tracker_market_hots').length && document.URL.indexOf(upLoggerUtil.pageID[10]) != -1) {
            loggerMethod.acceptLinkParams('1', '4031', '4');
        }
        //母婴馆-宝宝中心
        if ($('.tracker_market_mother_baby').length && document.URL.indexOf(upLoggerUtil.pageID[11]) != -1) {
            loggerMethod.acceptLinkParams('1', '4032', '4');
        }
        //母婴馆-孕妈中心
        if ($('.tracker_market_mother_baby').length && document.URL.indexOf(upLoggerUtil.pageID[12]) != -1) {
            loggerMethod.acceptLinkParams('1', '4033', '4');
        }
        //进口美食馆
        // if ($('#tracker_market_import').length) {
        //     setTimeout(function() {
        //         var delayTime = upUtil.performanceTracer();
        //         upLogger.acceptLinkParams('1', '4034', '4', delayTime);
        //     }, 400);
        // }
        //进入行销页
        // if ($('#tracker_campaign').length && document.URL.indexOf(upLoggerUtil.pageID[4]) != -1) {
        //     var delayTime = upLoggerUtil.performanceTracer();
        //     loggerMethod.acceptLinkParams('1', '4011', '4', delayTime, pageConfig.info.CAMP_SEQ);
        // }
        //进入自定义馆页 13
        if (document.URL.indexOf(upLoggerUtil.pageID[13]) != -1) {
            loggerMethod.acceptLinkParams('1','4042','4');
        }
        //进入品牌桥页14
        if (document.URL.indexOf(upLoggerUtil.pageID[14]) != -1) {
            (typeof curr_query_url == "undefined") && (curr_query_url = "");
            if (curr_query_url.indexOf("-") != -1) {
                loggerMethod.acceptLinkParams('1','4041','4');
            } else {
                loggerMethod.acceptLinkParams('1','4040','4');
            }
        }
        //进入全部品牌15
        if (document.URL.indexOf(upLoggerUtil.pageID[15]) != -1) {
            loggerMethod.acceptLinkParams('1','4039','4');
        }
        //进入全部分类16
        if (document.URL.indexOf(upLoggerUtil.pageID[16]) != -1) {
            loggerMethod.acceptLinkParams('1','4043','4');
        }

        //进入我的购物车页
        if ($('.fn-cart-clearing').length && document.URL.indexOf(upLoggerUtil.pageID[9]) != -1) {
            loggerMethod.acceptLinkParams('1', '1006', '1');
        }

        //进入确认订单页 结算页
        // if ($('.fn-cart-confirm').length && document.URL.indexOf(upLoggerUtil.pageID[9]) != -1) {
        //     loggerMethod.acceptLinkParams('1', '1009', '1');
        // }

        // //进入支付页面 货到付款
        // if ($('.fn-cart-finish').length && document.URL.indexOf(upLoggerUtil.pageID[9]) != -1) {
        //     var backVal = $.trim($('body').find('span.order-num').text());
        //     loggerMethod.acceptLinkParams('1', '1021', '1', '', backVal);

        // }
        // //进入支付页面 在线支付
        // if ($('.fn-cart-pay').length && document.URL.indexOf(upLoggerUtil.pageID[8]) != -1) {
        //     var backVal = $.trim($('body').find('span.order-num').text());
        //     loggerMethod.acceptLinkParams('1', '1013', '1', '', backVal);
        // }

        //进入搜索结果页
        if ($('#tracker_search').length && document.URL.indexOf(upLoggerUtil.pageID[7]) != -1) {
            setTimeout(function() {
                var delayTime = upLoggerUtil.performanceTracer(),
                    curpagetotal = "", idlist_arry = [],
                    package_id_list = "";
                if (!$("#pagenavi .all-number span").length) {
                    curpagetotal = "0";
                } else {
                    curpagetotal = $("#pagenavi .all-number span").html().replace(/[^0-9]/ig,"");
                }
                $("div[id^='shows_']").each(function() {
                    idlist_arry.push($(this).attr("id").split("_")[1]);
                });
                package_id_list = idlist_arry.join(",");
                var backVal = "{'curpagetotal':\'"+curpagetotal+"\','package_id_list':\'"+package_id_list+"\'}";
                //backVal = JSON.parse(JSON.stringify(backVal));
                loggerMethod.sparam.abTest = "{'abtest':\'"+upLoggerUtil.getCookie('abToken')+"\'}";
                loggerMethod.acceptLinkParams('1', '2002', '2', delayTime, backVal, upLoggerUtil.page_byte_length);
                loggerMethod.sparam.abTest = "";
            }, 400);
        }

        //进入搜索结果页 为空 无推荐
        // if ($('#tracker_search_null').length && document.URL.indexOf(upLoggerUtil.pageID[7]) != -1) {
        //     loggerMethod.acceptLinkParams('1', '2012', '2');
        // }

        //新版首页 天花板 登录
        $('body').on('click', '['+upLoggerUtil.indexEvent[0]+']', function(e) {
            loggerMethod.acceptEventParams($(this), '1', '2', '6003', '6', e);
        });
        //新版首页 天花板 免费注册
        $('body').on('click', '['+upLoggerUtil.indexEvent[1]+']', function(e) {
            loggerMethod.acceptEventParams($(this), '1', '2', '6004', '6', e);
        });
        //新版首页 天花板 送货至
        $('body').on('click', '['+upLoggerUtil.indexEvent[2]+']', function(e) {
            loggerMethod.acceptEventParams($(this), '1', '2', '6027', '6', e, $(this).attr(upLoggerUtil.indexEvent[2]));
        });
        //新版首页 天花板 我的飞牛
        $('body').on('click', '['+upLoggerUtil.indexEvent[3]+']', function(e) {
            loggerMethod.acceptEventParams($(this), '1', '2', '6028', '6', e, $(this).attr(upLoggerUtil.indexEvent[3]));
        });
        //新版首页 天花板 卡券充值
        $('body').on('click', '['+upLoggerUtil.indexEvent[4]+']', function(e) {
            loggerMethod.acceptEventParams($(this), '1', '2', '6029', '6', e);
        });
        //新版首页 天花板 会员俱乐部
        $('body').on('click', '['+upLoggerUtil.indexEvent[5]+']', function(e) {
            loggerMethod.acceptEventParams($(this), '1', '2', '6030', '6', e);
        });
        //新版首页 天花板 手机飞牛网
        $('body').on('click', '['+upLoggerUtil.indexEvent[6]+']', function(e) {
            loggerMethod.acceptEventParams($(this), '1', '2', '6031', '6', e);
        });
        //新版首页 天花板 积分商城
        $('body').on('click', '['+upLoggerUtil.indexEvent[9]+']', function(e) {
            loggerMethod.acceptEventParams($(this), '1', '2', '6035', '6', e);
        });
        //新版首页 天花板 帮助中心
        $('body').on('click', '['+upLoggerUtil.indexEvent[7]+']', function(e) {
            loggerMethod.acceptEventParams($(this), '1', '2', '6010', '6', e);
        });
        //新版首页 购物车之下 积分商城（原我的订单） 曾经购买 我的收藏
        $('body').on('click', '['+upLoggerUtil.indexEvent[8]+']', function(e) {
            var index = (6032 + $(this).parent().index()).toString();
            loggerMethod.acceptEventParams($(this), '', '2', index, '6', e);
        });

        //消息入口 天花板J_tips
        $('.m-g-topbar').on('click', '.J_tips', function(e) {
            var x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
                y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
            upLogger.sparam.trackType = "2";
            upLogger.sparam.trackTagName = "6036";
            upLogger.sparam.funType = "6";
            upLogger.sparam.xyPos = x + "|" + y;
            upLogger.sparam.delayTime = "";
            upLogger.sparam.pageContentId = "";
            upLogger.sparam.city = upUtil.getCookie("C_dist").split("_")[1];
            var urlStr = upUtil.getParam(upLogger.sparam);
            window.name = window.name + "|%" + urlStr;
        });

        //会员中心 我的消息 导航菜单
        $('.mc-menu').on('click', 'li a', function(e) {
            var backVal = $.trim($(this).attr("title"));
            var x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
                y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
            upLogger.sparam.trackType = "2";
            upLogger.sparam.trackTagName = "7053";
            upLogger.sparam.funType = "7";
            upLogger.sparam.xyPos = x + "|" + y;
            upLogger.sparam.delayTime = "";
            upLogger.sparam.pageContentId = backVal;
            upLogger.sparam.city = upUtil.getCookie("C_dist").split("_")[1];
            var urlStr = upUtil.getParam(upLogger.sparam);
            window.name = window.name + "|%" + urlStr;
        });

        //会员中心 我的消息列表
        $('#fnMsg').on('click', '.J-limsg', function(e) {
            var value = $.trim($(this).attr("value")),
                value2 = $.trim($(this).attr("value2")),
                value3 = $.trim($(this).attr("value3")),
                backVal = '';
            if (value && value2 && value3) {
                backVal = "{'value':\'"+value+"\','task_id':\'"+value2+"\','content_id':\'"+value3+"\'}";
            } else {
                backVal = value;
            }
            loggerMethod.acceptEventParams($(this), '', '2', '7052', '7', e, backVal);
        });

        //积分商城2期埋点需求 主站大轮播图
        $("#fsD1").on("click", "#D1pic1 a", function(e) {
            var url = $.trim($(this).attr('href')),
                position_num = String($(this).parent().index() + 1);
            var backVal = "{'url':\'"+url+"\','position_num':\'"+position_num+"\'}";
            loggerMethod.acceptEventParams($(this), '', '2', '7042', '7', e, backVal);
        });
        //积分商城2期埋点需求 主站小轮播图
        $("#playBox").on("click", ".oUlplay a", function(e) {
            var url = $.trim($(this).attr('href')),
                position_num = String($(this).parent().index() + 1);
            var backVal = "{'url':\'"+url+"\','position_num':\'"+position_num+"\'}";
            loggerMethod.acceptEventParams($(this), '', '2', '7043', '7', e, backVal);
        });
        //积分商城2期埋点需求 左侧类目导航栏
        $(".wy").on("click", "#cate a", function(e) {
            var category_name = $.trim($(this).text()),
                position_num = String($(this).parent().index() + 1);
            var backVal = "{'category_name':\'"+category_name+"\','position_num':\'"+position_num+"\'}";
            var x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
                y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
            upLogger.sparam.trackType = "2";
            upLogger.sparam.trackTagName = "7044";
            upLogger.sparam.funType = "7";
            upLogger.sparam.xyPos = x + "|" + y;
            upLogger.sparam.delayTime = "";
            upLogger.sparam.pageContentId = backVal;
            upLogger.sparam.city = upUtil.getCookie("C_dist").split("_")[1];
            var urlStr = upUtil.getParam(upLogger.sparam);
            window.name = window.name + "|%" + urlStr;
        });

        //点击‘飞牛网’首页logo
        $('#global-header').on('click', '#headerall a.logohref', function(e) {
            loggerMethod.acceptEventParams($(this), '3', '2', '6002', '6', e);
        });

        //点击首页登录 免费注册 top 我的帐户 帮助中心
        $('#global-topbar').on('click', 'ul.topbar-right a', function(e) {
            if ($.trim($(this).parent().attr('id')) == 'link_signin') {
                loggerMethod.acceptEventParams($(this), '1', '2', '6003', '6', e);
            }
            if ($.trim($(this).parent().attr('id')) == 'link_signup') {
                loggerMethod.acceptEventParams($(this), '1', '2', '6004', '6', e);
            }
            if ($.trim($(this).text()) == '我的账户') {
                loggerMethod.acceptEventParams($(this), '1', '2', '6009', '6', e);
            }
            if ($.trim($(this).text()) == '帮助中心') {
                loggerMethod.acceptEventParams($(this), '1', '2', '6010', '6', e);
            }
        });

        //点击首页登录 免费注册 right
        $('#index-sidebar').on('click', '#a-block-signin button', function(e) {
            var curIndex = String(6003 + $(this).index());
            loggerMethod.acceptEventParams($(this), '9', '2', curIndex, '6', e);
        });

        //点击首页全网自营 正品保证 满95元包邮 7天退换货
        $('#index-sidebar').on('click', 'dl.feature a', function(e) {
            var curIndex = String(6005 + $(this).parent().index());
            loggerMethod.acceptEventParams($(this), '9', '2', curIndex, '6', e);
        });

        //首页侧边栏馆层导航
        $('#float-nav').on('click', 'dl.float-floor-nav dd', function(e) {
            var backVal = $(this).index() + 1;
            loggerMethod.acceptEventParams($(this), '', '2', '6011', '6', e, backVal);
        });

        //首页导航栏 首页 周周抢 手机家电 服装城 家居馆 美食城 进口美食馆 美护馆等
        $('#global-nav').on('click', 'ul.horizontal-nav li a', function(e) {
            var backVal = $(this).parent().index() + 1;
            loggerMethod.acceptEventParams($(this), '5', '2', '6012', '6', e, backVal);
        });

        //导航栏 商品分类筛选（1、2、3级）
        $('#global-nav').on('click', '#show_category ul a', function(e) {
            var backVal = upLoggerUtil.getUrlID($.trim($(this).attr('href')));
            loggerMethod.acceptEventParams($(this), '7', '2', '6020', '6', e, backVal);
        });

        //点击活动（首页顶通区）
        $('#global-header').on('click', '#hd-banner a', function(e) {
            var backVal = upLoggerUtil.getUrlID($.trim($(this).attr('href')));
            loggerMethod.acceptEventParams($(this), '2', '2', '4001', '4', e, backVal);
        });

        //点击活动（首页中间轮播区域）
        $('#main-col').on('click', 'dl.swiper-wrapper a', function(e) {
            var backVal = upLoggerUtil.getUrlID($.trim($(this).attr('href')));
            loggerMethod.acceptEventParams($(this), '8', '2', '4001', '4', e, backVal);
        });

        //点击活动（中间点位置）
        $('#midbanner').on('click', 'a', function(e) {
            var backVal = upLoggerUtil.getUrlID($.trim($(this).attr('href')));
            loggerMethod.acceptEventParams($(this), '14', '2', '4001', '4', e, backVal);
        });

        //首页类目推荐
        $('.index-recommend').on('click', '.tab-content a,.tab-content button', function(e) {
            var backVal = $.trim($(this).parents('.tab-content').siblings('dl').find('.active').text());
            loggerMethod.acceptEventParams($(this), '10', '2', '6024', '6', e, backVal);
        });

        //首页网站公告
        $('.index-news').on('click', '.tab-content a', function(e) {
            var backVal = $.trim($(this).text());
            loggerMethod.acceptEventParams($(this), '11', '2', '6023', '6', e, backVal);
        });

        //首页今日爆款
        $('.best-recommend').on('click', 'a', function(e) {
            var backVal = $.trim($(this).prev().text());
            loggerMethod.acceptEventParams($(this), '13', '2', '6025', '6', e, backVal);
        });

        //首页爆款促销区
        $('.index-recommend-list').on('click', '.swiper-wrapper a', function(e) {
            var backVal = $.trim($(this).parents('.swiper-wrapper').prev().find('.active').text());
            loggerMethod.acceptEventParams($(this), '12', '2', '4003', '4', e, backVal);
        });

        //首页楼层点击
        $('section.index-floor:visible').each(function(i) {
            //品牌推荐
            $(this).on('click', '.floor-keywords a', function(e) {
                var page_area_id = String(16 + i);
                loggerMethod.acceptEventParams($(this), page_area_id, '2', '6021', '6', e);
            });

            //热度关键词（主推三级类目）
            $(this).on('click', '.floor-catagories a', function(e) {
                var page_area_id = String(16 + i);
                loggerMethod.acceptEventParams($(this), page_area_id, '2', '6022', '6', e);
            });

            //活动banner
            $(this).on('click', '.floor-focus-prods a', function(e) {
                var page_area_id = String(16 + i);
                loggerMethod.acceptEventParams($(this), page_area_id, '2', '4001', '4', e);
            });

            //滚动商品
            $(this).on('click', '.floor-slider a', function(e) {
                var page_area_id = String(16 + i);
                var backVal = upLoggerUtil.getUrlID($.trim($(this).attr('href')));
                loggerMethod.acceptEventParams($(this), page_area_id, '2', '4003', '4', e, backVal);
            });

        });

        //首页 页尾区
        $('#ft-service-infr').on('click', 'dl.nav-service a', function(e) {
            var backVal = $.trim($(this).text());
            loggerMethod.acceptEventParams($(this), '15', '2', '6026', '6', e, backVal);
        });

        //商品详情页 面包屑
        $('#tracker_item').on('click', '.breadcrumb a', function(e) {
            loggerMethod.acceptEventParams($(this), '31', '2', '4012', '4', e);
        });

        //类目页 面包屑
        $('#path').on('click', 'div a', function(e) {
            loggerMethod.acceptEventParams($(this), '31', '2', '4012', '4', e);
        });
        $('#path-new').on('click', 'ul li a', function(e) {
            loggerMethod.acceptEventParams($(this), '31', '2', '4012', '4', e);
        });

        //商品详情页 商品小图片
        $('#tracker_item .product-small-img li a').on('click', function(e) {
            var backVal = $.trim($('meta[name="tp-pageid"]').attr("content"));
            loggerMethod.acceptEventParams($(this), '32', '2', '4005', '4', e, backVal);
        });

        //商品详情页 相关商品
        $('#tracker_item').on('click', '.item-cf li a', function(e) {
            var package_id = upLoggerUtil.getUrlID($.trim($(this).attr('href'))),
                model = $(this).parents("ul").prev().text(),
                position_num = String($(this).parent().index() + 1);
            var backVal = "{'package_id':\'"+package_id+"\','model':\'"+model+"\','position_num':\'"+position_num+"\'}";
            //backVal = JSON.parse(JSON.stringify(backVal));
            loggerMethod.acceptEventParams($(this), '34', '2', '4019', '4', e, backVal);
        });
        $('#tracker_item').on('click', '.sale-top li a', function(e) {
            var package_id = upLoggerUtil.getUrlID($.trim($(this).attr('href'))),
                model = $(this).parents("ul").prev().text(),
                position_num = String($(this).parent().index() + 1);
            var backVal = "{'package_id':\'"+package_id+"\','model':\'"+model+"\','position_num':\'"+position_num+"\'}";
            //backVal = JSON.parse(JSON.stringify(backVal));
            loggerMethod.acceptEventParams($(this), '34', '2', '4019', '4', e, backVal);
        });

        //商品详情页 商品介绍 规格包装 售后服务 评价
        $('#tracker_item').on('click', '.detail-tab #tabInner>a', function(e) {
            var curIndex = String(4006 + $(this).index());
            var backVal = $.trim($('meta[name="tp-pageid"]').attr("content"));
            switch(curIndex) {
                case '4008':
                    curIndex = '4009';
                    break;
                case '4009':
                    curIndex = '4008';
                    break;
            }
            loggerMethod.acceptEventParams($(this), '35', '2', curIndex, '4', e, backVal);
        });

        //单击更多选项
        $('#attr_more').on('click', 'a', function(e) {
            loggerMethod.acceptEventParams($(this), '', '2', '4009', '4', e);
        });
        $('.cata_shop_right').on('click', 'a.f-out-more', function(e) {
            loggerMethod.acceptEventParams($(this), '', '2', '4009', '4', e);
        });

        //单击我的购物车
        $('#hd-my-cart').on({
            click: function(e) {
                loggerMethod.acceptEventParams($(this), '6', '2', '1001', '1', e);
            }
        }, '.icon-cart-hd' + ',' + '.icon-cart-gwc');

        //加入购物车 馆页商品列表
        $('#warpper').on('click', '#cata_choose_product a.cartimg', function(e) {
            var backVal = upLoggerUtil.getProID($.trim($(this).attr('id')));
            if ($.trim($(this).prev().html()) != '') {
                loggerMethod.acceptEventParams($(this), '', '2', '1002', '1', e, backVal);
            }
        });

        //加入购物车 馆页商品列表
        $('#warpper').on('click', '#cata_choose_product a.cartlimit', function(e) {
            var backVal = upLoggerUtil.getProID($.trim($(this).attr('id')));
            if ($.trim($(this).prev().html()) != '') {
                loggerMethod.acceptEventParams($(this), '', '2', '1002', '1', e, backVal);
            }
        });

        //加入购物车 馆页商品列表 多规格弹出层
        $('body').on('click', '.ui-dialog .ui-button-text-only', function(e) {
            var backVal = '';
            if ($(this).parents('.ui-dialog').find('#sm_spec .color_box').length == 0) {
                backVal = $.trim($(this).parents('.ui-dialog').find('#sm_color .border3solid').attr('smeq'));
            } else {
                backVal = $.trim($(this).parents('.ui-dialog').find('#sm_spec .border3solid').attr('smeq'));
            }
            loggerMethod.acceptEventParams($(this), '', '2', '1002', '1', e, backVal);
        });

        //任意搭配 优惠套餐 加入购物车 商品详情页
        $('#tracker_item').on('click', '.detail-public .detail-box .total-button a', function(e) {
            var backVal = $.trim($('meta[name="tp-pageid"]').attr("content"));
            loggerMethod.acceptEventParams($(this), '35', '2', '1002', '1', e, backVal);
        });

        //立即预定 商品详情页
        $('#tracker_item').on('click', '.product-value .btn-con a.btn-destine', function(e) {
            var backVal = $.trim($('meta[name="tp-pageid"]').attr("content"));
            loggerMethod.acceptEventParams($(this), '33', '2', '1002', '1', e, backVal);
        });

        //立即抢购 商品详情页
        $('#tracker_item').on('click', '.product-value .btn-con a.btn-rush', function(e) {
            var backVal = $.trim($('meta[name="tp-pageid"]').attr("content"));
            loggerMethod.acceptEventParams($(this), '33', '2', '1002', '1', e, backVal);
        });

        //加入购物车 商品详情页
        $('#tracker_item').on('click', '.product-value .btn-con a.btn-ent', function(e) {
            var backVal = $.trim($('meta[name="tp-pageid"]').attr("content"));
            loggerMethod.acceptEventParams($(this), '33', '2', '1002', '1', e, backVal);
        });

        //滚动出现立即抢购 和 加入购物车
        $('#tracker_item').on('click', '.detail-tab .addshop-tab>a', function(e) {
            var backVal = $.trim($('meta[name="tp-pageid"]').attr("content"));
            loggerMethod.acceptEventParams($(this), '35', '2', '1002', '1', e, backVal);
        });

        //加入购物车  购物车相关商品
        $('.clearing-recommend').on('click', '.cr-list button.add2cart', function(e) {
            var backVal = upLoggerUtil.getUrlID($.trim($(this).parent().find('a:first').attr('href')));
            loggerMethod.acceptEventParams($(this), '', '2', '1002', '1', e, backVal);
        });

        //继续购物 商品详情单击加入购物车 立即抢购 提示层
        $('body').on('click', '.ui-dialog-grid .add-cart-btn a:first', function(e) {
            loggerMethod.acceptEventParams($(this), '', '2', '1003', '1', e);
        });

        //继续购物 购物车列表
        $('.cart-title').on('click', 'a.cs-01', function(e) {
            loggerMethod.acceptEventParams($(this), '', '2', '1003', '1', e);
        });

        //去购物车结算 我的购物车滑动浮层
        $('#hd-my-cart').on('click', '#show_minicart a.cart_buy', function(e) {
            loggerMethod.acceptEventParams($(this), '6', '2', '1004', '1', e);
        });

        //去购物车结算 商品详情单击加入购物车 立即抢购 提示层
        $('body').on('click', '.ui-dialog-grid .add-cart-btn a:last', function(e) {
            loggerMethod.acceptEventParams($(this), '', '2', '1004', '1', e);
        });

        //点击关闭 商品详情单击加入购物车 立即抢购 提示层
        $('body').on('click', '.ui-dialog-grid .ui-dialog-header button',  function(e) {
            loggerMethod.acceptEventParams($(this), '', '2', '1005', '1', e);
        });

        //点击删除 我的购物车滑动浮层
        $('#hd-my-cart').on('click', '#show_minicart a.delete', function(e) {
            var backVal = upLoggerUtil.getUrlID($.trim($(this).parent().prev().attr('href')));
            loggerMethod.acceptEventParams($(this), '6', '2', '1007', '1', e, backVal);

        });

        //移入收藏夹 购物车列表 已嵌入php后台js埋点
        // $('.one-package a.a-favorites').on('click', function() {
            //loggerMethod.acceptEventParams($(this), '', '2', '1020', '1', e);
        // });

        //点击删除 购物车列表 已嵌入php后台js埋点
        // $('.cart-content').on('click', '.one-package a.a-delete', function() {
        //     var _this = $(this);
        //     var backVal = upLoggerUtil.getUrlID($.trim(_this.parents('.fixed').find('a:first').attr('href')));
        //     $('body').on('click', 'button.btn_confirm', function(e) {
        //         loggerMethod.acceptEventParams($(this), '', '2', '1007', '1', e, backVal);
        //     });
        // });

        //点击确认结算
        //$('.cart-content').on('click', '.cc-total li.li-05', function(e) {
        //    loggerMethod.acceptEventParams($(this), '', '2', '1008', '1', e);
        //});
        //$('.cart-content').on('click', '.one-package li.hqglibot a', function(e) {
        //    loggerMethod.acceptEventParams($(this), '', '2', '1008', '1', e);
        //});

        //点击提交订单
        // $('#confirm-bottom').on('click', '#bottom-clearing span.btn-red', function(e) {
        //     loggerMethod.acceptEventParams($(this), '', '2', '1010', '1', e);
        // });

        //点击立即支付
        $('#pay-way').on('click', 'button#paySubmit', function(e) {
            var backVal = $.trim($('body').find('span.order-num').text());
            loggerMethod.acceptEventParams($(this), '', '2', '1011', '1', e, backVal);
        });

        //点击取消订单 已嵌入php后台js埋点
        // $('#user-order-list').on('click', '.list-td-04 a.target_no', function(e) {
        //     var backVal = $.trim($(this).parent().parent().prev().find('small').text());
        //     loggerMethod.acceptEventParams($(this), '', '2', '1012', '1', e, backVal);
        // });

        //点击+ 我的购物车滑动浮层
        $('#hd-my-cart').on('click', '#show_minicart a.add', function(e) {
            var backVal = upLoggerUtil.getUrlID($.trim($(this).parent().parent().prev().attr('href')));
            loggerMethod.acceptEventParams($(this), '6', '2', '1014', '1', e, backVal);
        });

        //点击- 我的购物车滑动浮层
        $('#hd-my-cart').on('click', '#show_minicart a.reduce', function(e) {
            var backVal = upLoggerUtil.getUrlID($.trim($(this).parent().parent().prev().attr('href')));
            loggerMethod.acceptEventParams($(this), '6', '2', '1015', '1', e, backVal);
        });

        //点击+ 购物车列表
        $('.cart-content').on('click', '.one-package button.icon-add', function(e) {
            var backVal = upLoggerUtil.getUrlID($.trim($(this).parents('.fixed').find('a:first').attr('href')));
            loggerMethod.acceptEventParams($(this), '', '2', '1014', '1', e, backVal);
        });

        //点击- 购物车列表
        $('.cart-content').on('click', '.one-package button.icon-minus', function(e) {
            var backVal = upLoggerUtil.getUrlID($.trim($(this).parents('.fixed').find('a:first').attr('href')));
            loggerMethod.acceptEventParams($(this), '', '2', '1015', '1', e, backVal);
        });

        //猜您喜欢单击商品
        $('.clearing-recommend').on('click', '.cr-block-02 .cr-list li a', function(e) {
            loggerMethod.acceptEventParams($(this), '', '2', '1016', '1', e);
        });

        //点击搜索按钮
        $('#global-header').on('click', '#hd-search button.btn-search', function(e) {
            loggerMethod.acceptEventParams($(this), '4', '2', '2001', '2', e);
        });

        //类目、搜索结果页滚动悬浮 点击搜索按钮
        $('#global-nav').on('click', '#hd-search-min button.btn-search', function(e) {
            loggerMethod.acceptEventParams($(this), '4', '2', '2001', '2', e);
        });

        //搜索热词区
        $('#global-header').on('click', '#hotsearch li a', function(e) {
            loggerMethod.acceptEventParams($(this), '4', '2', '2010', '2', e);
        });

        //搜索结果页左侧分类单击
        $('#category_list_rst').on('click', 'li a', function(e) {
            var backVal = upLoggerUtil.getSearchCateID($.trim($(this).attr('href1')));
            loggerMethod.acceptEventParams($(this), '', '2', '2003', '2', e, backVal);
        });

        //类目页馆页左侧分类单击
        $('#cata_list').on('click', 'ul li a', function(e) {
            var backVal = upLoggerUtil.getUrlID($.trim($(this).attr('href')));
            loggerMethod.acceptEventParams($(this), '', '2', '2009', '2', e, backVal);
        });

        //搜索结果页 类目页馆页 按 销量 上架时间 价格 排序
        $('.list').on('click', 'ul.left li>a', function(e) {
            var curIndex = String(2004 + $(this).parent().index());
            switch(curIndex) {
                case '2004':
                    curIndex = '2011';
                    break;
                case '2005':
                    curIndex = '2004';
                    break;
                case '2007':
                    curIndex = '2005';
                    break;
                case '2008':
                    curIndex = '2005';
                    break;
            }
            loggerMethod.acceptEventParams($(this), '', '2', curIndex, '2', e);
        });

        //搜索 下拉框提示 点击
        var searchword = "";
        $("form[name=min-search] input[name=q],form[name=search] input[name=q]").keyup(function() {
           searchword = $.trim($(this).val());
        });
        $("body").on("click", "ul.ui-autocomplete li a.ui-corner-all", function(e) {
            var rcmdword = "",
                categoryind = String($(this).parent(".classify").index()),
                categorylen = $(this).parents("ul").find(".classify").length,
                positionind = $(this).parent().index() + 1,
                category = "", position = String(positionind);
            if (positionind > 1) {
                position = String(positionind - categorylen);
            }
            if ($(this).find("i").length) {
                rcmdword = $(this).parents("ul").find("li:first").find(".search-input-text").text();
                category = $(this).find("i").attr("cpseq");
            } else {
                rcmdword = $(this).find(".search-input-text").text();
            }
            if ($(this).parent().hasClass("classify")) {
                position = "1-" + categoryind;
            }
            var backVal = "{'searchword':\'"+searchword+"\','rcmdword':\'"+rcmdword+"\','category':\'"+category+"\','position':\'"+position+"\'}";
            //backVal = JSON.parse(JSON.stringify(backVal));
            loggerMethod.acceptEventParams($(this), '4', '2', '2007', '2', e, backVal);
        });

        //小牛图标点击数
        $('.cart-content').on('click', '.fee-top a.chat-online', function(e) {
            loggerMethod.acceptEventParams($(this), '', '2', '4020', '4', e);
        });
        $('.cart-content').on('click', '.fee-top a.contactniu', function(e) {
            loggerMethod.acceptEventParams($(this), '', '2', '1019', '1', e);
        });
        $('.col_main').on('click', '.order_list a.chat-online', function(e) {
            loggerMethod.acceptEventParams($(this), '', '2', '4020', '4', e);
        });
        $('.col_main').on('click', '.order_list a.contact', function(e) {
            loggerMethod.acceptEventParams($(this), '', '2', '1019', '1', e);
        });

        upLoggerUtil.autoUplogger();

    });

    window.upLogger = loggerMethod;
    window.upUtil = upLoggerUtil;

})(window, window.document, window.document.body, $);