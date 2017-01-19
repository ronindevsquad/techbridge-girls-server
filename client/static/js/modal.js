$(document).ready(function(){
  $('.add-note').click(function(){
    $('.ui.modal').modal('show');
  });

  $('.form').submit(function(){
    $('.ui.modal').modal('hide');
  });
});
