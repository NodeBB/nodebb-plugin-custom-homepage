(function(module) {
	"use strict";

	var Plugin = {};

	function renderHomepage(req, res, next) {
		res.render('homepage', {});
	}

	Plugin.init = function(params, callback) {
		var app = params.router,
			middleware = params.middleware,
			controllers = params.controllers;

		app.get('/', params.middleware.buildHeader, renderHomepage);
		app.get('/api/home', function(req, res, next) {
			res.json({});
		});

		app.get('/forum', params.middleware.buildHeader, params.controllers.home);
		app.get('/api/forum', params.controllers.home);

		callback();
	};

	Plugin.addNavigation = function(header, callback) {
		header.navigation.push(
			{
				route: '/forum',
				class: '',
				text: 'Forum',
				iconClass: 'fa-comments',
				title: 'Forum',
				textClass: 'visible-xs-inline'
			}
		);

		callback(false, header);
	};

	Plugin.defineWidgetAreas = function(areas, callback) {
		areas = areas.concat([
			{
				'name': 'Custom HP Header',
				'template': 'homepage.tpl',
				'location': 'hp-header'
			},
			{
				'name': 'Custom HP Footer',
				'template': 'homepage.tpl',
				'location': 'hp-footer'
			},
			{
				'name': 'Custom HP Sidebar',
				'template': 'homepage.tpl',
				'location': 'hp-sidebar'
			},
			{
				'name': 'Custom HP Content',
				'template': 'homepage.tpl',
				'location': 'hp-content'
			}
		]);

		callback(null, areas);
	};

	module.exports = Plugin;
}(module));
