$(function() {
  $('#button').on('click', function(e){
    console.log("clicked");
      e.preventDefault();
      var target= $('#endScroll');
      $('html, body').stop().animate({
         scrollTop: target.offset().top
      }, 2000);
  });
});