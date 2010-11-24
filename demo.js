(function($){
	var options = [],
		$graph = $('#graph'),
		canvas = $('<canvas/>').appendTo($graph)[0],
		$container = $('#container'),
		$move = $('#moving'),
		contWidth = $container.width();

//	if (window.G_vmlCanvasManager) {
//		G_vmlCanvasManager.initElement(canvas);
//	}

	var ctx = canvas.getContext('2d');

	canvas.width = 600;
	canvas.height = 500;

	$.each($.easing, function(name){
		if (name !== 'def' && typeof this === 'function') {
			options.push( name );
		}
	});

	$('#easing').append('<option>' + options.join('</option><option>') + '</option>');
	$('#controls').submit(function () {
		var easing = $('#easing').val(),
			origRepeat = $('#repeat').val(),
			repeat = parseInt(origRepeat, 10) || 1;
		if (repeat < 1) {
			repeat = 1;
		}
		doFancyStuff(easing, repeat);
		if (repeat != origRepeat) {
			$('#repeat').val(repeat);
		}
		return false;
	});

	function doFancyStuff(easing, repeat) {
		// Clear canvas
		ctx.fillStyle = 'rgba(0,0,0,0.8)';
		ctx.fillRect(0,0,600,500);
		ctx.fillStyle = 'rgba(255,255,255,1)';

		// Work out which easing function to use
		var oldEasing = easing;
		if (repeat > 1) {
			easing += '' + repeat;
			if (!(easing in $.easing)) {
				$.createEasingRepeater(easing, oldEasing, repeat);
			}
		}

		// Draw graph
		var steps = 1000,
			maxX = 600,
			maxY = 400,
			minY = maxY - (canvas.height - maxY),
			progress, e;

		// Original easing graph (if applicable)
		if (easing != oldEasing) {
			ctx.beginPath();
			ctx.moveTo(0, maxY);
			for (progress = 0; progress < steps; progress++) {
				e = $.easing[oldEasing]( progress/steps*1, progress, 0, steps, steps );
				ctx.lineTo( (progress / steps * maxX), maxY - (e / steps * minY) );
			}
			ctx.strokeStyle = '#FFFFFF';
			ctx.stroke();
		}

		// New easing graph
		ctx.beginPath();
		ctx.moveTo(0, maxY);
		for (progress = 0; progress < steps; progress++) {
			e = $.easing[easing]( progress/steps*1, progress, 0, steps, steps );
			ctx.lineTo( (progress / steps * maxX), maxY - (e / steps * minY) );
		}
		ctx.strokeStyle = '#FFFF00';
		ctx.stroke();

		// Run demo animation
		var animProps = {};
		// Start off with just left val, in future support width/height and opacity
		animProps.left = parseInt($move.css('left'), 10) ? 0 : contWidth - $move.width();
		$move.animate(animProps, 2000, easing);


		// TODO - output example code for easing repeater creation
	}
})(jQuery);
