$(function() {
    $('a.page-choose').bind('click', function(event) {
        var $anchor = $(this);
        var $href = $anchor.attr('href');
        
        if($href == "#transformasi"){
            $($href).fadeIn();
            $('#point-and-line').hide();
        }
        if($href == "#point-and-line"){
            $($href).fadeIn();
            $('#transformasi').hide();
        }
        
        event.preventDefault();
    });
});


