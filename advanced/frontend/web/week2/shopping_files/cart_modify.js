var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};define(["require","exports","./search_collection","../options/option_url","../../common/options/option_base","./cart_base"],function(t,e,n,i,r,o){"use strict";var u=50,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.queue=[],e}return __extends(e,t),e.prototype.add=function(t){this.queue.push(t)},e.prototype.submitInternal=function(t,e){var n=this,r=$.Deferred(),o={};$.each(t,function(t,e){try{var n=d.factory(e);o[n.cart_detail_id]&&(n=o[n.cart_detail_id].extend(n)),o[n.cart_detail_id]=n}catch(i){}});var u={cart_detail_list:[],is_get_all:e};return $.each(o,function(t,e){u.cart_detail_list.push(e)}),u.cart_detail_list.length&&setTimeout(function(){n.send(i.COMMON_URL.MODIFY_LIST,$.extend(n.getDefaultCartData(),u)).then(function(t){r.resolve(t)},function(t){r.reject(t)})}),r.promise()},e.prototype.submit=function(){var t=this;return this.modifyDefer=$.Deferred(),this.modifyHandel&&clearTimeout(this.modifyHandel),this.modifyHandel=setTimeout(function(){t.submitInternal(t.queue,!0).then(function(e){t.modifyDefer&&t.modifyDefer.resolve(e),t.modifyDefer=null,t.queue.length=0},function(e){t.modifyDefer&&t.modifyDefer.reject(e),t.modifyDefer=null,t.queue.length=0})},u),this.modifyDefer.promise()},e.prototype.submitImmediately=function(t){return this.submitInternal(t,!0)},e.prototype.handel=function(t){return this.add(t),this.submit()},e.prototype.handelImmediately=function(t){return this.submitImmediately(t)},e}(o),d=function(){function t(){}return t.prototype.extend=function(t){return $.extend(this,t),this},t.getAllQty=function(t){var e=0,i=n.items;return i&&$.each(i,function(n,i){i.kind!=r.ITEM_KIND.KIND_MAIN&&i.kind!=r.ITEM_KIND.KIND_SALE_BASE||i.detailId!=t&&i.detailParentId!=t||(e+=Number(i.qty))}),e},t.getItem=function(t){var e;if(!n.item(t)||!n.item(t).isSelling)throw new Error("No such item: "+t);return e=n.item(t)},t.factory=function(e){var n=t.getItem(e),i=n.trackId,o=n.qty;(n.sourceSell>0||n.kind===r.ITEM_KIND.KIND_SALE_BASE)&&(n.kind===r.ITEM_KIND.KIND_SALE_BASE&&(i=n.detailParentId),o=t.getAllQty(i)),n.kind===r.ITEM_KIND.KIND_THIRD_PART_MAIN&&(i=n.detailId);var u=new t;return u.cart_detail_id=i,u.qty=o,u.selected=!!n.selected,u.campaign_seq=n.selectedActivityCode&&"null"!=n.selectedActivityCode?n.selectedActivityCode:"",u.force=n.force||0,u},t}(),c=function(){function t(){this.modifyManager=new a}return t.prototype.modify=function(t){return $.isArray(t)?this.modifyManager.handelImmediately(t):this.modifyManager.handel(t)},t}(),s=new c;return s});
//# sourceMappingURL=cart_modify.js.map