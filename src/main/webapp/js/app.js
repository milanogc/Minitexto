Ember.Handlebars.registerBoundHelper('date', function(date) {
	return moment(date).format('DD/MM/YYYY HH:mm:ss');
});

App = Ember.Application.create({
	rootElement: '.container'
});

/*App.Router.reopen({
	location: 'history'
});*/

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
	maxLength: 140,
	newText: '',
	sortProperties: ['publishedAt', 'id'],
	sortAscending: false,

	remainingChars: function() {
		return this.maxLength - this.newText.length;
	}.property('newText'),

	submit: function() {
		var text = this.newText.trim();

		if (!text) {
			return;
		}

		App.Post.createRecord({text: text, publishedAt: new Date()});
		this.get('store').commit();
		this.set('newText', '');
	},
});

App.TextArea = Ember.TextArea.extend({
	keyDown: function(evt) {
		if (evt.keyCode === 13) {
			this.get('controller').send('submit');
			return false;
		}
	}
});

App.Post = DS.Model.extend({
	text: DS.attr('string'),
	publishedAt: DS.attr('date')
});

App.Store = DS.Store.extend({
	revision: 12,
	adapter: DS.RESTAdapter /*DS.FixtureAdapter*/
});

/*App.Post.FIXTURES = [{
	id: 1,
	text: 'Message 1',
	publishedAt: new Date()
}, {
	id: 2,
	text: 'Message 2',
	publishedAt: new Date()
}];*/

/*for (var i = 0; i < 100; i++) {
	App.Post.FIXTURES.push({id: i + 1, text: 'Message ' + i, publishedAt: new Date()});	
}*/
