// 定义对象

var unique = {
    obj:"input[name='username']",
	url:"?r=login/register",
	init:function(){
		this.only();
	},
    only:function(){
    	$(this.obj).blur(function(){
    		$.ajax({
    		url:unique.url,
    		type:'post',
    		data:{name:'张三',email:'1633616271@qq.com'},
    		success:function(data){
    			alert(data);
    		}  			
    		});
    	});
    }
}