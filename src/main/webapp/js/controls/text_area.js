define(['ember'], function(Ember) {
	'use strict';

	return Ember.TextArea.extend({
		keyDown: function(evt) {
			if (evt.keyCode === 13) {
				this.get('controller').send('submit');
				return false;
			}
		}
	});
});