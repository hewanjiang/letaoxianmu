$(function () {
    //声明2个变量
    var pageNum = 1;
    var myPageSize = 5;

    function getData() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: pageNum,
                pageSize: myPageSize
            },
            success: function (back) {
                console.log(back);
                $('tbody').html(template('template', back));
                
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: pageNum, //当前页
                    totalPages: Math.ceil(back.total / back.size), //总页数
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

    }
    //默认调用自己一次。
    getData();

    // //表单验证
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '内容不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        console.log('你点我了');
        $.ajax({
            url:"/category/addTopCategory",
            data:$('form').serialize(),
            type:'post',
            success:function(backData){
               // console.log(backData);
               
                // 关闭modal
                $('.bs-example-modal-lg').modal('hide')
                // 重新获取当前页数据
                getData();
                
            }
        })
    });

})