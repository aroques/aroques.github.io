
$(window).scroll(function(){
    
    var upper_nav_height;
    
    if (window.innerWidth <= 575.98) {
        upper_nav_height = 200;
    }
    else {
        upper_nav_height = 150;
    }
    
    if ($(window).scrollTop() >= upper_nav_height) { 
       $('.lower-nav').addClass('fixed-header');
    }
    else {
       $('.lower-nav').removeClass('fixed-header');
    }
});
