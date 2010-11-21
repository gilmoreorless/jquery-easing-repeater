/*!
 * jQuery Easing Repeater plugin v0.1
 *
 * Repeats a given jQuery easing method several times over the course of a single animation
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
				newEasing = diff - newEasing;
			}
			return newEasing;
		};
	};
})(jQuery);
