var express = require('express');
let managerOper = require('../Dao/managerOper')
var router = express.Router();

router.post('/', (req, res) => {
    managerOper.findArticleByName(req.body.sValue, (err, data) => {
        if (err) {
            throw err
        }
        if (data) {
            res.json({ article: data })
        }
    })

})
module.exports = router;