App = Ember.Application.create({
	rootElement: '.container'
});

App.Router.map(function() {
	this.resource('posts');
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		return App.Post.find();
	}
});

App.Store = DS.Store.extend({
	revision: 12,
	adapter: 'DS.FixtureAdapter'
});

App.Post = DS.Model.extend({
	text: DS.attr('string'),
	publishedAt: DS.attr('date')
});

App.Post.FIXTURES = [{
	id: 1,
	text: 'Message 1',
	publishedAt: new Date()
}, {
	id: 2,
	text: 'Message 2',
	publishedAt: new Date()
}];

Ember.Handlebars.registerBoundHelper('date', function(date) {
	return moment(date).fromNow();
});