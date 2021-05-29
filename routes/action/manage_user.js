var express = require('express');
var router = express.Router();
let managerOper = require('../Dao/managerOper')
let timeFormat = require('../Util/timeFormat')

router.get('/', (req, res) => {
    managerOper.showUser((err, data) => {
        if (err) {
            throw err
        }
        if (data) {
            timeFormat.timeFormat(data, "register_time")
            timeFormat.timeFormat(data, "lastLogin_time")
            res.render('manage-user', { data: data })
        }
    })

})
module.exports = router;