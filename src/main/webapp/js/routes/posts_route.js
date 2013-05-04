define(['ember', 'models/post', 'util'], function(Ember, Post, util) {
	'use strict';

	return Ember.Route.extend({
		webSocket: null,
		intervalId: null,

		init: function() {
			var postsRoute = this;

			var newerEmitter = function() {
				postsRoute.send('newer');
			};

			if ('WebSocket' in window) {
				this.webSocket = new WebSocket(util.rootWebSocketUrl() + '/websocket/broadcast');
				this.webSocket.onmessage = newerEmitter;
			}
			else {
				this.intervalId = setInterval(newerEmitter, 1000);
			}
		},

		destroy: function() {
			if ('WebSocket' in window) {
				this.webSocket.close();
			}
			else {
				clearInterval(this.intervalId);
			}
		},

		model: function() {
			return Post.find();
		},

		update: function(referencePostIdPath, newer) {
			var currentPosts = this.modelFor('posts');
			var referencePostId = currentPosts.get(referencePostIdPath);
			var posts = Post.find({id: referencePostId, newer: newer});
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
});