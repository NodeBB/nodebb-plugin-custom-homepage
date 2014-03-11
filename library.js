(function(module) {
	"use strict";

	var Plugin = {};

	function renderHomepage(req, res, next) {
		res.render('homepage', {});
	}

    Plugin.init = function(app, middleware, controllers) {
    	app.get('/', middleware.buildHeader, renderHomepage);
		app.get('/api/home', renderHomepage);
		app.get('/templates/home.tpl', renderHomepage);

		app.get('/forum', middleware.buildHeader, controllers.home);
		app.get('/api/forum', controllers.home);
    };

    Plugin.addNavigation = function(header, callback) {
		header.navigation = header.navigation.concat(
			[
				{
					route: '/forum',
					class: '',
					text: "<i class=\"fa fa-fw fa-comments\" title=\"Forum\"></i>"
				}
			]
		);

		callback(false, header);
	};

	module.exports = Plugin;
}(module));