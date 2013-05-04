define(['ember'], function(Ember) {
	'use strict';

	return Ember.Route.extend({
		redirect: function() {
			this.transitionTo('posts');
		}
	});
});