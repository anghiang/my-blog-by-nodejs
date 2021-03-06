exports.registerSql = (body, time) => {
    return 'insert into user(userName,sex,email,password,register_time,lastLogin_time,head_portrait)values("' + body.userName + '","' + body.sex + '","' + body.email + '","' + body.password + '","' + time + '","' + time + '","/images/upload_img/01.png");'
}

exports.loginSql = (body) => {
    return "select * from user where userName ='" + body.userName + "' and password ='" + body.password + "';"
}
exports.updateLoginTime = (id, time) => {
    return "update user set lastLogin_time='" + time + "' where user_id=" + id + ""
}

exports.managerLogin = (name, password) => {
    return "select * from manager where name='" + name + "' and password='" + password + "'"
}

//判断用户是否存在
exports.jdugeUser = (body) => {
    return "select * from user where userName = '" + body.userName + "';"
}

exports.M_addArticle = (body, time) => {
    return 'insert into article(user_id,title,content,keywords,release_time,page_view,thumbUpQuantity,commentSum,update_time)values(17,"' + body.title + '","' + body.content + '","' + body.keywords + '","' + time + '",0,0,0,"' + time + '");'
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
exports.showComment = () => {
    return "select * from comment;"
}

exports.findCommentById = (id) => {
    return "select userName,title article_title,comment_text,c.release_time release_time from `comment` c INNER JOIN `user` u ON c.user_id = u.user_id  INNER JOIN article a ON c.article_id = a.id  where comment_id=" + id + ""
}
exports.deleteComment = (id) => {
    return "delete from comment where comment_id=" + id + ""
}

exports.findCommentByArticle = (article_title) => {
    return "select comment_id , userName,title article_title,comment_text,c.release_time release_time from `comment` c INNER JOIN `user` u ON c.user_id = u.user_id  INNER JOIN article a ON c.article_id = a.id  where a.title REGEXP '" + article_title + "'"
}
exports.showUser = () => {
    return "select * from user;"
}
exports.deleteUser = (id) => {
    return "delete from user where user_id =" + id + ""
}
exports.findUserByName = (userName) => {
    return "select * from user where userName REGEXP '" + userName + "'"
}

exports.addLoginLog = (user_id, time) => {
    return "insert into loginLog (user_id,login_time)values(" + user_id + ",'" + time + "')"
}
exports.showLoginLog = () => {
    return "SELECT l.id , u.user_id,userName,l.login_time FROM `loginlog` l INNER JOIN`user` u ON  l.user_id = u.user_id"
}
exports.deleteLoginLog = (id) => {
    return "delete from loginlog where id =" + id + ""
}

exports.findLoginLogByUser = (userName) => {
    return "SELECT l.id , u.user_id,userName,l.login_time FROM `loginlog` l INNER JOIN`user` u ON  l.user_id = u.user_id where userName REGEXP '" + userName + "'"
}
exports.deleteAllLoginLog = () => {
    return " truncate table loginlog"
}

exports.countArticle = () => {
    return "select COUNT(*) article_sum FROM article"
}
exports.countComment = () => {
    return "select count(*) comment_sum from comment"
}

exports.showHomeArticle = () => {
    return "SELECT a.id id, u.user_id user_id, userName,title,keywords,content,release_time,page_view,thumbUpQuantity,head_portrait FROM `article` a LEFT JOIN `user` u ON a.user_id = u.user_id order by id desc"
}

exports.updateImg = (newImg, id) => {
    return "update user set head_portrait='" + newImg + "' where user_id=" + id + ""
}

exports.addArticle = (id, body, time) => {
    return 'insert into article(user_id,title,content,keywords,release_time,page_view,thumbUpQuantity,commentSum,update_time)values(' + id + ',"' + body.title + '","' + body.content + '","' + body.keywords + '","' + time + '",0,0,0,"' + time + '");'
}
exports.showArticleDetail = (id) => {
    return "SELECT userName,title,content,release_time,page_view,thumbUpQuantity FROM `article` a LEFT JOIN `user` u ON a.user_id = u.user_id where id =" + id + ""
}
exports.updatepage_view = (id) => {
    return "update article set page_view = page_view+1 where id =" + id + ""
}