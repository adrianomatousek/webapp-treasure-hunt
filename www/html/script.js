// function settingsPage(){
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav.settingsPage');
    var instances = M.Sidenav.init(elems, {});
});


function tickBox() { //for night mode
    var checker = document.getElementById("checkBoxNightMode");
    if (checker.checked == true) {
        checker.checked = false;
    } else {
        checker.checked = true;
    }
}

function tickBox2() { //for animations
    var checker = document.getElementById("checkBoxAnimations");
    if (checker.checked == true) {
        checker.checked = false;
    } else {
        checker.checked = true;
    }
}

function tickBox3() { //for marker names
    var checker = document.getElementById("checkBoxMarkerNames");
    if (checker.checked == true) {
        checker.checked = false;
    } else {
        checker.checked = true;
    }
}

function tickBox4() { //for info/help/hints
    var checker = document.getElementById("checkBoxHints");
    if (checker.checked == true) {
        checker.checked = false;
    } else {
        checker.checked = true;
    }
}

function tickBox5() { //for marker opacity
    var checker = document.getElementById("checkBoxMarkerOpacity");
    if (checker.checked == true) {
        checker.checked = false;
    } else {
        checker.checked = true;
    }
}

function tickBox6() { //for extra locations
    var checker = document.getElementById("checkBoxExtraLocations");
    if (checker.checked == true) {
        checker.checked = false;
    } else {
        checker.checked = true;
    }
}


$(document).ready(function () { //Initialize the sidenavs with Materializecss
    $('.sidenav').sidenav();
    $('#cluesPage').sidenav({
        edge: 'left' // Slide from the left
    });
    $('#settingsPage').sidenav({
        edge: 'right'
    });
    $('#helpPage').sidenav({
        edge: 'left' // Slide from the left
    });
});


// Carousel (slick.js) initialisation
$(document).ready(function () {
    $('.carousel-pages').slick({
        initialSlide: 4,
        slidesToShow: 1,
        infinite: !1,
        speed: 500,
        draggable: false, //disable drag because we don't want accidental swiping
        swipe: false,
        swipeToSlide: false,
        touchMove: false,
        draggable: false,
        accessibility: false,
        arrows: false
    });
});

function bottomNavGoTo(i) { //changes to a different carousel page
    $('.carousel-pages').slick('slickGoTo', i);
    if (i == 1) {
        cameraEnabled = true;
    } else {
        cameraEnabled = false;
    }
}
$(document).ready(function () {
    document.addEventListener('DOMContentLoaded', function () { //initialise the sidenavs (settings & clues)
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
    });

});

// FAQ
$(document).ready(function () {
    $('.collapsible').collapsible();

    // $("#route-select").on('change', function () {
    //     var select_element = document.getElementById("route-select");
    //     changeRoutes(select_element);
    // });


});


//Route select
$(document).ready(function () {
    $('select').formSelect();
});