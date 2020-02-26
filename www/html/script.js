// function settingsPage(){
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav.settingsPage');
    var instances = M.Sidenav.init(elems, {});
});

// Initialize collapsible (uncomment the lines below if you use the dropdown variation)
// var collapsibleElem = document.querySelector('.collapsible');
// var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

// Or with jQuery

$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.cluesPage').sidenav({
        edge: 'left', // Slide from the right
    });
    $('.settingsPage').sidenav({
        edge: 'right'
    });
});
// }


// Carousel (slick.js) initialisation
$(document).ready(function () {
    $('.carousel-pages').slick({
        slidesToShow: 1,
        dots: !0,
        infinite: !1,
        speed: 500,
        adaptiveHeight: !0,
        draggable: false,
        swipe: false,
        swipeToSlide: false,
        touchMove: false,
        draggable: false,
        accessibility: false,
        arrows: false
    });
});

function bottomNavGoTo(i) {
    $('.carousel-pages').slick('slickGoTo', i);
}