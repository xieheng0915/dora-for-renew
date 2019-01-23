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
  // $('#fullpage').fullpage({
  //     // anchors: ['home', 'subscribe', 'about', 'purpose', 'contact'],
  //     anchors: ['home', 'purpose', 'blockchain', 'about', 'schedule', 'contact'],
  //     menu: '#fullPage',
  //     scrollingSpeed: 800,
  //     autoScrolling: true,
  //     scrollBar: true,
  //     easing: 'easeInQuart',
  //     resize: false,
  //     paddingTop: '0px',
  //     paddingBottom: '80px',
  //     navigation: true,
  //     navigationPosition: 'right',
  //     // navigationTooltips: ['Home', 'Subscribe', 'About','Purpose','Contact'],
  //     navigationTooltips: ['Home', 'Purpose', 'Blockchain', 'About', 'Schedule', 'Contact'],
  //     responsiveWidth: 1100,
  // });

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
  // function initPageBackground() {
  //     if($('body').hasClass('dark-image')) { // IMAGE BACKGROUND

  //         $("body").backstretch("../../images/Demo3.jpg");

  //     }
  //   }
  //   initPageBackground();

  // /*======================================================
  //     8).Full height function start 
  // ========================================================*/
  var setHeight = function () {
    var height = $(window).height();
    $('.full-screen').css('height', (height));
  };
});

(function() {
  var sVisibleDrawer = false;
  var height = $(document).height();
  var screenWidth = $(document).width();
  var scrollTop = $(window).scrollTop();
  var pathname = window.location.pathname;
  var lang = $('.dropdown-toggle').text();
  renderFloating(scrollTop);
  hideFloating(screenWidth);
  homeFooter();
  renderPage();
  

  $(window).scroll(function () {
    height = $(document).height();
    scrollTop = $(window).scrollTop();
    var scheduleH = (scrollTop / 5045 * 300)
    $('.schedule').css('height', scheduleH + 'px');
    renderFloating(scrollTop);
  })

  $(window).resize(function () {
    screenWidth = $(document).width();
    //隐藏首页悬浮条以及悬浮按钮
    hideFloating(screenWidth)
  })

  $('.navbar-toggler').on('click', function () {
    sVisibleDrawer = !sVisibleDrawer;
    $('#navbarSupportedContent').toggle();
    if (sVisibleDrawer) {
      $('body').css('overflow', 'hidden');
      $('.drawer-style').addClass('animation-right');
    } else {
      $('.drawer-style').removeClass('animation-right');
      $('body').css('overflow', 'auto');
    }
  });

  $('#navbarSupportedContent').on('click', function () {
    if (screenWidth < 768) {
      sVisibleDrawer = false;
      $('#navbarSupportedContent').hide();
      $('body').css('overflow', 'auto');
      $('.drawer-style').removeClass('animation-right');
    }
  });

  $('.drawer-style').on('click', function (e) {
    if (screenWidth < 768) {
      e.stopPropagation();
      $('#navbarSupportedContent').show();
    }
  });

  $(".nav-link.contact").bind("click", function () {
    //根据a标签的href转换为id选择器，获取id元素所处的位置，并高度减50px（这里根据需要自由设置）
    $('html,body').animate({
      scrollTop: ($($(this).attr('href').split('/')[1]).offset().top - 100)
    }, 500);
  })


  function hideFloating(w) {
    if (screenWidth > 768) {
      $('#sliderBar').show();
    } else {
      $('#sliderBar').hide();
    }
  }

  function homeFooter() {
    if (pathname === '/') {
      if (screenWidth < 768) {
        $('footer').css({
          'margin': '0',
          'color': '#fff'
        });
      } else {
        if (height > 2000) {
          return $('footer').css({
            'margin': '-40px 0 0 0',
            'color': '#fff'
          });
        }
        $('footer').css({
          'margin': '100px 0 10 ',
          'color': '#3b2921'
        });
      }
    }

    if (pathname === '/contact') {
      if (screenWidth < 768) {
        $('footer').css({
          'margin': '0',
          'color': '#fff'
        });
      } else {
        $('footer').css({
          'margin': '-40px 0 0 0',
          'color': '#fff',
        });
      }
    }
  }

  function renderFloating(scrollTop) {
    if (pathname === '/') {
      if (scrollTop < 530) {
        $('.sliderBar').css('background-color', '#fff');
        $('.youtube').css({
          'background': 'url(' + '/images/floating/icon_1_youtube.svg) no-repeat center',
          'background-size': '40px'
        });
        $('.tweeter').css({
          'background': 'url(' + '/images/floating/icon_1_tweeter.svg) no-repeat center',
          'background-size': '40px'
        });
        $('.facebook').css({
          'background': 'url(' + '/images/floating/icon_1_facebook.svg) no-repeat center',
          'background-size': '40px'
        });
      } else {
        $('.sliderBar').css('background-color', '#E2E2E2');
        $('.youtube').css({
          'background': 'url(' + '/images/floating/icon_2_youtube.svg) no-repeat center',
          'background-size': '40px'
        });
        $('.tweeter').css({
          'background': 'url(' + '/images/floating/icon_2_tweeter.svg) no-repeat center',
          'background-size': '40px'
        });
        $('.facebook').css({
          'background': 'url(' + '/images/floating/icon_3_facebook.svg) no-repeat center',
          'background-size': '40px'
        });

      }
    } else {
      $('.youtube').css({
        'background': 'url(' + '/images/floating/icon_2_youtube.svg) no-repeat center',
        'background-size': '40px'
      });
      $('.tweeter').css({
        'background': 'url(' + '/images/floating/icon_2_tweeter.svg) no-repeat center',
        'background-size': '40px'
      });
      $('.facebook').css({
        'background': 'url(' + '/images/floating/icon_3_facebook.svg) no-repeat center',
        'background-size': '40px'
      });
    }

  }
  
  function renderPage() {
    if (height < 2000) {
      $('.sliderBar').hide();
    } else {
      $('.sliderBar').show();
    }
    if(lang === 'ENGLISH') {
      if (screenWidth < 768) {
        $('.phone_ico img').attr('src', '/images/home/table_ico_mobile_en_3x.png');
      } else {
        $('.home_ico img').attr('src', '/images/home/table_ico_en_2x.png');
      }
    } else {
      if (screenWidth < 768) {
        $('.phone_ico img').attr('src', '/images/home/table_ico_mobile_cn_3x.png');
      } else {
        $('.home_ico img').attr('src', '/images/home/table_ico_cn_2x.png');
      }
      
    }
  }
})();
