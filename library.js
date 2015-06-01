(function(module) {
	"use strict";

	var Plugin = {};
	var Meta = module.parent.require('./meta');
+	var Validator = require('validator');
	
	function renderDefaultSiteDescription(req, res, next) {
+		res.locals.metaTags = [{
+			name: "description",
+			content: Validator.escape(Meta.config.description || '')
+		}];
+		next();
+	}

	function renderHomepage(req, res, next) {
		res.render('homepage', {
			template: {
				name: 'homepage'
			}
		});
	}

	// this method doesn't work
	// and I don't know how to make it work

	Plugin.serveHomepage = function(params){
		renderHomepage(server.req, server.res, params.next);
	};
	
	// *sigh*

	Plugin.init = function(params, callback) {
		var app = params.router,
			middleware = params.middleware,
			controllers = params.controllers;

		// this works

		app.get('/', middleware.buildHeader, renderHomepage);

		app.get('/api/', function(req, res, next) {
			res.json({
				template: {
					name: 'homepage'
				}
			});
		});

		/* unnecessary since the `categories` path exists now
		app.get('/forum', params.middleware.buildHeader, params.controllers.home);
		app.get('/api/forum', params.controllers.home);
		*/

		callback();
	};

	// this works

	Plugin.addListing = function(data, callback){
		data.routes.push({
			route: 'customHP',
			name: 'Custom Homepage'
		});
		callback(null, data);
	};

	// this works

	Plugin.addNavigation = function(header, callback) {
		header.navigation.push(
			{
				route: '/categories',
				class: '',
				text: 'Forum',
				iconClass: 'fa-comments',
				title: 'Forum',
				textClass: 'visible-xs-inline'
			}
		);

		callback(false, header);
	};

	// this works

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
