
$(window).scroll(function(){
    if ($(window).scrollTop() >= 55) {
       $('.lower-nav').addClass('fixed-header');
    }
    else {
       $('.lower-nav').removeClass('fixed-header');
    }
});
