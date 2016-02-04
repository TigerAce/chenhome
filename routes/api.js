/**
 * Created by chen on 16/2/1.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/aaa', function(req, res, next) {
    res.render('index', { title: 'Express aaa' });
});

module.exports = router;
