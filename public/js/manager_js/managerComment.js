$(function () {
    $(document).on('click', ".tbody tr td a", function () {
        var name = $(this);
        var id = name.attr("rel"); //对应id   
        if (name.attr("name") === "see") {
            $.ajax({
                type: "POST",
                url: "/managerSearchComment",
                data: "id=" + id,
                success: function (data) {
                    $('.see-comment-user').html(data.comment.userName);
                    $('.see-comment-from').html(data.comment.article_title);
                    $('.see-comment-content').html(data.comment.comment_text);
                    $('.see-comment-time').html(data.comment.release_time);
                    $('#seeComment').modal('show');
                }
            });
        } else if (name.attr("name") === "delete") {
            if (window.confirm("此操作不可逆，是否确认？")) {
                $.ajax({
                    type: "POST",
                    url: "/managerDeleteComment",
                    data: "id=" + id,
                    cache: false, //不缓存此页面   
                    success: function (data) {
                        if (data.success == "del_ok") {
                            window.location.reload()
                        }
                    }
                });
            };
        };
        return false;
    });
});

$('.seek').on('submit', function (e) {
    e.preventDefault()
    let sValue = $('.search').val()
    $.ajax({
        type: 'post',
        url: '/managerSeekComment',
        data: { sValue: sValue },
        success: (data) => {
            let inner;
            if (data.code == "0") {
                for (let i = 0; i < data.comment.length; i++) {
                    inner += ` <tr>
                  <td><input type="checkbox" class="input-control" name="checkbox[]" value="" /></td>
                  <td class="article-title">
                    ${data.comment[i].article_title} 
                  </td>
                  <td>
                    ${data.comment[i].release_time} 
                  </td>
                  <td><a rel="${data.comment[i].comment_id} " name="see">查看</a> <a rel="${data.comment[i].comment_id}" name="delete">删除</a>
                  </td>
                </tr>`
                }
            } else if (data.code == "1") {
                inner = "没有找到您所需的数据"
            }

            $('.tbody').html(inner)
        },
        error: (err) => {
            console.log(err)
        }
    })
}
)