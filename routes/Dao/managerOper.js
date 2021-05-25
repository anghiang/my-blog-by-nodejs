const { json } = require('express')
let db = require('../Util/mysqlConnection')
let md5 = require('blueimp-md5')
let sql = require('./sql')
let getNowTime = require('../Util/getNowTime').getNowTime()

exports.showArticle = (callback) => {
    db.db(sql.showArticle(), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data) {
            callback(null, data)
        }
    })
}

exports.addArticle = (body, res, callback) => {
    db.db(sql.M_addArticle(body, getNowTime), (err) => {
        if (err) {
            callback(err)
        } else {
            res.redirect('/managerArticle')
        }

    })
}

exports.deleteArticle = (id, res, callback) => {
    db.db(sql.deleteArticle(id), (err) => {
        if (err) {
            callback(err)
        } else {
            res.json({ success: "ok" })
        }
    })
}

exports.findArticleById = (id, callback) => {
    db.db(sql.findArticleById(id), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data) {
            callback(null, data)
        }
    })
}

exports.updateArticle = (body, res, callback) => {
    db.db(sql.updateArticle(body, getNowTime), (err) => {
        if (err) {
            callback(err)
        } else {
            res.redirect('/managerArticle')
        }
    })
}
exports.findArticleByName = (title, callback) => {
    db.db(sql.searchArticleByTitle(title), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data) {
            callback(null, data)
        }
    })
}