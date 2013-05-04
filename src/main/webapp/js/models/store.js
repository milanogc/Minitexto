define(['emberdata'], function(DS) {
	'use strict';

	return DS.Store.extend({
		revision: 12,
		adapter: DS.RESTAdapter /*DS.FixtureAdapter*/
	});
});