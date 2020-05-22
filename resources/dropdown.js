$(function(){
    $('.dropdown-button').mouseenter(function(){
        var submenu = $(this).parent().next();
        console.log(submenu);
        submenu.css({
            position:'absolute',
            top:'64px',
            left:-27,
            zIndex:1000
        });
        submenu.slideDown(300);
        submenu.mouseleave(function(){
            $(this).slideUp(300);
        })
    });         
});