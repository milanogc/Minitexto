'use strict';

App.Store = DS.Store.extend({
	revision: 12,
	adapter: DS.RESTAdapter /*DS.FixtureAdapter*/
});