'use strict';

App.PostsView = Ember.View.extend(App.InfineScrollableViewMixin, {
	didScroolToBottom: function() {
		this.get('controller').send('older');
	}
});