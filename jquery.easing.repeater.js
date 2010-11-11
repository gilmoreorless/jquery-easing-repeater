/*!
 * jQuery Easing Repeater plugin
 *
 * Repeats a given jQuery easing method several times over the course of an animation
 */
;(function ($) {
	/**
	 * Factory function
	 */
	$.createEasingRepeater = function (name, easing, repeat) {
		var steps = repeat * 2 - 1;
		$.easing[name] = function (p, n, firstNum, diff, duration) {
			var curStep = ~~(p * steps),
				stepDiff = curStep / steps,
				newPerc = (p - stepDiff) * steps,
				newEasing;
			n = newPerc * duration;
			newEasing = $.easing[easing](newPerc, n, firstNum, diff, duration);
			if (curStep % 2) {
				newEasing = 1 - newEasing;
			}
			return newEasing;
		};
	};
})(jQuery);
