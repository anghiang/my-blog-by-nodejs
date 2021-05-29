var express = require('express');
let managerOper = require('../Dao/managerOper')

var router = express.Router();

router.post('/', (req, res) => {
    let id = req.body.id
    managerOper.deleteUser(id, res, (err) => {
        if (err) {
            throw err
        }
    })
})


module.exports = router;