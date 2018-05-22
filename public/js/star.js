const __slice = [].slice;

(function($, window) {
	let Starrr;

	Starrr = (function() {
		Starrr.prototype.defaults = {
			rating: void 0,
			numStars: 5,
			change(e, value) {},
		};

		function Starrr($el, options) {
			let i,
				_,
				_ref,
				_this = this;

			this.options = $.extend({}, this.defaults, options);
			this.$el = $el;
			_ref = this.defaults;
			for (i in _ref) {
				_ = _ref[i];
				if (this.$el.data(i) != null) {
					this.options[i] = this.$el.data(i);
				}
			}
			this.createStars();
			this.syncRating();
			this.$el.on("mouseover.starrr", "span", function(e) {
				return _this.syncRating(
					_this.$el.find("span").index(e.currentTarget) + 1
				);
			});
			this.$el.on("mouseout.starrr", function() {
				return _this.syncRating();
			});
			this.$el.on("click.starrr", "span", function(e) {
				return _this.setRating(
					_this.$el.find("span").index(e.currentTarget) + 1
				);
			});
			this.$el.on("starrr:change", this.options.change);
		}

		Starrr.prototype.createStars = function() {
			let _i, _ref, _results;

			_results = [];
			for (
				_i = 1, _ref = this.options.numStars;
				_ref >= 1 ? _i <= _ref : _i >= _ref;
				_ref >= 1 ? _i++ : _i--
			) {
				_results.push(
					this.$el.append(
						"<span class='glyphicon .glyphicon-star-empty'></span>"
					)
				);
			}
			return _results;
		};

		Starrr.prototype.setRating = function(rating) {
			if (this.options.rating === rating) {
				rating = void 0;
			}
			this.options.rating = rating;
			this.syncRating();
			return this.$el.trigger("starrr:change", rating);
		};

		Starrr.prototype.syncRating = function(rating) {
			let i, _i, _j, _ref;

			rating || (rating = this.options.rating);
			if (rating) {
				for (
					i = _i = 0, _ref = rating - 1;
					_ref >= 0 ? _i <= _ref : _i >= _ref;
					i = _ref >= 0 ? ++_i : --_i
				) {
					this.$el
						.find("span")
						.eq(i)
						.removeClass("glyphicon-star-empty")
						.addClass("glyphicon-star");
				}
			}
			if (rating && rating < 5) {
				for (
					i = _j = rating;
					rating <= 4 ? _j <= 4 : _j >= 4;
					i = rating <= 4 ? ++_j : --_j
				) {
					this.$el
						.find("span")
						.eq(i)
						.removeClass("glyphicon-star")
						.addClass("glyphicon-star-empty");
				}
			}
			if (!rating) {
				return this.$el
					.find("span")
					.removeClass("glyphicon-star")
					.addClass("glyphicon-star-empty");
			}
		};

		return Starrr;
	})();
	return $.fn.extend({
		starrr() {
			let args, option;

			(option = arguments[0]),
				(args =
					arguments.length >= 2 ? __slice.call(arguments, 1) : []);
			return this.each(function() {
				let data;

				data = $(this).data("star-rating");
				if (!data) {
					$(this).data(
						"star-rating",
						(data = new Starrr($(this), option))
					);
				}
				if (typeof option === "string") {
					return data[option](...args);
				}
			});
		},
	});
})(window.jQuery, window);

$(function() {
	return $(".starrr").starrr();
});

$(document).ready(function() {
	$("#stars").on("starrr:change", function(e, value) {
		$("#count").html(value);
	});

	$("#stars-existing").on("starrr:change", function(e, value) {
		$("#count-existing").html(value);
	});
});
