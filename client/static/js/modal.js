$(document).ready(function(){
  $('.open-modal').click(function(){
    $('.ui.modal').modal('show');
  });

  $('.form').submit(function(){
    $('.ui.modal').modal('hide');
  });
});
