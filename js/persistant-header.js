
$(window).scroll(function(){
    
    var upper_nav_height = document.getElementsByClassName("upper-nav")[0].offsetHeight;

    if ($(window).scrollTop() >= upper_nav_height) { 
       $('.lower-nav').addClass('fixed-header');
    }
    else {
       $('.lower-nav').removeClass('fixed-header');
    }
});
