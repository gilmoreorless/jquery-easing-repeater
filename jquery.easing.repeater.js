/*!
 * jQuery Easing Repeater plugin v0.1
 * Copyright (c) 2010 Gilmore Davidson
 * https://github.com/gilmoreorless/jquery-easing-repeater
 */
/**
 * @requires jQuery v1.2 or later
 *
 * Repeats a given jQuery easing method several times over the course of a single animation
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
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
