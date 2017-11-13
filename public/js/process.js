var i = 0;
var $rect1 = $("#rect1 img"), $rect2 =$("#rect2 img");
var rect1_left = 0, rect2_left = 1000;
var timer1, timer2;
var addingDotsTimer;
// 3000, 60, 0.5
var loadingTime = 3000, mergeTimer = 60, movingSpeed = 0.5;
var currLeft, startLeft, dir = 6;

$(document).ready(function() {
	addingDotsTimer = setInterval(function() {
		addDots("loading")
	}, 700);
});

var checkPosition = function() {
	rect1_left = $rect1.offset().left;
	rect2_left = $rect2.offset().left;
};
$("#testing1").on('click', function() {
	// $rect1.animate({
	// 	left: '+=5px',
	// }, 500);
	console.log($("#rect1 img").offset().left);
	
})
var changeColor = function() {
	console.log(rect1_left + $rect1.width() + ' / ' + rect2_left);
	if (rect2_left - (rect1_left + $rect1.width()) < 0.5) {
		console.log('CRASHED!');
		clearInterval(timer1);
		$("#resolve-button-div").hide().removeClass('hidden').fadeIn(1000);
	}
}

var initialEnter = true;
var slowMerge = function() {
	$rect1.show().offset({ left: rect1_left });
	$rect2.show().offset({ left: rect2_left });
	rect1_left += movingSpeed;
	rect2_left -= movingSpeed;
	//Hue change
	$rect1.addClass('hue-rotate1');
	$rect2.addClass('hue-rotate2');
	if (initialEnter) {
		$("#section2 h1").text('Fixing ').append('<span class="dots"></span>');
		initialEnter = false;
		i = 0;
		addingDotsTimer = setInterval(function() {
			addDots('section2');	
		}, 700);
	}
}

var completeMerge = function() {
	$("#rect1-info, #rect2-info").addClass('customClass1');
	console.log(rect1_left , ' /', rect2_left);
	if (Math.abs(rect1_left - rect2_left) < 0.5) {
		// The red rect won't merge perfectly ( <1px difference )
		$rect1.removeClass('moveRight');
		$rect2.removeClass('moveLeft');
		$rect2.offset({ left : rect2_left - 1.05 });
		console.log($rect1.offset().left + ' / ' + $rect2.offset().left);
		console.log('MERGED');
		clearInterval(timer2);
		clearInterval(addingDotsTimer);
		$("#resolve-button-div").slideUp(500);
		$("#afterResult").hide().removeClass('hidden').slideDown(1000);
		$("#next-page-div").hide().removeClass('hidden').slideDown(1000);
		$("#section2 h1").text('Problem Resolved');
	}
}


var addDots = function(id) {
	
	if (i === 0) {
		$("#" + id + " .dots").html('.');
		i++;		
	} else if (i === 1) {
		$("#" + id + " .dots").append('.');
		i++;
	} else if (i === 2) {
		$("#" + id + " .dots").append('.');
		i++;
	} else {
		$("#" + id + " .dots").html('');
		i = 0;
	}
}

$("#resolve-button-div").on('click', 'button', function() {
	$("#resolve").prop('disabled', true)
					 .text('In Progress')
					 .css({
					 	'marginTop' : '30px',
					 	'cursor': 'not-allowed',
					 });
	// console.log($(this).offset());
	startLeft = $(this).offset().left;
	clearInterval(addingDotsTimer);
	$rect1.hide().removeClass('myAnimation1');
	$rect2.hide().removeClass('myAnimation2');
	timer2 = setInterval(function() {
		slowMerge();
		completeMerge();
		shake($('#resolve').offset().left);
	}, mergeTimer);
});

var shake = function(left) {
	currLeft = left;
	if (currLeft > startLeft + 10 || currLeft < startLeft - 10) {
		// console.log('currLeft:', currLeft, 'startLeft + 20:', startLeft+20);
		dir = -dir;
	}
	currLeft += dir;
	$('#resolve').offset({ left : currLeft });

}
// This is to hide the main 'loading' screen after a certain time (loadingTime).
window.setTimeout(function() {
	$("#section1").hide(1000);
	$("#section2").removeClass('hidden');
	// Once the section is loaded initially, starting timer1 which initiates movements of the two blobs
	timer1 = setInterval(function() {
		checkPosition();
		changeColor();
	}, 500);
}, loadingTime);
