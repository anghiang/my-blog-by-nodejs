var express = require('express');
let removeTAG = require('../Util/removeTag').removeTag
let userOper = require('../Dao/userOper')

var router = express.Router();

router.post('/', (req, res) => {
    if (req.session.user) {
        userOper.addArticle(req.session.user.user_id, req.body, res, (err) => {
            if (err) {
                throw err
            }
        })
    } else {
        res.json({ code: '1' })
    }
})
module.exports = router;