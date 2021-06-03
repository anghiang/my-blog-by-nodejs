var express = require('express');
let removeTAG = require('../Util/removeTag').removeTag
let managerOper = require('../Dao/managerOper')

var router = express.Router();

router.get('/', (req, res) => {
    if (req.session.manager) {
        res.render('managerAdd-article')
    } else {
        res.redirect('/enterError')
    }

})

router.post('/', (req, res) => {
    req.body.content = removeTAG(req.body.content)
    managerOper.addArticle(req.body, res, (err) => {
        if (err) {
            throw err
        }
    })
})
module.exports = router;