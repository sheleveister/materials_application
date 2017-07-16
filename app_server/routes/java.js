var express       = require('express');
var router        = express.Router();
var customersJava = require('../controllers/customersJava');

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: 'uploads/java/', 
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(' ', '_'));
    }
});

var upload = multer({ storage: storage });


router.get('/', customersJava.list);
router.post('/', upload.any(), customersJava.save);
router.get('/:id([0-9]+)', customersJava.delete_customer);
router.get('/download-java', customersJava.download);
router.get('/:file', customersJava.file); //скачать файл multer 

module.exports = router;