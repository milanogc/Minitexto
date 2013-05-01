'use strict';

App.PostsRoute = Ember.Route.extend({
	intervalId: null,

	init: function() {
		this.intervalId = setInterval(function(postsRoute) {
			postsRoute.send('newer');
		}, 1000, this);
	},

	destroy: function() {
		clearInterval(this.intervalId);
	},

	model: function() {
		return App.Post.find();
	},

	update: function(referencePostIdPath, newer) {
		var currentPosts = this.modelFor('posts');
		var referencePostId = currentPosts.get(referencePostIdPath);
		var posts = App.Post.find({id: referencePostId, newer: newer});
		currentPosts.pushObjects(posts);
	},

	events: {
		newer: function() {
			this.update('firstObject.id', true);
		},

		older: function() {
			this.update('lastObject.id');
		}
	}
});