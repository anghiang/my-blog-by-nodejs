//是否确认删除
$(function () {
    $(document).on("click", "#main table tbody tr td a", function () {
        var name = $(this);
        var id = name.attr("rel"); //对应id  
        if (event.srcElement.outerText === "删除") {
            if (window.confirm("此操作不可逆，是否确认？")) {
                $.ajax({
                    type: "POST",
                    url: "/deleteLoginLog",
                    data: "id=" + id,
                    cache: false, //不缓存此页面   
                    success: function (data) {
                        if (data.success == "del_ok")
                            window.location.reload();
                    }
                });
            };
        };
    });
});
$('form').on('submit', function (e) {
    e.preventDefault()
    let sValue = $('.Sinput').val()
    $.ajax({
        type: "post",
        url: "/searchLoginLog",
        dataType: 'json',
        data: { sValue: sValue },
        success: function (data) {
            let inner;
            if (data.code == "0") {
                for (let i = 0; i < data.log.length; i++) {
                    inner += ` 
            <tr>
                <td>
                 ${data.log[i].user_id}
                </td>
                <td class="article-title">
                  ${data.log[i].userName}
                </td>
                <td>
                  ${data.log[i].login_time}
                <td><a rel="${data.log[i].id}">删除</a></td>
              </tr>`
                }
            } else if (data.code == "1") {
                inner = "没有找到您所需的数据"
            }

            $('.table tbody').html(inner)
        },
        error: function (err) {
            console.log(err)
        }

    })

})
$(document).on("click", ".deleteAll", function () {
    let confir = confirm("该操作不可逆，是否删除所有登入记录？")
    if (confir) {
        $.ajax({
            type: 'get',
            url: '/deleteLoginLog/all?confir="' + confir + '"',
            dataType: 'json',
            success: (data) => {
                if (data.success == "del_ok") {
                    window.location.reload()
                }
            }
        })
    }
})