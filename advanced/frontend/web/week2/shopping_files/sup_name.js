define(["require","exports","./ajax","../options/option_url","../entities/sup_name"],function(n,t,r,e,u){"use strict";var i=function(){function n(){}return n.prototype.querySupNameList=function(n){var t={sup_seqs:JSON.stringify(n)};return r(e.COMMON_URL.GET_SUP_NAME_LIST,t,"post",{isAlertErr:!1}).then(function(n){return n?u.parseList(n):{}},function(){return null})},n}(),s=new i;return s});
//# sourceMappingURL=sup_name.js.map