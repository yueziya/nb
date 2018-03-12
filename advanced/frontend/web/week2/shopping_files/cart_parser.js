define(["require","exports","jquery","../entities/cart_total","../entities/cart","../../common/services/search_collection","../../common/entities/gift","../../common/entities/item","../../common/entities/package","../../common/entities/activity"],function(t,e,a,n,r,i,c,s,o,u){"use strict";var f=function(){function t(){}return t.parseGift=function(t,e){var n={};a.each(t,function(t,e){a.each(e,function(e,a){var r=new c(a),i=t,s=r.spuSeq;n[i]||(n[i]={}),n[i][s]||(n[i][s]=[]),n[i][s].push(r)})});var r=new c.GiftLevel;return a.each(n,function(t,n){var i=new c.GiftList;a.each(n,function(t,n){var r=new c.GiftCollection(e);a.each(n,function(t,e){r.put(e)}),i.put(r)}),r.put(i)}),r},t.parseCart=function(t){return new n(t)},t.parseCamps=function(t){var e=this,n={};return a.each(t,function(t,a){var r=u.factory(a);r.gift&&(r.giftLevel=e.parseGift(r.gift,r.qty)),n[t]=r,i.activity(t,r)}),n},t.parsePackages=function(t){var e={};return a.each(t,function(t,a){var n=o.factory(a);e[n.packageId]=n,i["package"](n.packageId,n)}),e},t.parseItems=function(t){var e={};return a.each(t,function(t,a){var n=s.factory(a);n.id=String(t),e[n.detailId]=n,i.item(n.detailId,n),i.linkedItem(n.id,n)}),e},t.parse=function(e){i.reset();var a=new r;a.setHtml(e.html);var n=t.parseItems(e.items||{});a.setItems(n);var c=t.parseCamps(e.camps||{});a.setCamps(c);var s=t.parsePackages(e.packages||{});a.setPackages(s);var o=t.parseCart(e.total||{});return a.setTotal(o),a},t}();return f});
//# sourceMappingURL=cart_parser.js.map