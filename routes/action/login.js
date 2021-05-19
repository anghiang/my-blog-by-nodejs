const { renderFile } = require('ejs');
const { json } = require('express');
var express = require('express');
let userOper = require('../Dao/userOper')
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});
router.post('/', function (req, res) {
    let body = req.body
    userOper.userLogin(body, (err, code) => {
        if (err) {
            console.log(err)
        }
        res.json({ err_code: code })
    })
})

module.exports = router;