/**
 * @description 登陆成功后的处理函数
 * @author 猫团儿
 * @param optionsORname
 */
 var getCookie = function(name) {
    var cookie = "; " + document.cookie;
    var pointer = cookie.indexOf("; " + name + "=");
    var nextPointer = cookie.indexOf(";", pointer + 2);
    if (pointer >= 0) {
        return decodeURIComponent(cookie.substring(pointer + name.length + 3, nextPointer > 0 ? nextPointer : cookie.length))
    }
    ;
    return ""
};

function getScript(src, callback) {
    var head = document.getElementsByTagName("head")[0];
    var js = document.createElement("script");
    js.setAttribute("src", src);
    js.onload = js.onreadystatechange = function () {
        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
            head.removeChild(js);
            if (callback)
                callback();
        }
    }
    head.appendChild(js);
};

var process_login_callback = function (optionsORname) {

  var sid = getCookie('sid');
  var userName = sid ? decodeURIComponent(sid.substring(32)) : decodeURIComponent(getCookie('IF_USER'));

  var msg =
      '<span class="welcome">欢迎您</span>' +
      '<a id="logName" class="LoginAfterName" href="javascript:void(0);">' + userName + '<span id="logNameSpan">&nbsp;</span></a>' +
      '<a href="javascript:void(0);" class="logout" id="btnlogout">退出</a>' +
      '<ul id="loglist" style="display: none;">' +
      '<li><a href="http://id.ifeng.com" target="_blank">进入个人中心</a></li>' +
      '<li class="BgNone"><a href="http://blog.ifeng.com/user/personal_entrance.php?n=' + userName + '" target="_blank">进入我的博客</a></li>'+'</ul>';

  document.getElementById('welcome').innerHTML = msg;
  document.getElementById('btnSwapLogin').style.display = 'none';
  document.getElementById('welcome').style.display = 'block';

  V.addListener($("logName"), "click", function () {
    var logNamespan = document.getElementById('logNameSpan');
    var loglist = document.getElementById('loglist');
    if (loglist.style.display == 'block') {
      loglist.style.display = 'none';
    } else {
      loglist.style.display = 'block';
    }
    if (logNamespan.style.backgroundPosition == '7px -295px') {
      logNamespan.style.backgroundPosition = '7px -195px';
    } else {
      logNamespan.style.backgroundPosition = '7px -295px';
    }
  });

   document.getElementById('btnlogout').onclick = function() {
     window['GLOBAL_LOGIN_OUT']();
   }

};


window['REG_LOGIN_CALLBACK'](3, function() {
    window.location.reload();
});
window['REG_LOGIN_CALLBACK'](1, function(optionsORname) {
    process_login_callback();

});

if (window['IS_LOGIN']()) {
  // 如果是已登陆即调用全局方法,将回调传入.
  window['GLOBAL_LOGIN']();

} else {

  if(device.type == 'mobile' || device.type == 'pad'){ // 如果是手机设备
    document.getElementById('btnSwapLogin').onclick = function() {
        window.location.href = 'http://id.ifeng.com/muser/login?cb=' + window.location.href;
        return false;
    }
  } else { // 如果不是收集设备
    document.getElementById('btnSwapLogin').onclick = function() {
        window['GLOBAL_LOGIN']();
        return false;
    }
  }
}

/**
 * @description 搜索功能块
 * @author
 */

var srch = document.getElementById('searchBtn');
var navFind = document.getElementById('navFind');
srch.onclick = function () {
  if (navFind.style.display == 'none') {
    navFind.style.display = 'block';
    srch.style.display = 'none';
  }
}
srhClose.onclick = function () {
  if (navFind.style.display == 'block') {
    navFind.style.display = 'none';
    srch.style.display = 'block';
    srch.style.lineHeight = '14px';
  }
}

getScript("http://m0.ifengimg.com/keywords.js", function () {
  getScript("http://y1.ifengimg.com/www/index_nav_search_v140312r1.js", function () {

    V.addListener($("keyword"), "click", function () {
      header_search.clean_default($("keyword").value);
    });

    V.addListener($("keyword"), "blur", function () {
      header_search.set_default($("keyword").value);
    });

    V.addListener($("loginUl"), "click", function () {
      ($("loginFldselectop").style.display == "block") ? ($("loginFldselectop").style.display = "none") : ($("loginFldselectop").style.display = "block");
      ($("loginFldselectop").style.display == "block") ? ($("loginUl").className = "sel arrowfold") : ($("loginUl").className = "sel");
    });

    V.addListener($("searchFormOption"), "mouseout", function () {
      header_search.out_option();
      $('loginUl').className = 'sel';
    });

    V.addListener($("searchFormOption"), "mouseover", function () {
      header_search.over_option();
      ($("loginFldselectop").style.display == "block") ? ($("loginUl").className = "sel arrowfold") : ($("loginUl").className = "sel");
    });

    V.addListener($("loginFldselectop").getElementsByTagName("li"), "mouseover", function () {
      //$("loginUl").className="sel arrowfold";
    });

    V.addListener($("searchFormOption"), "blur", function () {
      $("loginFldselectop").style.display = "none";
      $("loginUl").className = "sel";
    });

    var searchCategory = $("loginFldselectop").getElementsByTagName("li");
    for (var i = 0; i < searchCategory.length; i++) {
      V.addListener(searchCategory[i], "mouseover", function (e) {
        (e.target || e.srcElement).style.backgroundColor = "#e7e7e7";
      });

      V.addListener(searchCategory[i], "mouseout", function (e) {
        (e.target || e.srcElement).style.backgroundColor = "white";
      });

      V.addListener(searchCategory[i].getElementsByTagName("a")[0], "click", function (e) {
        header_search.select_option((e.target || e.srcElement).innerHTML);
      });
    }

    V.addListener($("suggest_list"), "focus", function () {
      finance_suggest.display("inline");
    });

    V.addListener($("suggest_list"), "mouseover", function () {
      finance_suggest.display("inline");
    });

    V.addListener($("suggest_list"), "mouseout", function () {
      finance_suggest.display("none");
    });

  });
});

// 顶部 搜索 按钮 事件绑定 停留
V.addListener($("btnSearch1"), "mouseover", function () {
  O.addClass($("btnSearch1"), "button_hover");
});

// 顶部 搜索 按钮 事件绑定 离开
V.addListener($("btnSearch1"), "mouseout", function () {
  O.removeClass($("btnSearch1"), "button_hover");
});

// 财经 搜索 按钮 事件绑定 停留
V.addListener($("btnSearch2"), "mouseover", function () {
  O.addClass($("btnSearch2"), "button_hover");
});

// 财经 搜索 按钮 事件绑定 离开
V.addListener($("btnSearch2"), "mouseout", function () {
  O.removeClass($("btnSearch2"), "button_hover");
});

// 财经 搜索 输入框 事件绑定 获取焦点
V.addListener($("financeKeyword"), "focus", function () {
  if ($("financeKeyword").value == "代码/拼音/名称") $("financeKeyword").value = "";
});

// 财经 搜索 输入框 事件绑定 失去焦点
V.addListener($("financeKeyword"), "blur", function () {
  if ($("financeKeyword").value == "") $("financeKeyword").value = "代码/拼音/名称";
});

// ================ TabControl 组件部分 开始 禁止修改 ================

function Collection() {
  this.items = [];
}

Collection.prototype = {
  add: function (col) {
    this.items.push(col);
  },
  clear: function () {
    this.items = [];
  },
  getCount: function () {
    return this.items.length;
  },
  each: function (func) {
    for (var i = 0; i < this.getCount(); i++) {
      func(this.items[i]);
    }
  },
  indexOf: function (item) {
    var r = -1;
    for (var i = 0; i < this.getCount(); i++) {
      if (item == this.items[i]) {
        r = i;
        break;
      }
    }
    return r;
  },
  find: function (func) {
    var r = null;
    for (var i = 0; i < this.getCount(); i++) {
      if (func(this.items[i]) == true) {
        r = this.items[i];
        break;
      }
    }
    return r;
  }
};

function TabPage(triggerId, sheetId) {
  this.trigger = $(triggerId);
  this.sheet = $(sheetId);
}

function TabControl() {
  this.styleName = null;
  this.tabPages = new Collection();
  this.currentTabPage = null;
  this.triggerType = "click";
  this.defaultPage = 0;
  this.enableSlide = false;
  this.slideInterval = 3000;
  this.onChanging = new Collection();
  this.onChanging.add(this.defaultChangingHandler);
  this.onInit = new Collection();
  this.onInit.add(this.defaultInitHandler);
  this.onInit.add(this.autoSlideInitHandler);
  this.onAdding = new Collection();
  this.onAdding.add(this.defaultAddingHandler);
  this._autoSlideEv = null;
  this._preButton = null;
  this._nextButton = null;
}

TabControl.prototype = {
  add: function (tabPage) {
    this.tabPages.add(tabPage);
    var handler = function (func) {
      func(tabPage);
    };
    this.onAdding.each(handler);
  },
  addRange: function (triggers, sheets) {
    if (triggers.length == 0 || triggers.length != sheets.length) {
      return;
    }
    for (var i = 0; i < triggers.length; i++) {
      var tabPage = new TabPage(triggers[i], sheets[i]);
      this.add(tabPage);
    }
  },
  pre: function () {
    var i = this.indexOf(this.currentTabPage.trigger);
    this.select(i - 1);
  },
  next: function () {
    var i = this.indexOf(this.currentTabPage.trigger);
    this.select(i + 1);
  },
  defaultAddingHandler: function (tabPage) {
  },
  init: function () {
    var _ = this;
    var handler = function (func) {
      func(_);
    };
    if (this.tabPages.getCount() == 0) {
      return;
    }
    if (this.currentTabPage == null) {
      this.currentTabPage = this.tabPages.items[this.defaultPage];
    }
    this.onInit.each(handler);

    if ($(this.preButton)) {
      $(this.preButton).onclick = this.GetFunction(this, "pre");
    }

    if ($(this.nextButton)) {
      $(this.nextButton).onclick = this.GetFunction(this, "next");
    }

  },
  defaultInitHandler: function (obj) {
    var handler = function (item) {
      V.addListener(item.trigger, obj.triggerType, obj.selectHanlder, obj);
      O.hide(item.sheet);
    };
    obj.tabPages.each(handler);
    obj.select(obj.defaultPage);
  },
  autoSlideInitHandler: function (o) {
    if (!o.enableSlide) {
      return;
    }
    var delayStartEv = null;
    var delayStartHandler = function () {
      delayStartEv = setTimeout(function () {
        o.autoSlideHandler(o);
      }, 300);
    };
    var clearHandler = function () {
      clearTimeout(delayStartEv);
      clearInterval(o._autoSlideEv);
    };
    var handler = function (item) {
      V.addListener(item.trigger, o.triggerType, clearHandler, o);
      V.addListener(item.sheet, 'mouseover', clearHandler, o);
      V.addListener([item.trigger, item.sheet], 'mouseout', delayStartHandler, o);
    };
    o.tabPages.each(handler);
    o.autoSlideHandler(o);
  },
  autoSlideHandler: function (o) {
    var count = o.tabPages.getCount();
    clearInterval(o._autoSlideEv);
    o._autoSlideEv = setInterval(function () {
      var i = o.indexOf(o.currentTabPage.trigger);
      if (i == -1) {
        return;
      }
      i++;
      if (i >= count) {
        i = 0;
      }
      o.select(i);
    }, o.slideInterval);
  },
  selectHanlder: function (e, o) {
    var i = this.indexOf(o);
    this.select(i);
  },
  select: function (i) {
    var page = null;
    if (this.autoLoop) {
      if (i < 0) {
        page = this.tabPages.items[this.tabPages.getCount() - 1];
      } else if (i >= this.tabPages.getCount()) {
        page = this.tabPages.items[0];
      } else {
        page = this.tabPages.items[i];
      }
    } else {
      if (i < 0 || i >= this.tabPages.getCount()) {
        return;
      }
      page = this.tabPages.items[i];
    }
    var _ = this;
    var handler = function (func) {
      func(_.currentTabPage, page);
    };
    this.onChanging.each(handler);
    this.currentTabPage = page;
    if ($(this.preButton)) {
      $(this.preButton).className = "enable arrow";
      if (i == 0)
        $(this.preButton).className = "unenable arrow";
    }
    if ($(this.nextButton)) {
      $(this.nextButton).className = "enable arrow";
      if (i == this.tabPages.getCount() - 1)
        $(this.nextButton).className = "unenable arrow";
    }
    if (typeof (this.onComplete) == "function") {
      this.onComplete(this.options, i, this.currentTabPage);
    }
  },
  defaultChangingHandler: function (oldTabPage, newTabPage) {
    if (oldTabPage.sheet) {
      O.hide(oldTabPage.sheet);
    }
    if (newTabPage.sheet) {
      O.show(newTabPage.sheet);
    }
    O.removeClass(oldTabPage.trigger, 'current');
    O.addClass(newTabPage.trigger, 'current');
  },
  indexOf: function (trigger) {
    var r = -1;
    var handler = function (item) {
      return item.trigger == trigger;
    };
    var item = this.tabPages.find(handler);
    if (item != null) {
      r = this.tabPages.indexOf(item);
    }
    return r;
  },
  GetFunction: function (variable, method, param) {
    return function () {
      variable[method](param);
    };
  }
};

function TabControlForFocusImg() {
  this.autoImpressioned = 0;
  this.fashionImpressioned = 0;
  this.autoImpression = '';
  this.fashionImpression = '';
  this.styleName = null;
  this.tabPages = new Collection();
  this.currentTabPage = null;
  this.triggerType = "click";
  this.defaultPage = 0;
  this.enableSlide = false;
  this.slideInterval = 3000;
  this.onChanging = new Collection();
  this.onChanging.add(this.defaultChangingHandler);
  this.onInit = new Collection();
  this.onInit.add(this.defaultInitHandler);
  this.onInit.add(this.autoSlideInitHandler);
  this.onAdding = new Collection();
  this.onAdding.add(this.defaultAddingHandler);
  this._autoSlideEv = null;
  this._preButton = null;
  this._nextButton = null;
}

TabControlForFocusImg.prototype = {
  add: function (tabPage) {
    this.tabPages.add(tabPage);
    var handler = function (func) {
      func(tabPage);
    };
    this.onAdding.each(handler);
  },
  addRange: function (triggers, sheets) {
    if (triggers.length == 0 || triggers.length != sheets.length) {
      return;
    }
    for (var i = 0; i < triggers.length; i++) {
      var tabPage = new TabPage(triggers[i], sheets[i]);
      this.add(tabPage);
    }
  },
  pre: function () {
    var i = this.indexOf(this.currentTabPage.trigger);
    this.select(i - 1);
  },
  next: function () {
    var i = this.indexOf(this.currentTabPage.trigger);
    this.select(i + 1);
  },
  defaultAddingHandler: function (tabPage) {
  },
  init: function () {
    var _ = this;
    var handler = function (func) {
      func(_);
    };
    if (this.tabPages.getCount() == 0) {
      return;
    }
    if (this.currentTabPage == null) {
      this.currentTabPage = this.tabPages.items[this.defaultPage];
    }
    this.onInit.each(handler);
    if ($(this.preButton))
      $(this.preButton).onclick = this.GetFunction(this, "pre");
    if ($(this.nextButton))
      $(this.nextButton).onclick = this.GetFunction(this, "next");
  },
  defaultInitHandler: function (obj) {
    var handler = function (item) {
      V.addListener(item.trigger, obj.triggerType, obj.selectHanlder, obj);
      O.hide(item.sheet);
    };
    obj.tabPages.each(handler);
    obj.select(obj.defaultPage);
  },
  autoSlideInitHandler: function (o) {
    if (!o.enableSlide) {
      return;
    }
    var delayStartEv = null;
    var delayStartHandler = function () {
      delayStartEv = setTimeout(function () {
        o.autoSlideHandler(o);
      }, 300);
    };
    var clearHandler = function () {
      clearTimeout(delayStartEv);
      clearInterval(o._autoSlideEv);
    };
    var handler = function (item) {
      V.addListener(item.trigger, o.triggerType, clearHandler, o);
      V.addListener(item.sheet, 'mouseover', clearHandler, o);
      V.addListener([item.trigger, item.sheet], 'mouseout', delayStartHandler, o);
    };
    o.tabPages.each(handler);
    o.autoSlideHandler(o);
  },
  autoSlideHandler: function (o) {
    var count = o.tabPages.getCount();
    clearInterval(o._autoSlideEv);
    o._autoSlideEv = setInterval(function () {
      var i = o.indexOf(o.currentTabPage.trigger);
      if (i == -1) {
        return;
      }
      i++;
      if (i >= count) {
        i = 0;
      }
      o.select(i);
    }, o.slideInterval);
  },
  selectHanlder: function (e, o) {
    var i = this.indexOf(o);
    this.select(i);
  },
  select: function (i) {
    var imgImpressionForAd = '';
    if (i == 3) {
      if (this.autoImpression != '' && this.autoImpressioned == 0) {
        imgImpressionForAd = document.createElement('img');
        imgImpressionForAd.style.display = 'none';
        imgImpressionForAd.src = this.autoImpression;
        document.body.appendChild(imgImpressionForAd);
        this.autoImpressioned = 1;
      }
    } else if (i == 4) {
      if (this.fashionImpression != '' && this.fashionImpressioned == 0) {
        imgImpressionForAd = document.createElement('img');
        imgImpressionForAd.style.display = 'none';
        imgImpressionForAd.src = this.fashionImpression;
        document.body.appendChild(imgImpressionForAd);
        this.fashionImpressioned = 1;
      }
    }
    var page = null;
    if (this.autoLoop) {
      if (i < 0) {
        page = this.tabPages.items[this.tabPages.getCount() - 1];
      } else if (i >= this.tabPages.getCount()) {
        page = this.tabPages.items[0];
      } else {
        page = this.tabPages.items[i];
      }
    } else {
      if (i < 0 || i >= this.tabPages.getCount()) {
        return;
      }
      page = this.tabPages.items[i];
    }
    var _ = this;
    var handler = function (func) {
      func(_.currentTabPage, page);
    };
    this.onChanging.each(handler);
    this.currentTabPage = page;
    if ($(this.preButton)) {
      $(this.preButton).className = "enable";
      if (i == 0)
        $(this.preButton).className = "unenable";
    }
    if ($(this.nextButton)) {
      $(this.nextButton).className = "enable";
      if (i == this.tabPages.getCount() - 1)
        $(this.nextButton).className = "unenable";
    }
    if (typeof (this.onComplete) == "function") {
      this.onComplete(this.options, i, this.currentTabPage);
    }
  },
  defaultChangingHandler: function (oldTabPage, newTabPage) {
    if (oldTabPage.sheet) {
      O.hide(oldTabPage.sheet);
    }
    if (newTabPage.sheet) {
      O.show(newTabPage.sheet);
    }
    O.removeClass(oldTabPage.trigger, 'current');
    O.addClass(newTabPage.trigger, 'current');
  },
  indexOf: function (trigger) {
    var r = -1;
    var handler = function (item) {
      return item.trigger == trigger;
    };
    var item = this.tabPages.find(handler);
    if (item != null) {
      r = this.tabPages.indexOf(item);
    }
    return r;
  },
  GetFunction: function (variable, method, param) {
    return function () {
      variable[method](param);
    };
  }
};


var tc_71=new TabControl();
tc_71.addRange($("FosPicMenu").getElementsByTagName("li"),$("FosPicConId").getElementsByTagName("li"));
tc_71.preButton = 'prev';
tc_71.nextButton = 'next';
tc_71.triggerType = 'mouseover';
tc_71.enableSlide=true;   		
tc_71.slideInterval=5000;  		
tc_71.defaultPage =0;			
tc_71.init();