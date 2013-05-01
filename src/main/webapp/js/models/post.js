'use strict';

App.Post = DS.Model.extend({
	text: DS.attr('string'),
	publishedAt: DS.attr('date')
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