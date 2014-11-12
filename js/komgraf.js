$(function() {
    $('#clipper').hide();
    $('a.page-choose').bind('click', function(event) {
        var $anchor = $(this);
        var $href = $anchor.attr('href');
        
        if($href == "#transformasi"){
            $($href).fadeIn();
            $('#point-and-line').hide();
            $('#clipper').hide();
        }
        if($href == "#point-and-line"){
            $($href).fadeIn();
            $('#transformasi').hide();
            $('#clipper').hide();
        }
        if($href == "#clipper"){
            $($href).fadeIn();
            $('#transformasi').hide();
            $('#point-and-line').hide();
        }
        
        event.preventDefault();
    });
});


