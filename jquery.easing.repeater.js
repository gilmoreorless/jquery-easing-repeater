/*!
 * jQuery Easing Repeater plugin
 *
 * Repeats a given jQuery easing method several times over the course of an animation
 */
;(function ($) {
	/**
	 * Factory function
	 */
	$.easingRepeater = function (name, easing, repeat) {
		var steps = repeat * 2 - 1;
		$.easing[name] = function (p, n, firstNum, diff) {
			var curStep = ~~(p * steps),
				stepDiff = curStep / steps,
				newPerc = (p - stepDiff) * steps;
			if (curStep % 2) {
				newPerc = 1 - newPerc;
			}
			return $.easing[easing](newPerc, n, firstNum, diff);
		};
	};
})(jQuery);
