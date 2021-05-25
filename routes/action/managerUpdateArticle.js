var express = require('express');
let managerOper = require('../Dao/managerOper')

var router = express.Router();

router.get('/', (req, res) => {
    managerOper.findArticleById(req.query.id, (err, data) => {
        if (err) {
            throw err
        }
        if (data) {
            res.render('managerUpdate-article', { data: data[0] })
        }
    })
})
router.post('/', (req, res) => {
    managerOper.updateArticle(req.body, res, (err) => {
        if (err) {
            throw err
        }
    })
})


module.exports = router;