$(function(){
    $('.dropdown-button').mouseenter(function(){
        var submenu = $(this).parent().next();
        console.log(submenu);
        submenu.css({
            position:'absolute',
            top: $(this).offset().top + $(this).height() + 'px',
            left: $(this).offset().left + 'px',
            zIndex:1000
        });
        submenu.slideDown(300);
        submenu.mouseleave(function(){
            $(this).slideUp(300);
        })
    });         
});