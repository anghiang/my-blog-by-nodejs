const { json } = require('express');
let express = require('express');
let userOper = require('../Dao/userOper')
let router = express.Router();

router.get('/', (req, res) => {
    res.render('register')
})
router.post('/', (req, res) => {
    let body = req.body
    userOper.userRegister(body, (err, code) => {
        if (err) {
            console.log(err)
        }
        res.json({ err_code: code })
    })
})
module.exports = router;