$(document).ready(function() {
	$(".footer a, .navbar a.navbar-brand").hover(
		//This is mouseover
		function() {
			// console.log($(this));
			$(this)[0].children[0].style.color = '#F33259';
			$(this)[0].children[1].style.color = '#F6F3F3';
		//This is mouseleave
		}, function() {
			$(this)[0].children[0].style.color = '#F6F3F3';
			$(this)[0].children[1].style.color = '#F33259';
	});
});



