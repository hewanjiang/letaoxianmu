$(function(){
    //搞2个变量。定义2个参数
    var pageNum = 1;
    var myPageSize = 5;
    function getData(){

    }$.ajax({
        url:"/category/querySecondCategoryPaging",
        data:{
            page:pageNum,
            pageSize:myPageSize
        },
        success:function(bcak){
            //console.log(bcak);
            $('tbody').html(template('template',bcak));
             
            $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                currentPage: pageNum, //当前页
                totalPages: Math.ceil(bcak.total / bcak.size), //总页数
                size: "small", //设置控件的大小，mini, small, normal,large
                onPageClicked: function (event, originalEvent, type, page) {
                    //为按钮绑定点击事件 page:当前点击的按钮值
                    // 获取页码
                    pageNum = page;
                    getData();
                }
            });
        }
    })
    
    //默认调用一次函数
    getData();

    //初始化文件上传
    $('#fileUpload').fileupload({
        dataType: "json",
        //e:事件对象
        //data:图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function(e,data){
            //把路径设置给img
            $('form img').attr('src',data.result.picAddr);
            //设置给文件路径 input
            $('input[name=linlaes]').val(data.result.picAddr);
            //人为的更新字段的验证信息
            $('form').data('bootstrapValidator').updateStatus('linlaes','VALID');

        }
    });

    //获取分页数据 渲染到页面上
    $.ajax({
        url:"/category/queryTopCategoryPaging",
        data:{
            page:1,
            pageSize:250
        },
        success:function(backData){
            console.log(backData);
            $('.dropdown-menu').html('');
            //循环随意的数组
            for(var i=0;i<backData.rows.length;i++){
                var $li = $("<li><a data-id='"+backData.rows[i].id+"' href='javascript:void(0)'>"+backData.rows[i].categoryName+"</a></li>");
                $('.dropdown-menu').append($li);
               
            }
        }
    })
    //给生成的li标签绑定点击事件(给父元素绑定)
    $('.dropdown-menu').on('click','a',function(){
        var clickWbn = $(this).html();
        //显示选择的文本
        $('.select-value').html(clickWbn);
        //设置id 
        $('input[name=categoryId]').val($(this).attr('data-id'));
        //人为设置更改效验的结果为成功
        $("form").data('bootstrapValidator').updateStatus('categoryId','VALID');
    })

    //数据效验
    $('form').bootstrapValidator({
        excluded: [':disabled'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
         //3. 指定校验字段
        fields: {
        //校验用户名，对应name表单的name属性
            categoryId: {
                 validators: {
            //不能为空
                    notEmpty: {
                        message: '分类不能为空'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"分类名不能为空"
                    }
                }
            },
            linlaes:{
                validators:{
                    notEmpty:{
                        message:"图片不能为空"
                    }
                }
            } 
        }       
    }).on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            url:'/category/addSecondCategory',
            data:$('form').serialize(),
            type:'post',
            success:function(backData){
                //重新掉用函数，刷新页面
                getData();

                //关闭modal
                $('.modal-add').modal("hide");
                //清空表单
                $("form").data('bootstrapValidator').resetForm();
                $('form input').val('');
                $('form img').attr('src','./images/nome.png');
                $('.select-value').html('请选择');
            }
        })
    })          //刷新页面的方法有很多
                // 正确的就只有一条
                // window.location.reload();重新加载
                // window.location.href = window.location.href;

})