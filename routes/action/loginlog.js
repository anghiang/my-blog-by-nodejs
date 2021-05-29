var express = require('express');
var router = express.Router();
let managerOper = require('../Dao/managerOper')
let timeFormat = require('../Util/timeFormat')

router.get('/', (req, res) => {
    managerOper.showLoginLog((err, data) => {
        if (err) {
            throw err
        }
        if (data) {
            timeFormat.timeFormat(data, "login_time")
            res.render('loginlog', { data: data })
        }
    })

})
module.exports = router;