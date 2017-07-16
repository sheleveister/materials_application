$(document).ready(function() {
    
    function populateTableJava() {
        console.log('global.js java');

        var arrContentMaterials = []; 
        var arrContentTasks = []; 
        $.getJSON( '/java/download-java', function( data ) {

            for(var i = 0; i < data.length; i++) {

                var contentLink = '<a href=' + '/java/' + data[i] + '>' + data[i] + '</a>';
                // <a href="/java/file.pdf"></a>
                
                // материалы в pdf, таски в txt
                // в зависимости от формата рендерится на страницу
                if ( (data[i]).indexOf("pdf") !== -1 ) {
                arrContentMaterials.push(contentLink);  
                } else if ( (data[i]).indexOf("txt") !== -1 ) {
                arrContentTasks.push(contentLink);
                }

                for ( var j = 0; j < arrContentMaterials.length; j++ ) {
                $($('#download .material')[j]).html(arrContentMaterials[j]);
                $($('#download .tasks')[j]).html(arrContentTasks[j]); 
                }                   

            }
            console.log("data", data); // ["1_lesson_1_http.pdf", "1_lesson_2_http.pdf"]

        });
    };
    populateTableJava();
    
});
