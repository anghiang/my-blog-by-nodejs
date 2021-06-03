var express = require('express');
var router = express.Router();
let managerOper = require('../Dao/managerOper')
let timeFormat = require('../Util/timeFormat')

router.get('/', (req, res) => {
    if (req.session.manager) {
        managerOper.showComment((err, data) => {
            if (err) {
                throw err
            }
            if (data) {
                timeFormat.timeFormat(data, "release_time")
                res.render('manager_comment', { data: data })
            }
        })
    } else {
        res.redirect('/enterError')
    }



})
module.exports = router;