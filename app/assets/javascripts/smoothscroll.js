$(function() {
  $('#button').on('click', function(e){
      e.preventDefault();
      var target= $('#endScroll');
      $('html, body').stop().animate({
         scrollTop: target.offset().top
      }, 2000);
  });
});