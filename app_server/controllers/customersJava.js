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
        console.log("Database Java is connected");    
    } else {
        console.log("Error connecting database Java");    
    }
});

//рендерим json из базы данных по id = 1, который соответствует курсу node.js
exports.list = function(req, res) {
    connection.query('SELECT data FROM materials_courses WHERE id = 3', function(err, rows) {
        
        if(err) {
            console.log("Error Selecting : %s ", err );
        } else {
            var data = JSON.parse(rows[0].data);
            var dataId = data.length;

            res.render('index', {
                title: "Мaтериалы для курса Java",
                image: "/img/java.jpg",
                action: "/java",
                href: "../java/",
                global_path: "js/global_java.js",
                data: data,
                materials: true
            });
        }
    });    
};

//добавить в бд из формы и отрендерить на страницу 
//добавляем файл в папку uploads
exports.save = function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    
    connection.query('SELECT data FROM materials_courses WHERE id = 3', function(err, rows) {
        var data = JSON.parse(rows[0].data);
        var dataId = data.length;

        var objMaterials = {
            id: dataId + 1,
            course: "Java",
            name: input.name,
            material: req.files[0].filename, // название дает модуль multer, из массива upload
            tasks: req.files[1].filename     // читает из массива второй загруженный объект
        };
        
        data.push(objMaterials);
        var updated_data = JSON.stringify(data);

        connection.query( "UPDATE materials_courses SET `data` = ? WHERE id = 3", [updated_data],
            function(err, rows) {
                if (err) console.log("Error inserting : %s ", err );
            });

        var path = require('path');
        var dir = path.resolve(".")+'/uploads/java/';

        connection.query('SELECT data FROM materials_courses WHERE id = 3', function(err, rows) {
            if(err) console.log("Error Selecting : %s ", err );
            var data = JSON.parse(rows[0].data);

            res.render('index', {
                message: "Файл добавлен",
                title: "Мaтериалы для курса Java",
                image: "/img/java.jpg",
                action: "/java",
                href: "../java/",
                global_path: "js/global_java.js",
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
     
    connection.query('SELECT data FROM materials_courses WHERE id = 3', function(err, rows) {
        var data = JSON.parse(rows[0].data); //получаем объект
        data.splice(dataId, 1);
        
        //после удаления восстанавливаем порядок нумерации занятий в соответствии с порядковым номером в массиве
        for (let i = 0; i < data.length; i++) {
            (data[i]).id = String( i + 1 );
        }
        
        var deleted_data_java = JSON.stringify(data); //превращаем в json 
        console.log("deleted_data_java", deleted_data_java);
        connection.query( "UPDATE materials_courses SET `data` = ? WHERE id = 3", [deleted_data_java],
            function(err, rows) {
                if (err) console.log("Error inserting : %s ", err );
            });
        
        res.redirect('/java');

    });     
};

//функция отображения файлов с материалами из папки upload
//файлы на странице отображаются через ajax-запрос 
exports.download = function(req, res) { 
    
    var path = require('path'); 
    var dir = path.resolve(".")+'/uploads/java/'; 
    
    fs.readdir(dir, function(err, list) { 
        if (err) {
            return res.json(err);    
        } else {
            res.json(list);
        }
    });
};

//скачать файл со страницы в папку на комп
exports.file = function(req, res, next) { 
    
    var path = require('path');
    var file = req.params.file; // берем из url имя 
    var path = path.resolve(".")+'/uploads/java/' + file; // путь откуда берет файл для скачивания
    res.download(path); 
    
    //console.log("file", file);
    
};