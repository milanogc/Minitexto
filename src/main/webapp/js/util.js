define([], function() {
	var protocols = {
		'http:': 'ws:',
		'https:': 'wss:'
	};

	return {
		rootWebSocketUrl: function() {
			return protocols[window.location.protocol] + window.location.host;
		}
	}
});