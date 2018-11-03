$(window).scroll(add_remove_fixed_header);

$(window).on('load', add_remove_fixed_header);

function add_remove_fixed_header() {
    var upper_nav_height = document.getElementsByClassName("upper-nav")[0].offsetHeight;

    if ($(window).scrollTop() >= upper_nav_height) { 
       $('.lower-nav').addClass('fixed-header');
    }
    else {
       $('.lower-nav').removeClass('fixed-header');
    }
}