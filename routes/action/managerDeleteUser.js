var express = require('express');
let managerOper = require('../Dao/managerOper')

var router = express.Router();

router.get('/', (req, res) => {
    let id = req.query.id
    managerOper.deleteUser(id, res, (err) => {
        if (err) {
            throw err
        }
    })
})


module.exports = router;