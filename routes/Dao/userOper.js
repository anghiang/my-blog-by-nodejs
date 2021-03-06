const { json } = require('express')
let db = require('../Util/mysqlConnection')
let md5 = require('blueimp-md5')
let sql = require('./sql')
let getNowTime = require('../Util/getNowTime').getNowTime()


exports.userRegister = async (body, callback) => {
    let Pjduge = new Promise((resolve, reject) => {
        db.db(sql.jdugeUser(body), (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
    Pjduge.then((data) => {
        //用户已存在
        if (data.length != 0) {
            callback(null, '1')
        } else if (data.length == 0) {
            //密码不一致
            if (body.password != body.confirm_password) {
                callback(null, '2')
            } else {
                body.password = md5(md5(body.password))
                db.db(sql.registerSql(body, getNowTime), (err) => {
                    if (err) {
                        callback(err, null)
                    }
                    callback(null, "0")
                })
            }


        }
    })

}
exports.userLogin = (body, req, callback) => {
    body.password = md5(md5(body.password))
    db.db(sql.loginSql(body), (err, data, filed) => {
        if (err) {
            callback(err)
        }
        if (data.length == 0) {
            callback(null, '1')
        } else if (data.length == 1) {
            req.session.user = data[0]
            db.db(sql.updateLoginTime(data[0].user_id, getNowTime), (err) => {
                if (err) {
                    callback(err)
                }
            })
            db.db(sql.addLoginLog(data[0].user_id, getNowTime), (err) => {
                if (err) {
                    callback(err)
                }
            })
            callback(null, '0')

        }
    })
}

exports.showArticle = (callback) => {
    db.db(sql.showHomeArticle(), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data) {
            callback(null, data)
        }
    })
}
exports.updateImg = (newImg, res, req, callback) => {
    newImg = "/images/upload_img/" + newImg
    req.session.user.head_portrait = newImg
    db.db(sql.updateImg(newImg, req.session.user.user_id), (err) => {
        if (err) {
            callback(err)
        } else {
            res.redirect('/home')
        }
    })
}

exports.addArticle = (id, body, res, callback) => {
    db.db(sql.addArticle(id, body, getNowTime), (err) => {
        if (err) {
            callback(err)
        } else {
            res.json({ code: '0' })
        }
    })
}

exports.showArticleDetail = (id, callback) => {
    db.db(sql.showArticleDetail(id), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data) {
            callback(null, data)
        }
    })
}
exports.updatePage_view = (id, callback) => {
    db.db(sql.updatepage_view(id), (err) => {
        if (err) {
            callback(err)
        }
    })
}

