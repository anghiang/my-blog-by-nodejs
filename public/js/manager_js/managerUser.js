$(function () {
    $(document).on('click', "#main table tbody tr td a", function () {
        var name = $(this);
        var id = name.attr("rel"); //对应id   
        if (name.attr("name") === "delete") {
            if (window.confirm("此操作不可逆，是否确认？")) {
                $.ajax({
                    type: "POST",
                    url: "/managerDeleteUser",
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
        url: "/managerSearchUser",
        dataType: 'json',
        data: { sValue: sValue },
        success: function (data) {
            let inner;
            if (data.code == "0") {
                for (let i = 0; i < data.user.length; i++) {
                    inner += ` 
            <tr>
              <td>
                ${data.user[i].user_id} 
                </td>
                <td>
                  ${data.user[i].userName} 
                </td>
                <td>
                  ${data.user[i].sex} 
                </td>
                <td>
                  ${data.user[i].email} 
                </td>
                <td>
                  ${data.user[i].register_time} 
                </td>r
                <td>
                  ${data.user[i].lastLogin_time} 
                </td>
                <td><a rel=" ${data.user[i].user_id} " name="delete">删除</a></td>
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