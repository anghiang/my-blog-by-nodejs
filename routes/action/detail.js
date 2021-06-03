var express = require('express');
var router = express.Router();
let userOper = require('../Dao/userOper')
let timeFormat = require('../Util/timeFormat')
router.get('/', (req, res) => {

    userOper.showArticleDetail(req.query.id, (err, data) => {
        if (err) {
            throw err
        }
        if (data) {
            timeFormat.timeFormat(data, "release_time")
            res.render('detail', { data: data[0], user: req.session.user })
        }
    })

    userOper.updatePage_view(req.query.id, (err) => {
        if (err) {
            throw err
        }
    })

})
module.exports = router;