var express = require('express');
let managerOper = require('../Dao/managerOper')
var router = express.Router();
let timeFormat = require('../Util/timeFormat')
router.post('/', (req, res) => {
    managerOper.findArticleByName(req.body.sValue, (err, data, code) => {
        if (err) {
            throw err
        }
        if (code == "0") {
            timeFormat.timeFormat(data, "release_time")
            res.json({ article: data, code: code })
        } else if (code == "1") {
            res.json({ code: code })
        }
    })
})
module.exports = router;