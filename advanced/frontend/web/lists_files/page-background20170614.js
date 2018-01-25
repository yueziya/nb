/* 
* @Author: anchen
* @Date:   2017-06-14 14:10:23
* @Last Modified by:   anchen
* @Last Modified time: 2017-06-14 14:10:36
*/

    var isTemplet  = 'on';
    function impHandel(imp){
        var impressionSource = document.createElement('div');
        impressionSource.style.display = "none";
        impressionSource.innerHTML = "<img src='" + imp + "' style='width:1px;height:1px;border:none;' />";
        document.body.insertBefore(impressionSource , document.body.childNodes[0]);
    }

    if("undefined" != typeof imp_arr && imp_arr != ''){
        for(var j = 0;j < imp_arr.length; j++){
            impHandel(imp_arr[j]);
        }
    }
    var page_background_click_imp_arr = click_imp_arr;
    document.getElementById('page_background').onclick = function() {
        if("undefined" != typeof page_background_click_imp_arr && page_background_click_imp_arr != ''){
            for(var i = 0;i < page_background_click_imp_arr.length; i++){
                impHandel(page_background_click_imp_arr[i]);
            }
        }
    }