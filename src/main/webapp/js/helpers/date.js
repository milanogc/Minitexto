define(['ember', 'moment'], function(Ember, moment) {
	'use strict';

	Ember.Handlebars.registerBoundHelper('date', function(date) {
		return moment(date).format('DD/MM/YYYY HH:mm:ss');
	});
});