const { renderFile } = require('ejs');
const { json } = require('express');
var express = require('express');
let userOper = require('../Dao/userOper')
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('manager_login');
});
router.post('/', function (req, res) {
    let body = req.body
    if (body.username == "杨志刚" && body.password == '123123') {
        res.redirect('managerMain')
    }
})

module.exports = router;