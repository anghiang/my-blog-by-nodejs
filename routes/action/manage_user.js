var express = require('express');
var router = express.Router();
let managerOper = require('../Dao/managerOper')
let timeFormat = require('../Util/timeFormat')

router.get('/', (req, res) => {
    res.render('manage-user')
})
module.exports = router;