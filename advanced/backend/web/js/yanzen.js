/**
 * Created by 朱宗博 on 2017/9/9.
 */
var user_edit_ops = {
    init:function(){
        this.eventBind();
    },
    eventBind:function(){
        $('.save').click(function(){
            var bn_target = $(this);

            bn_target.addClass('disabled')


            var nickname = $('input[name=nickname]').val();
            var email = $('input[name=email]').val();
            var mobile = $('input[name=mobile]').val();


            $.ajax({
                type:'post',
                url:'/web/user/edit',
                data:{
                    nickname:nickname,
                    email:email,
                    mobile:mobile
                },
                dataType:'json',
                success:function(data){
                    bn_target.removeClass('disabled');
                    if(data.code == 200) {
                        alert(data.msg);

                    }else{
                        alert(data.msg);
                    }
                }
            })
        })
    }

};
$(document).ready(function(){
    user_edit_ops.init();
});