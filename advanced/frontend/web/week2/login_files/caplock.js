/**
 * Created by jun.wang on 2016/4/26.
 * 大小写键盘锁定提示
 * 使用：
 * 	引入js后，在input上加上class J-cap-lock，input上添加data-capsid属性（属性值指向提示dom的id）
 */
(function() {
    var _capsLock = (function() {

        /**
         * @returns {boolean}
         * @private
         */
        function _checkCapLock(e) {
            var capsLockKey = e.keyCode ? e.keyCode : e.which;
            var shifKey = e.shiftKey ? e.shiftKey:((capsLockKey == 16) ? true : false);
            if(((capsLockKey >= 65 && capsLockKey <= 90) && !shifKey)||((capsLockKey >= 97 && capsLockKey <= 122) && shifKey)){
                return true;
            }else{
                return false;
            }
        }

        function _bind() {
            $(document.body).on("keypress",".J-cap-lock", function(e) {
                var id=$(this).data("capsid");
                if(_checkCapLock(e)) {
                    $(id).show();
                }else {
                    $(id).hide();
                }
            });
            $(document.body).on("blur",".J-cap-lock", function(e) {
                var id=$(this).data("capsid");
                $(id).hide();
            });
        }
        return {
            bind : _bind
        }
    })();
    
    /**AMD支持**/
	if ( typeof define === "function" && define.amd ) {
		define("capslock", [], function() {
			return  _capsLock;
		});
	}

    $(function() {
        _capsLock.bind();
    });
})();