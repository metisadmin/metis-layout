$(function() {

  if ($(window).width() <= 544) {
    $('.sidebar').removeClass('is-open');
  } else {
    $('.sidebar').addClass('is-open');
  }

});
