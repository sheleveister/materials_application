$(function() {
    "use strict"; 
    console.log("main.js");

    //меняем класс - опубликовано или черновик
    $(".public-draft-btn").each(function(index, element) {
        
        $(element).click(function() {
            console.log("test", index);
            console.log("test", index);
            
            if ($(element).hasClass("btn-default")) {
                var btn = $(element);
                btn.toggleClass("btn-default btn-success").val("Опубликовано");
            } else if ($(element).hasClass("btn-success")) {
                var btn = $(element);
                btn.toggleClass("btn-success btn-default").val("Черновик");
            }

        });
    });

    /* для dropdown */
    $(".dropbtn").click(function() {
        //console.log("this table");
        $("#myDropdown").toggleClass("show");
    });


    $(".menu-trigger").click(function() {
        $(".menu-links").slideToggle(500);
    });

    $(".burger").click(function() {
        console.log("burger");
        $(".links-sidebar").toggleClass("hide", 2000);
        $(".main-content").toggleClass("main-content-important");
    });

});