'use strict';
var artuition = (function() {
  var touch,
      stickyHeader,
      scrollTo,
      inView,
      init;

  stickyHeader = {
    init: function () {
      var header = $(".clear-header");

      $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 156) {
          header.removeClass('clear-header').addClass("dark-header");
        } else {
          header.removeClass("dark-header").addClass('clear-header');
        }
      });
    }
  };

  scrollTo = {
    init: function () {
      $('nav li a[href^="#"]').on('click', function(e) {
          var target = $(this.getAttribute('href'));
          if( target.length ) {
              e.preventDefault();
              $('html, body').stop().animate({
                  scrollTop: target.offset().top
              }, 1000);
          }
      });
    }
  };

  inView = {
    init: function () {
      function getRelatedContent(el){
        return $($(el).attr('href'));
      }
      // Get link by section or article id
      function getRelatedNavigation(el){
        return $('nav a[href=#'+$(el).attr('id')+']');
      }

      var wpDefaults={
        context: window,
        continuous: false,
        enabled: true,
        horizontal: false,
        offset: 0,
        triggerOnce: false
      };

      $('section,article')
         .waypoint(function(direction) {
           // Highlight element when related content
           // is 10% percent from the bottom...
           // remove if below
           getRelatedNavigation(this).parent().toggleClass('active', direction === 'down');
         }, {
           offset: '90%' //
         })
         .waypoint(function(direction) {
           // Highlight element when bottom of related content
           // is 100px from the top - remove if less
           // TODO - make function for this
           getRelatedNavigation(this).parent().toggleClass('active', direction === 'up');
         }, {
           offset: function() {  return -$(this).height() + 0; }
         });
    }
  };

  init = function () {
    stickyHeader.init();
    scrollTo.init();
    inView.init();
  };

  return {
    init: init
  };
})();

$(document).ready(function () {
  artuition.init();
});
