var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('timeline', { user: req.session.user })
})
module.exports = router;