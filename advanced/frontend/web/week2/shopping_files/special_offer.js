define(["require","exports","./ajax","../entities/recommend_item","../options/option_url"],function(n,t,e,r,i){"use strict";return function(){return e(i.COMMON_URL.SPECIAL_OFFER,{},"GET").then(function(n){return n?r.factory(n.data||[],r.SpecialOffer):null},function(){return null})}});
//# sourceMappingURL=special_offer.js.map