Ember.Handlebars.registerBoundHelper('date', function(date) {
	return moment(date).format('DD/MM/YYYY HH:mm:ss');
});

App = Ember.Application.create({
	rootElement: '.container'
});

App.Router.map(function() {
	this.resource('posts');
});

App.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('posts');
	}
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		return App.Post.find();
	}
});

App.PostsController = Ember.ArrayController.extend({
	newText: '',

	remainingChars: function() {
		return 140 - this.get('newText').length;
	}.property('newText'),

	submit: function() {
		var text = this.get('newText');

		if (!text) {
			return;
		}

		App.Post.createRecord({text: text, publishedAt: new Date()});
		this.get('store').commit();
		this.set('newText', '');
	},

	reversedContent: function() {
		return this.get('content').toArray().reverse();
	}.property('content.@each')
});

App.Post = DS.Model.extend({
	text: DS.attr('string'),
	publishedAt: DS.attr('date')
});

App.Store = DS.Store.extend({
	revision: 12,
	adapter: DS.FixtureAdapter
});

App.Post.FIXTURES = [/*{
	id: 1,
	text: 'Message 1',
	publishedAt: new Date()
}, {
	id: 2,
	text: 'Message 2',
	publishedAt: new Date()
}*/];

/*for (var i = 0; i < 100; i++) {
	App.Post.FIXTURES.push({id: i + 1, text: 'Message ' + i, publishedAt: new Date()});	
}*/
