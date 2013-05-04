define(['ember', 'models/post'], function(Ember, Post) {
	'use strict';

	return Ember.ArrayController.extend({
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

			Post.createRecord({text: text, publishedAt: new Date()});
			this.get('store').commit();
			this.set('newText', '');
		},
	});
});