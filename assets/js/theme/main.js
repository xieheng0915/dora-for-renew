/* Theme Name: Tripaco - Responsive Coming Soon Template
   Author: Zoyothemes
   Author e-mail: zoyothemes@gmail.com
   Version: 1.0
   Created: August 2016
   File Description:Main JS file of the template
*/


/* ==============================================
    1).Page Preloader
=============================================== */
$(window).on('load', function () {
    // $(window).load(function() {
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({
        'overflow': 'visible'
    });
});
/*---------------------------------------------------------------
	2). Fullpage
---------------------------------------------------------------*/
jQuery(function ($) {
    'use strict';

    /* FULLPAGE */
    $('#fullpage').fullpage({
        // anchors: ['home', 'subscribe', 'about', 'purpose', 'contact'],
        anchors: ['home', 'purpose', 'blockchain', 'about', 'schedule', 'contact'],
        menu: '#fullPage',
        scrollingSpeed: 800,
        autoScrolling: true,
        scrollBar: true,
        easing: 'easeInQuart',
        resize: false,
        paddingTop: '0px',
        paddingBottom: '80px',
        navigation: true,
        navigationPosition: 'right',
        // navigationTooltips: ['Home', 'Subscribe', 'About','Purpose','Contact'],
        navigationTooltips: ['Home', 'Purpose', 'Blockchain', 'About', 'Schedule', 'Contact'],
        responsiveWidth: 1100,
    });

    $('a.go-slide').on('click', function () {
        var elem = $(this),
            slideID = elem.data('slide');

        $.fn.fullpage.moveTo(slideID);
    });

    if ($('body').hasClass('mobile')) {
        $('#main-nav a').on('click', function () {
            $('.navbar-toggle').trigger('click');
        });
    };

    // $('.accordion').find('.accordion-toggle').click(function() {
	// 	$(this).next().slideToggle('600');
	// 	$(".accordion-content").not($(this).next()).slideUp('600');
	// });
	// $('.accordion-toggle').on('click', function() {
	// 	$(this).toggleClass('active').siblings().removeClass('active');
	// });

    // initPageBackground();
    function initPageBackground() {
        if($('body').hasClass('dark-image')) { // IMAGE BACKGROUND

            $("body").backstretch("../../images/Demo3.jpg");

        }
      }
      initPageBackground();

    // /*======================================================
    //     8).Full height function start 
    // ========================================================*/
    var setHeight = function () {
        var height = $(window).height();
        $('.full-screen').css('height', (height));
    };

});
