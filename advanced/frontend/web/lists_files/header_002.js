/**
 *project: Common Header Widgets
 *version: 2.0
 *create: 2013-8-14
 *update: 2013-8-14 18:00 1.0
 *update: 2013-9-22 15:54 1.1
 *update: 2013-11-4 17:30 2.0
 *author: F2E xiechengxiong
 */
define(['F', 'public_login'], function (f) {//依赖F，所以把F模块引进来
    var win = window;
    var options = {
        maxWidth: 100,//用户名显示最大长度
        myUrl: 'http://my.ifeng.com/?_c=index&_a=my',//个人中心地址
        exitUrl: 'http://my.ifeng.com/?_c=index&_a=logout&backurl=' + win.location.href//退出登录地址
    };
    var Fn = {
        /**
         * 初始化
         */
        init: function () {
            this.more = f.query('#f-more')[0];
            this.moreBox = f.query('#f-more-box')[0];
            this.loginNone = f.query('#f-login-none')[0];
            this.loginDetail = f.query('#f-login-detail')[0];
            win['REG_LOGIN_CALLBACK'](1, Fn.loginCallback);
            win['IS_LOGIN']() && win['GLOBAL_LOGIN'] && win['GLOBAL_LOGIN']();
            this.initFixBrowser();
            this.bindEvent();
        },
        /**
         * 绑定事件
         */
        bindEvent: function () {
            f.on(f.query('#f-header')[0], 'click', function (e) {
                var target = e.target || win.event.srcElement;
                var role = target.getAttribute('data-role');
                switch (role) {
                    case 'f-login':
                        win['GLOBAL_LOGIN'] && win['GLOBAL_LOGIN']();
                        break;
                    /*case 'f-login-out': Fn.loginOut(); break;*/
                    default:
                        break;
                }
            });
            f.on(this.more, 'mouseover', function () {
                Fn.disMoreBox('block');
            });
            f.on(this.more, 'mouseout', function () {
                Fn.disMoreBox('none');
            });
        },
        /**
         * 是否显示更多列表
         */
        disMoreBox: function (dis) {
            this.moreBox.style.display = dis;
            if (this.ifr) {
                this.ifr.style.height = this.moreBox.offsetHeight + 'px';
            }
        },
        /**
         * 获取iframe对象
         * @param w iframe宽度
         * @returns {String} 返回html字符串
         */
        getIfr: function (w) {
            return '<iframe src="about:blank" frameborder="0" width="' + w + '" height="0"></iframe>';
        },
        /**
         * 做IE下的浏览器兼容，添加iframe
         */
        initFixBrowser: function () {
            if (/msie/g.test(win.navigator.userAgent.toLocaleLowerCase())) {
                f.append(this.moreBox, this.getIfr(48));
                this.ifr = f.query('iframe', this.moreBox)[0];
            }
        },
        /**
         * 登录成功回调
         * @param obj 返回用户名或者对象
         */
        loginCallback: function (obj) {
            var username = 'string' === typeof obj ? obj : obj['uname'];
            Fn.loginDetail.innerHTML = '<span class="cRed"><span class="user"><a href="' + options.myUrl + '" target="_blank">' + username + '</a></span><span><a href="' + options.myUrl + '" target="_blank">...</a></span></span><a data-role="f-login-out" href="' + options.exitUrl + '" class="cGray">退出</a>';
            Fn.loginDetail.style.display = 'inline';
            Fn.loginNone.style.display = 'none';
            var user = f.query('.user', this.loginDetail)[0];
            var width = user.offsetWidth > options.maxWidth ? options.maxWidth : options.maxWidth + 20;
            user.style.width = width + 'px';
        }/*,
         *//**
         * 退出登录
         *//*
         loginOut: function() {
         win['GLOBAL_LOGIN_OUT'](function () {
         win.location.reload();
         });
         }*/
    };
    Fn.options = options;
    return Fn;
});
