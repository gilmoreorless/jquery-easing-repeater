$(function () {
	var options = [],
		$graph = $('#graph'),
		$container = $('#container'),
		$move = $('#moving'),
		contWidth = $container.width(),
		paper = Raphael(
			$graph[0],
			$graph.width(),
			$graph.height()
		);

	$.each($.easing, function(name){
		if (name !== 'def' && typeof this === 'function') {
			options.push( name );
		}
	});
	$('#easing').append('<option>' + options.join('</option><option>') + '</option>');

	$(':range').rangeinput();

	$('#controls').submit(function () {
		var easing = $('#easing').val(),
			origRepeat = $('#repeat').val(),
			repeat = +origRepeat || 1,
			origSpeed = $('#speed').val(),
			speed = +origSpeed || 1000;
		if (repeat < 1) {
			repeat = 1;
		}
		if (speed < 1000) {
			speed = 1000;
		}
		doFancyStuff(easing, repeat, speed);
		if (repeat != origRepeat) {
			$('#repeat').val(repeat);
		}
		if (speed != origSpeed) {
			$('#speed').val(speed);
		}
		return false;
	});

	var prevSet;
	function doFancyStuff(easing, repeat, speed) {
		// Clear canvas
		prevSet && prevSet.remove();

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
			minY = maxY - (paper.height - maxY),
			set = paper.set(),
			path = [],
			progress, e;

		// Original easing graph (if applicable)
		if (easing != oldEasing) {
			path = ['M', 0, maxY];
			for (progress = 1; progress < steps; progress++) {
				e = $.easing[oldEasing]( progress / steps, progress, 0, steps, steps );
				path = path.concat(['L', (progress / steps * maxX), maxY - (e / steps * minY)]);
			}
			path = paper.path(path).attr({
				stroke: '#FFFFFF'
			});
			set.push(path);
		}

		// New easing graph
		path = ['M', 0, maxY];
		steps *= 2;
		for (progress = 1; progress < steps; progress++) {
			e = $.easing[easing]( progress / steps, progress, 0, steps, steps );
			path = path.concat(['L', (progress / steps * maxX), maxY - (e / steps * minY)]);
		}
		path = paper.path(path).attr({
			stroke: '#FFFF00'
		});
		set.push(path);
		prevSet = set;

		// Run demo animation
		var animProps = {},
			oldProps,
			grow;
		// Check for optional animation properties
		if ($('#anim-left')[0].checked) {
			animProps.left = parseInt($move.css('left'), 10) ? 0 : contWidth - $move.width();
		}
		if ($('#anim-height')[0].checked) {
			grow = $move.height() == 100;
			animProps.height = grow ? 180 : 100;
			animProps.top = grow ? 10 : 50;
		}
		if ($('#anim-opacity')[0].checked) {
			animProps.opacity = 1 - (parseInt($move.css('opacity'), 10) || 0);
		}
		if ($move.is(':animated') && (oldProps = $move.data('endProps'))) {
			$move.stop().css(oldProps);
		}
		$move.data('endProps', animProps).animate(animProps, speed, easing);

		// Output generation code
		var $code = $('#democode');
		if (easing != oldEasing) {
			var template = $.trim(
				$('#template').html()
					.replace(/\{1\}/g, easing)
					.replace('{2}', oldEasing)
					.replace('{3}', repeat)
					.replace('{4}', speed)
			);
			$code.html(template).show();
		} else {
			$code.hide();
		}
		
	}
});
