$('body').css('background-color', 'white');
$('body').css('background-image', "none");
console.log("navbarControls.js loaded");
$('#add_picture_button').click(function(){
	$('#blurme').toggleClass('blur')
	$('.upload_image').toggleClass('hidden');
	$('body').css('background-color','#4A4A4A')
});

$('#backFromImageSelectionButton').click(function(){
	$('#blurme').toggleClass('blur')
	$('.upload_image').toggleClass('hidden');
	$('body').css('background-color','white')
});

// $('body').click(function(){
// 	$('#blurme').toggleClass('blur')
// 	$('.upload_image').toggleClass('hidden');
// 	$('body').css('background-color','white')
// });
