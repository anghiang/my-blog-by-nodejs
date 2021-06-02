var express = require('express');
var router = express.Router();
let userOper = require('../Dao/userOper')
let timeFormat = require('../Util/timeFormat')
let dataHandle = require('../Util/dataHandle')

/* GET users listing. */
router.get('/', (req, res) => {
  userOper.showArticle((err, data) => {
    if (err) {
      throw err
    }
    if (data) {
      dataHandle.dataHandle(data)
      timeFormat.timeFormat(data, "release_time")
      res.render('home', { data: data, user: req.session.user })
    }
  })
})
module.exports = router;
