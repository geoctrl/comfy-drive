var path = require('path');
var _ = require('lodash');

function getResource(p) {
	return require('./resources/' + p);
}

function getKnomeResource(res, resource) {
	res.status(200).json(getResource(resource));
}

require('bogus-api').create({
	resourceDir: path.resolve(__dirname, './resources'),
	resourceUriPrefix: '/rest',

	priorityRoutes: function(server) {

		server.get('/rest/files/:id', function(req, res, next) {
			res.status(200).json(getResource('get-file-' + req.params.id));
		});


	}
}).start();
