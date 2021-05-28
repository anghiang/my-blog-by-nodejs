var express = require('express');
let managerOper = require('../Dao/managerOper')
var router = express.Router();
let timeFormat = require('../Util/timeFormat')
router.post('/', (req, res) => {
    managerOper.findCommentById(req.body.id, (err, data) => {
        if (err) {
            throw err
        }
        if (data) {
            timeFormat.timeFormat(data, "release_time")
            res.json({ comment: data[0] })
        }
    })
})
module.exports = router;