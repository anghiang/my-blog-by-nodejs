exports.registerSql = (body) => {
    return 'insert into user(userName,sex,email,password)values("' + body.userName + '","' + body.sex + '","' + body.email + '","' + body.password + '");'
}



exports.loginSql = (body) => {
    return "select userName,password from user where userName ='" + body.userName + "' and password ='" + body.password + "';"
}
exports.managerLoginSql = (body) => {
    return "select userName,password from manager where userName ='" + body.userName + "' and password ='" + body.password + "';"
}
//判断用户是否存在
exports.jdugeUser = (body) => {
    return "select * from user where userName = '" + body.userName + "';"
}