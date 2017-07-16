var express    = require('express');
var fs         = require('fs');
var path       = require('path');
var http       = require('http');
var multer     = require('multer');
var app        = express();
var mysql      = require('mysql');
var router     = express.Router();

var connection = mysql.createConnection({
    host       : 'localhost',
    user       : 'db_user',
    password   : 'db_pass',
    database   : 'db_name'
});

connection.connect(function(err) {
    if(!err) {
        console.log("Database Node.js is connected");    
    } else {
        console.log("Error connecting database Node.js");    
    }
});

//рендер json из базы данных по id = 1, который соответствует курсу node.js
exports.list = function(req, res) {

    connection.query('SELECT data FROM materials_courses WHERE id = 1', function(err, rows) {
        
        if(err) {
            console.log("Error Selecting : %s ", err );
        } else {
            var data = JSON.parse(rows[0].data);
            var dataId = data.length;

            res.render('index', {
                title: "Мaтериалы для курса Node.js",
                image: "/img/nodejs.jpg",
                action: "/nodejs",
                href: "../nodejs/",
                global_path: "js/global_node.js",
                data: data,
                materials: true
            });
        }
    });    
};

// сохранение загруженных файлов в базу данных и рендер на страницу
exports.save = function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));

    connection.query('SELECT data FROM materials_courses WHERE id = 1', function(err, rows) {
        var data = JSON.parse(rows[0].data);
        var dataId = data.length;

        var objMaterials = {
            id: dataId + 1,
            course: "NodeJS",
            name: input.name,
            material: req.files[0].filename, // название дает модуль multer, из массива upload
            tasks: req.files[1].filename     // читает из массива второй загруженный объект
        };

        data.push(objMaterials);
        var updated_data = JSON.stringify(data);

        connection.query( "UPDATE materials_courses SET `data` = ? Where ID = 1", [updated_data],
            function(err, rows) {
            if (err) console.log("Error inserting : %s ", err );
        });

        var path = require('path'); // get path
        var dir = path.resolve(".")+'/uploads/nodejs/'; // куда сохраняет

        connection.query('SELECT data FROM materials_courses WHERE id = 1', function(err, rows) {
            if(err) console.log("Error Selecting : %s ", err );
            var data = JSON.parse(rows[0].data);

            res.render('index', {
                message: "Файл добавлен",
                title: "Мaтериалы для курса Node.js",
                image: "/img/nodejs.jpg",
                action: "/nodejs",
                href: "../nodejs/",
                global_path: "js/global_node.js",
                data: data,
                materials: true
            });
        });
    });
};

//удаление со страницы и из базы данных
exports.delete_customer = function(req, res) {

    var id = req.params.id;
    console.log("id", id);
    var dataId = id - 1;

    connection.query('SELECT data FROM materials_courses WHERE id = 1', function(err, rows) {
        var data = JSON.parse(rows[0].data); //получаем объект
        data.splice(dataId, 1);

        //после удаления восстанавливаем порядок нумерации занятий в соответствии с порядковым номером в массиве
        for (let i = 0; i < data.length; i++) {
            (data[i]).id = String( i + 1 );
        }

        var deleted_data = JSON.stringify(data); //превращаем в json
        connection.query( "UPDATE materials_courses SET `data` = ? Where ID = 1", [deleted_data],
            function(err, rows) {
                if (err) console.log("Error inserting : %s ", err );
            });

        res.redirect('/nodejs');

    });
};


exports.download = function(req, res) {

    var path = require('path');
    var dir = path.resolve(".")+'/uploads/nodejs/';

    fs.readdir(dir, function(err, list) {
        if (err) {
            return res.json(err);
        } else {
            res.json(list);
        }
    });

};

//скачать файл со страницы в локальную папку
exports.file = function(req, res, next) {

    var path = require('path');
    var file = req.params.file;
    var path = path.resolve(".")+'/uploads/nodejs/' + file; // путь откуда берет файл для скачивания

    res.download(path);

    //console.log("file", file);  // node.pdf
    //console.log("path2", path);

};