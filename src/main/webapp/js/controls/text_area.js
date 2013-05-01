'use strict';

App.TextArea = Ember.TextArea.extend({
	keyDown: function(evt) {
		if (evt.keyCode === 13) {
			this.get('controller').send('submit');
			return false;
		}
	}
});