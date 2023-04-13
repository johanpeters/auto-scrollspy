
//add event listener for dom ready
document.addEventListener("DOMContentLoaded", function(event) {

    //look for ul.autoss-nav
    
    var nav = document.querySelector('.autoss-nav');
    //this var is equal to nav data-listelem
    var listElem = nav.getAttribute('data-listelem');
    console.log('li type is ' + listElem);



    //make first item active by default
    nav.querySelector(listElem + ' a').classList.add('active');

    function removeActive() {
        var active = nav.querySelector(listElem + ' a.active');
        if (active) {
            active.classList.remove('active');
        }
    }

    //get all the hrefs from the links under nav
    var links = nav.querySelectorAll(listElem + ' a');
    var hrefs = [];
    for (var i = 0; i < links.length; i++) {
        hrefs.push(links[i].getAttribute('href'));
    }

    //log the y position of each element by id
    var positions = [];
    for (var i = 0; i < hrefs.length; i++) {
        var id = hrefs[i].replace('#', '');
        var el = document.getElementById(id);
        var pos = el.offsetTop;
        positions.push(pos);
        console.log('i found y pos of ' + pos + ' for ' + id);
    }


    //add event listener for scroll
    window.addEventListener('scroll', function() {

        //get the current scroll position
        var scrollPos = window.scrollY;

        //offset by 50px
        scrollPos += 50;

        //loop through the positions and find the one that is closest to the scroll position
        var closest = 0;
        for (var i = 0; i < positions.length; i++) {
            if (positions[i] < scrollPos) {
                closest = i;
            }
        }

        //remove active class from all links
        removeActive();

        //add active class to the closest link
        nav.querySelector(listElem + ' a[href="' + hrefs[closest] + '"]').classList.add('active');

        //if we're at the bottom of the page, add active class to the last link
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            removeActive();
            nav.querySelector(listElem + ' a[href="' + hrefs[hrefs.length - 1] + '"]').classList.add('active');
        }

    });

    //floating panel helpers
    //if .autoss-floatcontainer exists...
    var floatContainer = document.querySelector('.autoss-floatcontainer');

    if (floatContainer) {

        let floatToggler = document.querySelector('.autoss-float-toggle');
        //calculate actual height of floatToggler from its top to its bottom
        let floatTogglerHeight = floatToggler.offsetHeight + parseFloat(getComputedStyle(floatToggler).marginTop) + parseFloat(getComputedStyle(floatToggler).marginBottom);

        console.log('floatTogglerHeight is ' + floatTogglerHeight);
        //the top of floatToggler needs to be the top of the floatContainer minus the height of floatToggler
        floatToggler.style.top = (floatContainer.offsetTop - floatTogglerHeight) + 'px';

        const autoCollapseWidth = nav.getAttribute('data-collapsewidth');
        //if it's 0px, we always collapse it
        if (autoCollapseWidth == 0) {
            floatContainer.classList.add('autoss-collapsed');
        }



        //check if we need to collapse it on page load
        if (window.innerWidth <= autoCollapseWidth || autoCollapseWidth == 0) {
            floatContainer.classList.add('autoss-collapsed');
            //show toggle
            floatToggler.classList.remove('autoss-togglehidden');
        }
        else{
            floatToggler.classList.add('autoss-togglehidden');
        }

        if(autoCollapseWidth != 0) {
            //if user resizes window, check if we need to collapse it
            window.addEventListener('resize', function() {
                if (window.innerWidth <= autoCollapseWidth) {
                    floatContainer.classList.add('autoss-collapsed');
                    //show toggle
                    floatToggler.classList.remove('autoss-togglehidden');
                } else {
                    floatContainer.classList.remove('autoss-collapsed');
                    //hide toggle
                    floatToggler.classList.add('autoss-togglehidden');
                }
            });
        }

        //someone clicks toggle
        floatToggler.addEventListener('click', function() {
            floatContainer.classList.toggle('autoss-collapsed');
        }
        );

    }

});