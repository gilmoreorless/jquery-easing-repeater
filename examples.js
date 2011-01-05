$(function () {
	$.createEasingRepeater('back2', 'easeOutBack', 2);
	var isLeft1 = true;
	$('#example1').click(function () {
		$(this).animate({marginLeft: isLeft1 ? 500 : 0}, 1500, 'back2');
		isLeft1 = !isLeft1;
	});

	$.createEasingRepeater('lin4', 'linear', 4);
	var isLeft2 = true;
	$('#example2').click(function () {
		var $this = $(this),
			$text = $this.find('.text');
		$text.text('Look at me!');
		$this.css('opacity', 0).animate({
			marginLeft: isLeft2 ? 500 : 0,
			opacity: [1, 'lin4']
		}, 2500, 'easeInOutQuad', function () {
			$text.text('Click me');
		});
		isLeft2 = !isLeft2;
	});

	$.createEasingRepeater('swing5', 'swing', 5);
	$('#example3').click(function () {
		$('#example3-sub .text').slideToggle(1500, 'swing5');
	});
});
