define(['ember', 'views/infinite_scrollable_view_mixin'], function(Ember, ISVM) {
	'use strict';

	return Ember.View.extend(ISVM, {
		didScroolToBottom: function() {
			this.get('controller').send('older');
		}
	});
});