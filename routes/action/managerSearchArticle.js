var express = require('express');
let managerOper = require('../Dao/managerOper')
var router = express.Router();
let timeFormat = require('../Util/timeFormat')
router.post('/', (req, res) => {
    managerOper.findArticleByName(req.body.sValue, (err, data) => {
        if (err) {
            throw err
        }
        if (data) {
            timeFormat.timeFormat(data, "release_time")
            res.json({ article: data })
        }
    })

})
module.exports = router;