
$(window).scroll(function(){
    if ($(window).scrollTop() >= 150) { // 150 is height of .upper-nav  
       $('.lower-nav').addClass('fixed-header');
    }
    else {
       $('.lower-nav').removeClass('fixed-header');
    }
});
