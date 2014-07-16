(function(module) {
	"use strict";

	var Plugin = {};

	function renderHomepage(req, res, next) {
		res.render('homepage', {});
	}

    Plugin.init = function(app, middleware, controllers) {
    	app.get('/', middleware.buildHeader, renderHomepage);
		app.get('/api/home', function(req, res, next) {
			res.json({});
		});
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
					text: "<i class=\"fa fa-fw fa-comments\" title=\"Forum\"></i>",
					title: 'Forum'
				}
			]
		);

		callback(false, header);
	};

	Plugin.defineWidgetAreas = function(areas, callback) {
		areas = areas.concat([
			{
				'name': 'Custom HP Header',
				'template': 'home.tpl',
				'location': 'hp-header'
			},
			{
				'name': 'Custom HP Footer',
				'template': 'home.tpl',
				'location': 'hp-footer'
			},
			{
				'name': 'Custom HP Sidebar',
				'template': 'home.tpl',
				'location': 'hp-sidebar'
			},
			{
				'name': 'Custom HP Content',
				'template': 'home.tpl',
				'location': 'hp-content'
			}
		]);

		callback(null, areas);
	};

	module.exports = Plugin;
}(module));