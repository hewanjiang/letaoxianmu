

$(function () {
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-heart',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 4,
                        max: 12,
                        message: '用户名长度必须在6到30之间'
                      },
                      callback:{
                          massage:'用户名不存在'
                      }
                }
            },
            password:{
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码必须在6到12之间'
                      },
                      callback:{
                          message:"密码错误"
                      }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        //来个进度条怎么样
        NProgress.start();
        $.ajax({
            url:"/employee/employeeLogin",
            data:$("form").serialize(),
            type:'post',
            success:function(backData){
                console.log(backData);
                //判断验证结果
                if(backData.success == true){
                    window.location.href = "./index.html";
                }else{
                    //获取验证插件对象
                    var validator = $("form").data('bootstrapValidator');
                    //失败
                    if(backData.error ==1000){
                        //用户名不存在
                        validator.updateStatus('username','INVALID','callback');
                    }else if(backData.error == 1001){
                        validator.updateStatus('username','INVALID','callback');
                    }
                }
                setTimeout(function(){
                    //收起进度条
                    NProgress.done();
                },800)
            }
        })
    });

    //为重置表单绑定点击事件
    $('button[type=reset]').on('click',function(){
        //获取插件对象
        var validator = $("form").data('bootstrapValidator'); //获取表单校验实例
        validator.resetForm();
    })

    //关闭进度条
    setTimeout(function(){},2000)
})