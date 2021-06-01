const { json } = require('express')
let db = require('../Util/mysqlConnection')
let md5 = require('blueimp-md5')
let sql = require('./sql')
let getNowTime = require('../Util/getNowTime').getNowTime()

exports.login = (req, name, password, callback) => {
    db.db(sql.managerLogin(name, password), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data) {
            if (data.length == 0) {
                callback(null, "1")
            } else if (data.length != 0) {
                req.session.manager = data[0]
                callback(null, "0")
            }
        }
    })
}

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
        if (data.length != 0) {
            callback(null, data, "0")
        } else if (data.length == 0) {
            callback(null, null, "1")
        }
    })
}
exports.showComment = (callback) => {
    db.db(sql.showComment(), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data) {
            callback(null, data)
        }
    })
}
exports.findCommentById = (id, callback) => {
    db.db(sql.findCommentById(id), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data) {
            callback(null, data)
        }
    })
}
exports.deleteComment = (id, res, callback) => {
    db.db(sql.deleteComment(id), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data) {
            res.json({ success: "del_ok" })
        }
    })

}
exports.findCommentByArticle = (article_title, callback) => {
    db.db(sql.findCommentByArticle(article_title), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data.length != 0) {
            callback(null, data, "0")
        } else if (data.length == 0) {
            callback(null, null, "1")
        }
    })
}
exports.showUser = (callback) => {
    db.db(sql.showUser(), (err, data) => {
        if (err) {
            callback(data)
        }
        if (data) {
            callback(null, data)
        }
    })
}
exports.deleteUser = (id, res, callback) => {
    db.db(sql.deleteUser(id), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data) {
            res.json({ success: "del_ok" })
        }
    })

}

exports.findUserByName = (userName, callback) => {
    db.db(sql.findUserByName(userName), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data.length != 0) {
            callback(null, data, "0")
        } else if (data.length == 0) {
            callback(null, null, "1")
        }
    })
}

exports.showLoginLog = (callback) => {
    db.db(sql.showLoginLog(), (err, data) => {
        if (err) {
            callback(data)
        }
        if (data) {
            callback(null, data)
        }
    })
}
exports.deleteLoginLog = (id, res, callback) => {
    db.db(sql.deleteLoginLog(id), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data) {
            res.json({ success: "del_ok" })
        }
    })

}

exports.findLoginLogByuser = (userName, callback) => {
    db.db(sql.findLoginLogByUser(userName), (err, data) => {
        if (err) {
            callback(err)
        }
        if (data.length != 0) {
            callback(null, data, "0")
        } else if (data.length == 0) {
            callback(null, null, "1")
        }
    })
}

exports.deleteALLLoginLog = (res, callback) => {
    db.db(sql.deleteAllLoginLog(), (err) => {
        if (err) {
            callback(err)
        } else {
            res.json({ success: "del_ok" })
        }
    })
}

exports.showMain = (callback) => {
    let prom = new Promise((resolve, reject) => {
        db.db(sql.countArticle(), (err, arSum) => {
            if (err) {
                callback(err)
            }
            if (arSum) {
                resolve(arSum)
            }
        })
    });
    prom.then((arSum) => {
        db.db(sql.countComment(), (err, comSum) => {
            if (err) {
                callback(err)
            }
            if (comSum) {
                callback(null, comSum, arSum)
            }
        })
    })

}

