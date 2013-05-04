require.config({
	baseUrl: 'js',
	paths: {
		ember: '../webjars/emberjs/1.0.0-rc.2/ember',
		emberdata: 'libs/ember-data-e324f0e582fe180bb577f648b1b7247958db21d9.min',
		handlebars: '../webjars/handlebars/1.0.0-rc.3/handlebars.min',
		jquery: '../webjars/jquery/1.9.0/jquery.min',
		moment: '../webjars/momentjs/2.0.0/moment.min'
	},
	shim: {
		ember: {
			deps: ['jquery', 'handlebars'],
			exports: 'Ember'
		},
		emberdata: {
			deps: ['ember'],
			exports: 'DS'
		}
	}
});

define(['app'], function() {});