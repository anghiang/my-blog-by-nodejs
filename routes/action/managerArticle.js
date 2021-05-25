var express = require('express');
var router = express.Router();
let managerOper = require('../Dao/managerOper')

router.get('/', (req, res) => {
    managerOper.showArticle((err, data) => {
        if (err) {
            throw err
        }
        if (data) {
            res.render('manager_article', { data: data })

        }
    })
})
module.exports = router;