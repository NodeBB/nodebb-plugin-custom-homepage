(function(module) {
	"use strict";

	// express removal of routes
	var unmount = function (app, path) {
	    for (var i = 0, len = app.stack.length; i < len; ++i) {
	        if (app.stack[i].route && app.stack[i].route.path == path) {
	            app.stack.splice(i, 1);
	            return true;
	        };
	    }
	    return false;
	}

	var Plugin = {};

	function renderHomepage(req, res, next) {
		res.render('homepage', {});
	}

    Plugin.init = function(params, callback) {
    	var app = params.app,
			middleware = params.middleware,
			controllers = params.controllers;
			
    	// For some reason, the main / route cannot be overwritten without deleting it first
    	unmount(app, '/');

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

	Plugin.changeClientRouting = function (config, callback) {
		config.custom_mapping['^/?$'] = 'homepage';
		config.custom_mapping['^forum?$'] = 'home';

		callback(null, config);
	};

	module.exports = Plugin;
}(module));
