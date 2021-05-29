var express = require('express');
let managerOper = require('../Dao/managerOper')

var router = express.Router();

router.post('/', (req, res) => {
    let id = req.body.id
    managerOper.deleteLoginLog(id, res, (err) => {
        if (err) {
            throw err
        }
    })
})

router.get('/all', (req, res) => {
    managerOper.deleteALLLoginLog(res, (err) => {
        if (err) {
            throw err
        }
    })
})


module.exports = router;