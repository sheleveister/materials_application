var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var sys             = require('util');
var mustache        = require('mustache');
var mustacheExpress = require('mustache-express');
var http            = require('http');
var multer          = require('multer');
var fs              = require('fs');
var connect         = require('connect');
var router          = express.Router();

var nodejs = require('./app_server/routes/nodejs');
var python = require('./app_server/routes/python');
var java   = require('./app_server/routes/java');
var index  = require('./app_server/routes/index');

var materials  = require('./app_server/routes/materials');
var attendance = require('./app_server/routes/attendance');

var app  = express();
var port = process.env.PORT || 4000;


app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'app_server', 'views'));


var mysql      = require('mysql');
var connection = mysql.createConnection({
    host       : 'localhost',
    user       : 'db_user',
    password   : 'db_pass',
    database   : 'db_name'
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', index);
app.use('/user-attendance', attendance);
app.use('/nodejs', nodejs);
app.use('/java', java);
app.use('/python', python);


module.exports = app;
app.listen(port);
console.log('Server listening ' + port);