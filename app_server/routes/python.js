var express         = require('express');
var router          = express.Router();
var customersPython = require('../controllers/customersPython');

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: 'uploads/java/', 
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(' ', '_'));
    }
});

var upload = multer({ storage: storage });


router.get('/', customersPython.list);
router.post('/', upload.any(), customersPython.save);
router.get('/:id([0-9]+)', customersPython.delete_customer);
router.get('/download-python', customersPython.download);
router.get('/:file', customersPython.file); //скачать файл multer 

module.exports = router;