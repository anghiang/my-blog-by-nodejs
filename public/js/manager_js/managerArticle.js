//是否确认删除


$(document).on('click', ".tbody tr td a", function () {
    var name = $(this);
    var id = name.attr("rel"); //对应id  
    if (event.srcElement.outerText == "修改") {
        window.location.href = "/managerUpdate-article?id=" + id + ""
    };
});

$('form').on('submit', function (e) {
    e.preventDefault()
    let sValue = $('.Sinput').val()
    $.ajax({
        type: "post",
        url: "/managerSearch-article",
        dataType: 'json',
        data: { sValue: sValue },
        success: function (data) {
            let inner;
            if (data.code == "0") {
                for (let i = 0; i < data.article.length; i++) {
                    inner += ` <tr>
                  <td><input type="checkbox" class="input-control" name="checkbox[]" value="" /></td>
                  <td class="article-title">
                    ${data.article[i].title} 
                  </td>
                  <td class="hidden-sm">
                    ${data.article[i].keywords} 
                  </td>
                  <td class="hidden-sm">
                    ${data.article[i].commentSum} 
                  </td>
                  <td class="hidden-sm">
                    ${data.article[i].page_view} 
                  </td>
                  <td class="hidden-sm">
                    ${data.article[i].thumbUpQuantity} 
                  </td>
                  <td>
                    ${data.article[i].release_time} 
                  </td>
                  <td><a rel=" ${data.article[i].id}">修改</a> <a rel=" ${data.article[i].id}">删除</a></td>
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
$(document).on('click', ".tbody tr td a", function () {
    var name = $(this);
    var id = name.attr("rel"); //对应id  
    if (event.srcElement.outerText == "删除") {
        if (window.confirm("此操作不可逆，是否确认？")) {
            $.ajax({
                type: "get",
                url: "/managerDelete-article?id=" + id + "",
                dataType: "json",
                success: function (data) {
                    if (data.success == "ok") {
                        window.location.href = "/managerArticle";
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            });
        };
    };
});