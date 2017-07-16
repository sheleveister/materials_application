/**
 * Created by Катерина on 16.07.2017.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Materials template',
        attendance: true
    });
});

module.exports = router;