const { json } = require('express')
let db = require('../Util/mysqlConnection')
let md5 = require('blueimp-md5')
let sql = require('./sql')

exports.userLogin = (body, callback) => {
    db.db(sql.managerLoginSql(body), (err, data, filed) => {
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