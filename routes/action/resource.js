var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('resource', { user: req.session.user })
})
module.exports = router;