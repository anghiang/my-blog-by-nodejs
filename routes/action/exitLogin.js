var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if (req.query.confirm == 'yes') {
        req.session.user = null
        res.json({ success: 'exit_ok' })
    }
})
module.exports = router;