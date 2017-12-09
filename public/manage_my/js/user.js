$(function () {
    //声明2个参数变量
    var pageNum = 1;
    var myPageSize = 5;

    function getSblek() {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: pageNum,
                pageSize: myPageSize
            },
            success: function (bcakData) {
                console.log(bcakData);
                $('tbody').html(template('template', bcakData));
                //需求2 分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: pageNum, //当前页
                    totalPages: Math.ceil(bcakData.total / bcakData.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        //console.log(page);
                        pageNum = page;
                        getSblek();
                    }
                })

            }
        })
    }


    getSblek();

    //为禁用和启用绑定点击事件
    $('tbody').on('click','botton',function(){
        var id = $(this).parent().attr('data-id');
        var isDelete = undefined;
        if($(this).html()=='启用'){
            isDelete = 0;
        }else{
            isDelete = 1;
        }
        $.ajax({
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            type:'post',
            success:function(back){
                getSblek();
            }
        })
    })




})