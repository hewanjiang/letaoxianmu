$(function(){
    //判断用户是否已经登录
    $.ajax({
        url:"/employee/checkRootLogin",
        success:function(backData){
            if(backData.error == 400){
                //登录失败
                window.location.href = "login.html";
            }
        }
    })

    //找到hende中的第一个 a 标签
    $(".dingtiao .a-b").on("click",function(){
        $('.lt_aside').toggle();
        $(".zhutu").toggleClass('dontai');
    })
    //找到右边的那个标签
    $('.dingtiao .c-d').on('click',function(){
        $('.modal-usan').modal('show');
    })

    //关闭modal回到login 页面
    $('.modal-footer .btn-danger').on('click',function(){
        $('.modal-usan').modal('hide');
        //调用登出接口
        $.ajax({
            url:'/employee/employeeLogout',
            success:function(){
                //打回到登陆页
                window.location.href = 'login.html';
            }
        })
       
    })

    //侧边栏点击展开 收缩
    $('.content ul >li:eq(1)>a').on('click',function(){
        $(this).siblings('ol').slideToggle();
    })
})