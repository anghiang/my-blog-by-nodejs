exports.registerSql = (body, time) => {
    return 'insert into user(userName,sex,email,password,register_time)values("' + body.userName + '","' + body.sex + '","' + body.email + '","' + body.password + '","' + time + '");'
}

exports.loginSql = (body) => {
    return "select userName,password from user where userName ='" + body.userName + "' and password ='" + body.password + "';"
}

//判断用户是否存在
exports.jdugeUser = (body) => {
    return "select * from user where userName = '" + body.userName + "';"
}

exports.M_addArticle = (body, time) => {
    return 'insert into article(title,content,keywords,release_time,page_view,thumbUpQuantity,commentSum,update_time)values("' + body.title + '","' + body.content + '","' + body.keywords + '","' + time + '",0,0,0,"' + time + '");'
}

exports.showArticle = () => {
    return "select * from article;"
}

exports.deleteArticle = (id) => {
    return "delete from article where id =" + id + ""
}
exports.findArticleById = (id) => {
    return "select * from article where id =" + id + ""
}
exports.updateArticle = (body, update_time) => {
    return "update article set title='" + body.title + "',content='" + body.content + "',keywords='" + body.keywords + "',update_time='" + update_time + "' where id =" + body.id + ""
}

exports.searchArticleByTitle = (keywords) => {
    return "select * from article where keywords REGEXP '" + keywords + "'"
}