/*

@Name：不落阁整站模板源码 
@Author：Absolutely 
@Site：http://www.lyblogs.cn

*/

layui.use(['element', 'layer', 'util', 'form'], function () {
    var $ = layui.jquery;
    //模拟QQ登陆
    // $('.blog-user').click(function () {
    //     var user = this;
    //     var index = layer.load(1);
    //     setTimeout(function () {
    //         layer.close(index);
    //         $(user).toggleClass('layui-hide').siblings('a.blog-user').toggleClass('layui-hide');
    //     }, 800);
    // });
    //分享工具
    // layui.util.fixbar({
    //     bar1: '&#xe641;',
    //     click: function (type) {
    //         if (type === 'bar1') {
    //             var sear = new RegExp('layui-hide');
    //             if (sear.test($('.blog-share').attr('class'))) {
    //                 shareIn();
    //             } else {
    //                 shareOut();
    //             }
    //         }
    //     }
    // });

    //子栏目导航点击事件
    $('.child-nav span').click(function () {
        layer.msg('切换到相应栏目');
        $(this).addClass('child-nav-btn-this').siblings().removeClass('child-nav-btn-this');
    });

    //侧边导航开关点击事件
    $('.blog-navicon').click(function () {
        var sear = new RegExp('layui-hide');
        if (sear.test($('.blog-nav-left').attr('class'))) {
            leftIn();
        } else {
            leftOut();
        }
    });
    //侧边导航遮罩点击事件
    $('.blog-mask').click(function () {
        leftOut();
    });
    //blog-body和blog-footer点击事件，用来关闭百度分享和类别导航
    $('.blog-body,.blog-footer').click(function () {
        shareOut();
        categoryOut();
    });
    //类别导航开关点击事件
    $('.category-toggle').click(function (e) {
        e.stopPropagation();    //阻止事件冒泡
        categroyIn();
    });
    //类别导航点击事件，用来关闭类别导航
    $('.article-category').click(function () {
        categoryOut();
    });
    //具体类别点击事件
    $('.article-category > a').click(function (e) {
        e.stopPropagation(); //阻止事件冒泡
    });

    //显示百度分享
    function shareIn() {
        $('.blog-share').unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
        $('.blog-share').removeClass('shareOut');
        $('.blog-share').addClass('shareIn');
        $('.blog-share').removeClass('layui-hide');
        $('.blog-share').addClass('layui-show');
    }
    //隐藏百度分享
    function shareOut() {
        $('.blog-share').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.blog-share').addClass('layui-hide');
        });
        $('.blog-share').removeClass('shareIn');
        $('.blog-share').addClass('shareOut');
        $('.blog-share').removeClass('layui-show');
    }
    //显示侧边导航
    function leftIn() {
        $('.blog-mask').unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
        $('.blog-nav-left').unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');

        $('.blog-mask').removeClass('maskOut');
        $('.blog-mask').addClass('maskIn');
        $('.blog-mask').removeClass('layui-hide');
        $('.blog-mask').addClass('layui-show');

        $('.blog-nav-left').removeClass('leftOut');
        $('.blog-nav-left').addClass('leftIn');
        $('.blog-nav-left').removeClass('layui-hide');
        $('.blog-nav-left').addClass('layui-show');
    }
    //隐藏侧边导航
    function leftOut() {
        $('.blog-mask').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.blog-mask').addClass('layui-hide');
        });
        $('.blog-nav-left').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.blog-nav-left').addClass('layui-hide');
        });

        $('.blog-mask').removeClass('maskIn');
        $('.blog-mask').addClass('maskOut');
        $('.blog-mask').removeClass('layui-show');

        $('.blog-nav-left').removeClass('leftIn');
        $('.blog-nav-left').addClass('leftOut');
        $('.blog-nav-left').removeClass('layui-show');
    }
    //显示类别导航
    function categroyIn() {
        $('.category-toggle').addClass('layui-hide');
        $('.article-category').unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');

        $('.article-category').removeClass('categoryOut');
        $('.article-category').addClass('categoryIn');
        $('.article-category').addClass('layui-show');
    }
    //隐藏类别导航
    function categoryOut() {
        $('.article-category').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.article-category').removeClass('layui-show');
            $('.category-toggle').removeClass('layui-hide');
        });

        $('.article-category').removeClass('categoryIn');
        $('.article-category').addClass('categoryOut');
    }

});


//百度分享插件
window._bd_share_config = {
    "common": {
        "bdSnsKey": {},
        "bdText": "",
        "bdStyle": "0",
        "bdSize": "32"
    },
    "share": {}
};
with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];


$(".upload").click(function () {
    $("#sbox").show("slow");
});
$("#hide").click(function () {
    $("#sbox").hide("slow");
});
$("#close").click(function () {
    $("#sbox").hide("slow");
});

$("#file0").change(function () {
    var objUrl = getObjectURL(this.files[0]);
    if (objUrl) {
        $(".t_img").attr("src", objUrl);
    }
});
//创建一个可存取到该file的url  
function getObjectURL(file) {
    var url = null;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已  
    if (window.createObjectURL != undefined) { // basic  
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)  
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome  
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}






$('.exitLogin').on('click', function () {
    if (window.confirm("确定要退出登入吗")) {
        $.ajax({
            type: "get",
            url: "/exitLogin?confirm=yes",
            dataType: 'json',
            success: function (data) {
                if (data.success == "exit_ok") {
                    window.location.href = "/home";
                }
            },
            error: function (err) {
                console.log(err)
            }
        });
    };

});
$('#login').click(() => {
    window.location.href = '/'
})