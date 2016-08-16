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

        server.post('/site/query', function(req, res, next) {
            if(req.query.action === 'downloadSitesAsTsvFromProjectPanel') {
                res.download('./dev-server/variants.tsv', 'report.tsv');
            }
            else {
                next();
            }
        });

        server.all('/site/query', function(req, res) {
            var knomeIsStupid = getKnomeResource.bind(null, res);
            if(!knomeIsStupid(req.query.action)) {
                res.status(404).end();
            }
        });

        server.put('/rest/filters/:id', function(req, res) {
            var body = '';
            req.on('data', function(d) {
                body += d;
            });
            req.on('end', function() {
                res.status(200).json({
                    data: JSON.parse(body),
                    info: {}
                });
            });
        });

        server.get('/rest/filters/:id', function(req, res) {
            res.status(200).json({
                info: {},
                data: _.find(getResource('filters').data, item => item.id === parseInt(req.params.id))
            });
        });

        server.get('/rest/projects/:id/variants', function(req, res) {
            res.status(200).json(getResource('variants'));
        });

	    server.get('/rest/filterColumns/:column/settings', function(req, res) {
		    var column = req.params.column;
		    column = column.indexOf('(') > -1 ? column.slice(0, column.indexOf('(')) : column;
		    console.log(column);
		    res.status(200).json(getResource('filter-settings/' + _.kebabCase(column.toLowerCase())));
	    });
	    
	    

	    // user defaults for sorting
	    server.get('/rest/settings/defaultVariantSorting', function(req, res) {
		    res.status(200).json(getResource('settingsDefaultVariantSorting'));
	    });
	    server.put('/rest/settings/defaultVariantSorting', function(req, res) {
		    res.status(200).json(getResource('settingsDefaultVariantSorting'));
	    });

			// user defaults for column management
	    server.get('/rest/settings/defaultVariantColumns', function(req, res) {
		    res.status(200).json(getResource('settingsDefaultVariantColumns'));
	    });

	    server.put('/rest/settings/defaultVariantColumns', function(req, res) {
		    res.status(200).json(getResource('settingsDefaultVariantColumns'));
	    });


	    // simulate error
        // server.get('/rest/filters', function(req, res) {
        //     res.status(500).send({ message: 'Some error.' });
        // });

    }
}).start();
