const { json } = require('express');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('about', { user: req.session.user })
})
module.exports = router;