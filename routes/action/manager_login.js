var express = require('express');
let managerOper = require('../Dao/managerOper');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('manager_login');
});
router.post('/', function (req, res) {
    managerOper.login(req.body.userName, req.body.password, (err, code) => {
        if (err) {
            throw err
        }
        if (code) {
            res.json({ code: code })
        }
    })
})

module.exports = router;