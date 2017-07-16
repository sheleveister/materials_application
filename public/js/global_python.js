$(document).ready(function() {
    
    function populateTablePython() {
        console.log('global.js python');

        var arrContentMaterials = []; 
        var arrContentTasks = []; 
        $.getJSON( '/python/download-python', function( data ) {

            for(var i = 0; i < data.length; i++) {

                var contentLink = '<a href=' + '/python/' + data[i] + '>' + data[i] + '</a>';
                // <a href="/python/file.pdf"></a>
                
                // материалы в pdf, задачи в txt
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
            console.log("data", data); 

        });
    };
    populateTablePython();
    
});
