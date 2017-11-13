$(document).ready(function() {
	$(".invoice-footer button").hover(
		//This is mouseover
		function() {
			$(this)[0].firstChild.style.color = '#F33259';
			$(this)[0].lastChild.style.color ='#337ab7';

		//This is mouseleave
		}, function() {
			$(this)[0].firstChild.style.color = '#337ab7';
			$(this)[0].lastChild.style.color ='#F33259';
	});
})