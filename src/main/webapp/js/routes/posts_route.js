'use strict';

function getRootPath() {
	var loc = window.location;
	var newUri;

	if (loc.protocol === "https:") {
		newUri = "wss";
	}
	else {
		newUri = "ws";
	}

	newUri += "://" + loc.host;
	newUri += loc.pathname;
	return newUri;
}

App.PostsRoute = Ember.Route.extend({
	webSocket: null,
	intervalId: null,

	init: function() {
		var postsRoute = this;

		var newerEmitter = function() {
			postsRoute.send('newer');
		};

		if ('WebSocket' in window) {
			this.webSocket = new WebSocket(getRootPath() + '/websocket/broadcast');
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