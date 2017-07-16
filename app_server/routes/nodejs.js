var express       = require('express');
var router        = express.Router();
var customersNode = require('../controllers/customersNode');

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: 'uploads/nodejs/', 
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(' ', '_'));
    }
});

var upload = multer({ storage: storage });


//http://localhost:4000/nodejs
router.get('/', customersNode.list);
router.post('/', upload.any(), customersNode.save);
router.get('/:id([0-9]+)', customersNode.delete_customer);
router.get('/download-node', customersNode.download);
router.get('/:file(*)', customersNode.file);

module.exports = router;