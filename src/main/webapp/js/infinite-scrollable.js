/* original idea from http://nerdyworm.com/blog/2013/04/09/infinite-scroll-view-with-ember-dot-js/ */

var $document = $(document);
var $window = $(window);

var isScrolledToBottom = function() {
	var distanceToTop = $document.height() - $window.height();
	var top = $document.scrollTop();
	return top === distanceToTop;
};

var scrollHandler = function(event) {
	if (isScrolledToBottom()) {
		event.data.didScroolToBottom();
	}
};

Ember.InfineScrollableViewMixin = Ember.Mixin.create({
	didInsertElement: function() {
		$window.on('scroll', this, scrollHandler);
	},

	willDestroyElement: function() {
		$window.off('scroll', scrollHandler);
	}
});