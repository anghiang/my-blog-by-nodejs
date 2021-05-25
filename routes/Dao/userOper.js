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
exports.userLogin = (body, callback) => {
    body.password = md5(md5(body.password))
    console.log(body.password)
    db.db(sql.loginSql(body), (err, data, filed) => {
        if (err) {
            callback(err)
        }
        if (data.length == 0) {
            callback(null, '1')
        } else if (data.length == 1) {
            callback(null, '0')
        }
    })
}