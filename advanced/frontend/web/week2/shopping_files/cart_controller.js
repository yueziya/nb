var __extends=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)};define(["require","exports","knockout","../../common/services/base64","urijs","../../common/services/cart","../../common/services/cart_modify","../../common/services/sup_name","../../common/services/free_postage_goods","../../common/services/sale_score","../entities/cart_total","../../common/services/util","../../common/services/search_collection","../services/cart_parser","../../common/services/event","../../common/services/art_dialog","../../common/entities/tab","../../common/services/recommend","../../common/services/special_offer","../../common/services/footprint","../services/voucher","../services/cart_bind_event","../../common/services/stop_propagation","../widgets/my_tab_view","../../common/options/option_domain","../../common/options/option_url","../../common/options/option_base","../../common/options/option_event_name","../options/cart_options"],function(t,e,o,a,n,i,s,r,c,E,d,_,u,l,T,A,h,N,p,f,O,C,I,m,S,R,v,M,D){"use strict";var L=S.COOKIES_BASE,b=S.BUY_BASE,y=S.I_BASE,V=$.cookie("C_dist")||"CPG1_CS000016",g=$.cookie("C_dist_area")||null,F=!!parseInt(S.phoneBind),G=function(){function t(){var e=this;this.selection={selected:o.observable(V),selectedN:o.observable(g)},this.showMsgBox=o.observable(!1),this.validVoucher=[],this.triggerRecommendSelected={},new A,this.cart=this.createCartTotal(),this.status=new t.Status(function(){return!e.cart.overseasGoodsQty()});var r=a.encode(window.location.href);this.loginGateway=n(R.COMMON_URL.LOGIN_GATEWAY_URL).query({u:r}).valueOf(),T.on(D.CART_EVENT_NAME.LOGIN_DIALOG,function(t,e){try{window.fnDialog({redirectOrder:e.redirectOrder})}catch(o){var i=a.encode(window.location.href),s=n(R.COMMON_URL.LOGIN_GATEWAY_URL).search({u:i}).valueOf();window.location.href=s}}),T.on(D.CART_EVENT_NAME.ADD_TO_FAVORITE,function(t,e){S.UID?T.broadcast(M.COMMON_EVENT_NAME.ART_DIALOG,{id:"addToFavorite",e:e.event,headhide:1,htmlcont:"移入后所选商品将从购物车中删除？",okcallback:function(t,o){T.broadcast(D.CART_EVENT_NAME.ADD_TO_FAVORITE_TRUE,{event:e.event,id:e.id}),t&&t()},nocallback:function(t,e){t&&t()}}):T.broadcast(D.CART_EVENT_NAME.LOGIN_DIALOG,{redirectOrder:!1})}),T.on(D.CART_EVENT_NAME.ADD_TO_FAVORITE_TRUE,function(t,o){var a=u.item(o.id),n=[];n.push(a),$.each(u.items,function(t,e){e.kind!=v.ITEM_KIND.KIND_ADD&&e.kind!=v.ITEM_KIND.KIND_FIXED_COMBO&&e.kind!=v.ITEM_KIND.KIND_THIRD_PART_MAIN||e.detailParentId!=a.detailId||n.push(e)}),i.addSelectedFavorite(n).then(function(t){if(parseInt(t.code)==D.COLLECTION_STATUS.ALL_SUCCESS||parseInt(t.code)==D.COLLECTION_STATUS.PART_FAIL_PART_EXIST){T.broadcast(D.CART_EVENT_NAME.HIDE_LOADING);var a=D.COLLECTION_RESP_TIP[t.code||D.COLLECTION_STATUS.ALL_FAIL]||t.msg;T.broadcast(D.CART_EVENT_NAME.FAVORITE_ALERT,{event:o.event,type:"success",title:a}),t.code==D.COLLECTION_STATUS.ALL_SUCCESS&&e.delItem(n,!0)}else{T.broadcast(D.CART_EVENT_NAME.HIDE_LOADING);var a=D.COLLECTION_RESP_TIP[t.code||D.COLLECTION_STATUS.ALL_FAIL]||t.msg;T.broadcast(D.CART_EVENT_NAME.FAVORITE_ALERT,{event:o.event,type:"error",title:a}),t.code==D.COLLECTION_STATUS.FAVOTITE_FULL&&e.delItem(n,!0)}})}),T.on(D.CART_EVENT_NAME.FAVORITE_ALERT,function(t,e){var o=$(e.event.target).offset(),a=$(e.event.target).outerHeight(!0),n=$(e.event.target).outerWidth(!0),i=e.type||"success",s="success"==i?"":"c-f-errorclt",r=1e3;$('<div class="c-f-amclt J-amclt '+s+'"><b></b><span>'+e.title+"</span></div>").appendTo($("body")[0]).show().css({top:o.top-a/2+2+"px",left:o.left-n/2+2+"px",opacity:0}).stop(!0,!0).animate({opacity:1},r,function(){$(this).stop(!0,!0).animate({opacity:0},2*r,function(){$(this).remove()})})}),T.on(D.CART_EVENT_NAME.ADD_SELECTED_TO_FAVORITE,function(t,o){var a=[];return $.each(u.items,function(t,e){!e.selected||e.kind!=v.ITEM_KIND.KIND_MAIN&&e.kind!=v.ITEM_KIND.KIND_ADD&&e.kind!=v.ITEM_KIND.KIND_FIXED_COMBO&&e.kind!=v.ITEM_KIND.KIND_THIRD_PART_MAIN||e.isVoucherPresent||e.isPrize||a.push(e)}),0==a.length?void T.broadcast(M.COMMON_EVENT_NAME.SHOW_ALERT,"所选商品不可移入收藏夹"):void i.addSelectedFavorite(a).then(function(t){if(parseInt(t.code)==D.COLLECTION_STATUS.ALL_SUCCESS||parseInt(t.code)==D.COLLECTION_STATUS.PART_FAIL_PART_EXIST){T.broadcast(D.CART_EVENT_NAME.HIDE_LOADING);var n=D.COLLECTION_RESP_TIP[t.code||D.COLLECTION_STATUS.ALL_FAIL]||t.msg;T.broadcast(D.CART_EVENT_NAME.FAVORITE_ALERT,{event:o,type:"success",title:n}),t.code==D.COLLECTION_STATUS.ALL_SUCCESS&&e.delItem(a,!0)}else{T.broadcast(D.CART_EVENT_NAME.HIDE_LOADING);var n=D.COLLECTION_RESP_TIP[t.code||D.COLLECTION_STATUS.ALL_FAIL]||t.msg;T.broadcast(M.COMMON_EVENT_NAME.SHOW_ALERT,n),t.code==D.COLLECTION_STATUS.FAVOTITE_FULL&&e.delItem(a,!0)}})}),T.on(D.CART_EVENT_NAME.CHANGE_SELECTED,function(t,e,o,a){if(e){var n=!1,i=!1;$.each(e,function(t,e){var a=u.items;$.each(a,function(t,a){a&&a.detailId==e&&(a.selected=o),1==a.force&&a.selected&&i?n=!0:1==a.force&&a.selected&&(i=!0)})}),n&&!a?T.broadcast(M.COMMON_EVENT_NAME.ART_DIALOG,{id:"alertZeroItem",e:t,iconhide:"jhide",linecs:"lgtwoline",oktxt:"更改选择",htmlcont:"每单只能购买一件自营0元商品哦。",okcallback:function(t,o){T.broadcast(D.CART_EVENT_NAME.MODIFY_LIST,e),t&&t()},nocallback:function(t,e){t&&t()}}):T.broadcast(D.CART_EVENT_NAME.MODIFY_LIST,e)}}),T.on(D.CART_EVENT_NAME.MODIFY_LIST,function(t,o){s.modify(o).then(function(t){e.load(t)})}),T.on(D.CART_EVENT_NAME.MODIFY_SCORE,function(t,o,a){i.modifyScore(o,a).then(function(t){e.load(t)})}),T.on(D.CART_EVENT_NAME.CHANGE_PURCHASES,function(t,o,a){var n=u.item(o);n&&(n.qty=a),s.modify(o).then(function(t){e.load(t)})}),T.on(D.CART_EVENT_NAME.DEL_ITEM_CONFIRM,function(t,o,a){var n=[];$.each(o,function(t,e){n.push(e)}),n.length&&i.del(n,a).then(function(t){e.load(t)})}),T.on(D.CART_EVENT_NAME.CHANGE_ACTIVITY_CONFIRM,function(t,o){o=$.extend({id:0,activityCode:null},o);var a=u.item(o.id);o.activityCode&&a&&(a.campSeq=o.activityCode,a.selectedActivityCode=o.activityCode,s.modify(o.id).then(function(t){e.load(t)}))}),T.on(D.CART_EVENT_NAME.ADD_GIFT,function(t,o,a){i.modifyGift(o,a).then(function(t){e.load(t)})}),T.on(D.CART_EVENT_NAME.LOAD_RECOMMEND,function(t,o,a,n,i){var s=[],r=u.items;$.each(r,function(t,e){e.packageNo==o&&s.push(e.skuId)});var c=s.join();e.loadRecommend(o,a,n,c,i)}),T.on(D.CART_EVENT_NAME.CONFIRM_ADD_GOOD,function(t,o){I.stopPropagationFun(t);var a=_.getOffsetByTarget(t);e.playAddCartAnimation(a);var n=u.searchCollection(o);n&&i.add(n.addData).then(function(t){e.load(t)})}),T.on(D.CART_EVENT_NAME.GOODS_SPEC_ADD_GOOD,function(t,o,a){I.stopPropagationFun(t);var n=_.getOffsetByTarget(o);e.playAddCartAnimation(n),a&&i.add(a).then(function(t){e.load(t)})}),T.on(D.CART_EVENT_NAME.LOAD_VOUCHER_LIST,function(t,o,a){S.UID?e.$voucherList.load(o,a):T.broadcast(D.CART_EVENT_NAME.LOGIN_DIALOG,{redirectOrder:!1})}),T.on(D.CART_EVENT_NAME.RECEIVE_VOUCHER,function(t,e){var o=e.activityId;O.receive(e.activityId,e.type).then(function(t){t.activityId=o,T.broadcast(D.CART_EVENT_NAME.RECEIVE_VOUCHER_COMPLETE,t)})}),T.on(D.CART_EVENT_NAME.SHOW_GIFT_COUPON,function(t){if(S.UID){var e=F?100:300;$.dialog({id:"giftCoupon",title:"礼品券充值",background:"#000",opacity:.4,duration:0,lock:!0,content:'<div id="feeDialogTo"><iframe src="'+y+'/voucher/voucherBonus?openFrom=1" id="iframe_addGouwujin" frameborder="no" style="width: 500px;height: '+e+'px;"></iframe></div>',width:464,quickClose:!0,close:function(){window.location.reload()}})}else T.broadcast(D.CART_EVENT_NAME.LOGIN_DIALOG,{redirectOrder:!1})}),T.on(M.COMMON_EVENT_NAME.UNDO_DEL_COMPLETE,function(t,o){e.load(o)}),T.on(D.CART_EVENT_NAME.OVERSEAS_GO_AHEAD,function(t){e.overseasGoAhead(t)}),T.on(D.CART_EVENT_NAME.CLEAR_SELECTED_TRUE,function(t){var o=[];$.each(u.items,function(t,e){e.selected&&o.push(e)}),o.length&&e.delItem(o)}),T.on(M.COMMON_EVENT_NAME.SHOW_ERROR,function(t){e.status.loading(!1),e.status.empty(!1),e.status.error(!0)}),T.on(D.CART_EVENT_NAME.CLEAR_DISABLE_TRUE,function(t){var o=[];$.each(u.items,function(t,e){e.isClearDisable===!0&&o.push(e)}),o.length&&e.delItem(o)}),T.on(M.COMMON_EVENT_NAME.CLOSE_ALL_FLOAT_LAYER,function(t,e){e==D.CART_EVENT_NAME.CLOSE_CONFIRM_SELECTOR||T.broadcast(D.CART_EVENT_NAME.CLOSE_CONFIRM_SELECTOR),e==D.CART_EVENT_NAME.CLOSE_VOUCHER_SELECTOR||$(".J-event-voucher").removeClass("im-click")&&T.broadcast(D.CART_EVENT_NAME.CLOSE_VOUCHER_SELECTOR),e==D.CART_EVENT_NAME.CLOSE_ACTIVITY||$(".J-event-modifyActivity").removeClass("im-click")&&T.broadcast(D.CART_EVENT_NAME.CLOSE_ACTIVITY),e==D.CART_EVENT_NAME.CLOSE_TRIGGER_RECOMMEND||T.broadcast(D.CART_EVENT_NAME.CLOSE_TRIGGER_RECOMMEND)}),o.computed(function(){var t=this.selected();t&&t!=V&&(V=t,$.cookie("C_dist",t,{domain:L,path:"/",expires:300}))},this.selection),o.computed(function(){var t=e.selection.selectedN(),a=g&&g.match(/CS\d{6}_\d{6}_\d{6}/);t&&a&&t!=g&&t!=a[0]&&(g=t,$.cookie("C_dist_area",t,{domain:L,path:"/",expires:300}),o.tasks.schedule(function(){e.loadCart()}))},this.selection),this.$recommend=new t.RecommendView(String(Math.random())),this.$voucherList=new t.VoucherList,this.$queryValidVoucher=new t.QueryValidVoucher,this.$querySupNameList=new t.QuerySupNameList,this.$querySaleScoreMap=new t.QuerySaleScoreMap,this.loadDefalutCart()}return t.prototype.loadDefalutCart=function(){var t=this;C.bindEvents($("#dataView"));var e=$("#dataJson").val(),o=JSON.parse(e);return 1!=parseInt(o.status)?T.broadcast(M.COMMON_EVENT_NAME.SHOW_ERROR):i.loadDefault(o.info).then(function(e){t.load(e,!0)}).then(function(){t.$recommend.load()})},t.prototype.loadCart=function(){var t=this;return i.load().then(function(e){t.load(e,!1)})},t.prototype.load=function(t,e){if(this.status.loading(!1),T.broadcast(M.COMMON_EVENT_NAME.CLEAR_FNMM_CHAT_PANEL),null!=t&&!$.isEmptyObject(t.items)||e&&e===!0&&$("#dataView").html()){this.status.empty(!1);var o=l.parse(t);(e===!1||void 0===e)&&($("#dataView").html(o.getHtml()),T.broadcast(M.COMMON_EVENT_NAME.ADD_FNMM_CHAT_PANEL,{target:$(".fnmm-chat-panel")})),this.cart.update(o.getTotal()),this.cart.selectAll(this.parseHasSelectedAll()),this.cart.selectedCount(this.loadClearing()),this.cart.commonGoodsQty(this.goodsQty(!1,!1,u.items)),this.cart.overseasGoodsQty(this.goodsQty(!0,!1,u.items)),this.cart.commonSelectGoodsQty(this.goodsQty(!1,!0,u.items)),this.cart.hasDisable(this.hasDisable(u.items)),this.cart.hasAllDisable(this.hasAllDisable(u.items)),this.cart.msg(this.getHiddenMsg(u.items)),this.cart.oneLine("请先选购商品"==this.cart.msg()?!0:!1),this.cart.hiddenClearing(""==this.cart.hiddenMsg()?!1:!0),this.$queryValidVoucher.load(),this.$querySupNameList.load(),this.$querySaleScoreMap.load()}else this.status.empty(!0),this.cart=this.createCartTotal(),this.cart.commonGoodsQty(0),this.cart.overseasGoodsQty(0),this.cart.commonSelectGoodsQty(0)},t.prototype.loginDialog=function(){T.broadcast(D.CART_EVENT_NAME.LOGIN_DIALOG,{redirectOrder:!1})},t.prototype.createCartTotal=function(){return new t.MyCartTotal(this)},t.prototype.mixCart=function(t){var e=this;$.each(t,function(t,o){e.cart[t]&&$.isFunction(e.cart[t])&&e.cart[t].call(e.cart,o)})},t.prototype.loadClearing=function(){var t=0;return $.each(u.items,function(e,o){o.selected&&(t+=1)}),t},t.prototype.hasDisable=function(t){var e=!1;return $.each(t,function(t,o){return o.isClearDisable===!0?(e=!0,!1):void 0}),e},t.prototype.hasAllDisable=function(t){var e=!0;return $.each(t,function(t,o){return 0==o.sellingStatus?(e=!1,!1):void 0}),e},t.prototype.goodsQty=function(t,e,o){var a=0;return $.each(o,function(o,n){e&&!n.selected||!!n.isOverseas!=t||1!=n.kind||(a+=1)}),a},t.prototype.getHiddenMsg=function(t){if(0==this.cart.selectedCount())return"请先选购商品";if(0!=this.cart.nowTotalPayable())return"";var e=1;return 0==this.cart.nowTotalPayable()&&0==this.cart.totalScore()&&$.each(t,function(t,o){o.isFreeFreightPresent&&o.selected&&(e=0)}),e?"待结算商品的应付金额不可为0，请再选购其他商品":""},t.prototype.refresh=function(){window.location.reload()},t.prototype.selectAll=function(){var t=this;o.tasks.schedule(function(){i.selectAll(!t.cart.selectAll()).then(function(e){t.load(e)})})},t.prototype.parseHasSelectedAll=function(){var t=!0;return $.each(u.items,function(e,o){0==o.sellingStatus&&(t=t&&o.selected)}),t},t.prototype.parseHasSelected=function(){var t=!1;return $.each(u.items,function(e,o){t=t||o.selected}),t},t.prototype.hasSelected=function(){var t=this,e=$.Deferred();return o.tasks.schedule(function(){var o=t.parseHasSelected();o?e.resolve():e.reject()}),e.promise()},t.prototype.clearDisable=function(t){I.stopPropagationFun(t),T.broadcast(M.COMMON_EVENT_NAME.ART_DIALOG,{id:"clearDisable",e:t,headhide:1,htmlcont:"确认清除失效商品吗？",okcallback:function(t,e){T.broadcast(D.CART_EVENT_NAME.CLEAR_DISABLE_TRUE),t&&t()},nocallback:function(t,e){t&&t()}});try{window.upLogger.acceptEventParams($(t.currentTarget),"","2","1025","1",t)}catch(e){}},t.prototype.addFavorites=function(t){I.stopPropagationFun(t),S.UID?this.hasSelected().then(function(){T.broadcast(M.COMMON_EVENT_NAME.ART_DIALOG,{id:"addFavorites",e:t,headhide:1,htmlcont:"移入后所选商品将从购物车中删除？",okcallback:function(t,e){T.broadcast(D.CART_EVENT_NAME.ADD_SELECTED_TO_FAVORITE,e),t&&t()},nocallback:function(t,e){t&&t()}})},function(){T.broadcast(M.COMMON_EVENT_NAME.SHOW_ALERT,"请先选择想要收藏的商品。")}):T.broadcast(D.CART_EVENT_NAME.LOGIN_DIALOG,{redirectOrder:!1});try{window.upLogger.acceptEventParams($(t.currentTarget),"","2","1026","1",t)}catch(e){}},t.prototype.clearSelected=function(t){I.stopPropagationFun(t),this.hasSelected().then(function(){T.broadcast(M.COMMON_EVENT_NAME.ART_DIALOG,{id:"clearSelected",e:t,headhide:1,htmlcont:"确认要删除已选择的商品？",okcallback:function(t,e){T.broadcast(D.CART_EVENT_NAME.CLEAR_SELECTED_TRUE),t&&t()},nocallback:function(t,e){t&&t()}})},function(){T.broadcast(M.COMMON_EVENT_NAME.SHOW_ALERT,"请选择需要删除的商品。")})},t.prototype.delItem=function(t,e){var o=this;$.isArray(t)||(t=[t]);var a=[];$.each(t,function(t,e){var o=e.kind,n=e.sellingStatus;e.isVoucherPresent&&-1==$.inArray(n,[D.ITEM_STATUS.GIFT_VOUCHER_END,D.ITEM_STATUS.GIFT_VOUCHER_STOP])||!(e.isMain&&-1==$.inArray(o,[v.ITEM_KIND.KIND_CAMP_AMOUNT_GIFT,v.ITEM_KIND.KIND_CAMP_NUMBER_GIFT])||-1!=$.inArray(o,[v.ITEM_KIND.KIND_ADD,v.ITEM_KIND.KIND_THIRD_PART_MAIN]))||a.push(e.detailId)}),a.length&&i.del(a,e).then(function(t){o.load(t)})},t.prototype.clearAllTrue=function(){var t=this;i.clear().then(function(e){t.load(e)},function(){t.load(null)})},t.prototype.clearAll=function(t){I.stopPropagationFun(t);var e="确认要清空购物车？",o=this;T.broadcast(M.COMMON_EVENT_NAME.ART_DIALOG,{id:"clearAll",e:t,headhide:1,htmlcont:e,okcallback:function(t,e){o.clearAllTrue(),t&&t()},nocallback:function(t,e){t&&t()}})},t.prototype.submit=function(e,a){var n=this;if(I.stopPropagationFun(a),S.UID){if(this.cart.hiddenClearing())return!1;this.hasSelected().then(function(){return $.Deferred(function(t){o.utils.peekObservable(n.cart.hiddenClearing)?t.reject():t.resolve()}).promise()},function(){T.broadcast(M.COMMON_EVENT_NAME.SHOW_ALERT,"请选择需要购买的商品。")}).then(function(){t.submitInternal(!1,a)})}else T.broadcast(D.CART_EVENT_NAME.LOGIN_DIALOG,{redirectOrder:!0})},t.prototype.isSubmit=function(){var t=!1,e=!1,o=!1,a=null,n={overPriceLimit:!0,hasSelected:t,packgeHasSelected:e,shipmentCode:a};return $.each(u.items,function(t,o){o.isOverseas&&o.selected&&(e=!0)}),$.each(u.packages,function(n,i){e&&i.isOverseas&&(i.realQty>1||i.isOverseasNewTaxfee)&&parseFloat(i.payable)>parseFloat(i.overseasMaxPrice)&&(o=!0,e=!1,a=i.packageId),t=t?!0:e}),n.overPriceLimit=o,n.hasSelected=t,n.shipmentCode=a,n},t.prototype.overseasGoAhead=function(e){var o=[];$.each(u.packages,function(t,e){e.isOverseas&&e.realQty>1&&parseFloat(e.payable)>parseFloat(e.overseasMaxPrice)&&$.each(u.items,function(t,a){if(a.packageNo==e.packageId){var n=u.item(a.detailId);n&&(n.selected=!1),o.push(a.detailId)}})}),$.isArray(o)?s.modify(o).then(function(){t.submitInternal(!0,e)}):t.submitInternal(!0,e)},t.prototype.overseasSubmit=function(e,o){I.stopPropagationFun(o);var a=this.isSubmit();S.UID?a.hasSelected&&!a.overPriceLimit?t.submitInternal(!0,o):a.hasSelected&&a.overPriceLimit?this.alertOverseasMsgTip(a.shipmentCode):a.hasSelected||null!==a.shipmentCode&&T.broadcast(D.CART_EVENT_NAME.SCROLL_TO_PACKAGE,a.shipmentCode):T.broadcast(D.CART_EVENT_NAME.LOGIN_DIALOG,{redirectOrder:!1})},t.prototype.alertOverseasMsgTip=function(t){T.broadcast(M.COMMON_EVENT_NAME.ART_DIALOG,{id:"clearDisable",title:"温馨提示",e:null,linecs:"twoline",closehide:"jhide",htmlcont:"您有部分店铺商品总额超过海关限额，是否继续结算其他店铺商品？",oktxt:"继续结算",notxt:"重选商品",okcallback:function(t,e){T.broadcast(D.CART_EVENT_NAME.OVERSEAS_GO_AHEAD),t&&t()},nocallback:function(e,o){T.broadcast(D.CART_EVENT_NAME.SCROLL_TO_PACKAGE,t),e&&e()}})},t.submitInternal=function(t,e){_.submitUplogger(e),t?window.location.href="https:"+b+"/order/index?overseas=1":window.location.href="https:"+b+"/order/index"},t.prototype.loadRecommend=function(t,e,o,a,n){var i=this,s=t+"_"+a;this.triggerRecommendSelected||(this.triggerRecommendSelected={}),this.triggerRecommendSelected.hasOwnProperty(s)?T.broadcast(n,this.triggerRecommendSelected[s]):c.getCompFree(e,o,a).then(function(t){i.triggerRecommendSelected[s]=t,T.broadcast(n,t)})},t.prototype.playAddCartAnimation=function(t){var e=1,o=700,a=t.outerWidth(!0),n=t.outerHeight(!0),i=$('<div class="c-f-animate J-animated">+'+e+"</div>");i.css({top:t.top-37+"px",left:t.left+a/2-15+"px"}).appendTo(document.body).stop(!0,!0).animate({top:t.top-37-n,opacity:0},o,function(){i.remove()})},t.prototype.confirmGoodsBox=function(t){if(I.stopPropagationFun(t,D.CART_EVENT_NAME.CLOSE_CONFIRM_SELECTOR),!this.cart.nowTotalCount()&&!this.cart.confirmGoodsBox())return this.cart.confirmGoodsBox(!1),!1;var e=this;this.cart.confirmGoodsBox(!this.cart.confirmGoodsBox()),T.broadcast(D.CART_EVENT_NAME.CONFIRM_GOODS_BOX_REFRESH,{isShow:this.cart.confirmGoodsBox(),callback:function(){e.closeConfirmGoodsBox()}})},t.prototype.closeConfirmGoodsBox=function(){this.cart.confirmGoodsBox(!1)},t}();return function(t){var e=function(){function t(t){this.loading=o.observable(!1),this.error=o.observable(!1),this.empty=o.observable(!1),this.overseasEmpty=o.computed(t,this).extend({notify:"always"})}return t}();t.Status=e;var a=function(t){function e(e){var a=t.call(this)||this;a.confirmGoodsBox=o.observable(!1),a.selectedCount=o.observable(0),a.hasAllDisable=o.observable(!1);var n=a;return a.doubleClearing=o.computed(function(){return!(!n.commonSelectGoodsQty()||!n.overseasQty())},a).extend({notify:"always"}),a.goOverseasClearing=o.computed(function(){return!(n.commonSelectGoodsQty()||!n.overseasQty())},a).extend({notify:"always"}),a.goFNClearing=o.computed(function(){return!n.overseasQty()},a).extend({notify:"always"}),a.qty=o.computed(function(){return(n.commonGoodsQty()||0)+(n.overseasGoodsQty()||0)},a).extend({notify:"always"}),a.topChange=o.computed(function(){return n.doubleClearing()},a),a.nowTotalCount=o.computed(function(){return n.totalCount()},a),a.nowTotalWeight=o.computed(function(){return n.totalWeight()},a),a.nowTotalPrice=o.computed(function(){return n.sum()},a),a.nowTotalDiscount=o.computed(function(){return n.totalDiscount()},a),a.nowTotalFreight=o.computed(function(){return n.shipment()},a),a.nowTotalPayable=o.computed(function(){return n.amount()},a),a.nowVVipDiscount=o.computed(function(){return n.vVipDiscount()},a),a.hiddenMsg=o.computed(function(){return n.msg()},a),a.isOneLine=o.computed(function(){return n.oneLine()},a),a.isHiddenClearing=o.computed(function(){return n.hiddenClearing()},a),a}return __extends(e,t),e.prototype.update=function(e){return t.prototype.update.call(this,e),this},e}(d.ObservableCartTotal);t.MyCartTotal=a,t.RECOMMEND_TYPE={GUESS:"猜您喜欢",SPECIAL_OFFER:"为您推荐",FOOTPRINT:"我的足迹"};var n=function(){function e(e){var o=this;this.data={},this.type=m.TabViewType.SINGLE_LINE,this.guessTab=new h("GUESS",t.RECOMMEND_TYPE.GUESS),this.footprintTab=new h("FOOTPRINT",t.RECOMMEND_TYPE.FOOTPRINT),this.id=e,this.tabViewEvents={REFRESH_BEGIN:"REFRESH_BEGIN_RECOMMEND_VIEW_"+this.id,REFRESH_DATA:"REFRESH_DATA_RECOMMEND_VIEW_"+this.id,SWITCH_TAB:"SWITCH_TAB_RECOMMEND_VIEW_"+this.id,REFRESH_TAB:"REFRESH_TAB_RECOMMEND_VIEW_"+this.id,ADD_TAB:"ADD_TAB_RECOMMEND_VIEW_"+this.id,CLEAR_TAB:"ADD_TAB_CLEAR_VIEW_"+this.id,REMOVE_TAB:"ADD_TAB_REMOVE_VIEW_"+this.id},T.on(this.tabViewEvents.SWITCH_TAB,function(t,e){T.broadcast(o.tabViewEvents.REFRESH_DATA,e,o.data[e])})}return e.prototype.load=function(){var t=this;setTimeout(function(){T.broadcast(t.tabViewEvents.CLEAR_TAB),T.broadcast(t.tabViewEvents.ADD_TAB,t.guessTab),t.loadGuess(),S.UID&&(T.broadcast(t.tabViewEvents.ADD_TAB,t.footprintTab),t.loadFootprint())},1e3)},e.prototype.loadGuess=function(){var t=this;!this.data.GUESS&&o.tasks.schedule(function(){T.broadcast(t.tabViewEvents.REFRESH_BEGIN),N().then(function(e){e?(T.broadcast(t.tabViewEvents.REFRESH_DATA,"GUESS",e),t.data.GUESS=e):T.broadcast(t.tabViewEvents.REMOVE_TAB,t.guessTab)})})},e.prototype.loadSpecialOffer=function(){var t=this;!this.data.SPECIAL_OFFER&&o.tasks.schedule(function(){T.broadcast(t.tabViewEvents.REFRESH_BEGIN),p().then(function(e){e&&(T.broadcast(t.tabViewEvents.REFRESH_DATA,"SPECIAL_OFFER",e),t.data.SPECIAL_OFFER=e)})})},e.prototype.loadFootprint=function(){var t=this;!this.data.FOOTPRINT&&o.tasks.schedule(function(){T.broadcast(t.tabViewEvents.REFRESH_BEGIN),f().then(function(e){e?(T.broadcast(t.tabViewEvents.REFRESH_DATA,"FOOTPRINT",e),t.data.FOOTPRINT=e):T.broadcast(t.tabViewEvents.REMOVE_TAB,t.footprintTab)})})},e}();t.RecommendView=n;var i=function(){function t(){}return t.prototype.load=function(t,e,a){var n=this;o.tasks.schedule(function(){!n.data||a?(T.broadcast(D.CART_EVENT_NAME.LOADING_VOUCHER_SELECTOR,t),O.loadVoucher().then(function(o){o&&(n.data=o,T.broadcast(D.CART_EVENT_NAME.SHOW_VOUCHER_SELECTOR,{isShow:!0,packageCode:e,voucherList:o[e],offset:t}))},function(){})):T.broadcast(D.CART_EVENT_NAME.SHOW_VOUCHER_SELECTOR,{isShow:!0,packageCode:e,voucherList:n.data[e],offset:t})})},t}();t.VoucherList=i;var s=function(){function t(){this.selfData={},this.mallData={}}return t.prototype.load=function(){var t=this;this.selfData={},this.mallData={},$.each(u.items,function(e,o){var a=o.packageNo;if(0==o.type){var n=t.selfData[a]||[];-1==$.inArray(o.skuId,n)&&n.push(o.skuId),t.selfData[a]=n}else if(o.merchantId){var i=t.mallData[a]||[],s={merchantId:o.merchantId,skuId:o.skuId};i.push(s),t.mallData[a]=i}}),$.isEmptyObject(this.mallData)&&$.isEmptyObject(this.selfData)||O.queryValidVoucher(this.selfData,this.mallData).then(function(t){$.each(t,function(t,e){if("1"==e.hasActivity){var o=e.packageId;$(".J-voucher-"+o).show()}})})},t}();t.QueryValidVoucher=s;var c=function(){function t(){this.supSeqList=[]}return t.prototype.load=function(){var t=this;this.supSeqList=[],$.each(u.packages,function(e,o){-1==$.inArray(o.supSeq,t.supSeqList)&&o.type==v.GOODS_SOURCE.FEINIU&&o.itInType==v.STOCK_TYPE.TRANSFER&&!o.isFresh&&o.supSeq&&t.supSeqList.push(o.supSeq)}),$.isEmptyObject(this.supSeqList)||r.querySupNameList(this.supSeqList).then(function(t){$.each(t,function(t,e){if(e.supSeq&&e.showSupName){var o=S.SEARCH_BASE+"/?supSeq="+e.supSeq+"&supName="+e.showSupName;$('.J-package-title[data-sup-seq="'+e.supSeq+'"]').attr({title:e.showSupName,href:o}).text(e.showSupName)}})})},t}();t.QuerySupNameList=c;var _=function(){function t(){this.skuSeqs=[],this.skuSeqItNos=[]}return t.prototype.load=function(){var t=this;this.skuSeqs=[],this.skuSeqItNos=[],$.each(u.items,function(e,o){if(o.saleScoreFlag&&-1==$.inArray(o.saleScoreFlag,t.skuSeqs))switch(o.kind){case v.ITEM_KIND.KIND_MAIN:case v.ITEM_KIND.KIND_SALE_BASE:case v.ITEM_KIND.KIND_MULTIPLE:case v.ITEM_KIND.KIND_FIXED_COMBO:t.skuSeqs.push(o.saleScoreFlag);break;case v.ITEM_KIND.KIND_ADD:case v.ITEM_KIND.KIND_COMBO:case v.ITEM_KIND.KIND_THIRD_PART_MAIN:t.skuSeqItNos.push(o.saleScoreFlag)}}),$.isEmptyObject(this.skuSeqs)||E.querySaleScoreMap(this.skuSeqs,this.skuSeqItNos).then(function(t){t&&$.each(t,function(t,e){$('.J-sale-score-label[data-sale-score-flag="'+t+'"]').text("【"+e+"倍积分】"),$('.J-sale-score-combo-label[data-sale-score-flag="'+t+'"]').text("【多倍积分】")})})},t}();t.QuerySaleScoreMap=_}(G||(G={})),G});
//# sourceMappingURL=cart_controller.js.map