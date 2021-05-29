var express = require('express');
let managerOper = require('../Dao/managerOper')
var router = express.Router();

router.get('/', (req, res) => {
    managerOper.showMain((err, comSum, arSum) => {
        if (err) {
            throw err
        } else (
            res.render('manager_main', { article_sum: arSum[0].article_sum, comment_sum: comSum[0].comment_sum })
        )
    })

})
module.exports = router;