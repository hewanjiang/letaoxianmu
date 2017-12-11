$(function () {
    //定义两个变量
    var pageNum = 1;
    var pageSize = 5;

    function getData() {
        $.ajax({
            url: '/product/queryProductDetailList',
            data: {
                page: pageNum,
                pageSize: pageSize
            },
            success: function (backData) {
                console.log(backData);
                $('tbody').html(template('template', backData));
                // //分页插件初始化
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: pageNum, //当前页
                    totalPages: Math.ceil(backData.total / backData.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        pageNum = page;
                        getData();
                    }
                });

            }
        })
    }
    //默认调用一次
    getData();


    //文件上传
    $("#fileUpload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            //console.log(data);
            $('<img src="' + data.result.picAddr + '" alt="" style="width:100px; height:100px;">').appendTo('form .form-group:last');

            //判断是否加到上张
            if ($('form .form-group:last img').length == 3) {
                //刷新判断规矩
                $('form').data('bootstrapValidator').updateStatus('pic1', 'VALID');
            }
        }
    });
    //超出3张禁止上传
    $("#fileUpload").on('click', function (event) {
        if ($('form .form-group:last img').length == 3) {
            //阻止file的默认行为
            event.preventDefault();
        }
        console.log('你点我了');
    })
    //双击下面的图片删除自己
    $('form .form-group:last').on('dblclick','img',function(){
        $(this).remove();
    })



    //表单验证
    $('form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            },
            pldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            },
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            },
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '图片不能为空'
                    },
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑

        //上传图片
        $.ajax({
            url:'/product/addProduct',
            data:$('form').serialize(),
            type:'post',
            success:function(bcakData){
                console.log(bcakData);
               //清空表单
               $('form input').val('');
               $('.btn-add').modal('hide');
               //重新渲染数据
               getData();
            }
        })
    })


})