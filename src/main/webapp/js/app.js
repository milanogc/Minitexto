'use strict';

var App = Ember.Application.create({
	rootElement: '.container'
});

/*App.Router.reopen({
	location: 'history'
});*/

App.Router.map(function() {
	this.resource('posts');
});