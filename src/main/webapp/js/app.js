define([
	'ember',
	'models/store',
	'models/post',
	'routes/index_route',
	'routes/posts_route',
	'controllers/posts_controller',
	'views/posts_view',
	'controls/text_area',
	'helpers/date'
], function(Ember, Store, Post, IndexRoute, PostsRoute, PostsController, PostsView, TextArea) {
	'use strict';

	var App = Ember.Application.create({
		rootElement: '.row'
	});

	/*App.Router.reopen({
		location: 'history'
	});*/

	App.Router.map(function() {
		this.resource('posts');
	});

	App.Store = Store;
	App.Post = Post;
	App.IndexRoute = IndexRoute;
	App.PostsRoute = PostsRoute;
	App.PostsController = PostsController;
	App.PostsView = PostsView;
	App.TextArea = TextArea;

	return window.Minitexto = App;
});